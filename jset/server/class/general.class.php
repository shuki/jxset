<?php

class general
{
	public static function get_export_limit()
	{
		return config::no_export_limit;
	}
	
	public static function get_user_id()
	{
		return 200000;
	}
	
	public static function get_user_name(){
		return 'user_name: ' . $_SERVER['PHP_AUTH_USER'];
	}
}