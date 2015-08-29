<?php
include_once("autoload.php");

class jset_memcache {
	private static $memcache = null;

	private static function connect()
	{
		self::$memcache = new Memcache;
		self::$memcache->connect(config::memcache_host, config::memcache_port);
	}

	private static function uid($uid)
	{
		return config::session . $uid;
	}

	public static function load($uid)
	{
		if(defined('config::memcache') && config::memcache === false)
			return false;
		
		if(!self::$memcache)
			self::connect();
		return self::$memcache->get(md5(self::uid($uid)));
	}

	public static function save($uid, $data, $seconds_alive = config::memcache_time)
	{
		if(defined('config::memcache') && config::memcache === false)
			return false;
		
		if(!self::$memcache)
			self::connect();
		return @self::$memcache->set(md5(self::uid($uid)), $data, false, $seconds_alive);
	}
}