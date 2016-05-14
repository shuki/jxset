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
	
	public static function reset_user_password($db, $id)
	{	
		$sql_class = sql::create($db);
		return $db->exec(str_replace('#table#', config::user_table, $sql_class->RESET_USER_PASSWORD), array(config::password_reset, config::encrypt_salt, $id));
	}
	
	public static function get_user_attributes_js($list = null)
	{
		$vars = '';
		if($list)
			foreach($list as $key)
				if(isset($_SESSION['jset_user_' . $key]))
					$vars .= "user_attributes.{$key} = '" . $_SESSION['jset_user_' . $key] . "';\n";
		
		return "var user_attributes = {};
		user_attributes.id = '" . $_SESSION['jset_user_id'] . "';
		user_attributes.login = '" . $_SESSION['jset_user_login'] . "';
		user_attributes.group = '" . $_SESSION['jset_user_group'] . "';
		$vars";
	}
}
