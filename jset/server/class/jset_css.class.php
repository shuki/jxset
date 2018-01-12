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

class jset_css
{
	public function get($id = 1, $tags = false){
		$db = db::create();
		$sql_class = sql::create($db);
		if(db_utils::table_exists($db, $sql_class->TABLE_CSS)){
			$db->query("select * from {$sql_class->TABLE_CSS} where id = ?", array($id));
			return ($tags ? '<style>' : '') . $db->fetch()->contents . ($tags ? '</style>' : '');
		}
		else
			return '';
	}
}

