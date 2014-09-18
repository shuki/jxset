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

$post = jset_dispatch::get_real_POST_GET();
$class = $post['_class_'];
$method = $post['_method_'];
unset($post['_method_']);
unset($post['_class_']);

$params = array(db::create());
foreach($post as $key => $value)
	$params[] = $value;

$result = call_user_func_array(array($class, $method), $params);
echo json_encode($result);