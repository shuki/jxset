<?php

class general
{
	public static function get_export_limit()
	{
		return defined('config::no_export_limit') ? config::no_export_limit : 1000000000;
	}
	
	public static function get_user_id()
	{
		return 200000;
	}
	
	public static function get_user_name(){
		return 'user_name: ' . $_SERVER['PHP_AUTH_USER'];
	}
}