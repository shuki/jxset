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
	public static function check($db, $user, $password){
		$sql_class = sql::create($db);
		$db->query(str_replace('#table#', config::user_table, $sql_class->CHECK_LOGIN), array($user, $password, config::encrypt_salt));
		$success = $db->fetch()->result;
		$db->insert($sql_class->INSERT_LOGIN, array($_SERVER['REMOTE_ADDR'], $user, $success, $password, config::encrypt_salt));
		return $success;
	}

	public static function signin($user, $password){
		$db = db::create();
		$sql_class = sql::create($db);
		if(self::check($db, $user, $password)){
			$db->query(str_replace('#table#', config::user_table, $sql_class->GET_USER_RECORD), array($user));
			jset_session::create();
			foreach($db->fetch() as $key => $value)
				if($key != 'password')
					$_SESSION['jset_user_' . $key] = $value;
			
			header('Location: '. config::start_page);
		}
		else 
			return false;	
	}

	public static function signout(){
		jset_session::create();
		$_SESSION = array();
		
		if (ini_get("session.use_cookies")) {
		    $params = session_get_cookie_params();
		    setcookie(session_name(), '', time() - 42000,
		        $params["path"], $params["domain"],
		        $params["secure"], $params["httponly"]
		    );
		}
	}

	public static function verify($pre = ''){
		if(!config::login)
			return;
		
		jset_session::create();		
		if(isset($_SESSION['jset_user_id'])){
			if(strstr($_SERVER['REQUEST_URI'], config::login_page))
				header('Location: '. $pre . config::start_page);
			else if(strstr($_SERVER['REQUEST_URI'], config::password_page))
				return;
		}
		else if(!strstr($_SERVER['REQUEST_URI'], config::login_page))
			header('Location: '. $pre . config::login_page);
	}
	
	public static function change_password($current, $new){
		jset_session::create();
		$db = db::create();
		if(self::check($db, $_SESSION['jset_user_login'], $current)){
			$sql_class = sql::create($db);
			$db->query(str_replace('#table#', config::user_table, $sql_class->UPDATE_USER_PASSWORD), array($new, config::encrypt_salt, $_SESSION['jset_user_login']));
			return true;
		}
		else 
			return false;	
	}
}

