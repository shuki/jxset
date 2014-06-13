<?php
/*
 * jset  1.0 - jset
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */

class jset_page
{
	public static function create($dir_pre, $lang = 'en', $dir_rel = '', $rtl = false)
	{
		jset_login::verify();
		session_start();
		self::doctype();
		self::head($dir_pre, $lang, $dir_rel, $rtl);
	}
	
	public static function doctype()
	{
		echo <<< EOT
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
EOT;
	}
	
	public static function head($dir_pre, $lang, $dir_rel, $rtl){
		$dir_pre = isset($dir_pre) ? $dir_pre : '';
		$dir_rel = isset($dir_rel) ? $dir_rel : '';
		$rtl_css = $rtl ? "<link rel=\"stylesheet\" type=\"text/css\" media=\"screen\" href=\"{$dir_pre}jset/css/jset_rtl.css\" />" : '';
		echo <<< EOT
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="{$dir_pre}jset/img/smile.gif" type="image/x-icon" />
<!-- jsetnote: to switch theme -->
<!--link rel="stylesheet" type="text/css" media="screen" href="{$dir_pre}jset/jquery-ui/css/smoothness/jquery-ui-1.9.1.custom.css" /-->
<link rel="stylesheet" type="text/css" media="screen" href="{$dir_pre}jset/jquery-ui/css/redmond/jquery-ui-1.9.1.custom.min.css" />
<link rel="stylesheet" type="text/css" media="screen" href="{$dir_pre}jset/jqGrid/css/ui.jqgrid.css" />
<link rel="stylesheet" type="text/css" media="screen" href="{$dir_pre}jset/jqGrid/plugins/ui.multiselect.css">

<!--script src="{$dir_pre}jset/jquery/jquery-1.9.1.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jquery/jquery-migrate-1.2.1.js" type="text/javascript"></script-->
<script src="{$dir_pre}jset/jquery/jquery-1.8.2.min.js" type="text/javascript"></script>

<!--script src="{$dir_pre}jset/jquery/jquery-1.9.1.js" type="text/javascript"></script-->
<script src="{$dir_pre}jset/jquery-ui/js/jquery-ui-1.9.1.custom.min.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/i18n/jquery.ui.datepicker-he.js" type="text/javascript"></script>
<script type="text/javascript">
		$.jset = {dir_pre: '{$dir_pre}', dir_rel: '{$dir_rel}'};
</script>
<script src="{$dir_pre}jset/i18n/jset.locale-{$lang}.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jquery/jquery.jset.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jquery/jquery.jset.state.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jquery/jquery.jset.url.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jquery/jquery.dump.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jquery/jquery.blockUI.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jquery/jquery.inputfilter.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jquery/jquery.ajaxupload.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jquery/jquery.metadata.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jquery/jquery.validate.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jquery/jquery.jset.components.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jquery/jquery.urlvars.js" type="text/javascript"></script>

<script src="{$dir_pre}jset/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/plugins/jquery.contextmenu.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/plugins/ui.multiselect.js" type="text/javascript"></script>

<script src="{$dir_pre}jset/i18n/grid.locale-{$lang}.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/grid.base.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/grid.common.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/grid.formedit.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/grid.inlinedit.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/grid.celledit.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/grid.subgrid.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/grid.treegrid.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/grid.grouping.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/grid.custom.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/grid.tbltogrid.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/grid.import.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/jquery.fmatter.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/JsonXml.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/grid.jqueryui.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/jqGrid/js/grid.filter.js" type="text/javascript"></script>
<script type="text/javascript">
	$.jgrid.no_legacy_api = true;
	$.jgrid.useJSON = true;
</script>

<script src="{$dir_pre}jset/jquery/jquery.jset.formatters.js" type="text/javascript"></script>
<!--script src="{$dir_pre}jset/widget/tinymce/jscripts/tiny_mce/jquery.tinymce.js" type="text/javascript"></script-->
<script src="{$dir_pre}jset/widget/tinymce4/js/tinymce/tinymce.min.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/widget/tinymce4/js/tinymce/jquery.tinymce.min.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/widget/flowplayer/flowplayer-3.2.6.min.js" type="text/javascript"></script> 
<script src="{$dir_pre}jset/js/htmlspecialchars.js" type="text/javascript"></script>

<link href="{$dir_pre}jset/widget/file-uploader/client/fineuploader.css" rel="stylesheet" type="text/css"/>
<script src="{$dir_pre}jset/widget/file-uploader/client/js/header.js"></script>
<script src="{$dir_pre}jset/widget/file-uploader/client/js/util.js"></script>
<script src="{$dir_pre}jset/widget/file-uploader/client/js/button.js"></script>
<script src="{$dir_pre}jset/widget/file-uploader/client/js/handler.base.js"></script>
<script src="{$dir_pre}jset/widget/file-uploader/client/js/handler.form.js"></script>
<script src="{$dir_pre}jset/widget/file-uploader/client/js/handler.xhr.js"></script>
<script src="{$dir_pre}jset/widget/file-uploader/client/js/uploader.basic.js"></script>
<script src="{$dir_pre}jset/widget/file-uploader/client/js/dnd.js"></script>
<script src="{$dir_pre}jset/widget/file-uploader/client/js/uploader.js"></script>
<script src="{$dir_pre}jset/widget/file-uploader/client/js/jquery-plugin.js"></script>
<script src="{$dir_pre}jset/jquery/jquery.jset.template.js" type="text/javascript"></script>
<script src="{$dir_pre}jset/template/panel/panel.js"></script>
<link rel="stylesheet" type="text/css" media="screen" href="{$dir_pre}jset/css/jset.css" />
<link rel="stylesheet" type="text/css" media="screen" href="{$dir_pre}jset/template/panel/panel.css" />
<link rel="stylesheet" type="text/css" media="screen" href="{$dir_pre}jset/template/pane/pane.css" />
{$rtl_css}

EOT;

include("{$dir_pre}jset/template/panel/panel_template.html");
include("{$dir_pre}jset/template/pane/pane_template.html");
//echo '</head>';
	}
}
