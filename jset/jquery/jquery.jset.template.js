;(function ($) {
	$.jset = $.extend(true, $.jset, {
		defaults: {
			template:{
				use: false,
				columns: 3
			}
		}
	});
	
	$.extend($.jset.fn, {
	    template_apply: function (formid, options){
			var grid = $(this);
			var pane = $($('#pane_template').html()).appendTo(formid)
				.addClass(grid.data('settings').grid.direction);
			
			var td = $('td', pane);
			for(var i = 1; i < options.columns; i++)
				td.clone().appendTo($('tr', pane));
			
			$.each($('table.EditTable tr.FormData:not(:last)', formid), function(i, e){
				var panel = $($('#panel_template').html()).appendTo($('table.pane-table > tbody > tr > td:nth-child(' + ((i % options.columns) + 1) + ')', formid))
					//.css({float:'right'})
					.hide();
				$('span.panel-title', panel).html($('td.CaptionTD', e).html());
				
				var tr, name, has_label;
				$.each($('td.DataTD > *', e), function(j, a){
					if((j % 3) == 0){
						tr = $('<tr></tr>').appendTo($('div.panel-body > table > tbody', panel)).hide();
						name = $(a).attr('name');
						has_label = $(a).html() != '';
						if(has_label)
							$('<td></td>').appendTo($('div.panel-body > table > tbody > tr:last', panel))
							.append(a);
					}
					if((j % 3) == 1){
						$('<td' + (has_label ? '' : ' colspan="2"') + '></td>').appendTo($('div.panel-body > table > tbody > tr:last', panel))
						.append(a);
						if($.jset.fn.get_column(grid, name) && ($.jset.fn.get_column(grid, name).hidden != 1 || $.jset.fn.get_column(grid, name).edithidden == 1)){
							panel.show();
							tr.show();
						}
					}
				});
				
				if($('div.panel-header > span.panel-title', panel).html() == '')
					$('div.panel-header', panel).hide();
				$(e).remove();
			});
			set_panel_img_on_click_handler(pane);
	    },
	    
	    append_fields: function(formid, source, count){
	    	var source_tr = $.jset.fn.get_form_field(formid, source).closest('tr');
	    	var siblings = source_tr.siblings(); 
	    	var source_last_td = $('td:last-child', source_tr);
	    	count = count != undefined ? count : siblings.length - source_tr.index();
	    	
	    	for (var i=0; i<count; i++){
	    		var current_tr = $(siblings.get(source_tr.index() + i));
	    		$.each($('td',current_tr), function(){
	    			source_last_td.append($(this).contents());
	    		});
	    		current_tr.remove();
	    	}
	    	source_last_td.children('label.CaptionField').addClass('ajust-appended-label');	
	    },

	    append_fields_td: function(formid, source, count){
	    	var source_tr = $.jset.fn.get_form_field(formid, source).closest('tr');
	    	var siblings = source_tr.siblings();
	    	count = count != undefined ? count : siblings.length - source_tr.index();
	    	console.log(formid, source, count,source_tr,siblings);
	    	for (var i=0; i<count; i++){
	    		var current_tr = $(siblings.get(source_tr.index() + i));
	    		source_tr.append(current_tr.contents());
	    		current_tr.remove();
	    	}
	    }
	});
})(jQuery);