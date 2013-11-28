<?php

class general
{
	public static function get_export_limit()
	{
		return $_SESSION['roles'] !== '' && ($_SESSION['roles'] <= 20 || $_SESSION['user_id'] == 247899) ? config::no_export_limit : config::export_limit;
	}
	
	public static function get_user_id()
	{
		return 200000;
	}
}