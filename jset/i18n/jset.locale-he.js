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
			warning: 'אזהרה',
			selectboxItemNotFound: "חסר ערך ברשימה לשדה : '{0}', הערך החסר : '{1}'",
			filterToolbar_operandTitle: "הקלק כדי לבחור פעולת סינון",
			versionUpdated: "המערכת שודרגה - הגירסה החדשה תעלה מייד.",
			timoutWarning: 'מפאת חוסר פעילות, המערכת תתנתק בעוד',
			timoutWarning1: 'שניות.',
			changePasswordTitle: 'איפוס סיסמה',
			changePasswordConfirm: 'האם ברצונך לאפס את הסיסמה?',
			changePasswordSuccess: 'סיסמה אופסה בהצלחה.',
			changePasswordFailure: 'סיסמה לא אופסה.',
			userExists: 'שם משתמש זה קיים כבר במערכת.',
			recordsAdded: 'רשומות נוספו.',
			recordUpdated: 'רשומה נשמרה בהצלחה.',
			recordSent: 'רשומה נשלחה בהצלחה.'
		},
		nav: {
			columnChooserTitle: 'התאמה אישית',
			clearPersistTitle: 'בטל התאמה אישית',		
			selectedCounter: "מסומנים: {0}",
			addCaption: "הוסף {0}",
			editCaption: "ערוך {0}",
			copyCaption: 'העתק רשומה',
			clearFilterToolbar: 'נקה שדות סינון',
			help: 'עזרה',
			dump: 'ייצוא ל SQL',
			copy: 'העתק',
			setup: 'הגדר גריד',
			'export': 'ייצא לאקסל',
			'import': 'ייבא מאקסל',
	        addAll: 'הצג את כל העמודות',
	        removeAll: 'הסתר את כל העמודות',
	        itemsCount: 'עמודות מוצגות',
			confirmCopy: 'האם ברצונך להעתיק את הרשומה המסומנת?'	        
		},
		captions:{
			searchall: 'חיפוש'
		}
	};

	$.jset = ($.jset == undefined) ? jset : $.extend(true, $.jset, jset);	
})(jQuery);