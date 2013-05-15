$(function(){
	var fn = {
		get_db: function(){
			var selrow = $('#grid_db').jqGrid('getGridParam', 'selrow');
			return $('#grid_db').jqGrid('getCell', selrow, 'SCHEMA_NAME');
		},
		get_table: function(){
			var selrow = $('#grid_table').jqGrid('getGridParam', 'selrow');
			return $('#grid_table').jqGrid('getCell', selrow, 'Table');
		}
	}

	var grid_db= $('#grid_db');
	var grid_db_settings = {
	  	source: 'select `SCHEMA_NAME` from `information_schema`.`SCHEMATA` order by `SCHEMA_NAME`',
		search_default: [{name: 'SCHEMA_NAME', value: $.getUrlVar('db')}],
		filterToolbar:{
			hide: false
		},
		onSelectRow: function(ids) {
			if($('#grid_table').jset('defined'))
				$('#grid_table').jset('unload');
			$('#grid_table').jset(grid_table_settings);
		},
	    grid: {
			width: 300,
			height: 200
	  	}
	};
	grid_db.jset(grid_db_settings);
	

	var grid= $('#grid');
	var grid_settings = {
	  	source: fn.get_table,
		db_name: fn.get_db,
		filterToolbar:{
			hide: false
		},
	    grid: {
			autowidth: true,
			height: 300
	  	}
	};

	var grid_table = $('#grid_table');
	var grid_table_settings = {
	  	source: 'select `TABLE_NAME` as `Table`from `information_schema`.`tables` where (`TABLE_SCHEMA` = database())',
		db_name: fn.get_db,
		filterToolbar:{
			hide: false
		},
		onSelectRow: function(ids) {
			if($('#grid').jset('defined'))
				$('#grid').jset('unload');
			$('#grid').jset($.extend(true, grid_settings, {grid:{caption: fn.get_table()}}));
		},
		grid: {
			width: 300,
			height: 200
	  	}
	};
});