<?php
include_once("class/jset_autoload.class.php");
//include_once("class/config.class.php");
ini_set("log_errors" , "1");
ini_set("error_log" , config::rel_path . config::errorLogFile);
ini_set("display_errors" , "1"); // set to 0 in production
ini_set('error_reporting', E_ALL ^ E_NOTICE);

function __autoload($class_name) {
	//if($class_name == 'general')
		//die(jset_autoload::path() . $class_name . '.class.php');
	if (is_file(jset_autoload::path() . $class_name . '.class.php'))
		require_once jset_autoload::path() . $class_name . '.class.php';
	//else if (is_file(config::jxset . 'jset/server/class/' . $class_name . '.class.php'))
		//require_once config::jxset . 'jset/server/class/' . $class_name . '.class.php';
	else if (is_file('class/' . $class_name . '.class.php'))
		require_once 'class/' . $class_name . '.class.php';
	//else if (is_file(config::rel_path . 'app/class/' . $class_name . '.class.php'))
		//require_once config::rel_path . 'app/class/' . $class_name . '.class.php';
}