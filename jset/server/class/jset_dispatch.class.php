<?php
/*
 * jset  1.0 - jset
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */

include_once("autoload.php");

class jset_dispatch {
	public static function process(){
		$db_param_names = array("_db_name_" => "db_name", "_host_" => "host", "_db_remote_definitions_" => "db_remote_definitions");
		
		$request = new stdClass;
		$dbparams = new stdClass;
		
		$post = self::get_real_POST_GET();
		foreach($post as $var => $value)
			if($dbvar =	$db_param_names[$var])
				$dbparams->$dbvar = $value;
			else
				$request->$var = $value;
		
		if($dbparams->host){
			$db = db::create();
			$sql_class = sql::create($db);
			if(db_utils::table_exists($db, config::hosts_table)){
			$sql = str_replace('#table#', config::hosts_table, $sql_class->GET_HOST_CREDENTIALS);
				$db->query($sql, array($dbparams->host));
				$credentials = $db->fetchAll();
				if(count($credentials) > 0){
					$dbparams->host = $credentials[0]->host;
					$dbparams->port = $credentials[0]->port;
					$dbparams->server = $credentials[0]->server;
					if(!isset($dbparams->db_name))
						$dbparams->db_name = $credentials[0]->db_name;
					$dbparams->user = $credentials[0]->user;
					$dbparams->password = $credentials[0]->password;
				}else
					die('ERROR: no credentials for host: ' . $dbparams->host);
			}else
				die('ERROR: no host table defiend. host: ' . $dbparams->host);
				
			$dbparams->db = $db;
		}	
	
		$jset = jset::create($dbparams);
		return call_user_func(array($jset, 'get'), $request);
	}
	
	public static function get_grid_definition($source, $target='jxset')
	{
		$request['_methods_'] = 'columns,table,index';
		$request['_source_'] = $source;
		return self::get($request, $target);
	}
	
	public static function get(&$request, $target='jxset'){
		$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 
		(jset_autoload::get_header('Referer') ? jset_autoload::get_header('Referer') : (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']);
		if(!$referer)
			die('no referer set');
		
		//$request = array_merge(self::get_real_POST_GET(), $request);
		
		if(isset($request['PHPSESSID']))
		  unset($request['PHPSESSID']);
		
		if($php_auth_user = gen_utils::get_http_user())
			$request['_PHP_AUTH_USER_'] = $php_auth_user;
		
		jset_session::create();		
		if(count($_SESSION))
			foreach($_SESSION as $key => $value)
				$request['_session_' . $key . '_'] = $value;
		 
		request::set($request);
		$postdata = http_build_query($request);
		
		$opts = array('http' =>
		    array(
		        'method'  => 'POST',
		        'header'  => "Content-type: application/x-www-form-urlencoded\r\n" .
		        			"Referer: " . $referer . "\r\n",
		        'content' => $postdata
		    )
		);
		
		$context  = stream_context_create($opts);
		return file_get_contents((isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/' . $target . '/jset/server/jset.php', false, $context);
	}	

	public static function get_real_POST_GET() {
		$query_string = $_SERVER['QUERY_STRING'] ? $_SERVER['QUERY_STRING'] : file_get_contents("php://input");
		if(!$query_string)
			exit;
		
	    $pairs = explode("&", $query_string);
	    $vars = array();
	    foreach ($pairs as $pair) {
	        $nv = explode("=", $pair, 2);
	        $name = urldecode($nv[0]);
	        $value = urldecode($nv[1]);
	        $vars[$name] = $value;
	    }
	    return $vars;
	}
}