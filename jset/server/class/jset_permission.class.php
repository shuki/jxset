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

class jset_permission
{
	const GET_USER_ID = "SELECT id FROM worker WHERE login = ? LIMIT 1";
	
	public static function get_user_id($db, $settings)
	{
		//$sql_class = sql::create($db);
		if(!isset($settings->_session_php_auth_user_))
			return '';
		
		$db->query(self::GET_USER_ID, array($settings->_session_php_auth_user_));
		return $db->fetch()->id;
	}
}
