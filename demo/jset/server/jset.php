<?php
include('autoload.php');

$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : jset_autoload::get_header('Referer');
if(!$referer)
	exit;

$request = $_REQUEST;

if(isset($request['PHPSESSID']))
  unset($request['PHPSESSID']);

$php_auth_user = isset($_SERVER['PHP_AUTH_USER']) ? $_SERVER['PHP_AUTH_USER'] : (isset($_SERVER['REMOTE_USER']) ? $_SERVER['REMOTE_USER'] : '');
if($php_auth_user)
	$request['_PHP_AUTH_USER_'] = $php_auth_user;

if(!isset($_SESSION))
	session_start();
foreach($_SESSION as $key => $value)
	$request['_session_' . $key . '_'] = $value;
 
request::set($request);

$postdata = http_build_query($request);

$opts = array('http' =>
    array(
        'method'  => 'POST',
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n" .
        			"Referer: " . $referer . "\r\n",
        'content' => $postdata
    )
);

$context  = stream_context_create($opts);
$result = file_get_contents('http://' . $_SERVER['HTTP_HOST'] . '/jxset/jset/server/jset.php', false, $context);

if($request['_methods_'] == 'export'){
	header('Content-disposition: attachment; filename=' . $request['_source_'] . '.csv');
	header('Content-type: text/csv');
}

echo $result;
