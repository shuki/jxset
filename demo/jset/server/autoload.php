<?php
define('JSET_SERVER_CLASS_PATH', 'jset/server/class/');
define('RELATIVE_PATH_TO_ROOT', '../../');

include_once(RELATIVE_PATH_TO_ROOT . JSET_SERVER_CLASS_PATH . "config.class.php");
ini_set("log_errors" , "1");
ini_set("error_log" , RELATIVE_PATH_TO_ROOT . config::errorLogFile);
ini_set("display_errors" , "1"); // set to 0 in production
ini_set('error_reporting', E_ALL & ~E_NOTICE & ~E_STRICT & ~E_WARNING);

function __autoload($class_name) {
	if (is_file(RELATIVE_PATH_TO_ROOT . JSET_SERVER_CLASS_PATH . $class_name . '.class.php'))
		require_once RELATIVE_PATH_TO_ROOT . JSET_SERVER_CLASS_PATH . $class_name . '.class.php';
	else if (is_file(RELATIVE_PATH_TO_ROOT . config::jxset . JSET_SERVER_CLASS_PATH . $class_name . '.class.php'))
		require_once RELATIVE_PATH_TO_ROOT . config::jxset . JSET_SERVER_CLASS_PATH . $class_name . '.class.php';
}