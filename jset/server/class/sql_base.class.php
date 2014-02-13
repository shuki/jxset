<?php
/*
 * jset  1.0 - jset
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */

class sql_base
{
	public $PRIMARY_FIELD_NOT_UPDATABLE = false;
	public $LD = "`"; // database object left delimiter
	public $RD = "`"; // database object right delimiter
	public $GET_GRID_ROWS = "SELECT #field_list# FROM #LD##source##RD# WHERE #where# ORDER BY #order# #direction# LIMIT #start#, #limit#";
	public $GET_GRID_AGGREGATE = "SELECT #field_list# FROM #LD##source##RD# WHERE #where#";
	public $GET_GRID_ROWS_SQL_SOURCE = "SELECT #field_list# FROM (#source#) a WHERE #where# ORDER BY #order# #direction# LIMIT #start#, #limit#";
	public $GET_GRID_AGGREGATE_SQL_SOURCE = "SELECT #field_list# FROM (#source#) a WHERE #where#";
	public $GET_COUNT = "SELECT COUNT(*) AS count FROM #LD##source##RD# WHERE #where#";
	public $GET_COUNT_SQL_SOURCE = "SELECT COUNT(*) AS count FROM (#source#) a WHERE #where#";
	public $EXPORT = "SELECT #field_list# FROM #LD##source##RD# WHERE #where# ORDER BY #order# #direction# INTO OUTFILE '#outfile#' CHARACTER SET #charset# FIELDS TERMINATED BY ',' ESCAPED BY '\\\\' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\\r\\n'";
	public $EXPORT_SQL_SOURCE = "SELECT #field_list# FROM (#source#) a WHERE #where# ORDER BY #order# #direction# INTO OUTFILE '#outfile#' CHARACTER SET #charset# FIELDS TERMINATED BY ',' ESCAPED BY '\\\\' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\\r\\n'";
	public $EXPORT_GRID_ROWS = "SELECT #field_list# FROM #LD##source##RD# WHERE #where# ORDER BY #order# #direction# LIMIT #limit#";
	public $EXPORT_GRID_ROWS_SQL_SOURCE = "SELECT #field_list# FROM (#source#) a WHERE #where# ORDER BY #order# #direction# LIMIT #limit#";
	
	public $TABLE_TABLE = "jset_table";
	public $LOG_TABLE_PREFIX = 'jset_log_';
	public $LOG_TABLE_SUFFIX = '_';
	public $LOG_INSERT = "INSERT INTO #target# SELECT ?, #source#.* FROM #source# where #source#.#id# = ?";
	
	public $GET_UUID = "SELECT UUID_SHORT() as uuid";
	public $ATOM_INSERT = "INSERT INTO jset_atom (id, stamp, user, kind, web_user, ip) VALUES (?, NOW(), USER(), ?, ?, ?);";
	//public $ATOM_INSERT = "SELECT f_insert_jset_atom(0, ?, ?) as id";

	public $ERROR_INSERT = "INSERT INTO #table# VALUES(?, ?, ?, ?)";
	public $ERROR_TABLE = "jset_error";

	public $SQL_INSERT = "INSERT INTO #table# VALUES(?, ?, ?, ?)";
	public $SQL_TABLE = "jset_sql";

	public $GET = "SELECT * FROM #table#";	
	public $GET_TABLE = "SELECT * FROM jset_table WHERE name = ? AND (section is null OR section = ?) ORDER BY section DESC LIMIT 1";
	
	public $TABLE_EVENT = "jset_event";
	public $GET_EVENTS = "SELECT * FROM jset_event WHERE parent = ? LIMIT 1";
	
	public $GET_ONE_RECORD = "select * from (#table#) a limit 1";
	public $GET_COLUMNS_BASE = "SHOW FULL COLUMNS FROM #LD##table##RD#";
	public $TABLE_COLUMN = 'jset_column';
	public $GET_COLUMNS_ALL = "SELECT
		i.#LD#COLUMN_NAME#RD# as #LD#Field#RD#,
		i.#LD#COLUMN_TYPE#RD# as #LD#Type#RD#,
		i.#LD#COLLATION_NAME#RD# as #LD#Collation#RD#,
		i.#LD#IS_NULLABLE#RD# as #LD#Null#RD#,
		i.#LD#COLUMN_KEY#RD# as #LD#Key#RD#,
		i.#LD#COLUMN_DEFAULT#RD# as #LD#Default#RD#,
		i.#LD#EXTRA#RD# as #LD#Extra#RD#,
		i.#LD#PRIVILEGES#RD#as #LD#Privileges#RD#,
		i.#LD#COLUMN_COMMENT#RD# as #LD#Comment#RD#,
		j.#LD#index#RD# as #LD#index#RD#,
		j.#LD#title#RD# as #LD#title#RD#,
		j.#LD#control#RD# as #LD#control#RD#,
		j.#LD#hidden#RD# as #LD#hidden#RD#,
		j.#LD#edithidden#RD# as #LD#edithidden#RD#,
		j.#LD#noedit#RD# as #LD#noedit#RD#,
		j.#LD#unsortable#RD# as #LD#unsortable#RD#,
		j.#LD#export#RD# as #LD#export#RD#,
		j.#LD#list#RD# as #LD#list#RD#,
		j.#LD#rowpos#RD# as #LD#rowpos#RD#,
		j.#LD#rowlabel#RD# as #LD#rowlabel#RD#,
		j.#LD#position#RD# as #LD#position#RD#,
		j.#LD#readonly#RD# as #LD#readonly#RD#,
		j.#LD#default_value#RD# as #LD#default_value#RD#,
		j.#LD#search_default#RD# as #LD#search_default#RD#,
		j.#LD#override#RD# as #LD#override#RD#,
		j.#LD#width#RD# as #LD#width#RD#,
		j.#LD#usize#RD# as #LD#usize#RD#,
		j.#LD#height#RD# as #LD#height#RD#,
		j.#LD#src#RD# as #LD#src#RD#,
		j.#LD#help#RD# as #LD#help#RD#,
		j.#LD#validation#RD# as #LD#validation#RD#,
		j.#LD#aggregate#RD# as #LD#aggregate#RD#,
		j.#LD#object#RD# as #LD#object#RD#
		FROM information_schema.COLUMNS i
		LEFT JOIN jset_column j
		ON i.COLUMN_NAME = j.name AND j.parent = (SELECT id FROM jset_table WHERE name = ? AND (section is null OR section = ?) ORDER BY section DESC LIMIT 1)
		WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?
		ORDER BY if(j.position is null, i.ORDINAL_POSITION, j.position)";
	
	public $GET_COLUMNS_EXTENSION = "SELECT
		#LD#name#RD# as #LD#Field#RD#,
		#LD#index#RD# as #LD#index#RD#,
		#LD#title#RD# as #LD#title#RD#,
		#LD#control#RD# as #LD#control#RD#,
		#LD#hidden#RD# as #LD#hidden#RD#,
		#LD#edithidden#RD# as #LD#edithidden#RD#,
		#LD#noedit#RD# as #LD#noedit#RD#,
		#LD#unsortable#RD# as #LD#unsortable#RD#,
		#LD#export#RD# as #LD#export#RD#,
		#LD#list#RD# as #LD#list#RD#,
		#LD#rowpos#RD# as #LD#rowpos#RD#,
		#LD#rowlabel#RD# as #LD#rowlabel#RD#,
		#LD#position#RD# as #LD#position#RD#,
		#LD#readonly#RD# as #LD#readonly#RD#,
		#LD#default_value#RD# as #LD#default_value#RD#,
		#LD#search_default#RD# as #LD#search_default#RD#,
		#LD#override#RD# as #LD#override#RD#,
		#LD#width#RD# as #LD#width#RD#,
		#LD#usize#RD# as #LD#usize#RD#,
		#LD#height#RD# as #LD#height#RD#,
		#LD#src#RD# as #LD#src#RD#,
		#LD#help#RD# as #LD#help#RD#,
		#LD#validation#RD# as #LD#validation#RD#,
		#LD#object#RD# as #LD#object#RD#
		FROM jset_column
		WHERE parent = (SELECT id FROM jset_table WHERE name = ? AND (section is null OR section = ?) ORDER BY section DESC LIMIT 1)
		ORDER BY #LD#position#RD#";
		
	public $LAST_INSERT_ID = "SELECT LAST_INSERT_ID() as id";
	
	public $INSERT_UPLOAD = "INSERT INTO jset_upload VALUES(null, null, ?)";
	
	//-- general section ---//
	public $TABLE_EXISTS = "SELECT COUNT(*) as result
		FROM information_schema.TABLES 
		WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?";
	
	public $CURRENT_DATE = "SELECT current_date( ) AS result";
	public $CURRENT_DATETIME = "SELECT now( ) AS result";
	
	public $GET_HOST_CREDENTIALS = "select * from #table# where name = ?";
	
	public $INSERT_JSET_COLUMN = "insert ignore into jset_column (parent, name) values (?, ?)";
	public $INSERT_JSET_COLUMNS = "insert ignore into jset_column (parent, name)
		SELECT ?,	#LD#COLUMN_NAME#RD#
		FROM information_schema.COLUMNS
		WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?";
	
	public $INSERT_JSET_EVENT = "insert ignore into jset_event (parent) values(?)";
}