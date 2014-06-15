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
	public static function get_user_id($db, $settings)
	{
		if(!$login = isset($settings->_session_jset_user_login_) ? $settings->_session_jset_user_login_ : (isset($settings->_session_php_auth_user_) ? $settings->_session_php_auth_user_ : ''))
			return '';
		
		$sql_class = sql::create($db);
		$db->query(str_replace('#table#', config::user_table, $sql_class->GET_USER_RECORD), array($login));
		return $db->fetch()->id;
	}
}
