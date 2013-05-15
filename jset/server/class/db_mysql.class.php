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

class db_mysql extends db_base
{		
  	protected function connect() {
		$this->driver_options = array();
		if($this->charset) // on php version >= 5.3.6 this part can be ommitted
			$this->driver_options[PDO::MYSQL_ATTR_INIT_COMMAND] = 'SET NAMES ' . $this->charset;
		
		parent::connect();
	}
}
