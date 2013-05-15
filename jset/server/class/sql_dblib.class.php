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

class sql_dblib extends sql_base
{
	public $PRIMARY_FIELD_NOT_UPDATABLE = true;
	public $LD = "["; // database object left delimiter
	public $RD = "]"; // database object right delimiter
	public $GET_GRID_ROWS = "SELECT #field_list# FROM (SELECT #field_list#, ROW_NUMBER() OVER (ORDER BY #order# #direction#) AS RowNum FROM #LD##source##RD# ) AS MyDerivedTable  WHERE #where# AND MyDerivedTable.RowNum BETWEEN #start1# AND #end#";
	public $GET_GRID_ROWS_SQL_SOURCE = "SELECT #field_list# FROM (SELECT #field_list#, ROW_NUMBER() OVER (ORDER BY #order# #direction#) AS RowNum FROM (#source#) a) AS MyDerivedTable  WHERE #where# AND MyDerivedTable.RowNum BETWEEN #start1# AND #end#";
	
	public $GET_ONE_RECORD = "select top 1 * from (#table#) a";
	public $TABLE_EXISTS = "SELECT COUNT(*) as result
		FROM information_schema.TABLES 
		WHERE TABLE_CATALOG = DB_NAME() AND TABLE_NAME = ?";
		
	public $GET_COLUMNS_BASE = "SELECT name as Field, 'varchar' as Type, null as Privileges FROM sys.columns sc WHERE sc.object_id = OBJECT_ID('#table#')";
}
