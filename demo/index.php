<?php 
/*
 * jxset
 * Copyright (c) 2010 - 2013, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
 include_once("autoload.php");
 $dir_pre = config::jxset;
 jset_page::create(config::jxset, 'en', '', false, 'redmond');
?>
<style>
<?php
	//echo jset_css::get();
?>
</style>
 
<title>Jxset</title>
<script>
	$.jset.fn.store_grid('demo', <?php echo jset_dispatch::get_grid_definition('demo', 'jxset/demo');?>);
</script>
<script src="js/index.js" type="text/javascript"></script>
</head>

<body>
	<div class="top-strap"> <a href="login.php?signout"><img src="<?php echo $dir_pre ?>jset/img/power-black.png" title="logout"></a> <a href="<?php echo config::password_page; ?>"><?php echo $_SESSION['jset_user_login']; ?></a> Hi</div>
	<table id="grid"></table>
</body>
</html>