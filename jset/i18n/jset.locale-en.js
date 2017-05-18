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
			warning: 'Warning',
			selectboxItemNotFound: "missing value in select box for field: '{0}', missing value: '{1}'",
			filterToolbar_operandTitle: "Click to select search operation",
			versionUpdated: "There was a system upgrade - the current version will be loaded shortly.",
			timoutWarning: 'Since the system has not been used for awhile, the system will disconnect in',
			timoutWarning1: 'seconds.',
			changePasswordTitle: 'Reset Password',
			changePasswordConfirm: 'Are you sure you want to reset the password?',
			changePasswordSuccess: 'Password was reset successfully.',
			changePasswordFailure: 'Password was not reset.',
			userExists: 'This user name already exists.',
			recordsAdded: 'records added.',
			recordUpdated: 'record updated successfuly.'
			recordSent: 'record sent successfuly.'
		},
		nav: {
			columnChooserTitle: 'Select Columns',
			clearPersistTitle: 'Clear Personal Settings',
			selectedCounter: 'Selected: {0}',
			addCaption: 'Add {0}',
			editCaption: 'Edit {0}',
			copyCaption: 'Copy Record',
			clearFilterToolbar: 'Clear Filter Toolbar',
			help: 'Help',
			dump: 'SQL Dump',
			copy: 'Copy selected row',
			setup: 'Setup Grid',
			'export': 'Export Data',
			'import': 'Import Data',
			addAll: 'Make all visible',
			removeAll: 'Hidde All',
			itemsCount: 'Avlialble Columns',
			confirmCopy: 'Are you sure you want to copy the selected row?'
		},
		captions:{
			searchall: 'Search'
		}
	};

	$.jset = ($.jset == undefined) ? jset : $.extend(true, jset, $.jset);	
})(jQuery);