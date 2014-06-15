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

class jset_lang {
	public function get($name, $lang){
		$db = db::create();
		$sql_class = sql::create($db);
		$db->query($sql_class->GET_JSET_LANG_RECORDS, array($name, $lang));
		foreach($db->fetchAll() as $row)
			$arr[$row->name] = $row->value;
		
		return $arr;
	}
}

