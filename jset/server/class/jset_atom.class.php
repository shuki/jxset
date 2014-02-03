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
		$db->query($sql_class->GET_UUID);
		$uuid = $db->fetch()->uuid;
		$db->query($sql_class->ATOM_INSERT, array($uuid, 0, self::get_php_auth_user(), self::get_remote_address()));
		return $uuid;
	}
	
	private function get_php_auth_user(){
		return (isset($_SERVER['PHP_AUTH_USER']) ? $_SERVER['PHP_AUTH_USER'] : (isset($_SERVER['REMOTE_USER']) ? $_SERVER['REMOTE_USER'] : (isset($_POST['_PHP_AUTH_USER_']) ? $_POST['_PHP_AUTH_USER_'] : null)));
	}
	
	private function get_remote_address(){
		return (isset($_SERVER['HTTP_X_FORWARTDED_FOR']) ? $_SERVER['HTTP_X_FORWARTDED_FOR'] : (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null));
	}
}

