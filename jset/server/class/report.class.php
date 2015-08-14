<?php
ini_set('display_errors', 1);
include_once("autoload.php");

class report {
	const SQL_GET_REPORT = 'select * from report where id = ? limit 1';
	const SQL_GET_PARAMETER = 'select * from parameter where name = ? limit 1';
	const PHP_AUTH_USER = '$user$';

	private $db;
	private $options;
	private $hosts;

	function __construct($params = null){
		date_default_timezone_set('Europe/Minsk');
		$this->db = db::create();
	}
	
	/*
	 * $options->id
	 * 
	 */
	private function _process($options){
		if($options[id]){
			$data = $this->get_page_data($options);
			$this->display_page($data);
		}else
			$this->error($options->error);
	}

	public function process($params){
		if($params['reportId']){
			$data = $this->get_page_data($params);
			if($data->redirectURL && !$data->missing && (($data->parameters->interactive && isset($data->interactive)) || !$data->parameters->interactive))
			{
				header('Location: ' . $data->redirectURL);
				exit;
			}
			else if($params['export'])
				$this->export($data);
			else
				$this->display_page($data);
		}else
			$this->error('missing parameter - reportId.');
	}

	public function contents($params){
		if($params['reportId']){
			$data = $this->get_page_data($params);
			return $this->display_contents($data);
		}else
			$this->error('missing parameter - reportId.');
	}

	public function checksum($params){
		if($params['reportId']){
			$data = $this->get_page_data($params);
			//die(var_dump($data->checksum));
			return $data->checksum;
		}else
			$this->error('missing parameter - reportId.');
	}

	private function get_page_data($params){
		foreach($_SESSION as $key => $value)
			$data->$key = $value;
		
		foreach($_REQUEST as $key => $value)
			$data->request->$key = $value;

		$res = $this->db->query(self::SQL_GET_REPORT, array($params['reportId']));
		if(isset($res->error))
			$this->error('unable to get report ' . $params['reportId'] . '.', $res->error); 

		$report = $this->db->fetch();
		if($report->sql){
			$parameters = $this->get_parameters($report->sql, $params);
			if(!$parameters->interactive || ($parameters->interactive && $params['interactive']))
				if($parameters->cannot_run !== true){
					$sql = str_replace(self::PHP_AUTH_USER, $_SERVER['PHP_AUTH_USER'], $report->sql);
					$sql = str_replace($parameters->tokens, $parameters->values, $sql);
					$sql = trim($sql);
					$select = substr($sql, 0, 6);
					if(strcasecmp($select, 'select') == 0 || strcasecmp($select, '(selec') == 0)
					{
						$sql = isset($params['orderby']) ? "select * from (\n" . $sql . "\n) zz " . $params['orderby'] : $sql;
						$db = $this->execute(
							$report->db ? $report->db : config::dbname_default,
							$report->host,
						 	$sql,
							'unable to run the report sql - ' .$sql  . '.');
						$data->data = $db->fetchAll();
						$data->checksum = md5(serialize($data->data));
						
						if($report->sql_aggregate){
							$sql_aggregate = str_replace($parameters->tokens, $parameters->values, $report->sql_aggregate);						
							$sql_aggregate = str_replace('($SQL)', "($sql)", $sql_aggregate);
							$sql_aggregate = trim($sql_aggregate);

							$db = $this->execute(
								$report->db ? $report->db : config::dbname_default,
								$report->host,
							 	$sql_aggregate,
								'unable to run the report sql aggregate - ' .$sql_aggregate  . '.');
							$data->aggregate = $db->fetchAll();
						}
					}
					else
					{
						$affected_rows = $this->execute_it(
							$report->db ? $report->db : config::dbname_default,
							$report->host,
						 	$sql,
							'unable to run the report sql - ' .$sql  . '.');
						$data->affected_rows = $affected_rows;
					}
					
				}else
					$data->missing = true;
			
			$data->action_parameter = $this->get_action_parameter($report->actionParamName);
			$data->reportId = $params['reportId'];
			if($report->redirectURL)
				$data->redirectURL = str_replace($parameters->tokens, $parameters->values, $report->redirectURL);
			$title = str_replace(self::PHP_AUTH_USER, $_SERVER['PHP_AUTH_USER'], $report->title);
			$data->title = 	str_replace($parameters->tokens, $parameters->values, $title);
			$description = str_replace(self::PHP_AUTH_USER, $_SERVER['PHP_AUTH_USER'], $report->description);
			$data->description = str_replace($parameters->tokens, $parameters->values, $description);
			$data->parameters = $parameters;
			$data->report = $report;
			if($params['interactive']) 
				$data->interactive = $params['interactive'];
		}else
			$this->error('report id ' . $params['reportId'] .  ' does not exists.');

		if($report->before_show)
		{
			$call = gen_utils::call_extract($report->before_show);
			$res = call_user_func_array(array($call->class, $call->method), array($this->db, $data));
			if($res === false)
				$this->error('unable to call the before show event - ', $report->before_show);
			else 
				$data = $res;
		}
		return $data;
	}
	
	private function get_parameters($sql, $params){
		preg_match_all('/{.*?}/', $sql, $matches);
		$vars = str_replace(array('{','}'), '', $matches[0]);

		$i = 0;
		foreach($vars as $var){
			if($var){
				$res = $this->db->query(self::SQL_GET_PARAMETER, array($var));
				if(isset($res->error))
					$this->error('unable to get the report parameters.', $res->error); 
				if(!$field = $this->db->fetch()){
					$field->name = $var;
					$field->title = $var;
				}
				$fields[$var] = $field;				
				$fields[$var]->token = $matches[0][$i];
				$fields[$var]->value = $params[$var];
			}else
				$this->error('the ' . $i + 1 . ' parameter in the sql of the report is empty ({}).');
			$i++;
		}
		
		if(isset($fields)){
			foreach($fields as $field){
				if($field->interactive)
					$interactive = true;
				if($field->choice){
					$db = $this->execute(
						$field->db ? $field->db : config::dbname_default,
						$field->host,
					 	$field->choice,
						'unable to run the parameter \'' . $field->name . '\' choice sql - ' . $field->choice  . '.');
					$list = $db->fetchAll();

					$list_array = array();
					foreach($list as $item)
						$list_array[$item->value] = $item->name;
					$fields[$field->name]->list = $list_array;
				}
				if($field->default_value){
					$default_value = str_replace(self::PHP_AUTH_USER, $_SERVER['PHP_AUTH_USER'], $field->default_value);
					$db = $this->execute(
						$field->db ? $field->db : config::dbname_default,
						$field->host,
					 	$default_value,
						'unable to run the parameter \'' . $field->name . '\' default value sql - ' . $default_value  . '.');
					$fields[$field->name]->default = $db->fetch()->value;
				}
					
				if(!isset($fields[$field->name]->value) || $fields[$field->name]->value == '')
					if(isset($fields[$field->name]->default))
						$fields[$field->name]->value = $fields[$field->name]->default;
					else if(isset($fields[$field->name]->list)){
						$arr[''] = '';
						$fields[$field->name]->list = $this->my_array_merge_associative($arr, $fields[$field->name]->list);
						$cannot_run = true;
					}
					else
						$cannot_run = true;
			}
			
			foreach($vars as $var)
				$values[] = $fields[$var]->isSantized ? mysql_escape_string($fields[$var]->value) : $fields[$var]->value;
		}
		
		$result->fields = $fields;
		$result->tokens = $matches[0];
		$result->values = $values;
		$result->cannot_run = $cannot_run;
		$result->interactive = $interactive;
		return $result;
	}
	
	private function get_action_parameter($parameter_name){
		if(!$parameter_name)
			return;
		
		$res = $this->db->query(self::SQL_GET_PARAMETER, array($parameter_name));
		if(isset($res->error))
			$this->error('unable to get the report parameter.', $res->error);
		if(!$field = $this->db->fetch())
		{
			$field->name = $var;
			$field->title = $var;
		}
		
		if($field->choice){
			$db = $this->execute(
				$field->db ? $field->db : config::dbname_default,
				$field->host,
			 	$field->choice,
				'unable to run the parameter \'' . $field->name . '\' choice sql - ' . $field->choice  . '.');
			$list = $db->fetchAll();

			$list_array = array();
			$list_extra_array = array();
			foreach($list as $item)
			{
				$list_array[$item->value] = $item->name;
				$list_extra_array[] = array('SeparateCallForEachSelection'=>$item->SeparateCallForEachSelection, 'MakeCallByAjax'=>$item->MakeCallByAjax); 
			}
			$field->list = $list_array;
			$field->list_extra = $list_extra_array;
		}
		if($field->default_value)
		{
			$default_value = str_replace(self::PHP_AUTH_USER, $_SERVER['PHP_AUTH_USER'], $field->default_value);
			$db = $this->execute(
				$field->db ? $field->db : config::dbname_default,
				$field->host,
			 	$default_value,
				'unable to run the parameter \'' . $field->name . '\' default value sql - ' . $default_value  . '.');
			$field->default = $db->fetch()->value;
		}
			
		if(!isset($field->value) || $field->value == '')
			if(isset($field->default))
				$field->value = $field->default;
			else if(isset($field->list))
			{
				$arr[''] = '';
				$field->list = $this->my_array_merge_associative($arr, $field->list);
				//$field->list_extra = $this->my_array_merge_associative($arr, $field->list_extra); 
			}
		
		return $field;
	}
	
	private function display_page($data){
		define('SMARTY_DIR', 'smarty/libs/');
		
		require_once(SMARTY_DIR . 'Smarty.class.php');
		$smarty = new Smarty();

		$smarty->template_dir = 'template/templates/';
		$smarty->compile_dir  = 'template/templates_c/';
		$smarty->config_dir   = 'template/configs/';
		$smarty->cache_dir    = 'template/cache/';

		if($data)
			foreach($data as $key => $value){
				$smarty->assign($key, $value);
		}
		//** un-comment the following line to show the debug console
		//$smarty->debugging = true;
		
		$smarty->assign('tpl_name', "tpl/" . ($data->report->tpl ? $data->report->tpl : "content_table") . ".tpl");
		$smarty->assign('tpl_contents_name', "tpl/" . ($data->report->tpl_contents ? $data->report->tpl_contents : "data") . ".tpl");
		$message = $smarty->display("tpl/" . (defined('config::tpl') ? config::tpl : "report.tpl"));
	}
	
	private function display_contents($data){
		define('SMARTY_DIR', 'smarty/libs/');
		
		require_once(SMARTY_DIR . 'Smarty.class.php');
		$smarty = new Smarty();

		$smarty->template_dir = 'template/templates/';
		$smarty->compile_dir  = 'template/templates_c/';
		$smarty->config_dir   = 'template/configs/';
		$smarty->cache_dir    = 'template/cache/';

		if($data)
			foreach($data as $key => $value){
				$smarty->assign($key, $value);
		}
		//** un-comment the following line to show the debug console
		//$smarty->debugging = true;
		$tpl = "data";
		$smarty->assign('tpl_name', "tpl/" . ($data->report->tpl ? $data->report->tpl : "content_table") . ".tpl");
		$smarty->assign('tpl_contents_name', "tpl/" . $data->report->tpl_contents . ".tpl");
		return $smarty->fetch("tpl/" . $data->report->tpl_contents . ".tpl");
	}

	private function export($data){
		header('Content-disposition: attachment; filename=' . str_replace(array(' ', '\\', '/'), '-', $data->title) . '.csv');
		header('Content-type: text/csv');
		
		foreach($data->data as $row){
			if(!$titles){
				foreach($row as $key => $value)
					$titles .= '"'. str_replace('"', '""', iconv('UTF-8', config::export_charset_windows, $this->strip_html($key))) . '",';
				$output .= substr($titles, 0, -1) . "\n";
			}
			
			foreach($row as $key => $value)
				$line .= '"'. str_replace('"', '""', iconv('UTF-8', config::export_charset_windows, $this->strip_html($value))) . '",';
		
			$output .= substr($line, 0, -1) . "\n";
			$line = '';
		}

		foreach($data->aggregate as $row){
			foreach($row as $key => $value)
				$line .= '"'. str_replace('"', '""', iconv('UTF-8', config::export_charset_windows, $this->strip_html($value))) . '",';
		
			$output .= substr($line, 0, -1) . "\n";
		}

		$output = substr($output, 0, -1);

		if($data->report->extra_data)
			$output .= iconv('UTF-8', config::export_charset_windows, $data->report->extra_data);

		echo $output;
		return '';	
	}

	private function strip_html($value){
		return htmlspecialchars_decode(strip_tags(str_replace(array('<br />', '&nbsp;', '&ndash;', '&mdash;'), array("\n", ' ', '-', '_'), $value)));
	}

	private function execute($db_name, $host, $sql, $error){
		if(!$db = $this->get_host($db_name, $host))
		{
			$p->db_name = $db_name;
			$db = db::create($p);
		}
		
		$res = $db->query($sql);
		if(isset($res->error))
			$this->error($error, $res->error);
		
		return $db;
	}
	
	private function execute_it($db_name, $host, $sql, $error){
		if(!$db = $this->get_host($db_name, $host))
		{
			$p->db_name = $db_name;
			$db = db::create($p);
		}

		$res = $db->exec($sql);
		if(isset($res->error))
			$this->error($error, $res->error);
		
		return $res;
	}
	
	private function error($msg, $error = false){
		$data->error = $msg;
		if($error){
			$data->error_msg = $error->message;
			$data->error_dump = $error->dump;
		}
		$this->display_page($data);
		die();		
	}
	
	private function my_array_merge_associative($array1, $array2){
		foreach($array2 as $key => $value)
			$array1[$key] = $value;
		
		return $array1;
	}
	
	private function get_host($db_name, $host)
	{
		if(!$host)
			return false;
		if(isset($this->hosts[$host]) && $this->hosts[$host]->db_name == $db_name)
			return $this->hosts[$host]->db;
		
		$sql_class = sql::class_name($this->db);
		if(db_utils::table_exists($this->db, config::hosts_table))
		{
			$sql = str_replace('#table#', config::hosts_table, $sql_class::GET_HOST_CREDENTIALS);
			$this->db->query($sql, array($host));
			$credentials = $this->db->fetchAll();
			if(count($credentials) > 0)
			{
				$dbparams->host = $credentials[0]->host;
				$dbparams->port = $credentials[0]->port;
				$dbparams->server = $credentials[0]->server;
				$dbparams->db_name = $db_name ? $db_name : $credentials[0]->db_name;
				$dbparams->user = $credentials[0]->user;
				$dbparams->password = $credentials[0]->password;
			}else
				die('ERROR: no credentials for host: ' . $dbparams->host);
		}else
			die('ERROR: no host table defiend. host: ' . $dbparams->host);
		
		$host_db = db::create($dbparams);
		$obj = new stdClass;
		$obj->db = $host_db;
		$obj->db_name = $dbparams->db_name;
		$this->hosts[$host] = $obj;
		return $host_db;
	}
}
