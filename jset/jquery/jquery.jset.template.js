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
				
				var tr, name;
				$.each($('td.DataTD > *', e), function(j, a){
					if((j % 3) == 0){
						tr = $('<tr></tr>').appendTo($('div.panel-body > table > tbody', panel)).hide();
						name = $(a).attr('name');
					}
					if((j % 3) == 1 && $.jset.fn.get_column(grid, name) && ($.jset.fn.get_column(grid, name).hidden != 1 || $.jset.fn.get_column(grid, name).edithidden == 1)){
						panel.show();
						tr.show();
					}
					if((j % 3) != 2)
						$('<td></td>').appendTo($('div.panel-body > table > tbody > tr:last', panel))
						.append(a);
				});
				
				if($('div.panel-header > span.panel-title', panel).html() == '')
					$('div.panel-header', panel).hide();
				$(e).remove();
			});
			set_panel_img_on_click_handler(pane);
	    }
	});
})(jQuery);