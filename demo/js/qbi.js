$(function(){
	
	var grid_settings = {
	  	db_remote_definitions: true,
		filterToolbar:{
			hide: false
		},
		persist: false,
		clearPersist: {
			navButtonAdd: false
		},
	    grid: {
			autowidth: true,
			height: $(window).height() - 356
	  	},
		navigation:{
			options : {view:false, del:true, edit:true, add:true}
	  	}
	};
	
	var submit = $('#submit');
	submit.bind('click', function(){
		if($('#grid').jset('defined')){
			$('#grid').removeData();
			$('#grid').removeAttr();
			$($('#grid').jqGrid('getGridParam', 'pager')).remove();
			$('#grid').jqGrid('GridDestroy');	
		}
		$('#grid_div').remove();
		$('body').append('<div id="grid_div" style="width:100%;float:left;"><table id="grid"></table></div>');
		var grid = $('#grid');
		grid_settings.source = $('#sql').val();
		grid.jset(grid_settings);
	});
});