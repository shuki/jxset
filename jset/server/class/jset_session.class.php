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

class jset_session {
	public function create(){
		//$sql_class = sql::create($db);
		//php >= 5.4.0 
		//session_status() == PHP_SESSION_ACTIVE
		if(session_id() == ''){
			if(config::session)
				session_name(config::session);
			session_start();
		}
		if($php_auth_user = gen_utils::get_http_user())
			$_SESSION['php_auth_user'] = $php_auth_user;
	}
}

