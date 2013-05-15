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

class db_dblib extends db_base
{		
	protected function dns(){
		//$this->dns = $this->server . ':host=' . $this->host . ($this->port ? ':' . $this->port : '') . ';charset=' . $this->charset . ';dbname=' . $this->db_name;
		$this->dns = $this->server . ':host=' .$this->host . ($this->port ? ':' . $this->port : '') . ';charset=' . $this->charset . ';dbname=' . $this->db_name;
	}
}
