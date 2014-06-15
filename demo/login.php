<?php 
/*
 * jxset
 * Copyright (c) 2010 - 2013, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
 
$name = 'login';
$language = 'en';
$rtl = false;

include_once("autoload.php");
if(isset($_GET['signout']))
	jset_login::signout();

jset_login::verify();

if(isset($_POST['user'])){
	$user = $_POST['user'];
	$success = jset_login::signin($_POST['user'], $_POST['password']);
}


$dir_pre = config::jxset;
jset_session::create();
$lang = jset_lang::get($name, $language);
jset_page::min(config::jxset, $language, '', $rtl);
?>
<link rel="stylesheet" type="text/css" media="screen" href="css/login.css" />
<script src="<?php echo $dir_pre ?>jset/i18n/jset.locale-he.js" type="text/javascript"></script>
<title><?php echo $lang['title'] ?></title>
<script src="js/login.js" type="text/javascript"></script>
</head>
<body>

	<div style="width:100%; margin-top:10px">
		<div style="width:20%; margin: 0 auto;">
			<div class="panel-body">
				<form action="login.php" method="post" target="_self"> 
				<table>
					<tbody>
					<tr style="display: table-row;">
						<td><label for="user" name="user"><?php echo $lang['user'] ?>: </label></td>
						<td><input type="text" size="12" maxlength="100" name="user" role="textbox" value="<?php echo $user; ?>"></td>
					</tr>
					<tr style="display: table-row;">
						<td><label for="password" name="password"><?php echo $lang['password'] ?>: </label></td>
						<td><input type="password" size="12" maxlength="50" id="password" name="password" role="textbox"></td>
					</tr>
					<tr style="display: table-row;">
						<td></td>
						<td><input type="submit" value="<?php echo $lang['submit'] ?>" ></td>
					</tr>
					<tr>
						<td colspan="2" style="text-align:center; color:red;"><?php echo ($success === false ? $lang['not_valid'] : ''); ?></td>
					</tr>
					</tbody>
				</table>
				</form>
			</div>
		</div>
	</div>
</body>
</html>