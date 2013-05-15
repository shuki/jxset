;(function ($) {
/*
 * jQuery.inputfilter 0.1 - jQuery.inputfilter
 * 
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com) 
 * Shuki Shukrun (shukrun.shuki at gmail.com)
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Date: 2010-01-01
 *
 * inputfilter plugin for jQuery filters keyboard input by masking
 * the keyboard to allow only the set of chars acceptable and by
 * specifying a pattern for the allowed values.
 * 
 * validation rules are defined by:
 * 	using pre defined input types or
 * 	specifiying regular expressions or
 * 	specifiying a validation functions.
 * 
 * If an enterd value fail the test
 * the value revert to the last entered valid value.
 *
 * Code inspired by keyfilter plugin by aabdulin
 *
 * Procedural style:
 * $('#elem').inputfilter({type: 'int'});
 * 
 * $('#elem').inputfilter({
 * 		mask: /[\dA-F]/,
 *  	pattern: /^([0]{1})$|^([1-9]{1})([\d]*)$/
 *  });
 *  
 * $('#elem').inputfilter(function(c) {return c != 'a';});
 * 
 * Available types:
 * 	pint:     /[\d]/
 * 	int:      /[\d\-]/
 * 	pnum:     /[\d\.]/
 * 	num:      /[\d\-\.]/
 * 	money     /[\d\.\s,]/
 * 	hex:      /[0-9a-f]/i
 * 	email:    /[a-z0-9_\.\-@]/i
 * 	alpha:    /[a-z_]/i
 * 	alphanum: /[a-z0-9_]/i
 */
//$.inputfilter = $.inputfilter || {};
	var types = {
		pint: {
			mask: /[\d]/,
			pattern: /^([0]{1})$|^([1-9]{1})([\d]*)$/		
		},
		'int': {
			mask: /[\d\-]/,		
			pattern: /^([-0]{1})$|^([-]{0,1})([1-9]{1})([\d]*)$/		
		},
		pnum: {
			mask: /[\d\.]/,
			pattern: /^([0]{1})([\.]{0,1})$|^([0]{1})([\.]{1})([\d]*)$|^([1-9]{1})([\d]*)([\.]{0,1})([\d]*)$/		
		},		
		num: {
			mask: /[\d\-\.]/,
			pattern: /^([-]{1})$|^([-]{0,1})([0]{1})([\.]{0,1})$|^([-]{0,1})([0]{1})([\.]{1})([\d]*)$|^([-]{0,1})([1-9]{1})([\d]*)([\.]{0,1})([\d]*)$/		
		}		
	};

	var Keys = {
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		BACKSPACE: 8,
		DELETE: 46
	};	
	
	// safari keypress events for special keys return bad keycodes
	var SafariKeys = {
		63234 : 37, // left
		63235 : 39, // right
		63232 : 38, // up
		63233 : 40, // down
		63276 : 33, // page up
		63277 : 34, // page down
		63272 : 46, // delete
		63273 : 36, // home
		63275 : 35  // end
	};

	var isNavKeyPress = function(e)
	{
		var k = e.keyCode;
		k = $.browser.safari ? (SafariKeys[k] || k) : k;
		return (k >= 33 && k <= 40) || k == Keys.RETURN || k == Keys.TAB || k == Keys.ESC;
	};

  var isSpecialKey = function(e)
	{
		var k = e.keyCode;
		var c = e.charCode;
		return k == 9 || k == 13 || (k == 40 && (!$.browser.opera || !e.shiftKey)) || k == 27 ||
			k == 16 || k == 17 ||
			(k >= 18 && k <= 20) ||
			($.browser.opera && !e.shiftKey && (k == 8 || (k >= 33 && k <= 35) || (k >= 36 && k <= 39) || (k >= 44 && k <= 45)));
  };

  var getKey = function(e)
	{
		var k = e.keyCode || e.charCode;
		return $.browser.safari ? (SafariKeys[k] || k) : k;
  };

  var getCharCode = function(e)
	{
		return e.charCode || e.keyCode || e.which;
	};

	var errorMessage = function(msg, elem){
		alert('inputfilter plugin error: ' + msg + ' for ' +  elem.attr('id'));
	}
	
	$.fn.inputfilter = function(options){
		var settings = $.extend({}, $.fn.inputfilter.defaults, options);
		this.settings = settings;

		if (typeof options === 'undefined') {
			//alert('undefined');
			//alert(settings.type);
			//alert(this.attr('id'));
		}
		if (settings.type) 
			if (types[settings.type]) 
				$.extend(settings, types[settings.type]);
			else 
				errorMessage('undefined type - \'' + options.type + '\'', this);
		else 
			if (!settings.mask || !settings.pattern) 
				errorMessage('undefined type or mask and pattern', this);

		this.addClass('inputfilter');

		this.bind('input.inputfilter keyup.inputfilter paste.inputfilter', function(e){
			if($(this).attr('check_keyup') === false || $(this).val() == '') return;
			
			$(this).attr('check_keyup', false);			

			if(settings.pattern.test($(this).val()))
				$(this).attr('pre_value', $(this).val());
			else{
				$(this).val($(this).attr('pre_value'));
			}
		});

		this.bind('keypress.inputfilter', function(e){
			if (e.ctrlKey || e.altKey) return;
			var k = getKey(e);
			if($.browser.mozilla && (isNavKeyPress(e) || k == Keys.BACKSPACE || (k == Keys.DELETE && e.charCode == 0))) return;

			var c = getCharCode(e), cc = String.fromCharCode(c), ok = true;
			if(!$.browser.mozilla && (isSpecialKey(e) || !cc)) return;
			
			if ($.isFunction(settings.mask)) 
	  		ok = settings.mask.call(this, cc);
		  else
				ok = settings.mask.test(cc);

			if (!ok) e.preventDefault();		
		  $(this).attr('check_keyup', ok);
		});

		this.each(function(){		
			$(this).attr('pre_value', $(this).val());
		});
				
		this.remove = function(){
			this.each(function(){
				var $this = $(this);
				//this.className = this.className.replace(/\binputfilter([-a-z]*)\b/g, 'inputfilter');
				$this.removeClass('inputfilter')		
				$this.removeAttr('pre_value');
				$this.removeAttr('check_keyup');
				$this.unbind('input.inputfilter keyup.inputfilter paste.inputfilter keypress.inputfilter');
				}
			)
			
			return this;
		}
		
		return this;
	};

	$.fn.inputfilter.defaults = {
  	type: 'pnum',
		mask: null,
		pattern: null
	};
})(jQuery);
