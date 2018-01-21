<?php
include('autoload.php');

$request = jset_dispatch::get_real_POST_GET();
$result = jset_dispatch::get($request);

if($request['_methods_'] == 'export'){
	header('Content-disposition: attachment; filename=' . $request['_source_'] . '.csv');
	header('Content-type: text/csv');
	echo substr($result, 0, -2);
	exit;
}

if($request['_file_output_']){
	header('Content-disposition: attachment; filename=file.txt');
	header('Content-type: text/csv');
}

echo $result;