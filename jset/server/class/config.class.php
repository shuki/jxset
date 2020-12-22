<?php
/*
 * jset  1.0 - jset
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */

class config
{
	const version = '1.0.0';
	const jxset = '';
	const rel_path = '../../';
	const dbhost = 'localhost';
	const dbport = '3306';
	const dbserver = 'mysql';
	const dbcharset = 'utf8';
	const dbname = 'jxset';
	const dbuser   = 'root';
	const dbpassword = ''; 
	const dbfetchStyle = PDO::FETCH_OBJ;
	const dberrorMode = PDO::ERRMODE_EXCEPTION;
	const dbtime_zone = 'SYSTEM'; // '+02:00'
	const limit = 100;
		
	const permission_source_sql = true;
	const permission_source_table = true;
	
	const upload_directory = '../../uploads/';
	const upload_size_limit = 10000000; //10M

	const mysql_rel_path = '';
	const hosts_table = 'jset_host';
	
	const login = false;
	const session = 'jxset';
	const login_page = 'login.php';
	const start_page = 'index.php';
	const password_page = 'password.php';
	const user_table = 'jset_user';
	const encrypt_salt = 'abba';
	const password_reset = '1234';
	
	const mysqldump_prefix = '';
	const errorLogFile = 'log/error_log_file.txt';
	
	const export_all = false;
	const export_limit = 150;
	const no_export_limit = 1000000;
	const export_charset_windows = 'Windows-1255';
	
	const join_list_suffix = '_jxlist';
	const join_field_suffix = '_name';
	const tag_source_fields_start = '-- jset_fields_start';
	const tag_source_fields_end = '-- jset_fields_end';
	const tag_source_joins_start = '-- jset_joins_start';
	const tag_source_joins_end = '-- jset_joins_end';
	
	// for report
	const dbname_default = 'jxset';
	//const tpl = 'page.tpl';
	
	const memcache = false;
	const memcache_host = '127.0.0.1';
	const memcache_port = 11211;
	const memcache_time = 80;
	
	const log_directory = '../../log/';
}


