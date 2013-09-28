;(function ($) {
	$.extend($.jset.fn, {
	    getColumnIndex: function (grid, columnIndex) {
	        var cm = grid.jqGrid('getGridParam', 'colModel'), i, l = cm.length;
	        for (i = 0; i < l; i++) {
	            if ((cm[i].index || cm[i].name) === columnIndex) {
	                return i; // return the colModel index
	            }
	        }
	        return -1;
	    },	
	    refreshSerchingToolbar: function (grid, myDefaultSearch) {
	        var postData = grid.jqGrid('getGridParam', 'postData'), filters, i, l,
	            rules, rule, iCol, cm = grid.jqGrid('getGridParam', 'colModel'),
	            cmi, control, tagName;
	
	        for (i = 0, l = cm.length; i < l; i++) {
	            control = $("#gs_" + $.jgrid.jqID(cm[i].name));
	            if (control.length > 0) {
	                tagName = control[0].tagName.toUpperCase();
	                if (tagName === "SELECT") { // && cmi.stype === "select"
	                    control.find("option[value='']")
	                        .attr('selected', 'selected');
	                } else if (tagName === "INPUT") {
	                    control.val('');
	                }
	            }
	        }
	
	        if (typeof (postData.filters) === "string" &&
	                typeof (grid[0].ftoolbar) === "boolean" && grid[0].ftoolbar) {
	
	            filters = $.parseJSON(postData.filters);
	            if (filters && filters.groupOp === "AND" && typeof (filters.groups) === "undefined") {
	                // only in case of advance searching without grouping we import filters in the
	                // searching toolbar
	                rules = filters.rules;
	                for (i = 0, l = rules.length; i < l; i++) {
	                    rule = rules[i];
	                    iCol = $.jset.fn.getColumnIndex(grid, rule.field);
	                    if (iCol >= 0) {
	                        cmi = cm[iCol];
	                        control = $("#gs_" + $.jgrid.jqID(cmi.name));
	                        if (control.length > 0 &&
	                                (((typeof (cmi.searchoptions) === "undefined" ||
	                                typeof (cmi.searchoptions.sopt) === "undefined")
	                                && rule.op === myDefaultSearch) ||
	                                  (typeof (cmi.searchoptions) === "object" &&
	                                      $.isArray(cmi.searchoptions.sopt) &&
	                                      cmi.searchoptions.sopt.length > 0 &&
	                                      cmi.searchoptions.sopt[0] === rule.op))) {
	                            tagName = control[0].tagName.toUpperCase();
	                            if (tagName === "SELECT") { // && cmi.stype === "select"
	                                control.find("option[value='" + $.jgrid.jqID(rule.data) + "']")
	                                    .attr('selected', 'selected');
	                            } else if (tagName === "INPUT") {
	                                control.val(rule.data);
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    },
	    saveObjectInLocalStorage: function (storageItemName, object) {
	        if (typeof window.localStorage !== 'undefined') {
	            window.localStorage.setItem(storageItemName, JSON.stringify(object));
	        }
	    },
	    removeObjectFromLocalStorage: function (storageItemName) {
	        if (typeof window.localStorage !== 'undefined') {
	            window.localStorage.removeItem(storageItemName);
	        }
	    },
	    getObjectFromLocalStorage: function (storageItemName) {
	        if (typeof window.localStorage !== 'undefined') {
	            return JSON.parse(window.localStorage.getItem(storageItemName));
	        }
	    },
	    myColumnStateName: function (grid) {
	        return window.location.pathname + '#' + grid[0].id;
	    },
	    saveColumnState: function (perm) {
	        var colModel = this.jqGrid('getGridParam', 'colModel'), i, l = colModel.length, colItem, cmName,
	            postData = this.jqGrid('getGridParam', 'postData'),
	            columnsState = {
	                search: this.jqGrid('getGridParam', 'search'),
	                page: this.jqGrid('getGridParam', 'page'),
	                sortname: this.jqGrid('getGridParam', 'sortname'),
	                sortorder: this.jqGrid('getGridParam', 'sortorder'),
	                permutation: perm,
	                selectedRows: this.data('idsOfSelectedRows'),
	                colStates: {}
	            },
	            colStates = columnsState.colStates;
	
	        if (typeof (postData.filters) !== 'undefined') {
	            columnsState.filters = postData.filters;
	        }
	
	        for (i = 0; i < l; i++) {
	            colItem = colModel[i];
	            cmName = colItem.name;
	            if (cmName !== 'rn' && cmName !== 'cb' && cmName !== 'subgrid') {
	                colStates[cmName] = {
	                    width: colItem.width,
	                    hidden: colItem.hidden
	                };
	            }
	        }
	        $.jset.fn.saveObjectInLocalStorage($.jset.fn.myColumnStateName(this), columnsState);
	    },
	    restoreColumnState: function (colModel) {
	        var colItem, i, l = colModel.length, colStates, cmName,
	            columnsState = $.jset.fn.getObjectFromLocalStorage($.jset.fn.myColumnStateName(this));
			
	        if (columnsState) {
	            colStates = columnsState.colStates;
	            for (i = 0; i < l; i++) {
	                colItem = colModel[i];
	                cmName = colItem.name;
	                if (cmName !== 'rn' && cmName !== 'cb' && cmName !== 'subgrid') {
	                    colModel[i] = $.extend(true, {}, colModel[i], colStates[cmName]);
	                }
	            }
	        }
	        return columnsState;
	    },
	    updateIdsOfSelectedRows: function (id, isSelected) {
	    	var idsOfSelectedRows = this.data('idsOfSelectedRows');
	        var index = idsOfSelectedRows.indexOf(id);
	        if (!isSelected && index >= 0) {
	            idsOfSelectedRows.splice(index, 1); // remove id from the list
	        } else if (index < 0) {
	            idsOfSelectedRows.push(id);
	        }
	    }
	});
})(jQuery);
/*
var $grid = $("#list"),
    getColumnIndex = function (grid, columnIndex) {
        var cm = grid.jqGrid('getGridParam', 'colModel'), i, l = cm.length;
        for (i = 0; i < l; i++) {
            if ((cm[i].index || cm[i].name) === columnIndex) {
                return i; // return the colModel index
            }
        }
        return -1;
    },
    refreshSerchingToolbar = function ($grid, myDefaultSearch) {
        var postData = $grid.jqGrid('getGridParam', 'postData'), filters, i, l,
            rules, rule, iCol, cm = $grid.jqGrid('getGridParam', 'colModel'),
            cmi, control, tagName;

        for (i = 0, l = cm.length; i < l; i++) {
            control = $("#gs_" + $.jgrid.jqID(cm[i].name));
            if (control.length > 0) {
                tagName = control[0].tagName.toUpperCase();
                if (tagName === "SELECT") { // && cmi.stype === "select"
                    control.find("option[value='']")
                        .attr('selected', 'selected');
                } else if (tagName === "INPUT") {
                    control.val('');
                }
            }
        }

        if (typeof (postData.filters) === "string" &&
                typeof ($grid[0].ftoolbar) === "boolean" && $grid[0].ftoolbar) {

            filters = $.parseJSON(postData.filters);
            if (filters && filters.groupOp === "AND" && typeof (filters.groups) === "undefined") {
                // only in case of advance searching without grouping we import filters in the
                // searching toolbar
                rules = filters.rules;
                for (i = 0, l = rules.length; i < l; i++) {
                    rule = rules[i];
                    iCol = getColumnIndex($grid, rule.field);
                    if (iCol >= 0) {
                        cmi = cm[iCol];
                        control = $("#gs_" + $.jgrid.jqID(cmi.name));
                        if (control.length > 0 &&
                                (((typeof (cmi.searchoptions) === "undefined" ||
                                typeof (cmi.searchoptions.sopt) === "undefined")
                                && rule.op === myDefaultSearch) ||
                                  (typeof (cmi.searchoptions) === "object" &&
                                      $.isArray(cmi.searchoptions.sopt) &&
                                      cmi.searchoptions.sopt.length > 0 &&
                                      cmi.searchoptions.sopt[0] === rule.op))) {
                            tagName = control[0].tagName.toUpperCase();
                            if (tagName === "SELECT") { // && cmi.stype === "select"
                                control.find("option[value='" + $.jgrid.jqID(rule.data) + "']")
                                    .attr('selected', 'selected');
                            } else if (tagName === "INPUT") {
                                control.val(rule.data);
                            }
                        }
                    }
                }
            }
        }
    },
    saveObjectInLocalStorage = function (storageItemName, object) {
        if (typeof window.localStorage !== 'undefined') {
            window.localStorage.setItem(storageItemName, JSON.stringify(object));
        }
    },
    removeObjectFromLocalStorage = function (storageItemName) {
        if (typeof window.localStorage !== 'undefined') {
            window.localStorage.removeItem(storageItemName);
        }
    },
    getObjectFromLocalStorage = function (storageItemName) {
        if (typeof window.localStorage !== 'undefined') {
            return JSON.parse(window.localStorage.getItem(storageItemName));
        }
    },
    myColumnStateName = 'ColumnChooserAndLocalStorage2.colState',
    idsOfSelectedRows = [],
    saveColumnState = function (perm) {
        var colModel = this.jqGrid('getGridParam', 'colModel'), i, l = colModel.length, colItem, cmName,
            postData = this.jqGrid('getGridParam', 'postData'),
            columnsState = {
                search: this.jqGrid('getGridParam', 'search'),
                page: this.jqGrid('getGridParam', 'page'),
                sortname: this.jqGrid('getGridParam', 'sortname'),
                sortorder: this.jqGrid('getGridParam', 'sortorder'),
                permutation: perm,
                selectedRows: idsOfSelectedRows,
                colStates: {}
            },
            colStates = columnsState.colStates;

        if (typeof (postData.filters) !== 'undefined') {
            columnsState.filters = postData.filters;
        }

        for (i = 0; i < l; i++) {
            colItem = colModel[i];
            cmName = colItem.name;
            if (cmName !== 'rn' && cmName !== 'cb' && cmName !== 'subgrid') {
                colStates[cmName] = {
                    width: colItem.width,
                    hidden: colItem.hidden
                };
            }
        }
        saveObjectInLocalStorage(myColumnStateName, columnsState);
    },
    myColumnsState,
    isColState,
    restoreColumnState = function (colModel) {
        var colItem, i, l = colModel.length, colStates, cmName,
            columnsState = getObjectFromLocalStorage(myColumnStateName);

        if (columnsState) {
            colStates = columnsState.colStates;
            for (i = 0; i < l; i++) {
                colItem = colModel[i];
                cmName = colItem.name;
                if (cmName !== 'rn' && cmName !== 'cb' && cmName !== 'subgrid') {
                    colModel[i] = $.extend(true, {}, colModel[i], colStates[cmName]);
                }
            }
        }
        return columnsState;
    },
    updateIdsOfSelectedRows = function (id, isSelected) {
        var index = idsOfSelectedRows.indexOf(id);
        if (!isSelected && index >= 0) {
            idsOfSelectedRows.splice(index, 1); // remove id from the list
        } else if (index < 0) {
            idsOfSelectedRows.push(id);
        }
    },
    firstLoad = true;

myColumnsState = restoreColumnState(cm);
isColState = typeof (myColumnsState) !== 'undefined' && myColumnsState !== null;
idsOfSelectedRows = isColState && typeof (myColumnsState.selectedRows) !== "undefined" ? myColumnsState.selectedRows : [];

$grid.jqGrid({
    // ... some options
    page: isColState ? myColumnsState.page : 1,
    search: isColState ? myColumnsState.search : false,
    postData: isColState ? { filters: myColumnsState.filters } : {},
    sortname: isColState ? myColumnsState.sortname : 'invdate',
    sortorder: isColState ? myColumnsState.sortorder : 'desc',
    onSelectRow: function (id, isSelected) {
        updateIdsOfSelectedRows(id, isSelected);
        saveColumnState.call($grid, $grid[0].p.remapColumns);
    },
    onSelectAll: function (aRowids, isSelected) {
        var i, count, id;
        for (i = 0, count = aRowids.length; i < count; i++) {
            id = aRowids[i];
            updateIdsOfSelectedRows(id, isSelected);
        }
        saveColumnState.call($grid, $grid[0].p.remapColumns);
    },
    loadComplete: function () {
        var $this = $(this), i, count;

        if (firstLoad) {
            firstLoad = false;
            if (isColState) {
                $this.jqGrid("remapColumns", myColumnsState.permutation, true);
            }
            if (typeof (this.ftoolbar) !== "boolean" || !this.ftoolbar) {
                // create toolbar if needed
                $this.jqGrid('filterToolbar',
                    {stringResult: true, searchOnEnter: true, defaultSearch: myDefaultSearch});
            }
        }
        refreshSerchingToolbar($this, myDefaultSearch);
        for (i = 0, count = idsOfSelectedRows.length; i < count; i++) {
            $this.jqGrid('setSelection', idsOfSelectedRows[i], false);
        }
        saveColumnState.call($this, this.p.remapColumns);
    },
    resizeStop: function () {
        saveColumnState.call($grid, $grid[0].p.remapColumns);
    }
});

$grid.jqGrid('navGrid', '#pager', {edit: false, add: false, del: false});
$grid.jqGrid('navButtonAdd', '#pager', {
    caption: "",
    buttonicon: "ui-icon-closethick",
    title: "clear saved grid's settings",
    onClickButton: function () {
        removeObjectFromLocalStorage(myColumnStateName);
        window.location.reload();
    }
});
*/