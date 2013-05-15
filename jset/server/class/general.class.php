<?php

class general
{
	public static function get_export_limit()
	{
		return $_SESSION['login'] != 'administrator@nisha.co.il' && property_exists('config', 'export_limit') ? config::$export_limit : 'false'; 
	}
	
	public static function get_user_id()
	{
		//die(var_dump($_SESSION['user_id']));
		//return $_SESSION['user_id'];
		return 200000;
	}
}