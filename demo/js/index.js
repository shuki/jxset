$(function(){
	var urlVars = $.getUrlVars();
	var searchDefaults = [];
	var gridOptions = {};
	var liveSettings = {};
	//$.dump(urlVars);
	$.each(urlVars, function(key, value){
		//alert(key + ':' + value + ':' + urlVars[value]);
		switch(value){
			case '_order_by_':
				gridOptions.sortname = urlVars[value];
				break;
			case '_order_direction_':
				gridOptions.sortorder = urlVars[value];
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
	var windowHeight = $(window).height();

	//$.dump(searchDefaults);
	//$( document ).tooltip();
	var grid = $('#grid');
	var settings = {
	  	source: 'demo', //name of table, view or the actual sql that you wish to display in the grid
	  	//source: 'demo', //name of table, view or the actual sql that you wish to display in the grid
		load_edit_record: true, //reload record before editting
		//reopen_after_add: true,
		//search_default: searchDefaults,
	    grid: {
			autowidth: true,
			height: windowHeight - 120,
			footerrow : true,
			userDataOnFooter : true
	  	},
	  	navigation:{
			options : {
			},
			edit:{
			},
			add:{
			},
			del:{
			},
			search:{
				//
			},
			view:{
			}
		}

	};
	
	grid.jset($.extend(true, settings, liveSettings));
});