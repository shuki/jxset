<?php
define('JSET_SERVER_CLASS_PATH', 'jset/server/class/');

include_once(JSET_SERVER_CLASS_PATH . "config.class.php");
ini_set("log_errors" , "1");
ini_set("error_log" , config::errorLogFile);
ini_set("display_errors" , "1"); // set to 0 in production
ini_set('error_reporting', E_ALL & ~E_NOTICE & ~E_STRICT & ~E_WARNING & ~E_DEPRECATED);

function __autoload($class_name) {
	//if($class_name = 'jset')
		//echo config::jxset . JSET_SERVER_CLASS_PATH . $class_name . '.class.php'. '::' . getcwd() . '<br />';
	if (is_file(JSET_SERVER_CLASS_PATH . $class_name . '.class.php'))
		require_once JSET_SERVER_CLASS_PATH . $class_name . '.class.php';
	else if (is_file(config::jxset . JSET_SERVER_CLASS_PATH . $class_name . '.class.php'))
		require_once config::jxset . JSET_SERVER_CLASS_PATH . $class_name . '.class.php';
}