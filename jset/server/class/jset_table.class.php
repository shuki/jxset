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

class jset_table {
	public function get($db, $settings){
		$sql_class = sql::create($db);
	  	if(self::is_sql($settings->_source_)){
			if(defined('config::permission_source_sql') && config::permission_source_sql !== true)
				die('not allowed to use sql as source: ' . $settings->_source_);

			return self::sql($settings->_source_, $settings->_target_);
	  	}
		
	  	if(db_utils::table_exists($db, $sql_class->TABLE_TABLE))
			return self::table($db, $settings);
		else
			return self::defaults($settings->_source_);
	}

	public function is_sql($source){
		return preg_match('/^select\s|^call\s/i', $source);
	}
	
	private function table($db, $settings){
		$sql_class = sql::create($db);
	  	$db->query($sql_class->GET_TABLE, array($settings->_source_, $settings->_section_));
		$result = $db->fetch();
		if($result){
			if(self::is_sql($result->source))
				$result->sql = true;

			if(eval("\$sql = \"$result->source\";") === FALSE)
				die("unable to eval source: {$result->source}");
			
			$result->source = $sql;
			return $result;
		}else
			return self::defaults($settings->_source_);
	}
	
	private function defaults($source){
		if(defined('config::permission_source_table') && config::permission_source_table !== true)
			die('not allowed to use table as source: ' . $source);
			
		$result->name = $source;
		$result->source = $source;
		$result->target = $source;
		return $result;
	}
	
	private function sql($source, $target){
		$result->sql = true;
		$result->source = $source;
		if($target) $result->target = $target;
		return $result;
	}	
}

