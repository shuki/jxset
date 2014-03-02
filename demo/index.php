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

<title>Jxset</title>
<script>
	$.jset.fn.store_grid('demo', <?php echo jset_dispatch::get_grid_definition('demo', 'jxset/demo');?>);
</script>
<script src="js/index.js" type="text/javascript"></script>
</head>

<body>
	<table id="grid"></table>
</body>
</html>