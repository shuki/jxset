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

class jset_login {	
	public function check($db, $user, $password){
		$sql_class = sql::create($db);
		$db->query(str_replace('#table#', config::user_table, $sql_class->CHECK_LOGIN), array($user, $password, config::encrypt_salt));
		$success = $db->fetch()->result;
		$db->insert($sql_class->INSERT_LOGIN, array($_SERVER['REMOTE_ADDR'], $user, $success, $password, config::encrypt_salt));
		return $success;
	}

	public function verify(){
		if(!config::login)
			return;
		
		if(session_id() == '')
			session_start();
		if(!isset($_SESSION['jset_user_id']))
			header('Location: '. config::login_page);
	}

}

