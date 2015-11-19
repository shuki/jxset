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
			warning: 'تحذير',
			selectboxItemNotFound: "لا قيمة لها المجال لائحة : '{0}', الفراغات : '{1}'",
			filterToolbar_operandTitle: "انقر لتحديد إجراء التصفية",
			versionUpdated: "تمت ترقية نظام - سيكلف النسخة الجديدة فورا.",
			timoutWarning: 'بسبب عدم النشاط ، سيتم قطع النظام أثناء',
			timoutWarning1: 'ثواني.',
			changePasswordTitle: 'إعادة تعيين كلمة المرور',
			changePasswordConfirm: 'هل تريد إعادة تعيين كلمة المرور?',
			changePasswordSuccess: 'تم إعادة تعيين كلمة المرور بنجاح.',
			changePasswordFailure: 'لم يكن هناك إعادة تعيين كلمة المرور.',
			userExists: 'اسم المستخدم هذا موجود بالفعل في النظام.',
			recordsAdded: 'السجلات المضافة.'
		},
		nav: {
			columnChooserTitle: 'التخصيص',
			clearPersistTitle: 'تراجع تخصيص',		
			selectedCounter: "ملحوظ: {0}",
			addCaption: "إضافة {0}",
			editCaption: "تحرير {0}",
			copyCaption: 'نسخة تسجيل',
			clearFilterToolbar: 'واضح حقل تصفية',
			help: 'مساعدة',
			dump: 'التصدير إلى SQL',
			copy: 'نسخة',
			setup: 'تعيين الشبكة',
			'export': 'تصدير إلى Excel',
			'import': 'الاستيراد من ملف Excel',
	        addAll: 'عرض كل الأعمدة',
	        removeAll: 'إخفاء كل الأعمدة',
	        itemsCount: 'الصفحة الأعمدة',
			confirmCopy: 'هل تريد نسخ سجل تميز?'	        
		},
		captions:{
			searchall: 'بحث'
		}
	};

	$.jset = ($.jset == undefined) ? jset : $.extend(true, $.jset, jset);	
})(jQuery);