<?php 
class jset_autoload {
	public static function get_header($name)
	{
		$headers = apache_request_headers();
		return isset($headers[$name]) ? $headers[$name] : (isset($headers[strtoupper($name)]) ? $headers[strtoupper($name)] : '');
	}
	
	public static function path($prefix = '../../..', $sufix = 'jset/server/class/')
	{
		$parts = explode(self::get_header('Host'), self::get_header('Referer'), 2);
		if(!isset($parts[1]))
			return '';

		// remove parameters from url
		$clean = explode('?', $parts[1],2);
		$parts[1] = $clean[0];
		$last_part_array = explode('/', $parts[1]);

		if(strstr($last_part_array[count($last_part_array) - 1], '.php') !== false)
		{
			$last_part_array[count($last_part_array) - 1] = '';
			$parts[1] = implode('/', $last_part_array);
		}
		return "$prefix$parts[1]$sufix";		
	}
}

if( !function_exists('apache_request_headers') ) {
	function apache_request_headers() {
	  $arh = array();
	  $rx_http = '/\AHTTP_/';
	  foreach($_SERVER as $key => $val) {
	    if( preg_match($rx_http, $key) ) {
	      $arh_key = preg_replace($rx_http, '', $key);
	      $rx_matches = array();
	      // do some nasty string manipulations to restore the original letter case
	      // this should work in most cases
	      $rx_matches = explode('_', $arh_key);
	      if( count($rx_matches) > 0 and strlen($arh_key) > 2 ) {
	        foreach($rx_matches as $ak_key => $ak_val) $rx_matches[$ak_key] = ucfirst($ak_val);
	        $arh_key = implode('-', $rx_matches);
	      }
	      $arh[$arh_key] = $val;
	    }
	  }
	  return( $arh );
	}
}