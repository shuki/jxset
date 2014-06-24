<?php 
/*
 * jxset
 * Copyright (c) 2010 - 2013, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
 
$name = 'password';
$language = 'en';
$rtl = false;

include_once("autoload.php");
jset_login::verify();

if(isset($_POST['new_password']))
	$success = jset_login::change_password($_POST['current_password'], $_POST['new_password']);

$dir_pre = config::jxset;
jset_session::create();
$lang = jset_lang::get($name, $language);
jset_page::min(config::jxset, $language, '', $rtl);
?>
<link rel="stylesheet" type="text/css" media="screen" href="css/password.css" />
<script src="<?php echo $dir_pre ?>jset/i18n/jset.locale-he.js" type="text/javascript"></script>
<title><?php echo $lang['title'] ?></title>
<script src="js/password.js" type="text/javascript"></script>
</head>
<body>
	<div id="headstrip"><a href="login.php?signout"><img src="<?php echo $dir_pre ?>jset/img/out.png" title="<?php echo $lang['logout'] ?>"></a> <?php echo $_SESSION['jset_user_login']; ?> <?php echo $lang['hi'] ?> <span class="headstrip" ><a href="<?php echo (!$_SERVER['HTTP_REFERER'] || strstr($_SERVER['HTTP_REFERER'], config::password_page)) ? config::start_page :  $_SERVER['HTTP_REFERER']; ?>"><?php echo $lang['back'] ?></a></span></div>
	<div style="width:100%; margin-top:10px">	
		<div style="width:30%; margin: 0 auto;">
			<form action="<?php echo config::password_page; ?>" method="post" target="_self"> 
				<table>
					<tbody>
					<tr style="display: table-row;">
						<td><label for="current_password"><?php echo $lang['current_password'] ?>: </label></td>
						<td><input type="password" size="12" maxlength="50" id="current_password" name="current_password" role="textbox"></td>
					</tr>
					<tr style="display: table-row;">
						<td><label for="new_password"><?php echo $lang['new_password'] ?>: </label></td>
						<td><input type="password" size="12" maxlength="50" id="new_password" name="new_password" role="textbox"></td>
					</tr>
					<tr style="display: table-row;">
						<td><label for="retype_password"><?php echo $lang['retype_password'] ?>: </label></td>
						<td><input type="password" size="12" maxlength="50" id="retype_password" role="textbox"></td>
					</tr>
					<tr style="display: table-row;">
						<td></td>
						<td><input type="submit" value="<?php echo $lang['submit'] ?>" disabled="disabled"></td>
					</tr>
					<tr>
						<td colspan="2" style="text-align:center; <?php echo ($success === true ? 'color:green;' : 'color:red;'); ?>"><?php echo (isset($success ) ? ($success === true ? $lang['valid'] : $lang['not_valid']) : ''); ?></td>
					</tr>
					</tbody>
				</table>
			</form>
		</div>
	</div>
</body>
</html>