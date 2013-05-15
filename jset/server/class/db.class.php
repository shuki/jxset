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

class db
{
	public function create($params = null){
		switch($params->server ? $params->server : config::dbserver){
			case 'dblib':
			case 'sqlsrv':
			case 'mssql':
				return new db_dblib($params);
			default:
				return new db_mysql($params);
		}
	}
}
