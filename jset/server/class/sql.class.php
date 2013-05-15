<?php
/*
 * jset  1.0 - jset
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */

class sql
{
	/*public function create($db = null){
		$db_class_name = $db ? get_class($db) : '';
		switch($db_class_name){
			case 'db_dblib':
				return new sql_dblib($db);
			default:
				return new sql_mysql($db);
		}
	}*/
	
	public function class_name($db = null)
	{
		$db_class_name = $db ? get_class($db) : '';
		switch($db_class_name)
		{
			case 'db_dblib':
				return 'sql_dblib';
			default:
				return 'sql_mysql';
		}
	}
	
	public function create($db = null)
	{
		$db_class_name = $db ? get_class($db) : '';
		switch($db_class_name){
			case 'db_dblib':
				return new sql_dblib();
			default:
				return new sql_mysql();
		}
	}
}