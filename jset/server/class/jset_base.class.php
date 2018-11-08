<?php
/*
 * jset  1.0 - jset
 * Copyright (c) 2010, Shuki Shukrun (shukrun dot shuki at gmail dot com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */
include_once("autoload.php");

class jset_defaults
{
	public $_order_ = 'NULL';
	public $_direction_ = '';
	public $_start_ = 0;
	public $_limit_ = config::limit;
}

class jset_base
{	
	private $db;
	private $db_definitions;
	private $sql_class;
	private $settings;
	private $table;
	protected $columns;
	private $pairs;
	private $where;
	private $event;
	
	function __construct($params = null)
	{
		if($params->db)
		{
			$db = $params->db;
			unset($params->db);
		}
		
		if($params->db_remote_definitions)
		{
			$db_remote_definitions = $params->db_remote_definitions;
			unset($params->db_remote_definitions);
		}
		
		//$this->db = new db($params);	
		//$this->db_definitions = $db_remote_definitions === 'false' ? ($db ? $db : new db()) : $this->db;
		$this->db = db::create($params);	
		$this->db_definitions = $db_remote_definitions === 'false' ? ($db ? $db : db::create()) : $this->db;
		$this->sql_class = sql::create($this->db);
	}

	public function get($request)
	{
		$this->request_check($request);
		$this->request_init($request);
		$methods = explode(',', $this->settings->_methods_);
		foreach($methods as $method)
			$result->$method = $this->$method();
			
		return count($methods) == 1 ? $result->$method : $result;		
	}

//--------------- external functions ----------------------------------
	private function columns()
	{
		return $this->columns->source->cols;
	}

	private function table()
	{
		return $this->table;
	}
	
	private function index()
	{
		return $this->columns->index;
	}
	
	private function rows($fields = null)
	{
	    //$this->db->query(stripslashes($this->settings->_source_));
	    $this->db->query($this->settings->_source_);
	    return $this->db->fetchAll();
	}

	private function grid_rows()
	{
		$result_before = jset_event::exec($this->db, $this->event->before_select, $this->pairs, $this->settings);
		if(isset($result_before->error))
			return $result_before;
		
		$count = $this->count();
		$limit = $this->settings->_rows_ ? $this->settings->_rows_ : $this->settings->_limit_;
		$pages = ($count > 0) ? ceil($count / $limit) : 0;
		$page = ($this->settings->_page_ > $pages) ? $pages : $this->settings->_page_;		
		$start = $limit * $page - $limit;
		$start = ($start < 0) ? 0 : $start;
		$end = $start + $limit;
		$order = $this->order();
		$direction = !$this->settings->_order_direction_ ? $this->settings->_direction_ : $this->settings->_order_direction_;
		
		$sql = $this->table->sql ? $this->sql_class->GET_GRID_ROWS_SQL_SOURCE : $this->sql_class->GET_GRID_ROWS;
		$sql = str_replace(array('#field_list#', '#source#', '#where#', '#order#', '#direction#', '#start#', '#limit#', '#start1#', '#end#', '#LD#', '#RD#'), 
					array($this->field_list(), $this->table->source, $this->where, $order, $direction, $start, $limit, $start + 1, $start + $limit, $this->sql_class->LD, $this->sql_class->RD), $sql);
	    $this->db->query($sql);
	    $primary = $this->columns->primary;
		$i=0;
		while ($row = $this->db->fetch())
		{
			$result->rows[$i]['id'] = $row->$primary;
			$values = array();
			foreach($row as $key => $value)
				$values[] = $this->emptyit($value);
			$result->rows[$i]['cell'] = $values;
			$i++;
		}
		
		$result->records = $count;
		$result->total = $pages;
		$result->page = $page;
		if($this->columns->aggregate)
			$result->userdata = $this->aggregate($this->columns->aggregate);
		if(defined('config::expose_sql') && config::expose_sql)
			$result->sql = $sql;

		return $result;
	}

	private function row_number($id)
	{
		$order = $this->order();
		$direction = !$this->settings->_order_direction_ ? $this->settings->_direction_ : $this->settings->_order_direction_;
		
		$sql = $this->table->sql ? $this->sql_class->GET_ROW_NUMBER_SQL_SOURCE : $this->sql_class->GET_ROW_NUMBER;
		$sql = str_replace(array('#source#', '#where#', '#order#', '#direction#', '#LD#', '#RD#'), 
					array($this->table->source, $this->where, $order, $direction, $this->sql_class->LD, $this->sql_class->RD), $sql);
	    $this->db->query($sql, array($id));
		//echo 'id: ' . $id;
		//var_dump($sql);
		return ($row = $this->db->fetch()) ? $row->row_number : 0;
	}

	private function pure_rows($fields = null)
	{
		$limit = $this->settings->_rows_ ? $this->settings->_rows_ : $this->settings->_limit_;
		$pages = ($count > 0) ? ceil($count / $limit) : 0;
		$page = ($this->settings->_page_ > $pages) ? $pages : $this->settings->_page_;		
		$start = $limit * $page - $limit;
		$start = ($start < 0) ? 0 : $start;
		$end = $start + $limit;
		$order = $this->order();
		$direction = !$this->settings->_order_direction_ ? $this->settings->_direction_ : $this->settings->_order_direction_;
		
		$sql = $this->table->sql ? $this->sql_class->GET_GRID_ROWS_SQL_SOURCE : $this->sql_class->GET_GRID_ROWS;
		$sql = str_replace(array('#field_list#', '#source#', '#where#', '#order#', '#direction#', '#start#', '#limit#', '#start1#', '#end#', '#LD#', '#RD#'), 
					array($fields ? $fields : $this->field_list(), $this->table->source, $this->where, $order, $direction, $start, $limit, $start + 1, $start + $limit, $this->sql_class->LD, $this->sql_class->RD), $sql);
			
	    $this->db->query($sql);
		return $this->db->fetchAll();
	}

	private function import()
	{
		$upload_dir = config::rel_path . config::upload_directory;
		$filename = $upload_dir .  $this->settings->_filename_;
		$file = file_get_contents($filename);
		if($file === false){
		    $result->error = 'unable to read file: ' . $filename;
			return $result;
		}
		
		$file_encoded = iconv(config::export_charset_windows, 'UTF-8', $file);
		$filename = $filename . 'x';
		if(file_put_contents($filename, $file_encoded) === false){
		    $result->error = 'unable to save file: ' . $filename;
			return $result;
		}

		$handle = fopen($filename, "r");
		if($handle)
		    $fields_line = fgets($handle);
		else {
		    $result->error = 'unable to open file: ' . $filename;
			return $result;
		} 
		fclose($handle);
		
		$fields_titles = explode(',', trim($fields_line));
		foreach($fields_titles as $title){
			$found = false;
			foreach($this->columns->source->cols as $col){
				if($title == $col->Field || $title == $col->title){
					foreach($this->columns->target->cols as $tcol){
						if($col->Field == $tcol->Field){
							$field = new stdClass;
							$field->name = $this->sql_class->LD . $tcol->Field . $this->sql_class->RD;
							$field->type = $tcol->type;
							$field_list[] = $field;
							$found = true;
							break;
						}
					}
					break;
				}
			}
			if(!$found){
				$field = new stdClass;
				$field->skip = true;
				$field_list[] = $field;
			}
		}
		
		for ($i=0; $i < count($field_list); $i++) {
			$var = '@var' . $i;
			$vars .= $var . ',';
			if(!$field_list[$i]->skip)
				$fields .= $field_list[$i]->name . "= if(trim($var) = '', null, " . ($field_list[$i]->type == 'date' ? " if(locate('/',$var), STR_TO_DATE($var,'%d/%m/%Y'), $var)" : $var) . '),';
		} 		

		if(!isset($fields)){
		    $result->error = 'nothing to import';
			return $result;
		}

		$vars = substr($vars, 0, -1);
		
		if(count($fields_array = json_decode($this->settings->_fields_, true)))
			foreach($fields_array as $key => $val)
				$fields .= $val['name'] . ' = ' . $this->db->con->quote($val['value']) . ',';

		$fields = substr($fields, 0, -1);

		//$upload_dir = config::mysql_rel_path . config::upload_directory;
		$upload_dir = config::mysql_rel_path;
		$filename = $upload_dir .  $this->settings->_filename_ . 'x';
		$sql = str_replace(array('#filename#', '#table#', '#var_list#', '#field_list#'), 
			array($filename, $this->table->target, $vars, $fields), $this->sql_class->IMPORT);

		return $this->db->exec($sql);
	}

	private function grid_empty()
	{
	  	$result->rows = array();
	  	$result->records = 0;
		$result->total = 0;
		$result->page = 0;
		return $result;
	}
	
	private function count()
	{
		$sql = $this->table->sql ? $this->sql_class->GET_COUNT_SQL_SOURCE : $this->sql_class->GET_COUNT;
		$sql = str_replace(array('#source#', '#where#', '#LD#', '#RD#'), 
					array($this->table->source, $this->where, $this->sql_class->LD, $this->sql_class->RD), $sql);

	  	//$sql = $this->table->sql ? "SELECT COUNT(*) AS count FROM (" . $this->table->source . ") a WHERE " . $this->where : 
		//"SELECT COUNT(*) AS count FROM `" . $this->table->source . "` WHERE " . $this->where;
	  	$this->db->query($sql);
	  	return $this->db->fetch()->count;
	}

	private function add()
	{
		$result_before = jset_event::exec($this->db, $this->event->before_insert, $this->pairs, $this->settings);
		if(isset($result_before->error))
			return $result_before;
		
		if(isset($result_before->skip))
		{
			if(isset($result_before->id))
			{
				$id = $result_before->id;
				$this->pairs->values[$this->pairs->index[$this->columns->primary]] = $id;
			} 
			else
				$id = $this->pairs->values[$this->pairs->index[$this->columns->primary]];
		}
		else
		{
			$names = $this->sql_class->LD . implode($this->sql_class->RD . ',' . $this->sql_class->LD, $this->pairs->names) . $this->sql_class->RD;
			$question_marks = $this->question_marks($this->pairs->count);
			$SQL = "INSERT INTO " . $this->sql_class->LD . $this->table->target . $this->sql_class->RD . " (" . $names . ") values (" . $question_marks .")";
			$res = $this->db->insert($SQL, $this->pairs->values);
			if(isset($res->error))
				return $res;
			
			if($res != 0)
			{
				$id = $res;
				$this->pairs->values[$this->pairs->index[$this->columns->primary]] = $id;
			} else
				$id = $this->pairs->values[$this->pairs->index[$this->columns->primary]];
		}
		
		$log = jset_log::add($this->db, $this->table->target, $this->columns->primary, $id);
		
		$result_after = jset_event::exec($this->db, $this->event->after_insert, $this->pairs, $this->settings);
		if(isset($result_after->error))
			return $result_after;
		
		$result->id = $id;
		if(!is_null($result_before)) $result->result_before = $result_before;
		if(!is_null($result_after)) $result->result_after = $result_after;
		$result->row_number = $this->row_number($id);
		return $result;
	}
	
	private function delete()
	{
		$SQL = "DELETE FROM " . $this->sql_class->LD . $this->table->target . $this->sql_class->RD . " WHERE ". $this->sql_class->LD . $this->columns->primary . $this->sql_class->RD . " = ?";
		$settings = clone $this->settings;
		foreach(explode(',', $this->settings->_id_) as $id)
		{
			$settings->_id_ = $id;
			$result_before = jset_event::exec($this->db, $this->event->before_delete, $this->pairs, $settings);
			if(isset($result_before->error))
				return $result_before;
			if(!isset($result_before->skip)){
				$result = $this->db->execute($SQL, array($id));
				if(isset($result->error))
					return $result;
			}
			$result_after = jset_event::exec($this->db, $this->event->after_delete, $this->pairs, $settings);
			if(isset($result_after->error))
				return $result_after;
		}
		return isset($result) ? $result : true;
	}
	
	private function edit()
	{
		$result_before = jset_event::exec($this->db, $this->event->before_update, $this->pairs, $this->settings);
		if(isset($result_before->error))
			return $result_before;

		if(!isset($result_before->skip))
		{
			$names_eq_question_marks = $this->names_eq_question_marks($this->pairs);
			$SQL = "UPDATE " . $this->sql_class->LD . $this->table->target . $this->sql_class->RD . " set " . $names_eq_question_marks . " WHERE " . $this->sql_class->LD . $this->columns->primary . $this->sql_class->RD . " = ?";
			$values = $this->pairs->values;
			$values[] = $this->settings->_id_;
			$res = $this->db->execute($SQL, $values);
			if(isset($res->error))
				return $res;
		}
			
		$id = $this->pairs->values[$this->pairs->index[$this->columns->primary]] ? $this->pairs->values[$this->pairs->index[$this->columns->primary]] : $this->settings->_id_;
		$log = jset_log::add($this->db, $this->table->target, $this->columns->primary, $id);
		$result_after = jset_event::exec($this->db, $this->event->after_update, $this->pairs, $this->settings);
		if(isset($result_after->error))
			return $result_after;
		
		$result->id = $id;
		if(!is_null($result_before)) $result->result_before = $result_before;
		if(!is_null($result_after)) $result->result_after = $result_after;
		$result->row_number = $this->row_number($id);
		return $result;
	}

	private function dump()
	{
		if($this->settings->_editing_state_ == 'Edited')
			return class_exists('app_dump') ? app_dump::process($this->db, null, $this->settings) : 'No sql dump process has been defined';
					
		//$ret = exec('mysqldump.exe --user=' . $this->db->user() . ' --password=' . $this->db->password() . ' --replace --complete-insert --no-create-info --skip-add-drop-table --skip-comments --skip-add-locks --skip-disable-keys --skip-add-locks --skip-set-charset --skip-tz-utc --where="id=' . $this->settings->_id_ . '" ' . $this->db->db_name() . ' ' . $this->table->target , $array, $result);
		$ret = exec(config::mysqldump_prefix . 'mysqldump.exe --user=' . $this->db->user() . ' --password=' . $this->db->password() . ' --complete-insert --no-create-info --skip-add-drop-table --skip-comments --skip-add-locks --skip-disable-keys --skip-add-locks --skip-set-charset --skip-tz-utc --where="id=' . $this->settings->_id_ . '" ' . $this->db->db_name() . ' ' . $this->table->target , $array, $result);
		return class_exists('app_dump') ? app_dump::process($this->db, $array[5], $this->settings) : $array[5];
	}

	private function export()
	{
		if(isset($this->settings->_fields_)){
			$fields_array = json_decode($this->settings->_fields_, true);
			foreach($fields_array as $field_name)
			{
				$col = $this->col($field_name);
				if((defined('config::export_all') && config::export_all) || $col->export == 1)
				{
					$field = $col->Field;
					$name = $col->title ? iconv('UTF-8', config::export_charset_windows, $col->title) : ($col->Comment ? $col->Comment : $col->Field);
					$name = str_replace(array("\n", "\r", '"', ","), '', $name);
					$fields .= $field . ",";
					$field_names .= $name . ",";
					$filters .= ($this->settings->$field ? $this->settings->$field : '') . ",";
				}
			}
		}
		else
			foreach($this->columns->source->cols as $col)
				if((defined('config::export_all') && config::export_all) || $col->export == 1)
				{
					$field = $col->Field;
					$name = $col->title ? iconv('UTF-8', config::export_charset_windows, $col->title) : ($col->Comment ? $col->Comment : $col->Field);
					$fields .= $field . ",";
					$field_names .= $name . ",";
					$filters .= ($this->settings->$field ? $this->settings->$field : '') . ",";
				}
		
		if(!$fields){
			header('Content-disposition: attachment; filename=' . $this->table->name . '.csv');
			header('Content-type: text/csv');
			return '';
		}
		
		$fields = substr($fields, 0, -1);
		$field_names = substr($field_names, 0, -1);
		$filters = substr($filters, 0, -1);
		$order = $this->order();
		$direction = !$this->settings->_order_direction_ ? $this->settings->_direction_ : $this->settings->_order_direction_;
		$limit = general::get_export_limit($this->db, $this->settings);
		$field_list = $this->coalesce($this->field_list($fields));
		$sql = $this->table->sql ? $this->sql_class->EXPORT_GRID_ROWS_SQL_SOURCE : $this->sql_class->EXPORT_GRID_ROWS;
		$sql = str_replace(array('#field_list#', '#source#', '#where#', '#order#', '#direction#', '#limit#', '#LD#', '#RD#'), 
					array($field_list, ($this->table->export_source ? $this->table->export_source : $this->table->source), $this->where, $order, $direction, $limit, $this->sql_class->LD, $this->sql_class->RD), $sql);	
		$this->db->query($sql);
		$data = $this->db->fetchAll();
	
		foreach($data as $row){
			if($line){
				$output .= $line . "," . $item . "\n";
				$item = '';
			}
			$line = '';
			foreach($row as $key => $value){
				if($line)
					$line .= "," . $item;
				else 
					$line = $item;
				
				$item = '"'. str_replace('"', '""', iconv('UTF-8', config::export_charset_windows, $this->strip_html($value))) . '"';
			}
		}
		
		$result = str_replace(",", ",", $field_names) . "\n" . $output . $line . "," . $item;
		echo $result;
		return "";
	}
		
//-----------------    internal functions ------------------------
	private function request_check($request)
	{
		if(empty($request->_methods_)) die('ERROR: no methods has been specified');
		if(empty($request->_source_)) die('ERROR: no source has been specified');
	}

	private function request_init($request)
	{
		$this->settings = $this->settings($request);
		if($this->settings->_no_init_)
			return;	
		$this->table = jset_table::get($this->db_definitions, $this->settings);
		$jset_columns = jset_columns::create($this->db_definitions);
		$this->columns = $jset_columns->get($this->db_definitions, $this->table, $this->settings);
		//$this->columns = jset_columns::get($this->db_definitions, $this->table);
		$this->pairs = $this->pairs();
		$this->where = $this->where();
		$this->event = jset_event::get($this->db_definitions, $this->table->id);
	}

	private function settings($params)
	{
	  	$settings = new jset_defaults();
	  	if($params) foreach($params as $var => $value) $settings->$var = $value;
	  	return $settings;
	}

	// returns arrays of names, values, index and count.
	private function pairs()
	{
		$i = 0;
		foreach(($this->settings->_search_ == 'true' ? $this->columns->source->cols : $this->columns->target->cols) as $column)
		{
			$name = $column->Field;
			if(isset($this->settings->$name))
			{
				if($this->sql_class->PRIMARY_FIELD_NOT_UPDATABLE && $this->settings->_search_ != 'true' && $name == $this->columns->primary)
					continue;
				
				$names[] = $name;
				$override = $this->col($name)->override;
				//$values[] = $this->nullit(stripslashes($override ? $this->override($override) : $this->settings->$name));
				$values[] = $this->nullit($override ? $this->override($override) : $this->settings->$name);
				$index[$name] = $i++;
			}
		}
		
		$result->names = $names;
		$result->values = $values;
		$result->index = $index;
		$result->count = count($names);
		return $result;
	}
	
/*	private function pairs_target($fields){
		$fields_arr = explode(',', $fields);
		foreach($fields_arr as $field){
			if(isset($this->pairs->index[$field]))
				$result .= $field . ",";
		}
		
		return substr($result, 0, -1);
	}
*/	
	// returns string '`name1` = ?, `name2` = ?, `name3` = ?,..'
	private function names_eq_question_marks()
	{
		for($i=0; $i < $this->pairs->count; $i++)
			$result .= $this->sql_class->LD . $this->pairs->names[$i] . $this->sql_class->RD . '=?,';
			
		return substr($result, 0, -1);
	}

	private function primary_value()
	{
	}
	
	// returns string '?,?,?,..' $count times
	private function question_marks($count)
	{
		$result = str_repeat('?,', $count);
		return substr($result, 0, -1);
	}
	
	private function where()
	{
//		if($this->settings->_search_ == 'true')
//		{
			$filters = '';
			if(isset($this->settings->filters))
				$filters =  $this->getStringForGroup(json_decode($this->strip($this->settings->filters) ,true));
			
			if(isset($this->settings->_filters_))
				if($f = $this->getStringForGroup(json_decode($this->strip($this->settings->_filters_),true)))
					$filters .=  $filters ? ' AND ' . $f : $f;
				
			if(isset($this->settings->_searchall_))
				if($f = $this->get_searchall($this->strip($this->settings->_searchall_)))
					$filters .=  $filters ? ' AND ' . $f : $f;
				
/*			for($i=0; $i < $this->pairs->count; $i++)
			{
					switch($this->col($this->pairs->names[$i])->control)
					{
						case 'select':
						case 'selectbox':
						case 'selectbox_text':
						case 'intexact':
							$result .= $this->sql_class->LD . $this->pairs->names[$i] . $this->sql_class->RD . "='" . $this->pairs->values[$i] . "' AND ";
							break;			
						case 'orexact':
							$values = explode('|', $this->pairs->values[$i]);
							$result .= '(';
							foreach($values as $value)
								$result .= $this->sql_class->LD . $this->pairs->names[$i] . $this->sql_class->RD . "='" . $value . "' OR ";
							$result = substr($result, 0, -4) . ") AND ";
							break;			
						case 'orlike':
							$values = explode('|', $this->pairs->values[$i]);
							$result .= '(';
							foreach($values as $value)
								$result .= $this->sql_class->LD . $this->pairs->names[$i] . $this->sql_class->RD . " LIKE " . $this->db->con->quote("%" . stripslashes($value) . "%") . " OR ";
							$result = substr($result, 0, -4) . ") AND ";
							break;			
						default:
							$result .= $this->sql_class->LD . $this->pairs->names[$i] . $this->sql_class->RD . " LIKE '%" . stripslashes($this->pairs->values[$i]) . "%' AND ";			
					}
			}
			$result = ($result == '') ? '1=1' : substr($result, 0, -5);*/
			
			//return $filters == '' ? $result : $filters . ' AND ' . $result;
			return $filters == '' ? '1=1' : $filters;
			//		}else
//			return '1=1';
	}
	
	private function nullit($value)
	{
		return $value == '' ? null : $value;
	}

	private function emptyit($value)
	{
		return is_null($value) ? '' : $value;
	}
	
	private function col($name)
	{
		return $this->columns->source->cols[$this->columns->index[$name]];
	}
	
	protected function field_list($fields = null)
	{
		if($fields){
			return $this->sql_class->LD . str_replace(',', $this->sql_class->RD . ',' . $this->sql_class->LD, $fields) . $this->sql_class->RD;
		}
		
		foreach($this->columns->index as $key=>$value)
			$result .= $this->sql_class->LD . $key . $this->sql_class->RD . ',';
			
		return substr($result, 0, -1);
	}
	
	protected function coalesce($fields)
	{
		$fields_array = explode(',', $fields);
		foreach($fields_array as $key=>$value)
			$result .= 'COALESCE(' . $value . ', \'\') AS ' . $value . ',';
			
		return substr($result, 0, -1);
	}
	
	private function override($override)
	{
		$call = gen_utils::call_extract($override, $this->pairs);
		$params = array_merge(array($this->db), $call->params);
		return call_user_func_array(array($call->class, $call->method), $params);
	}
	
	private function strip($value)
	{
		if(get_magic_quotes_gpc() != 0)
	  	{
	    	if(is_array($value))  
				if ( $this->array_is_associative($value) )
				{
					foreach( $value as $k=>$v)
						$tmp_val[$k] = stripslashes($v);
					$value = $tmp_val; 
				}				
				else  
					for($j = 0; $j < sizeof($value); $j++)
	        			$value[$j] = stripslashes($value[$j]);
			else
				$value = stripslashes($value);
		}
		return $value;
	}
	
	private function getStringForGroup($group)
	{
		$i_='';
		$sopt = array('eq' => "=",'ne' => "<>",'lt' => "<",'le' => "<=",'gt' => ">",'ge' => ">=",'bw'=>" {$i_}LIKE ",'bn'=>" NOT {$i_}LIKE ",'in'=>' IN ','ni'=> ' NOT IN','ew'=>" {$i_}LIKE ",'en'=>" NOT {$i_}LIKE ",'cn'=>" {$i_}LIKE ",'nc'=>" NOT {$i_}LIKE ", 'nu'=>'IS NULL', 'nn'=>'IS NOT NULL', 'fi'=>'FIND_IN_SET', 'fn'=>'NOT FIND_IN_SET');
		$s = "(";
		if( isset ($group['groups']) && is_array($group['groups']) && count($group['groups']) >0 )
		{
			for($j=0; $j<count($group['groups']);$j++ )
			{
				if(strlen($s) > 1 ) {
					$s .= " ".$group['groupOp']." ";
				}
				try {
					$dat = $this->getStringForGroup($group['groups'][$j]);
					$s .= $dat;
				} catch (Exception $e) {
					echo $e->getMessage();
				}
			}
		}
		if (isset($group['rules']) && count($group['rules'])>0 ) {
			try{
				foreach($group['rules'] as $key=>$val) {
					if (strlen($s) > 1) {
						$s .= " ".$group['groupOp']." ";
					}
					$field = $this->sql_class->LD . $val['field'] . $this->sql_class->RD;
					$op = $val['op'];
					$v = stripslashes($val['data']);
					if( $op ) {
						switch ($op)
						{
							case 'ne':
								$s .= '(' . $field . ' ' . $sopt[$op] . ' ' . $this->db->con->quote($v) . " OR $field IS NULL) ";
								break;
							case 'bw':
								$v = str_replace(array('%', '_'), array('\%', '\_'), $v);
								$s .= $field .' '. $sopt[$op] . $this->db->con->quote("$v%") . ' ';
								break;
							case 'bn':
								$v = str_replace(array('%', '_'), array('\%', '\_'), $v);
								$s .= '(' . $field .' '. $sopt[$op] . $this->db->con->quote("$v%") . " OR $field IS NULL) ";
								break;
							case 'ew':
								$v = str_replace(array('%', '_'), array('\%', '\_'), $v);
								$s .= $field . ' ' . $sopt[$op] . $this->db->con->quote("%$v") . ' ';
								break;
							case 'en':
								$v = str_replace(array('%', '_'), array('\%', '\_'), $v);
								$s .= '(' . $field . ' ' . $sopt[$op] . $this->db->con->quote("%$v") . " OR $field IS NULL) ";
								break;
							case 'cn':
								$v = str_replace(array('%', '_'), array('\%', '\_'), $v);
								$s .= $field . ' ' . $sopt[$op] . $this->db->con->quote("%$v%") . ' ';
								break;
							case 'nc':
								$v = str_replace(array('%', '_'), array('\%', '\_'), $v);
								$s .= '(' . $field . ' ' . $sopt[$op] . $this->db->con->quote("%$v%") . " OR $field IS NULL) ";
								break;
							case 'in':
								$s .= $field . ' ' . $sopt[$op] . " ( $v ) ";
								break;
							case 'ni':
								$s .= '(' . $field . ' ' . $sopt[$op] . " ( $v ) OR $field IS NULL) ";
								break;
							case 'nu':
							case 'nn':
								$s .= $field . ' ' . $sopt[$op] . ' ';
								break;
							case 'fi':
								$s .= $sopt[$op] . ' (' . $this->db->con->quote($v) . ', ' . $field . ') > 0 ';
								break;
							case 'fn':
								$s .= '(' . $sopt[$op] . ' (' . $this->db->con->quote($v) . ', ' . $field . ") > 0  OR $field IS NULL) ";
								break;
							default :
								$s .= $field . ' ' . $sopt[$op] . ' ' . $this->db->con->quote($v) . ' ';
								break;
						}
					}
				}
			} catch (Exception $e) 	{
				echo $e->getMessage();
			}
		}
		$s .= ")";
		if ($s == "()")
			return "";
		else
			return $s;
	}

	private function get_searchall($value){
		if(preg_match_all('~(["\'])([^"\']+)\1~', $value, $arr))	
			for ($i = 0; $i < count($arr[0]); $i++)
				$value = str_replace ($arr[0][$i], '' , $value);
				
		$values = array_unique(explode(' ', $value));
		$values = array_merge($arr[2], $values);
		foreach($values as $val){
			$q = '';
			if($val)
				foreach($this->columns->source->cols as $col)
					if(!$col->hidden || $col->edithidden || isset($this->columns->index[gen_utils::get_join_field_base_name($col->Field)])){
						$val = stripslashes($val);
						$q .= 'cast(' . $this->sql_class->LD . $col->Field . $this->sql_class->RD . " as char) LIKE " . $this->db->con->quote("%" . str_replace(array('%', '_'), array('\%', '\_'), $val) . "%") . " OR ";
						$date_array = explode('/', $val, 3);
						if(count($date_array) > 1){
							$rdate_array = array_reverse($date_array);
							$dval_array = array();
							foreach($rdate_array as $ditem)
								if($ditem)
									$dval_array[]= str_pad($ditem, 2, '0', STR_PAD_LEFT);
							
							$dval = implode('-', $dval_array);							
							$q .= 'cast(' . $this->sql_class->LD . $col->Field . $this->sql_class->RD . " as char) LIKE " . $this->db->con->quote("%" . $dval . "%") . " OR ";
						}
					}
			$sql .= ($q ? '(' . substr($q, 0, -4) . ') AND ' : '');
		}

		return $sql ? '(' . substr($sql, 0, -5) . ')' : false;
	}
	
	private function array_is_associative ($array)
	{
	    if ( is_array($array) && ! empty($array) )
	    {
	        for ( $iterator = count($array) - 1; $iterator; $iterator-- )
	        {
	            if ( ! array_key_exists($iterator, $array) ) { return true; }
	        }
	        return ! array_key_exists(0, $array);
	    }
	    return false;
	}
	
	private function aggregate($aggregate){
		foreach($aggregate as $key => $value){
			$keys[] = $key;
			$fields .= $value . ' as ' . $this->sql_class->LD . $key . $this->sql_class->RD . ',';
		}
		$fields =  substr($fields, 0, -1);
		
		$sql = $this->table->sql ? $this->sql_class->GET_GRID_AGGREGATE_SQL_SOURCE : $this->sql_class->GET_GRID_AGGREGATE;
		$sql = str_replace(array('#field_list#', '#source#', '#where#', '#LD#', '#RD#'), 
					array($fields, $this->table->source, $this->where, $this->sql_class->LD, $this->sql_class->RD), $sql);

	    $this->db->query($sql);
		$row = $this->db->fetch();
		
		if($row === false)
			foreach($keys as $key)
				$result->$key = '';
		else
			foreach($row as $key => $value)
				$result->$key = $value;
		
		return $result;
	}
	
	private function order(){
		if(!$this->settings->_order_by_)
			return $this->settings->_order_;
		
		foreach(explode(',', $this->settings->_order_by_) as $order_pair){
			$pair = explode(' ', trim($order_pair));
			$result[] = $this->sql_class->LD . $pair[0] . $this->sql_class->RD . (isset($pair[1]) ? ' ' . $pair[1] : '');
		}
		
		return implode(',', $result);
	}
	
	private function strip_html($value){
		return htmlspecialchars_decode(strip_tags(str_replace(array('<br />', '&nbsp;', '&ndash;', '&mdash;'), array("\n", ' ', '-', '_'), $value)));
	}
}