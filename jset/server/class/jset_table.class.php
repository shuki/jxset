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

class jset_table {
	public function get($db, $source, $target){
		$sql_class = sql::create($db);
	  	if(self::is_sql($source))
			return self::sql($source, $target);
	  	if(db_utils::table_exists($db, $sql_class->TABLE_TABLE))
			return self::table($db, $source);
		else
			return self::defaults($source);
	}

	public function is_sql($source){
		return preg_match('/^select\s|^call\s/i', $source);
	}
	
	private function table($db, $source){
		$sql_class = sql::create($db);
	  	$db->query($sql_class->GET_TABLE, array($source));
		$result = $db->fetch();
		//var_dump($result); die;
		if($result){
			if(self::is_sql($result->source))
				$result->sql = true;
			return $result;
		}else
			return self::defaults($source);
	}
	
	private function defaults($source){
		$result->name = $source;
		$result->source = $source;
		$result->target = $source;
		return $result;
	}
	
	private function sql($source, $target){
		$result->sql = true;
		$result->source = $source;
		if($target) $result->target = $target;
		return $result;
	}	
}

