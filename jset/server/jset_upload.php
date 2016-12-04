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
if(class_exists('external'))
	external::create();

echo json_encode(process($_FILES, $_POST));

function process($files, $post){
	$request = new stdClass;
	if($post) foreach($post as $var => $value) $request->$var = $value;
	
	if($files['userfile']['size'] > $request->max){
		$result->error->message = 'file is too big';
		$result->error = $result->error->message;
		$result->success = false;
		return $result;
	}
	
	$pathinfo = pathinfo($files['userfile']['name']);
	$extension = $pathinfo['extension'] ? '.' . strtolower($pathinfo['extension']) : '';
	
	$db = db::create();
	$sql_class = sql::create($db);
	$id = $db->insert($sql_class->INSERT_UPLOAD, array($pathinfo['basename']));
  	$db->query($sql_class->SELECT_UPLOAD, array($id));
  	$upload_name = $db->fetch()->upload_name;
	$file_name = $upload_name . $extension;
	$result->fileName = $file_name;
	$upload_dir = config::rel_path . config::upload_directory;
	$upload_path = $upload_dir .  $file_name;
	if (!is_dir($upload_dir))
		if(!mkdir($upload_dir))
		{
			$result->error->message = "unable to create upload directory: $upload_dir";
			$result->error = $result->error->message;
			$result->success = false;
			return $result;
		}

	if(!move_uploaded_file($files['userfile']['tmp_name'], $upload_path))
	{
		$result->error->message = "unable to move uploaded file to upload path: $upload_path";
		$result->error = $result->error->message;
		$result->success = false;
		return $result;
	}
	else
	{
		$result->dir = config::upload_directory;
		$result->success = true;
	}
	
	if(!$request->dir)
		return $result;
	
	$request_dir = urldecode($request->dir);
	$target_dir = config::rel_path . jset_autoload::path('..', $request_dir);
	if (!is_dir($target_dir))
		if(!mkdir($target_dir))
		{
			$result->error->message = "unable to create target directory: $target_dir";
			$result->error = $result->error->message;
			$result->success = false;
			return $result;
		}

	$target_path = $target_dir . $file_name;

	if(!copy($upload_path, $target_path))
	{
		$result->error->message = "unable to copy uploaded file to target path: $target_path";
		$result->error = $result->error->message;
		$result->success = false;
		return $result;
	}
	
	$result->dir = $request_dir;
  	return $result;
}
