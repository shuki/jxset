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
	
	// update table source with joins from column list
	public function update_source_with_joins($db, $id, $name, $section){
		$sql_class = sql::create($db);
		$settings = new stdClass;
		$settings->_source_ = $name;
		$settings->_section_ = $section;
		$table = jset_table::table($db, $settings, false);

		$source = $table->source;
		if(!self::is_sql($source))
			return;
		
		$jset_columns = jset_columns::create($db);
		$columns = $jset_columns->get($db, $table, $settings);
		
		$fields = "\n";
		$joins = "\n";
		foreach($columns->source->cols as $col){
			if($col->join){
				$fields .= ",{$col->join->field_name}\n";
				$joins .= "{$col->join->join}\n";
			}
		}
		
		if($fields == "\n")
			return;
		
		$joins .= "GROUP BY {$sql_class->LD}{$table->target}{$sql_class->RD}.{$sql_class->LD}{$columns->primary}{$sql_class->RD}\n";
		
		if(defined('config::tag_source_fields_start') && defined('config::tag_source_fields_end') && defined('config::tag_source_joins_start') && defined('config::tag_source_joins_end')){
			$source = gen_utils::replace_between($source, config::tag_source_fields_start, config::tag_source_fields_end, $fields);
			$source = gen_utils::replace_between($source, config::tag_source_joins_start, config::tag_source_joins_end, $joins);
			$db->execute($sql_class->UPDATE_TABLE_SOURCE, array($source, $id));
		}
	}
		
	public function table($db, $settings, $eval = true){
		$sql_class = sql::create($db);
	  	$db->query($sql_class->GET_TABLE, array($settings->_source_, $settings->_section_));
		$result = $db->fetch();
		if($result){
			if(self::is_sql($result->source))
				$result->sql = true;
			
			if($eval){
				if(eval("\$sql = \"$result->source\";") === FALSE)
					die("unable to eval source: {$result->source}");
				
				$result->source = $sql;
			}
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

