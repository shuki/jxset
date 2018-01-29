<?php 
/*
 * jxset
 * Copyright (c) 2010 - 2017, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
 
 include_once("autoload.php");
 $dir_pre = config::jxset;
 jset_session::create();
 jset_page::create(config::jxset, 'he', '', true, 'redmond', false);

?>
<link rel="stylesheet" type="text/css" media="screen" href="css/index.css" />
<script src="<?php echo $dir_pre ?>jset/i18n/jset.locale-he.js" type="text/javascript"></script>
<script src="<?php echo $dir_pre ?>jset/i18n/grid.locale-he.js" type="text/javascript"></script>
<title>Form</title>
<script src="js/grid_form.js" type="text/javascript"></script>
</head>
<body dir="rtl">
	<img src="<?php echo $dir_pre ?>jset/img/loading.gif"/>
	<div id="tabs-1" style="display:none;">
	<table id="grid_form" border="1"></table>
	</div>
</body>
</html>