;(function ($) {
/*
 * template  1.0 - template
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */

	//defaults
	$.template = {
		defaults: {
			name: 'template',
			size: 10
		}
	};

	//protected functions
	var fn = {
		get : function(name){
			return this.p[name];
		},
		
  	set: function(options){
			this.p = $.extend(this.p, options || {})
  	}
  }
	
	$.fn.template = function(param){
		if (typeof param == 'string') {
	  	var f = fn[param];
	  	if (!f) {
	  		throw ("template - No such method: " + param);
	  	}
	  	var args = $.makeArray(arguments).slice(1);
	  	return f.apply(this, args);
	  }
					
		this.p = $.extend($.template.defaults, param || {});
	
		this.each(function(i){
			var $this = $(this);
			$this.addClass('template');
			$this.data('hey', {size: i+1, area: (i+1)*(i+1)});
		});
	
		return this;
	}
})(jQuery);
