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

class jset_log {
	public function add($db, $source, $id_name, $id){
		$sql_class = sql::create($db);
		$target = self::target_name($db, $source);
	  	if(db_utils::table_exists($db, $target)){
	  		$sql = str_replace('#target#', $target, $sql_class->LOG_INSERT);
	  		$sql = str_replace('#source#', $source, $sql);
	  		$sql = str_replace('#id#', $id_name, $sql);
			$uuid = jset_atom::add($db);
	  		$db->insert($sql, array($uuid, $id));
	  		return $uuid;
	  	}
	  	
	  	return false;
	}
	
	private function target_name($db, $source){
		$sql_class = sql::create($db);
		return $sql_class->LOG_TABLE_PREFIX . $source . $sql_class->LOG_TABLE_SUFFIX;
	}
}

