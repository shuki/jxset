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

class jset_event {
	public function get($db, $id){
		$sql_class = sql::create($db);
	  	if(db_utils::table_exists($db, $sql_class->TABLE_EVENT))
			return self::event($db, $id);
	}

	public function exec($db, $e, $pairs, $settings){
		if(!$e) return;
		
		$events = explode('~', $e);
		foreach($events as $event){
			$call = gen_utils::call_extract($event, $pairs, $settings);
			$params = array_merge(array($db), $call->params);
			$res = call_user_func_array(array($call->class, $call->method), $params);
			if(isset($res->error))
				return $res;
			
			$list[] = $res;
			//$result->res[] = $res;
			if(isset($res->skip))
				$result->skip = true;
			if(isset($res->id))
				$result->id = $res->id;
		}
		
		$result->list = $list;
		return $result;
	}


	// create jset_event record for the passed jset_table id
	public function create_event($db, $id){
		$sql_class = sql::create($db);
		$result = $db->execute($sql_class->INSERT_JSET_EVENT, array($id));
	}
	
	private function event($db, $id){
		$sql_class = sql::create($db);
	  	$db->query($sql_class->GET_EVENTS, array($id));
		return $db->fetch();
	}	
}