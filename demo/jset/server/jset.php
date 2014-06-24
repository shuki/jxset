<?php
include('autoload.php');

$request = jset_dispatch::get_real_POST_GET();

jset_session::create();
if(count($_SESSION))
	foreach($_SESSION as $key => $value)
		$request['_session_' . $key . '_'] = $value;

$result = jset_dispatch::get($request);

if($request['_methods_'] == 'export'){
	header('Content-disposition: attachment; filename=' . $request['_source_'] . '.csv');
	header('Content-type: text/csv');
}

echo $result;