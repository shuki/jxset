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

class jset_error {
	public function add($db, $message, $query, $params){
		$sql_class = sql::create($db);
	  	if(db_utils::table_exists($db, $sql_class->ERROR_TABLE)){
	  		$uuid = jset_atom::add($db);
			$sql = preg_replace('/#table#/', $sql_class->ERROR_TABLE, $sql_class->ERROR_INSERT);
	  		$db->insert($sql, array($uuid, $message, $query, $params));
	  		return $uuid;
	  	}
	  	
	  	return false;
	}
}

