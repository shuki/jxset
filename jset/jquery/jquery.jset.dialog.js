;(function ($) {
/*
 * jset  1.0 - jset
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */
	$.extend($.jset.fn, {
		alert: function(title, message){
			var buttons = {};
			buttons[$.jgrid.edit.bClose] = function(){
	            $(this).dialog('close');
			};
			$(document.createElement('div'))
	        .attr({title: title, 'class': 'alert'})
	        .html(message)
	        .dialog({
	            buttons: buttons,
	            close: function(){$(this).remove();},
	            draggable: true,
	            modal: true,
	            resizable: false,
	            width: 'auto'
	        });				
		},
		
		confirm: function(title, message, action){
			var buttons = {};
			buttons[$.jgrid.edit.bCancel] = function(){
	            $(this).dialog('close');
			};
			buttons[$.jgrid.edit.bSubmit] = function(){
        		action();
        		$(this).dialog('close');
			};
			
			$(document.createElement('div'))
	        .attr({title: title, 'class': 'alert'})
	        .html(message)
	        .dialog({
	            buttons: buttons,
	            close: function(){$(this).remove();},
	            draggable: true,
	            modal: true,
	            resizable: false,
	            width: 'auto'
	        });				
		}
	});
})(jQuery);