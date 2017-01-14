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
<title>Jxset Admin Master</title>
<script src="js/defaults.js" type="text/javascript"></script>
<script src="js/admin_master.js" type="text/javascript"></script>
</head>

<body>
	<table style="width:98%">
		<tr>
			<td style="vertical-align:top">
				<table id="hosts"></table>
			</td>
		</tr>
		<tr>	
			<td style="vertical-align:top">
				<table id="tables"></table>
			</td>
		</tr>
		<tr>	
			<td style="vertical-align:top">
				<table id="columns"></table>
			</td>
		</tr>
		<tr>	
			<td style="vertical-align:top">
				<table id="events"></table>
			</td>
		</tr>
	</table>
</body>
</html>