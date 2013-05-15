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

class jset_columns_base {
	public function get($db, $table){
		$result->source->cols = $this->columns($db, $table, $index);
		$result->target->cols = $table->target && ($table->target != $table->source) ? $this->columns_base($db, $table->target, $notused) : $result->source->cols;
		$result->index = $index;
		$result->primary = $this->primary($result->target->cols);
		$this->update_dependent_fields($result->source->cols, $result->index);
		return $result;
	}

	// create jset_column records for the passed jset_table id
	public function create_columns($db, $id, $source){
		$sql_class = sql::create($db);
		if(jset_table::is_sql($source)){
			$res = $db->query(str_replace('#table#', $source, $sql_class->GET_ONE_RECORD));
			if($row = $db->fetch())
				foreach($row as $key => $value)
					$db->execute($sql_class->INSERT_JSET_COLUMN, array($id, $key));
		}else
			$db->execute(str_replace(array('#LD#', '#RD#'), array($sql_class->LD, $sql_class->RD), $sql_class->INSERT_JSET_COLUMNS), array($id, $source));
	}
	
//-----------------    internal functions ------------------------
	protected function columns($db, $table, &$index){
		$sql_class = sql::create($db);
		return $table->sql ? $this->columns_sql($db, $table, $index) :
		(db_utils::table_exists($db, $sql_class->TABLE_COLUMN) ?
			$this->columns_all($db, $table, $index) :
			$this->columns_base($db, $table->name, $index));
	}

	protected function columns_base($db, $name, &$index) {
		$sql_class = sql::create($db);
  		$db->query(str_replace(array('#table#', '#LD#', '#RD#'), array($name, $sql_class->LD, $sql_class->RD), $sql_class->GET_COLUMNS_BASE));
		return $this->process($db, $index);
	}

	protected function columns_all($db, $table, &$index){ 
		$sql_class = sql::create($db);
  		$db->query(str_replace(array('#LD#', '#RD#'), array($sql_class->LD, $sql_class->RD),$sql_class->GET_COLUMNS_ALL), array($table->name, $table->source));
		$cols = $this->process($db, $index);
		return $this->lists($db, $cols);
	}
	
	protected function columns_sql($db, $table, &$index){  
		$cols = $this->columns_meta($db, $table->source, $index);
		$cols = $this->columns_extension($db, $table->name, $index, $cols);
		return $this->lists($db, $cols);
	}
	
	protected function columns_meta($db, $sql, &$index){
		$sql_class = sql::create($db);
  		$res = $db->query(str_replace('#table#', $sql, $sql_class->GET_ONE_RECORD));
		
		if($row = $db->fetch()){
			$i = 0;
			foreach($row as $field){
				try
				{
					$meta = $res->getColumnMeta($i);
				}
				catch (PDOException $e) {
					return $this->columns_bare($row, $index);
				}
				
				$meta = $res->getColumnMeta($i);
				$attr = new stdClass;
				$attr->Field = $meta['name'];
				$attr->type = $this->translate_sql_type($meta['native_type']);
				$attr->control = $attr->type;
				switch($attr->type){
					case 'int':
						$attr->size = $meta['len'];
						break;
					case 'varchar':
						$attr->size = (int)($meta['len'] / 3);
						break;
					case 'decimal':
						$attr->size =  $meta['len'];;
						$attr->precision = $meta['precision'];
						break;
					case 'date':
					case 'datetime':
						$attr->size =  $meta['len'];;
						break;
					default:
				}
				$cols[] = $attr;
				$index[$attr->Field] = $i++;
			}

			return $cols;
		}else
			return false;
	}

	protected function columns_bare($row, &$index)
	{
		$i = 0;
		foreach($row as $field => $value)
		{
			$attr = new stdClass;
			$attr->Field = $field;
			$attr->type = 'varchar';
			$attr->control = 'varchar';
			$cols[] = $attr;
			$index[$attr->Field] = $i++;
		}

		return $cols;
	}

	protected function columns_extension($db, $name, $index, $cols){
		$sql_class = sql::create($db);
		if(!db_utils::table_exists($db, $sql_class->TABLE_COLUMN))
			return $cols;
		
		$db->query(str_replace(array('#LD#', '#RD#'), array($sql_class->LD, $sql_class->RD),$sql_class->GET_COLUMNS_EXTENSION), array($name));
		while($row = $db->fetch()){
			if(isset($index[$row->Field])){
				foreach($row as $key => $value)
						$cols[$index[$row->Field]]->$key = $this->get_executed_value($db, $value);
		
			if(!$cols[$index[$row->Field]]->control)
				$cols[$index[$row->Field]]->control = $cols[$index[$row->Field]]->type;
			}
		}

		return $cols;
	}
	
	protected function process($db, &$index){
		$i = 0;
		while($row = $db->fetch()){
			$attributes = $this->extract_attributes($row->Type);
			if(!$row->control) $row->control = $attributes->type;
			$privileges = $this->extract_privileges($row->Privileges);
			unset($row->Type, $row->Privileges);
			$a_row = $this->set_computed_values($db, $row);
			$cols[] = (object) array_merge((array) $a_row, (array) $attributes, (array) $privileges);
			$index[$row->Field] = $i++;
		}

		return $cols;
	}

	// extract datatype, size, precision, unsigned, zerofill
	protected function extract_attributes($Type){
		// $row->Type format: 'decimal(10,2) unsigned zerofill'
		$type = explode('(', $Type);
		// type
		$result->type = $type[0]; // ex: decimal
		switch($result->type){
			case 'enum':
				foreach(explode(',', str_replace('\'', '', substr($type[1], 0, -1))) as $item)
					$result->values->$item = $item;
				break;

			default:
				if(sizeof($type) == 2){
					$size = explode(')', $type[1]);
					$precision = explode(',', $size[0]);
					// size
					$result->size = $precision[0]; // ex: 10
					if(sizeof($precision) == 2)
						// precision
						$result->precision = $precision[1];// ex: 2

					if(sizeof($size) == 2){
						// extras
						$extras = explode(' ', trim($size[1]));
						foreach($extras as $extra)
							if($extra) $result->$extra = true;
					}
				}else{
						// type and extras where (size,percision) is not defined  - i.e. float
						$extras = explode(' ', $result->type);
						$result->type = $extras[0];
						unset($extras[0]);
						foreach($extras as $extra)
							if($extra) $result->$extra = true;
				}
		}
		return $result;
	}

	// extract select, insert, update, references
	protected function extract_privileges($Privileges){
		if(!$Privileges)
			return new stdClass;
		// $row->Privileges format: 'select,insert,update,references'
		$privileges = explode(',', $Privileges);
		foreach($privileges as $privilege)
			$result->$privilege = true;

		return $result;
	}

	protected function set_computed_values($db, $row){
		foreach($row as $key => $value)
		    $row->$key = $this->get_executed_value($db, $value);
			//if($value && substr($value, 0, 4) == 'fx: ') 
				//$row->$key = $this->get_value($db, substr($value, 4));
		
		return $row;
	}

    protected function get_executed_value($db, $value){
        return ($value && substr($value, 0, 4) == 'fx: ')?
    			$this->get_value($db, substr($value, 4)) :
    			$value;
    }
	// get lists
	protected function lists($db, &$cols){
		foreach($cols as $row)
			if($row->list)
			{
				$lists = jset_list::values($db, $row->list);
				$row->values = $lists->values;
				if($lists->master_fields)
					$row->master_fields = $lists->master_fields;
				if($lists->sqls)
				{
					$row->sqls = $lists->sqls;
					$row->list = $row->sqls[0];
				}
			}

		return $cols;
	}

	public function get_value($db, $func){
		if(!$func) return null;

		$call = gen_utils::call_extract($func);
		return call_user_func_array(array($call->class, $call->method), array($db));
	}

	// get the primary field name
	protected function primary($cols){
		foreach($cols as $row)
			if($row->Key == 'PRI'){
				$result = $row->Field;
				break;
			}

		return $result ? $result : $cols[0]->Field;
	}
	
	protected function update_dependent_fields(&$cols, $index){
		foreach($cols as $row)
			if($row->master_fields)
				foreach($row->master_fields as $field_name)
					$cols[$index[$field_name]]->dependent_fields[] = $row->Field;
	}
	
	protected function translate_sql_type($value) {
    $trans = array(
        'VAR_STRING' => 'varchar',
        'STRING' => 'varchar',
        'BLOB' => 'text',
        'LONGLONG' => 'int',
        'LONG' => 'int',
        'SHORT' => 'int',
        'DATETIME' => 'datetime',
        'DATE' => 'date',
        'DOUBLE' => 'double',
        'TIMESTAMP' => 'timestamp',
		'FLOAT' => 'float',
		'NEWDECIMAL' => 'decimal'
    );
    return $trans[$value] ? $trans[$value] : 'int';
}
}