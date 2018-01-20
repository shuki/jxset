;(function ($){
	$.extend($.jset.fn, {
	    saveObjectInLocalStorage: function (storageItemName, object){
	        if (typeof window.localStorage !== 'undefined'){
	            window.localStorage.setItem(storageItemName, JSON.stringify(object));
	        }
	    },
	    removeObjectFromLocalStorage: function (storageItemName){
	        if (typeof window.localStorage !== 'undefined'){
	            window.localStorage.removeItem(storageItemName);
	        }
	    },
	    getObjectFromLocalStorage: function (storageItemName){
	        if (typeof window.localStorage !== 'undefined'){
	            return JSON.parse(window.localStorage.getItem(storageItemName));
	        }
	    },
	    clearLocalStorage: function (){
	        if (typeof window.localStorage !== 'undefined') {
	            window.localStorage.clear();
	        }
	    },
	    
	    myColumnStateName: function (grid){
	    	var persist_parameter = (grid.data('settings').persist_parameter ? grid.data('settings')[grid.data('settings').persist_parameter] : grid[0].id);
	        return $.jset.fn.urlBaseName() + '#' + persist_parameter + (typeof user_attributes != 'undefined' && user_attributes.id != undefined ? '#' + user_attributes.id : '');
	    },
	    
	    urlBaseName: function(){
	    	var path_parts = window.location.href.split('?');
	    	var path_base = path_parts[0];
	    	return path_base + (path_base.slice(-1) == '/' ? 'index.php' : '');
	    },
	    
	    saveGridState: function (grid){
			var state = {
				//search: grid.jqGrid('getGridParam', 'search'),
				//page: grid.jqGrid('getGridParam', 'page'),
				sortname: grid.jqGrid('getGridParam', 'sortname'),
				sortorder: grid.jqGrid('getGridParam', 'sortorder'),
				colStates: {},
				otherState: {
					permutation: grid.jqGrid("getGridParam", "remapColumns")
				}
			};

	        var colModel = grid.jqGrid('getGridParam', 'colModel'), i, l = colModel.length, colItem, cmName;
	        for (i = 0; i < l; i++){
	            colItem = colModel[i];
	            if(colItem !== undefined && colItem.name !== undefined){
		            cmName = colItem.name;
		            if (cmName !== 'rn' && cmName !== 'cb' && cmName !== 'subgrid'){
		                state.colStates[cmName] = {
		                    width: colItem.width,
		                    hidden: colItem.hidden
		                };
		            }
	            }
	        }
	        $.jset.fn.saveObjectInLocalStorage($.jset.fn.myColumnStateName(grid), state);
	    },
	    
	    restoreGridState: function(grid, settings){
	    	var columnsState = $.jset.fn.getObjectFromLocalStorage($.jset.fn.myColumnStateName(grid));
	    	if(!columnsState)
	    		return settings;
	    	
	    	var colModel = settings.colModel;
	        if (columnsState.colStates) {
	            var colStates = columnsState.colStates;
	        	var colItem, i, l = colModel.length, cmName;
	            for (i = 0; i < l; i++) {
	                colItem = colModel[i];
	                cmName = colItem.name;
	                if (grid.data('index')[cmName] !== undefined && cmName !== 'rn' && cmName !== 'cb' && cmName !== 'subgrid')
	                    $.extend(true, colModel[i], colStates[cmName]);
	            }
	            delete columnsState.colStates;
	        }
	        
	        grid.data('persist_state', $.extend(true, {}, columnsState));
	        delete columnsState.otherState;
	        
	        return $.extend(true, settings, columnsState);
	    },
	    
	    getFilterToolbarState: function(grid){
	    	var search_fields = [];
	    	$.each($.jset.fn.get_filterToolbar_fields(grid), function(i, v){
	    		var item = {};
	    		item.name = $(v).attr('name');
	    		item.value = $(v).val();
    			var search_operator = $.jset.fn.get_filterToolbar_field_search_operator(grid, $(this));
	    		if(search_operator)
	    			item.soper = search_operator.attr('soper');
	    		
	    		search_fields.push(item);
	    	});
	    	
	    	return search_fields;
	    },

	    setFilterToolbarState: function(grid, search_fields){
		    $.each(search_fields, function(i, item){
		    	var search_field = $.jset.fn.get_filterToolbar_field(grid, item.name);
	    		if(search_field.length > 0){
	    			search_field.val(item.value);
	    			if(typeof item.soper != 'undefined'){
	        			var search_operator = $.jset.fn.get_filterToolbar_field_search_operator(grid, search_field);
	    	    		if(search_operator)
	    	    			$.jset.fn.set_filterToolbar_field_search_operator(grid, search_field, item.soper);
	    	    			//search_operator.attr('soper', item.soper);
	    			}
	    		}
	    	});
	    },
	    
	    versionName: function (){
	        return $.jset.fn.urlBaseName() + '#version';
	    },
	    
	    setVersionState: function(version){
	    	$.jset.fn.saveObjectInLocalStorage($.jset.fn.versionName(), version);
	    },
	    
	    getVersionState: function(){
	    	return $.jset.fn.getObjectFromLocalStorage($.jset.fn.versionName());
	    }
});
})(jQuery);