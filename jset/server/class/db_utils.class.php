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

class db_utils
{
	public function table_exists($db, $name){
		$sql_class = sql::create($db);
		$db->query($sql_class->TABLE_EXISTS, array($name));
		return $db->fetch()->result;
	}

	public function current_date($db){
		$sql_class = sql::create($db);
		$db->query($sql_class->CURRENT_DATE);
		return $db->fetch()->result;
	}

	public function current_datetime($db){
		$sql_class = sql::create($db);
		$db->query($sql_class->CURRENT_DATETIME);
		return $db->fetch()->result;
	}

	public function current_time($db){
		$sql_class = sql::create($db);
		$db->query($sql_class->CURRENT_TIME);
		return $db->fetch()->result;
	}
}

