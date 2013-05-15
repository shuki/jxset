goog = 87;
$(function(){
	const grid_width = 980;
	const grid_height = 150;
	const grid_height_single = 21;
	
	var fn = {
		get_host: function (){
			return $('#tables').data('settings') ? $('#tables').data('settings').host : '';
		},
		get_db_name: function (){
			return $('#tables').data('settings') ? $('#tables').data('settings').db_name : '';
		}
	};
	
	var events_settings = {
		source: 'jset_event',
		host: fn.get_host,
		db_name: fn.get_db_name,
	  	db_remote_definitions: true,
		filter:[{
			source: 'id',
			target: 'parent'}
		],
		filterToolbar:{
			navButtonAdd: false
		},
  		grid: {
  			autowidth: true,
			//width: grid_width,
			height: grid_height_single,
			rownumbers: false
  		},
		navigation: {
  			options: {view:false}
		}
	};
			
	var columns_settings = {
		source: 'jset_column',
		host: fn.get_host,
		db_name: fn.get_db_name,
	  	db_remote_definitions: true,
		filter:[{
			source: 'id',
			target: 'parent'}
		],
  		grid: {
			autowidth: true,
			//width: grid_width,
			height: grid_height
  		},
		navigation: {
  			options: {view:false}
		}
	};
			
	var tables_settings = {
		source: 'jset_table',
	  	db_remote_definitions: true,
		db_fields: {
			host: 'name',
			db_name: 'db_name'
		},
		detail: [{
			elem: '#columns',
			settings: columns_settings
		},{
			elem: '#events',
			settings: events_settings
		}],
  		grid: {
			autowidth: true,
			//width: grid_width,
			height: grid_height
  		},
		navigation: {
  			options: {view:false}
		}
	};

	var hosts_settings = {
	  	source: 'jset_host',
		detail: [{
			elem: '#tables',
			settings: tables_settings,
			recreate: true
		}],
	    grid: {
			autowidth: true,
			//width: grid_width,
			height: grid_height,
			sortname: 'name'
	  	},
		navigation: {
  			options: {view:false}
		}
	};				
						
	$('#hosts').jset(hosts_settings);
});