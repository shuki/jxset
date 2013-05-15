<?php 
/*
 * jxset
 * Copyright (c) 2010 - 2013, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
 include_once("autoload.php");
 jset_page::create(config::jxset);
?>

<head>
<title>QBI</title>
<script src="js/qbi.js" type="text/javascript"></script>
</head>

<body>
	<div style="float:left;"><textarea id="sql" rows="14" cols="120">SQL...</textarea></div>
	<div style="float:left;"><table id="host"></table></div>
	<div style="float:left;"><button id="submit" type="button" style="width:262px">Submit</button></div>
	<br></br>
	<div style="width:150%;float:left;"><table id="grid"></table></div>
	<img src="jset/img/loading.gif" id="loading" style="display:none">
</body>
</html>