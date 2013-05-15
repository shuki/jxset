$(function(){
	var hosts = $('#host');
	var hosts_settings = {
	  	source: 'jset_host',
		filterToolbar:{
			hide: false
		},
	    grid: {
			width: 260,
			height: 125,
			rownumbers: false,
			caption:'Hosts',
			sortname: 'name'
	  	},
		navigation:{
			options : {view:false}
	  	}
	};
	
	var grid_settings = {
	  	db_remote_definitions: true,
		filterToolbar:{
			hide: false
		},
	    grid: {
			autowidth: true,
			height: 300,
			caption: 'Target'
	  	},
		navigation:{
			options : {view:false, del:true, edit:true, add:true}
	  	}
	};
	
	var submit = $('#submit');
/*	submit.bind('click', function(){
		var row = hosts.jqGrid('getGridParam', 'selrow');
		var host = hosts.jqGrid('getCell', row, 'name');
		var db_name = hosts.jqGrid('getCell', row, 'db');
		var view = 'v_quickbi';
		var sql = 'create or replace view v_quickbi as ' + $('#sql').val();
		$.post('app/create_view.php', {_host_: host, _db_name_: db_name, sql: sql, view: view, _func_:'create_view'}, function(data) {
			  if(data === 'true'){
				  $('#grid_div').remove();
				  $('body').append('<div id="grid_div" style="float:left;"><table id="grid"></table></div>');
				  var grid = $('#grid');
				  grid_settings.source = 'v_quickbi';
				  grid_settings.host = host;
				  grid_settings.db_name = db_name;
				  grid.jset(grid_settings);
			  }else {
				  alert('Invalid SQL');
			  }
		});
		
	});
*/
	submit.bind('click', function(){
		var row = hosts.jqGrid('getGridParam', 'selrow');
		var host = hosts.jqGrid('getCell', row, 'name');
		var db_name = hosts.jqGrid('getCell', row, 'db_name');
		if($('#grid').jset('defined')){
			$('#grid').removeData();
			$('#grid').removeAttr();
			//alert('defined');
			$($('#grid').jqGrid('getGridParam', 'pager')).remove();
			//alert('after remove pager');
			$('#grid').jqGrid('GridDestroy');	
			//alert('after destroy');
		}
		$('#grid_div').remove();
		$('body').append('<div id="grid_div" style="float:left;"><table id="grid"></table></div>');
		//grid.jset('unload');
		var grid = $('#grid');
		grid_settings.source = $('#sql').val();
		grid_settings.host = host;
		grid_settings.db_name = db_name;
		//setTimeout(function(){grid.jset(grid_settings);}, 0);
		grid.jset(grid_settings);
	});
	
	hosts.jset(hosts_settings);
});