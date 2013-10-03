;(function($){
	$.extend($.jset.fn, {
		url_filters: function(){
			var urlVars = $.getUrlVars();
			var searchDefaults = [];
			var gridOptions = {};
			var liveSettings = {};
			$.each(urlVars, function(key, value){
				switch(value){
					case '_order_by_':
						gridOptions.sortname = urlVars[value];
						break;
					case '_order_direction_':
						gridOptions.sortorder = (urlVars[value] == 'desc') ? 'desc' : 'asc';
						break;
					default:
						var obj = {};
						obj.name = value;
						obj.value = decodeURIComponent(urlVars[value]);
						searchDefaults.push(obj);
				}
			});
			liveSettings.grid = gridOptions;
			liveSettings.search_default = searchDefaults;
			return liveSettings;
		}
	});
})(jQuery);