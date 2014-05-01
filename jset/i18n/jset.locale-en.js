;(function ($) {
/*
 * jset  1.0 - jset
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */

	// variable settings
	var jset = {
		messages: {
			selectboxItemNotFound: "missing value in select box for field: '{0}', missing value: '{1}'",
			filterToolbar_operandTitle: "Click to select search operation"
		},
		nav: {
			columnChooserTitle: 'Select Columns',
			clearPersistTitle: 'Clear Personal Settings',
			selectedCounter: "Selected: {0}",
			addCaption: "Add {0}",
			editCaption: "Edit {0}"
		}
	};

	$.jset = ($.jset == undefined) ? jset : $.extend(true, jset, $.jset);	
})(jQuery);