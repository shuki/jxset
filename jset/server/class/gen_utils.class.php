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

class gen_utils
{
	// receive $func = 'app_image::copy(id,image)
	// return $result = {class = 'app_image',
	// 										method = 'copy',
	//										params = [2, 'image_name']}
	public function call_extract($func, $pairs = null, $settings = null){
		if(!$func) return false;
		
		$func = str_replace(')', '', $func);
		$parts = explode('::', $func);
		$class = $parts[0];
		$call = explode('(', $parts[1]);
		$method = $call[0];
		$vars = explode(',', $call[1]);
		
		foreach($vars as $var)
			$params[] = $pairs->values[$pairs->index[$var]] ? $pairs->values[$pairs->index[$var]] : $settings->$var;
		
		$result->class = $class;
		$result->method = $method;
		$result->params = $params;
		
		return $result;
	}
	
	public function get_http_user($db){
		return (isset($_SERVER['PHP_AUTH_USER']) ? $_SERVER['PHP_AUTH_USER'] : (isset($_SERVER['REMOTE_USER']) ? $_SERVER['REMOTE_USER'] : (isset($_POST['_PHP_AUTH_USER_']) ? $_POST['_PHP_AUTH_USER_'] : null)));
	}
	
	public function get_remote_address($db){
		return (isset($_SERVER['HTTP_X_FORWARTDED_FOR']) ? $_SERVER['HTTP_X_FORWARTDED_FOR'] : (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null));
	}
	
	public function header($name)
	{
		$headers = apache_request_headers();
		return $headers->$name;
	}

}

