;(function ($) {
/*
 * plugin  3.6 - plugin
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */
$.plugin = $.plugin || {};
$.extend($.plugin,{
	hi : function(){
		alert('hi');	
	},
	bye : function (value){
		return value;
	},
	someOptions: {}
});

$.fn.plugin = function(pin){
	if (typeof pin == 'string') {
		var fn = $.fn.plugin[pin];
		if (!fn) {
			throw ("plugin - No such method: " + pin);
		}
		var args = $.makeArray(arguments).slice(1);
		return fn.apply(this, args);
	}

	var p = $.extend(true, {
		url: "",
		height: 150,
		page: 1,
		direction: "ltr"
	}, $.plugin.defaults, pin ||
	{});

	this.hey = function(){
		this.each(function(){
			alert('yes!!');
			alert(this.p.height);
			var $this = $(this);
			$this.removeClass('plugin');		
			}
		)
	
		return this;
	};
	
	return this.each(function(){
		var $this = $(this);
		if (this.plugin) {
			return;
		}

		$this.addClass('plugin');

		var plugin = {
			headers: [],
			cols: [],
			footers: [],
			tryMe: function(a){
				return a + a;
			}
		}
				
		this.p = p;
		this.plugin = plugin;
	});
	
}

$.extend($.fn.plugin,{
	getParam : function(pName) {
		var $t = this[0];
		if (!$t.p) {return;}
		if (!pName) { return $t.p; }
		else {return typeof($t.p[pName]) != "undefined" ? $t.p[pName] : null;}
	},
	setParam : function (newParams){
		return this.each(function(){
			if (this.plugin && typeof(newParams) === 'object') {$.extend(true,this.p,newParams);}
		});
	}
});
})(jQuery);
