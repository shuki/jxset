<?php
include_once("class/jset_autoload.class.php");

ini_set("log_errors" , "1");
ini_set("error_log" , jset_autoload::path('../../..', '') . config::errorLogFile);
ini_set("display_errors" , "1"); // set to 0 in production
ini_set('error_reporting', E_ALL & ~E_NOTICE & ~E_STRICT & ~E_WARNING);

function __autoload($class_name) {
	if (is_file(jset_autoload::path() . $class_name . '.class.php'))
		require_once jset_autoload::path() . $class_name . '.class.php';
	else if (is_file('class/' . $class_name . '.class.php'))
		require_once 'class/' . $class_name . '.class.php';
}