;(function($){
/**
 * jqGrid Hebrew Translation
 * Shuki Shukrun shukrun.shuki@gmail.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "מציג {0} - {1} מתוך {2}",
		emptyrecords: "אין רשומות להציג",
		loadtext: "טוען...",
		pgtext : "דף {0} מתוך {1}"
	},
	search : {
		caption: "מחפש...",
		Find: "חפש",
		Reset: "התחל",
		odata: [{ oper:'eq', text:"שווה"},{ oper:'ne', text:"לא שווה"},{ oper:'lt', text:"קטן"},{ oper:'le', text:"קטן או שווה"},{ oper:'gt', text:"גדול"},{ oper:'ge', text:"גדול או שווה"},{ oper:'bw', text:"מתחיל ב"},{ oper:'bn', text:"לא מתחיל ב"},{ oper:'in', text:"נמצא ב"},{ oper:'ni', text:"לא נמצא ב"},{ oper:'ew', text:"מסתיים ב"},{ oper:'en', text:"לא מסתיים ב"},{ oper:'cn', text:"מכיל"},{ oper:'nc', text:"לא מכיל"},{ oper:'nu', text:"ריק"},{ oper:'nn', text:"לא ריק"}],
		groupOps: [	{ op: "AND", text: "הכל" },	{ op: "OR",  text: "אחד מ" }	],
		addRule: "הוסף תנאי",
		deleteRule: "מחק תנאי",
		addSubgroup: "הוסף תת קבוצה",
		deleteSubgroup: "מחק תת קבוצה"	
	},
	edit : {
		addCaption: "הוסף רשומה",
		editCaption: "ערוך רשומה",
		bSubmit: "שמור",
		bCancel: "בטל",
		bClose: "סגור",
		saveData: "נתונים השתנו! לשמור?",
		bYes : "כן",
		bNo : "לא",
		bExit : "בטל",
		msg: {
			required:"שדה חובה",
			number:"אנא, הכנס מספר תקין",
			minValue:"ערך צריך להיות גדול או שווה ל ",
			maxValue:"ערך צריך להיות קטן או שווה ל ",
			email: "היא לא כתובת איימל תקינה",
			integer: "אנא, הכנס מספר שלם",
			date: "אנא, הכנס תאריך תקין",
			url: "הכתובת אינה תקינה. דרושה תחילית ('http://' או 'https://')",
			nodefined : " לא מוגדר!",
			novalue : " ערך מוחזר נדרש!",
			customarray : "פונקציה מתואמת (custom function) חייבת להחזיר מערך!",
			customfcheck : "פונקציה מתואמת (custom function) חייבת להיות מוגדרת למקרה של בדיקה מתואמת!"
		}
	},
	view : {
		caption: "הצג רשומה",
		bClose: "סגור"
	},
	del : {
		caption: "מחק",
		msg: "האם למחוק את הרשומה/ות המסומנות?",
		bSubmit: "מחק",
		bCancel: "בטל"
	},
	nav : {
		edittext: "",
		edittitle: "ערוך שורה מסומנת",
		addtext:"",
		addtitle: "הוסף שורה חדשה",
		deltext: "",
		deltitle: "מחק שורה מסומנת",
		searchtext: "",
		searchtitle: "חיפוש מתקדם",
		refreshtext: "",
		refreshtitle: "טען גריד מחדש",
		alertcap: "אזהרה",
		alerttext: "אנא, בחר שורה",
		viewtext: "",
		viewtitle: "הצג שורה מסומנת"
	},
	col : {
		caption: "הצג/הסתר עמודות",
		bSubmit: "שמור",
		bCancel: "בטל"
	},
	errors : {
		errcap : "שגיאה",
		nourl : "לא הוגדרה כתובת url",
		norecords: "אין רשומות לעבד",
		model : "אורך של colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: ",", defaultValue: ''},
		number : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, defaultValue: ''},
		currency : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: ''},
		date : {
			dayNames:   [
				"א", "ב", "ג", "ד", "ה", "ו", "ש",
				"ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"
			],
			monthNames: [
				"ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ",
				"ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
			],
			AmPm : ["לפני הצהרים","אחר הצהרים","לפני הצהרים","אחר הצהרים"],
			S: function (j) {return j < 11 || j > 13 ? ['', '', '', ''][Math.min((j - 1) % 10, 3)] : ''},
			srcformat: 'Y-m-d',
			newformat: 'd/m/Y',
			parseRe : /[Tt\\\/:_;.,\t\s-]/,
			masks : {
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				ShortDate: "n/j/Y",
				LongDate: "l, F d, Y",
				FullDateTime: "l, F d, Y g:i:s A",
				MonthDay: "F d",
				ShortTime: "g:i A",
				LongTime: "g:i:s A",
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO",
				YearMonth: "F, Y"
			},
			reformatAfterEdit : false
		},
		baseLinkUrl: '',
		showAction: '',
		target: '',
		checkbox : {disabled:true},
		idName : 'id'
	}
});
})(jQuery);
