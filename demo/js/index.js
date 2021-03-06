$(function(){
	var urlVars = $.getUrlVars();
	var searchDefaults = [];
	var gridOptions = {};
	var liveSettings = {};

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

	var grid = $('#grid');
	var settings = {
	  	source: 'demo', //name of table, view or the actual sql that you wish to display in the grid
		load_edit_record: true, //reload record before editting
		reopen_after_add: true, // reopen after adding a record - since we got a jsetgrid that can be filled only after parent exists.
		searchall: true,
		template: {
			use: true,
			columns: 1
		},
	    grid: {
	    	direction: 'ltr',
		    width: $(window).width() - 15,
		    height: $(window).height() - 155,
			rownumWidth: 30,
			footerrow : true,
			userDataOnFooter : true
	  	},
	  	navigation:{
			options : {
				checkOnUpdate:true
			},
			edit:{
				checkOnUpdate:true
			},
			add:{
				checkOnUpdate:true
			},
			del:{
			},
			search:{
			},
			view:{
			}
		}

	};
	
	grid.jset($.extend(true, settings, liveSettings));
});