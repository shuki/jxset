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

class jset_list {
	public function values($db, $source, $settings)
	{
		$result = new stdClass;
		if($result->is_sql = self::is_sql($source))
		{
			if(eval("\$source = \"$source\";") === FALSE)
				die("unable to eval source: {$source}");
			
			$result->master_fields = self::get_master_fields($source);
			$sqls = explode('|-|', $source);
					
			$result->values = self::run_sql($db, $sqls[0]);
			$result->sql = $sqls[0];
			if(count($sqls) > 1)
				$result->sqls = $sqls;
		}
		else
		{
			$result->sql = self::get_table_sql($db, $source);
			$result->values = self::run_sql($db, $result->sql);
		}
		return $result;
	}

	public function run_sql($db, $source)
	{
	  	$res = $db->query($source);
		if(isset($res->error))
			return $res;
		
		return self::load_data($db);
	}

	public function get_table_sql($db, $source)
	{
		$sql_class = sql::create($db);
		return str_replace('#table#', $source, $sql_class->GET);
	}

	private function is_sql($source)
	{
		return preg_match('/^select\s|^call\s/i', $source);
	}
	
	private function load_data($db)
	{
		$result = array();
		while($row = $db->fetch()){
			$obj = new stdClass;
			$obj->id = $row->id;
			$obj->name = $row->name;
			if($row->disabled)
				$obj->disabled = $row->disabled;
			$result[] = $obj;
		}
		return $result;
	}

	private function get_master_fields($sql){
		preg_match_all('/{.*?}/', $sql, $matches);
		return str_replace(array('{','}'), '', $matches[0]);
	}
}