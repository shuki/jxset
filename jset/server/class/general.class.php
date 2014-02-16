<?php

class general
{
	public static function get_export_limit($db, $settings)
	{
		return defined('config::no_export_limit') ? config::no_export_limit : 1000000000;
	}
	
	public static function get_user_id($db, $settings)
	{
		return 200000;
	}
	
	public static function get_user_name($db, $settings){
		return 'user_name: ' . $_SERVER['PHP_AUTH_USER'];
	}
}