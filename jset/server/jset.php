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

echo json_encode(process(getRealPOST()));

function process($post){
	$db_param_names = array("_db_name_" => "db_name", "_host_" => "host", "_db_remote_definitions_" => "db_remote_definitions");
	
	$request = new stdClass;
	$dbparams = new stdClass;
	
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
	//return call_user_func(array(new jset($dbparams), 'get'), $request);
	return call_user_func(array($jset, 'get'), $request);
}

function getRealPOST() {
    $pairs = explode("&", file_get_contents("php://input"));
    $vars = array();
    foreach ($pairs as $pair) {
        $nv = explode("=", $pair);
        $name = urldecode($nv[0]);
        $value = urldecode($nv[1]);
        $vars[$name] = $value;
    }
    return $vars;
}
