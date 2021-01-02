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

class jset_atom {	
	public function add($db){
		$sql_class = sql::create($db);
		$uuid = self::get_uuid($db);
		$db->query($sql_class->ATOM_INSERT, array($uuid, 0, gen_utils::get_http_user($db), gen_utils::get_remote_address($db)));
		return $uuid;
	}
	
	public function get_uuid($db){
		$sql_class = sql::create($db);
		$db->query($sql_class->GET_UUID);
		return $db->fetch()->uuid;
	}
}

