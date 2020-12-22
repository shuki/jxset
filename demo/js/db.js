$(function(){
	var vr = {
		grid_height: 180,
		height_offset: 240,
		db_grid_width: 450,
		width_offset: 40,
		table_grid_max_width: 450
	}

	var fn = {
		get_db: function(){
			var selrow = $('#grid_db').jqGrid('getGridParam', 'selrow');
			return $('#grid_db').jqGrid('getCell', selrow, 'Name');
		},
		get_table: function(){
			var selrow = $('#grid_table').jqGrid('getGridParam', 'selrow');
			return $('#grid_table').jqGrid('getCell', selrow, 'Name');
		},
		calculate_table_grid_width: function(){
			var vacant_width = $(window).width() - (vr.db_grid_width + vr.width_offset);
			return vacant_width > vr.table_grid_max_width ? vr.table_grid_max_width : vacant_width;
		},
		calculate_contents_grid_height: function(){
			return $(window).height() - (vr.grid_height + vr.height_offset);
		}
	}

	var grid_db= $('#grid_db');
	var grid_db_settings = {
	  	source: 'select `SCHEMA_NAME` as `Name`, DEFAULT_CHARACTER_SET_NAME as `Character Set`, DEFAULT_COLLATION_NAME as `Collation` from `information_schema`.`SCHEMATA` order by `SCHEMA_NAME`',
		search_default: [{name: 'Name', value: $.getUrlVar('db')}],
		searchall: true,
		template: {
			use: true,
			columns: 1
		},
		copy:{
			navButtonAdd: false
		},
		onSelectRow: function(ids) {
			if($('#grid_table').jset('defined'))
				$('#grid_table').jset('unload');
			$('#grid_table').jset(grid_table_settings);
		},
	    grid: {
			caption: 'Databases',
			width: vr.db_grid_width,
			height: vr.grid_height
	  	},
		navigation:{
			options : {
				add: false,
				edit: false,
				del: false,
				refresh: true
			}
		}
	};
	grid_db.jset(grid_db_settings);
	
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var grid= $('#grid');
	var grid_settings = {
	  	source: fn.get_table,
		db_name: fn.get_db,
		searchall: true,
		template: {
			use: true,
			columns: 1
		},
	    grid: {
			autowidth: true,
			height: fn.calculate_contents_grid_height()
	  	}
	};

	var grid_table = $('#grid_table');
	var grid_table_settings = {
	  	source: 'select `TABLE_NAME` as `Name`, TABLE_TYPE as `Type`, TABLE_ROWS as `Rows`  from `information_schema`.`tables` where (`TABLE_SCHEMA` = database())',
		db_name: fn.get_db,
		searchall: true,
		template: {
			use: true,
			columns: 1
		},
		copy:{
			navButtonAdd: false
		},
		onSelectRow: function(ids) {
			if($('#grid').jset('defined'))
				$('#grid').jset('unload');
			$('#grid').jset($.extend(true, grid_settings, {grid:{caption: fn.get_table()}}));
		},
		grid: {
			caption: 'Tables / Views',
			width: fn.calculate_table_grid_width(),
			height: vr.grid_height
	  },
		navigation:{
			options : {
				add: false,
				edit: false,
				del: false,
				refresh: true
			}
		}
	};
});