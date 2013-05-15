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

class db_base
{
	protected $host = config::dbhost;
	protected $port = config::dbport;
	protected $server = config::dbserver;
	protected $charset = config::dbcharset;
	protected $db_name = config::dbname;
	protected $user = config::dbuser;
	protected $password = config::dbpassword;
	protected $fetchStyle = config::dbfetchStyle;
	protected $errorMode = config::dberrorMode;
	protected $dns;
  	protected $con;
	protected $query;
	protected $driver_options;
	
	function __construct($params = null){
			if($params) foreach($params as $var => $value) $this->$var = $value;
			//$this->dns = $this->server . ':host=' . $this->host . ';dbname=' . $this->db_name;
			$this->dns();
			$this->connect();
	}
	
	protected function dns(){
		$this->dns = $this->server . ':host=' . $this->host . ($this->port ? ';port=' . $this->port : '') . ';charset=' . $this->charset . ';dbname=' . $this->db_name;
	}
		
  	protected function connect() {
		try {
			$this->con = new PDO($this->dns, $this->user, $this->password, $this->driver_options);
    		$this->con->setAttribute(PDO::ATTR_ERRMODE, $this->errorMode);			
		} catch (PDOException $e) {
			return self::error($e, $this);
		}
	}
	
	public function execute($sql, $params = null){
		try {
			$this->query = $this->con->prepare($sql);
			return $this->query->execute($params);
		
		} catch (PDOException $e) {
			return self::error($e, $this, $sql, $params);
		}
	}

	public function exec($sql, $params = null){
		try {
			$this->query = $this->con->prepare($sql);
			$this->query->execute($params);
			return $this->query->rowCount();
		
		} catch (PDOException $e) {
			return self::error($e, $this, $sql, $params);
		}
	}

	public function query($sql, $params = null){
		try {
			//$jset_atom = new jset_atom($this);
			//$jset_atom->add();
			$this->query = $this->con->prepare($sql);
			$this->query->execute($params);
			return $this->query;
		
		} catch (PDOException $e) {
			return self::error($e, $this, $sql, $params);
		}
	}

	public function insert($sql, $params = null){
		try {
			$this->query = $this->con->prepare($sql);
			if($this->query->execute($params))
				return self::last_inserted_id();
			else
				return false;
		
		} catch (PDOException $e) {
			return self::error($e, $this, $sql, $params);
		}
	}

	public function fetch(){
		try {
			return $this->query->fetch($this->fetchStyle);

		} catch (PDOException $e) {
			return self::error($e, $this);
		}
	}

	public function fetchAll(){
		try {
			return $this->query->fetchAll($this->fetchStyle);

		} catch (PDOException $e) {
			return self::error($e, $this);
		}
	}
	
	public function db_name(){
		return $this->db_name;
	}
	
	public function user(){
		return $this->user;
	}
	
	public function password(){
		return $this->password;
	}
	
	public function last_inserted_id(){
		$sql_class = sql::create($this);
  	self::query($sql_class->LAST_INSERT_ID);
  	return self::fetch()->id;
	}
	
	public function disconnect(){
		$this->con = NULL;
	}
	
	public function reconnect(){
		$this->disconnect();
		$this->connect();
	}
	
	protected function error($e, $obj, $sql = null, $params = null){
		$result->error->message = $e->getMessage();
		$result->error->info = $obj->query->errorInfo();
		ob_start();
		$obj->query->debugDumpParams();
		$result->error->dump = ob_get_contents();
		ob_end_clean();
		$params = print_r($params, true);
		$params = preg_replace('/^Array\n\(\n    /', '', $params);
		$params = preg_replace('/\n\)\n$/', '', $params);
		jset_error::add($this, $result->error->message, $sql, $params);
		return $result;
	}
}
