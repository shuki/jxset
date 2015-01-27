;(function ($) {
/*
 * jset  1.0 - jset
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */

	// variable settings
	var jset = {
		dir_pre: '',
		dir_rel: '',
		url: 'jset/server/jset.php'
	};
	
	$.jset = ($.jset == undefined) ? jset : $.extend(true, jset, $.jset);
	
	// function used in defaults
	$.jset = $.extend(true, $.jset, {
		fn:{
			onclickSubmit: function(params, postdata){
				var grid = $(this);
				switch(grid.data('form_action')){
				case 'copy':
					grid.data('copy', true);
					break;
				default:
					grid.data('copy', false);
				}
			}
		}
	});

	// defaults
	$.jset = $.extend(true, $.jset, {
		defaults: {
			prmNames:{
				version: '_version_',
				source: '_source_',
				target: '_target_',
				db_name: '_db_name_',
				host: '_host_',
				db_remote_definitions: '_db_remote_definitions_',
				copy: '_copy_',
				param: '_param_'
			},
			host: '',
			db_name: '',
			db_name_target: '',
			db_remote_definitions: true,
			dir_pre: $.jset.dir_pre,
			dir_rel: $.jset.dir_rel,
			item_name: 'Record',
			searchall: false,
			url: $.jset.url,
			loading_img: '/jset/img/loading.gif',
			spacing: '20px',
			caption_class: 'CaptionField',
			row_selection: true,
			load_edit_record: false,
			reopen_after_add: false,
			pending_create: false,
			hide_submit_row: false,
			hide_horizontal_scrollbar: false,
			clearSearch: false,
			persist: true,
			filterToolbar:{
				hide: false,
				navButtonAdd: false,
				options: {
					searchOperators: true,
					searchOnEnter: false,
					stringResult: true,
					defaultSearch: 'cn',
					ignore_column_search_default: false,
					operandTitle : $.jset.messages.filterToolbar_operandTitle,
					//weakness - copied from grid.custome.js
					operands : { "eq" :"==", "ne":"!","lt":"<","le":"<=","gt":">","ge":">=","bw":"^","bn":"!^","in":"=","ni":"!=","ew":"|","en":"!@","cn":"~","nc":"!~","nu":"#","nn":"!#"},
					beforeSearch: function(){
						//var grid = $(this);
						//var postData = grid.jqGrid('getGridParam','postData');
					}
				}
			},
			clearFilterToolbar:{
				navButtonAdd: true,
				options: {
					caption: '',
					title: $.jset.nav.clearFilterToolbar,
					buttonicon: 'ui-icon-cancel',
					position: 'last'
				}
			},
			help:{
				hide: false,
				navButtonAdd: true,
				dialog: {
					autoOpen: false,
					title: $.jset.nav.help,
					width: 600,
					position: 'top'
				},
				options: {
					caption:'',
					title: $.jset.nav.help, 
					buttonicon :'ui-icon-lightbulb', 
					position: 'last'
				}
			},
			dump:{
				navButtonAdd: false,
				dialog: {
					autoOpen: false,
					title: $.jset.nav.dump,
					width: 1000,
					position: 'top'
				}
			},
			copy:{
				navButtonAdd: true,
				showFormInit: null,
				properties: {
					closeAfterAdd: true,
					editCaption: $.jset.nav.copyCaption,
					viewPagerButtons: false,
					onclickSubmit: $.jset.fn.onclickSubmit
				},
				clear_id: true,
				options: {
					caption: '',
					title: $.jset.nav.copy,
					buttonicon: 'ui-icon-copy',
					position: 'first'
				}
			},
			setup:{
				navButtonAdd: false,
				options: {
					caption:'',
					title: $.jset.nav.setup, 
					buttonicon :'ui-icon-wrench'
				},
				settings: {
					source: 'jset_help',
					setup:{
						navButtonAdd: false
					},
					grid:{
						width: 860
					},
					navigation:{
						options : {
							add: false,
							del: false,
							search: false,
							refresh: true,
							view: true
						}
					}
				},
				dialog: {
					autoOpen: false,
					title: $.jset.nav.setup,
					width: 880,
					position: ['left', 'top']
				}
			},
			'export':{
				navButtonAdd: true,
				options: {
					caption: '',
					title: $.jset.nav.export,
					buttonicon: 'ui-icon-star',
					position: 'last'
				},
				associative:'both'
			},
			'import': {
				navButtonAdd: false,
				options: {
					caption: '',
					title: $.jset.nav.import,
					buttonicon: 'ui-icon-arrowthickstop-1-n',
					position: 'last'
				},
				fineUploader: {
					options: {
				        debug: false,
				        request: {
				            endpoint: $.jset.dir_pre + 'jset/server/jset_upload.php',
				            inputName: "userfile",
				            paramsInBody: true,
				            params: {
				            	//dir: "files/",
				            	max: "10000000"
				            }
				        },
						  text: {
						    uploadButton: ''
						  },
						  template: '<div class="qq-uploader">' +
						              '<pre class="qq-upload-drop-area"><span>{dragZoneText}</span></pre>' +
						              '<table><tr><td><div class="qq-upload-button fm-button ui-state-default ui-corner-all fm-button-icon-left" style="width: 24px; height: 16px;">{uploadButtonText}<span class="ui-icon ui-icon-folder-open"></span></div></td>' +
						              '<td><div><span class="file-link-target"></span></div></td>' +
						              '<td><div><span class="file-icon-target"></span></div></td>' +
						              '<td><div class="qq-trash-button fm-button ui-state-default ui-corner-all fm-button-icon-left" style="width: 24px; height: 16px;">{uploadButtonText}<span class="ui-icon ui-icon-close"></span></div></td>' +
						              '<td><div id="qq-progress-bar" class="qq-progress-bar"></div></td></tr></table>' +
						              '<span class="qq-drop-processing"><span>{dropProcessingText}</span><span class="qq-drop-processing-spinner"></span></span>' +
						              '<ul class="qq-upload-list" style="margin-top: 10px; text-align: center;"></ul>' +
						            '</div>',
						  classes: {
						    success: 'alert alert-success',
						    fail: 'alert alert-error'
						  },
						  validation: {
						  	acceptFiles: 'csv',
						  	allowedExtensions: ['csv']
						  }
					},
					events: {
						error: function(event, id, fileName, reason) {
							alert("Error - id: " + id + ", fileName: " + fileName + ", reason: " + reason);
						},
						complete: function(event, id, filename, response){
							var grid = $.jset.fn.get_grid_by_element(this);
							if(response.error !== undefined){
								alert(response.error);
								return;
							}
					
							$.jset.fn.import(grid, response.fileName, function(data){
								if(data.error !== undefined){
									alert(data.error);
									return;
								}
								
								if(data > 0)
									grid[0].triggerToolbar();
								alert(data + ' ' + $.jset.messages.recordsAdded);
							});
					   },
					   progress: function (event, id, fileName, uploadedBytes, totalBytes) {
							if (uploadedBytes < totalBytes) {
								var progress = Math.round(uploadedBytes / totalBytes * 100);
								
								$('div.qq-progress-bar', this).show()
								.css('width', (progress > 20 ? progress : '20') + 'px')
								.html(progress + '%');
							}
							else {
								$('div.qq-progress-bar', this).hide();
							}
						}
					}
				}
			},
			columnChooser:{
				navButtonAdd: true,
				options: {
					caption: '',
					//title: 'Choose Columns',
					title: $.jset.nav.columnChooserTitle,
					buttonicon: 'ui-icon-calculator',
					position: 'last'
				},
				multiselect:{
				    locale: {
				        addAll: $.jset.nav.addAll,
				        removeAll: $.jset.nav.removeAll,
				        itemsCount: $.jset.nav.itemsCount
				    }
				},
				col:{
				    width: 420,
					modal: false,
				    msel_opts: {dividerLocation: 0.5},
				    dialog_opts: {
				        minWidth: 470,
				        minHeight: 370,
				        show: 'blind',
				        hide: 'explode'
				    }
				}
			},
			clearPersist: {
				navButtonAdd: true,
				options: {
				    caption: "",
				    buttonicon: "ui-icon-closethick",
				    title: $.jset.nav.clearPersistTitle,
				    onClickButton: function () {
				    	grid = $(this);
				    	$.jset.fn.storeFilterToolbar.call(grid);
				        $.jset.fn.removeObjectFromLocalStorage($.jset.fn.myColumnStateName(grid));
				        grid.jset('reload');
				        //localStorage.clear();
				    }
				}				
			},
			empty: false,
			single_record: {
				active: false,
				displayAlert: false,
				mode: '',
				options:{
					closeOnEscape: false,
					closeAfterEdit: false,
					closeAfterAdd: false,
					reloadAfterSubmit: false,
					drag: false,
					resize: false,
					viewPagerButtons: false,
					editCaption: $.jset.nav.editCaption,
					addCaption: $.jset.nav.addCaption
				}
			},
			search_default: [],
			filter:{},
			db_fields: {
				host: '',
				db_name: ''
			},
			validate:{
				meta: 'validate',
				tooltip: {items: ":input", position: {my: 'right center', at: 'right+30, top-10 center', collision: "none"}, tooltipClass:'top'},
				invalidHandler: function(form, validator) {
				    var errors = validator.numberOfInvalids();
				    if (errors) {
				        validator.errorList[0].element.focus();
				    }
				},
		        errorPlacement: function (error, element) {
		        	var grid = $.jset.fn.get_grid_by_formid($(element).closest('form'));
		        	//to take care of wrongly displaying an error tooltip before a form is oppened.
		        	if($(element).is(":visible")){
			        	$(element).prop('tooltip', $(error).text())
			        	.tooltip(grid.data('settings').validate.tooltip)
			            .tooltip( "option", "content", $(error).text())
			            .tooltip('open')
			            .unbind('mouseleave')
			            .unbind('mouseover');
		        	}
		        },
		        success: function (label, element) {
		        	$.jset.fn.clear_tooltip(element);
		        }				
			},
			grid: {        
				prmNames:{
					page: '_page_',
					rows: '_rows_',
					sort: '_order_by_',
					order: '_order_direction_',
					search: '_search_',
					nd: '_nd_',
					id: '_id_',
					oper: '_methods_',
					editoper: 'edit',
					addoper: 'add',
					deloper: 'delete'
				},
				scroll: 1,
				scrollrows: true,
				page:1,
				url: $.jset.dir_rel + $.jset.url,
				editurl: $.jset.dir_rel + $.jset.url,
				cellurl: '',
				cellEdit: false,
				cellurl: $.jset.dir_rel + $.jset.url,
				rowEdit: true,
				rowurl: '',
				datatype: 'json',
				shrinkToFit: true,
				height: 400,
				width: 1100,
				colNames:[],
				colModel:[],
				rowNum:100,
				mtype: 'POST',
				rownumbers: true,
				rownumWidth: 40,
				gridview: true,
				pager: '#pscrolling0',
				direction: 'ltr',
				altRows: true,
				altclass: 'altclass',
				viewrecords: true,
				//sortorder: 'asc',
				multiSort: false,
				caption: '',
				//toolbar : [true,'top'],
				toppager: false,
				footerrow : false,
				userDataOnFooter : false, 
				hiddengrid: false,
				sortable: true
			},
			navigation:{
				options : {
					search: true,
					refresh: true,
					view: false,
					cloneToTop: false,
					refreshstate: 'current',
					editfunc: function(id, options){
						var grid = $(this);
						grid.data('form_action', 'edit');
						if (grid.data('settings').load_edit_record)
							$.jset.fn.load_edit_record(grid, id, options);
						else
							$.jset.fn.editfunc(grid, id, options);
					},
					viewfunc: function(id, options){
						var grid = $(this);
						grid.data('form_action', 'view');
						if (grid.data('settings').load_edit_record)
							$.jset.fn.load_edit_record(grid, id, options);
						else
							$.jset.fn.editfunc(grid, id, options);
					},
					addfunc: function(options){
						var grid = $(this);
						grid.data('form_action', 'add');
						$.jset.fn.addfunc(grid, options);
					}
				},
				edit:{
					width: 'auto',
					reloadAfterSubmit: true,
					jqModal: true,
					closeOnEscape: false,
					closeAfterEdit: true,
					closeAfterAdd: true,
					//checkOnUpdate: true,
					onclickSubmit: $.jset.fn.onclickSubmit
				},
				add:{
					width: 'auto',
					reloadAfterSubmit: true,
					jqModal: true,
					closeOnEscape: false,
					closeAfterAdd: true,
					clearAfterAdd: false,
					closeAfterEdit: true,
					//checkOnUpdate: true,
					onclickSubmit: $.jset.fn.onclickSubmit
				},
				del:{
					reloadAfterSubmit: true,
					jqModal: true,
					closeOnEscape: false
				},
				search:{
					closeOnEscape: false,
					multipleSearch:true,
					multipleGroup:true,
					showQuery: false,
					sFilter:'_filters_',
					top: '100',
					left: '200'
				},
				view:{
					width: 'auto',
					jqModal: true,
					closeOnEscape: false
				}
			}
		}
	});

	// main function
	$.fn.jset = function(param){
		if (typeof param == 'string') {
		  	var f = $.jset.fx[param];
		  	if (!f) {
		  		throw ('jset - No such method: ' + param);
		  	}
		  	var args = $.makeArray(arguments).slice(1);
		  	return f.apply(this, args);
		}
		
		var t = this;
		t.p = $.extend(true, {}, $.jset.defaults, events, param || {});
		$(t).append('<img src="' + $.jset.dir_pre + t.p.loading_img + '">');
		$.jset.fn.set_source_param(t.p);
		
		$.jset.fn.get_grid_definitions(t.p, function(data){
			$.jset.fn.version_check(data);

			if(!$.jset.fn.fetch_grid(t.p.source))
				$.jset.fn.store_grid(t.p.source, data);

			if($.isFunction(t.p.after_get_grid_definitions))
				t.p.after_get_grid_definitions.call(t, data);
				
			t.p.grid.caption = $.jset.fn.set(t.p.grid.caption, data.table.title);
			$.jset.fn.define_grid_columns(data.columns, t);

			t.each(function(i){
				$.jset.fn.setup_grid(t, i, data);
			});
		});
	
		return this;
	};	

	// exposed functions - called using the form $(grid).jset('defined')	
	$.jset.fx = {
		defined: function(){
			return ($(this).data('settings') != undefined);
		},
		
		unload: function(unfetch_grid){
			var grid = $(this);
			var container = $.jset.fn.get_grid_container(grid);
	    	if(unfetch_grid)
	    		$.jset.fn.unfetch_grid(grid.data('settings').source);
			$.each($('table.jset_table', container).not(grid), function(){
				$(this).jset('unload', [unfetch_grid]);
			});
			if(grid.data('settings') && grid.data('settings').detail){
				$.each(grid.data('settings').detail, function(){
					$.jset.fn.get_elem(this.elem).jset('unload', [unfetch_grid]);
				});
			}
			
			if(grid.data('settings').searchall === true)
				grid.data('searchall').elem.off();
			$($(this).jqGrid('getGridParam', 'pager')).remove();
			$(this).jqGrid('GridUnload');
		},
		
		pending_reload: function(){
	    	grid = $(this);
	    	if(grid.jset('defined'))
	    		grid.data('pending_reload', true);
		},
		
		reload: function(unfetch_grid){
	    	grid = $(this);	
	    	grid.data('pending_reload', false);
	        //$.jset.fn.removeObjectFromLocalStorage($.jset.fn.myColumnStateName(grid));
	        var filterToolbarState = $.jset.fn.getFilterToolbar.call(grid);
	        var settings = $.extend(true, {}, grid.data('settings'), {filterToolbar: {options: {ignore_column_search_default: true}}});
	        if(filterToolbarState)
	        	settings.search_default = filterToolbarState.search_default;
	        var id = grid.attr('id');
	        grid.jset('unload', [unfetch_grid]);
	        return $('table#' + id).jset(settings);
		},
		
		getMultiselectedRows: function(){
			var grid = $(this);
			if(!grid.data('settings').grid.multiselect)
				return false;
				
			return (grid.data('settings').grid.scroll == 1) ? 
				grid.jqGrid('getGridParam','selarrrow') :
				grid.data('multiselectedRows').array.slice();
		},
		
		getMultiselectedRowsData: function(){
			var grid = $(this);
			if(!grid.data('settings').grid.multiselect)
				return false;
				
			return (grid.data('settings').grid.scroll == 1) ? 
				false :
				$.extend(true, {}, grid.data('multiselectedRows').rows);
		},
		
		resetMultiselectedRows:function(){
			var grid = $(this);
			$.jset.fn.resetMultiselectedRows.call(grid);
		}		
	};

	// common events
	var add_edit_events = {
		beforeInitData: function(formid){
			var grid = $(this);
			$.each(grid.data('columns'), function(){
				if($.isFunction($.jset.defaults.control[this.control].beforeInitData))
					$.jset.defaults.control[this.control].beforeInitData.call(grid, formid);
			});	
					
			if($.isFunction(grid.data('settings').beforeInitData))
				grid.data('settings').beforeInitData.call(grid, formid);
		},
		
		onInitializeForm : function(formid) {
			var grid = $(this);			
			$.metadata.setType('attr', grid.data('settings').validate.meta);
			$(formid).validate(grid.data('settings').validate);

			if(grid.data('settings').template !== undefined && grid.data('settings').template.use)
				$.jset.fn.template_apply.call(grid, formid, grid.data('settings').template);
				
/*			$.each(grid.data('columns'), function(){
				if($.isFunction($.jset.defaults.control[this.control].onInitializeForm))
					$.jset.defaults.control[this.control].onInitializeForm.call(grid, formid, this.index || this.Field);
			});*/
			$.jset.fn.run_columns_event(grid, formid, 'onInitializeForm');
			$.jset.fn.set_help_tips(grid, formid);
			$('select,input', $(formid)).addClass('FormElement ui-widget-content ui-corner-all');

			if(grid.data('settings').hide_submit_row) 
				$(formid).parent().find('#TblGrid_' + grid.attr('id') + '_2').hide();
			
			if($.isFunction(grid.data('settings').onInitializeForm))
				grid.data('settings').onInitializeForm.call(grid, formid);
		},
		
		beforeInitData : function(formid){
			var grid = $(this);
			if($.isFunction(grid.data('settings').beforeInitData))
				grid.data('settings').beforeInitData.call(grid, formid);
		},
		
		beforeShowForm: function(formid){
			var grid = $(this);

			//$.jset.fn.closeSubForms(formid, grid);
			
			$.each(grid.data('columns'), function(){
				if($.isFunction($.jset.defaults.control[this.control].beforeShowForm))
					$.jset.defaults.control[this.control].beforeShowForm.call(grid, formid, this.index || this.Field);
			});
			
			$.jset.fn.readonlySet(grid, formid, $.jset.fn.readonlyCheck(grid));
			
			if($.isFunction(grid.data('settings').beforeShowForm))
				grid.data('settings').beforeShowForm.call(grid, formid);			
		},
		
		afterShowForm: function(formid){
			$(formid).validate().resetForm();
			var grid = $(this);
			$.each(grid.data('columns'), function(){
				if($.isFunction($.jset.defaults.control[this.control].afterShowForm))
					$.jset.defaults.control[this.control].afterShowForm.call(grid, formid, this.index || this.Field);
			});			
			var id = $(formid).find('#id').val();
			if(grid.data('copy_form')){
				grid.data('copy_form', false);
				var source_id = $(formid).find('#id').val();
				if(grid.data('settings').copy.clear_id)
					$(formid).find('#id').val('');
				if($.isFunction(grid.data('settings').copy.showFormInit))
					grid.data('settings').copy.showFormInit.call(grid, formid, source_id);
			}
			if($.isFunction(grid.data('settings').afterShowForm))
				grid.data('settings').afterShowForm.call(grid, formid);			
		},
		
		onclickPgButtons : function (whichbutton, formid, rowid){
			var grid = $(this);
			
			grid.jqGrid('setGridParam', {scrollrows: true});
			$.jset.fn.clear_form_tooltips(formid);
			var subforms = $.jset.fn.closeSubForms(formid, grid);
			if(subforms.is(':visible'))
				return false;

			if($.isFunction(grid.data('settings').onclickPgButtons))
				grid.data('settings').onclickPgButtons.call(grid, whichbutton, formid, rowid);
		},
		
		afterclickPgButtons : function(whichbutton, formid, rowid){
			var grid = $(this);
			$.each(grid.data('columns'), function(){
				if($.isFunction($.jset.defaults.control[this.control].afterclickPgButtons))
					$.jset.defaults.control[this.control].afterclickPgButtons.call(grid, whichbutton, formid, rowid, this.Field);
			});
			
			if(grid.data('settings').load_edit_record === true)
				$.jset.fn.load_edit_record(grid, rowid, $.extend(true, {}, grid.data('settings').navigation.edit, {focusSelector: false,  formid: formid}));
			
			if($.isFunction(grid.data('settings').afterclickPgButtons))
				grid.data('settings').afterclickPgButtons.call(grid, whichbutton, formid, rowid);
		},
		
		beforeSubmit: function(postdata, formid){
			var grid = $(this);
			if(!$(formid).valid())
				return [false, ''];
			
			var validation_error = '';
			eval(grid.data('table').validation);
			if(validation_error)
			{
				$('html, body').animate({ scrollTop: 0 }, 200);
				return [false, validation_error];
			}
			
			/*var colModel = grid.data('settings').grid.colModel;
			$.each(colModel, function(i){
				if(this.index != this.name){
					postdata[this.index] = postdata[this.name];
					delete postdata[this.name];
				}
			});*/
			var post = $.jset.fn.unformat_columns(this, postdata);
			var hard_post = {};
			
			$.each(grid.data('settings').filter, function(){
				hard_post[this.target] = $.jset.fn.get_filterToolbar_field(grid, this.target).val();
			});
			
			if(grid.data('settings').target)
				hard_post[grid.data('settings').prmNames.target] = $.jset.fn.get_value(grid.data('settings').target);
			if(grid.data('settings').host)
				hard_post[grid.data('settings').prmNames.host] = $.jset.fn.get_value(grid.data('settings').host);
			if(grid.data('settings').db_name)
				hard_post[grid.data('settings').prmNames.db_name] = $.jset.fn.get_value(grid.data('settings').db_name);
			if(grid.data('settings').db_name_target)
				hard_post[grid.data('settings').prmNames.db_name] = $.jset.fn.get_value(grid.data('settings').db_name_target);
			if($.jset.version)
				hard_post[grid.data('settings').prmNames.version] = $.jset.version;

			if(grid.data('copy')){
				var obj = $.extend(true, {}, grid.jqGrid('getGridParam', 'prmNames'), {
					editoper: 'add'
				});
				grid.jqGrid('setGridParam', {
					prmNames: obj
				});
				hard_post[grid.data('settings').prmNames.copy] = true; 
			}
			
			var postData = grid.jqGrid('getGridParam', 'postData');
			hard_post[grid.data('settings').grid.prmNames.sort] = postData[grid.data('settings').grid.prmNames.sort];
			hard_post[grid.data('settings').grid.prmNames.order] = postData[grid.data('settings').grid.prmNames.order];
			hard_post[grid.data('settings').grid.prmNames.rows] = postData[grid.data('settings').grid.prmNames.rows];
			if(postData['filters'] != undefined)
				hard_post['filters'] = postData['filters'];
			if(postData['_searchall_'] != undefined)
				hard_post['_searchall_'] = postData['_searchall_'];
			
			$.extend(postdata, post, hard_post);
			
			if($.isFunction(grid.data('settings').beforeSubmit))
				return grid.data('settings').beforeSubmit.call(grid, postdata, formid);
			
			return [true];
		},
	
		afterSubmit: function(response, postdata, frmoper){
			var grid = $(this);
			
			if(grid.data('copy')){
				grid.data('copy', false);
				var obj = $.extend(true, {}, grid.jqGrid('getGridParam', 'prmNames'), {
					editoper: 'edit'
				});
				grid.jqGrid('setGridParam', {
					prmNames: obj
				});
			}

			var obj = $.parseJSON(response.responseText);
			if(obj.error !== undefined){
				if($.isFunction(grid.data('settings').afterSubmitError))
					return grid.data('settings').afterSubmitError.call(grid, response, postdata, frmoper, obj);
					
				if(obj.error.type !== undefined && obj.error.type == 'version'){
					setTimeout(function(){$.jset.fn.version_check(obj);}, 0);
					var message = $.jset.messages.versionUpdated;
				}
				else
					var message = obj.error.message;
				return [false, message];
			}
			
			if(grid.data('settings').single_record.active && grid.data('settings').single_record.displayAlert)
				alert('record updated successfuly');
			
			if(obj.id !== undefined)
				grid.data('lastID', obj.id);

			var return_value = [true];
			if($.isFunction(grid.data('settings').afterSubmit))
				return_value = grid.data('settings').afterSubmit.call(grid, response, postdata, frmoper, obj);
			
			if(return_value[0] && (grid.data('form_action') ==  'add' || grid.data('form_action') ==  'copy') && grid.data('settings').reopen_after_add)
				grid.data('reopen_form', obj.id);
			
			grid.data('row_number', obj.row_number);
			
			return return_value;
		},
		
		onClose: function(formid){
			var formid_parameter = formid;
			var grid = $(this);
			formid = $(formid).find('form').first();
			
			$.jset.fn.clear_form_tooltips(formid);
			
			var subforms = $.jset.fn.closeSubForms(formid, grid);
			if(subforms.is(':visible'))
				return false;
				
			$.each(grid.data('columns'), function(){
				if($.isFunction($.jset.defaults.control[this.control].onClose))
					$.jset.defaults.control[this.control].onClose.call(grid, formid, this.index || this.Field);
			});			

			var return_value = true;
			if($.isFunction(grid.data('settings').onClose))
				return_value = grid.data('settings').onClose.call(grid, formid);
			
			return return_value;
		}
	};
	
	// events
	var events = {
		grid: {
			beforeRequest: function(){
				var grid = $(this);
				var container = $.jset.fn.get_grid_container(grid);
				var post = grid.jqGrid('getGridParam', 'postData');
				var post_columns = $.jset.fn.unformat_columns(this);
				post_columns[grid.data('settings').prmNames.source] = $.jset.fn.get_value(grid.data('settings').source);
				if(grid.data('settings').db_name) post_columns[grid.data('settings').prmNames.db_name] = $.jset.fn.get_value(grid.data('settings').db_name);
				if(grid.data('settings').host) post_columns[grid.data('settings').prmNames.host] = $.jset.fn.get_value(grid.data('settings').host);
				if(!grid.data('settings').db_remote_definitions) post_columns[grid.data('settings').prmNames.db_remote_definitions] = grid.data('settings').db_remote_definitions;
				if($.jset.version)
					post_columns[grid.data('settings').prmNames.version] = $.jset.version;
		
				if (grid.data('init')) {
					grid.data('init', false);
					
					if(grid.data('settings').searchall === true){
						grid.data('searchall', {
							phrase: '', 
							elem: $('div.jset-grid-searchall input', container.parent())
						});

						grid.data('searchall').elem.parent().width(container.width());
						grid.data('searchall').elem.removeAttr('disabled').focus()
						.on('keyup', function(e, l){
							if(grid.data('searchall').timer)
								clearTimeout(grid.data('searchall').timer);
								
							grid.data('searchall').timer = setTimeout(
								function(){
									$.jset.fn.searchall_action(grid);
								}, e.keyCode == '13' ? 0 : 500);
						});	
					}			

					$.jset.fn.initMultiselectedRows.call(grid);
											
					if (grid.data('settings').empty) {
						post_columns[grid.data('settings').grid.prmNames.oper] = 'grid_empty';
						$.extend(post, post_columns);
						return;
					}
		
					if (grid.data('settings').search_default.length > 0) {
						return false;
					}
				} 
									
				if(grid.data('index')[post._order_by_] != undefined){
					var order_by_name = post['_order_by_'] + '_name';
					if(post._order_by_ && grid.data('columns')[grid.data('index')[post._order_by_]].list && typeof grid.data('columns')[grid.data('index')[post._order_by_ + '_name']] != "undefined")
						post._order_by_ = post._order_by_ + '_name';
				} else
					delete post._order_by_;
					
				if(grid.data('settings').searchall && grid.data('searchall') && grid.data('searchall').elem.val())
					post._searchall_ = grid.data('searchall').elem.val();
				else
					delete post._searchall_;
					
				if(grid.data('export') === true){
					grid.data('export', false);

					if($.isFunction(grid.data('settings').beforeRequest))
						grid.data('settings').beforeRequest.call(grid);
					
					var colModel = grid.jqGrid('getGridParam', 'colModel');
					var fields = [];
					$.each(colModel, function(i){
						if(!this.hidden && this.name != 'rn')
						{
							if(grid.data('settings').export.associative == 'both')
								if(typeof grid.data('index')[this.index + '_name'] != 'undefined')
									fields.push(this.index + '_name');

							fields.push(this.index);
						}
					});

					var get = $.extend({}, post, post_columns);
					get[grid.data('settings').grid.prmNames.oper] = 'export';
					var url = grid.data('settings').dir_rel + $.jset.defaults.url + '?';
					$.each(get, function(key, value){
						url += key + '=' + value + '&';
					});

					if(fields.length == 0)
						return;

					url += '_fields_=' + JSON.stringify(fields);
					window.open(url, '_parent');
					return;
				}

				post_columns[grid.data('settings').grid.prmNames.oper] = 'grid_rows';
				
				if(grid.data('row_number')){
					var page = grid.data('row_number') == 0 ? 1 : Math.ceil(grid.data('row_number') / post[grid.data('settings').grid.prmNames.rows]);
					post[grid.data('settings').grid.prmNames.page] = page;
					grid.removeData('row_number');
					grid.jqGrid('setGridParam', {scrollrows: true});
				} 
				else
					grid.jqGrid('setGridParam', {scrollrows: false});
					
				$.extend(post, post_columns);

				if($.isFunction(grid.data('settings').beforeRequest))
					grid.data('settings').beforeRequest.call(grid);
					
				//$.jset.fn.setNavigationSelectedFilters.call(grid, post['filters']);
				$.jset.fn.setNavigationSelectedFilters.call(grid, post);
			},
			
			gridComplete: function(){
				
			},
		
			loadComplete: function(data){
				$.jset.fn.version_check(data);
				var grid = $(this);
				var container = $.jset.fn.get_grid_container(grid);

				if (grid.data('loadCompleteInit')) {
					grid.data('loadCompleteInit', false);

					//disable right click row selections
					var getEvents = $._data(grid[0], "events");
					if (getEvents && getEvents.contextmenu && getEvents.contextmenu.length === 1) {
					    var orgContextmenu = getEvents.contextmenu[0].handler;
					    grid.unbind('contextmenu', orgContextmenu);
					    grid.bind('contextmenu', function(e) {
					        var oldmultiselect = this.p.multiselect, result;
					        this.p.multiselect = true; // set multiselect to prevent selection
					        result = orgContextmenu.call(this, e);
					        this.p.multiselect = oldmultiselect; // restore multiselect
					        return result;
					    });
					}
					
					$('select,input', container).addClass('FormElement ui-widget-content ui-corner-all');
						
					$('td.ui-search-input > input', container)
					.on('focus.jset', function(){
		   				var save_this = $(this);
					    setTimeout (function(){ 
					       save_this.select(); 
					    },0);
					});

					$('td.ui-search-oper > a', container).css('padding', '0');
					
					grid.data('grid_width', grid.jqGrid('getGridParam', 'width'));

		            if(grid.data('settings').persist && grid.data('persist_state') && grid.data('persist_state').otherState){
		            	if(grid.data('persist_state').otherState.permutation.length)
		            		grid.jqGrid('remapColumns', grid.data('persist_state').otherState.permutation, true);
		            }
		            
		            if(grid.data('settings').hide_horizontal_scrollbar)
		            	$('.ui-jqgrid .ui-jqgrid-bdiv').css('overflow-x', 'hidden');
		                
					if($.isFunction(grid.data('settings').loadCompleteInit))
						grid.data('settings').loadCompleteInit.call(grid, data);
				}
				
				if(grid.data('settings').persist)
					$.jset.fn.saveGridState.call(grid);
				 
				if(grid.data('settings').detail){
					$.each(grid.data('settings').detail, function(){
						if(!grid.data('settings').pending_create || (grid.data('settings').pending_create && $.jset.fn.get_elem(this.elem).is(':visible'))){
							if(!$.jset.fn.get_elem(this.elem).jset('defined'))
								$.jset.fn.get_elem(this.elem).jset($.extend(true, {master: grid}, this.settings));
						}
					});
				}
				
				if(grid.data('settings').master){
					grid.data('loaded', true);
				}

				if(grid.data('settings').row_selection === true && grid.jqGrid('getGridParam', 'records') != 0 && !grid.data('settings').grid.multiselect){ //todo remove check for multiselect, control it by row_selection
					if(grid.data('lastID')){
						grid.jqGrid('setSelection', grid.data('lastID'));
						grid.data('lastID', false);
						if(!grid.jqGrid('getGridParam', 'selrow'))
							grid.jqGrid('setSelection', grid.jqGrid('getDataIDs')[0]);
					}
					else
						grid.jqGrid('setSelection', grid.jqGrid('getDataIDs')[0]);
				}
				else if(grid.data('settings').detail)
				{ //&& grid.data('settings').detail.elem.data('loaded')
					grid.data('last_selection', null);
					$.jset.fn.filter_details(grid, '_empty_');
				}
				if(grid.data('SelectedCell') != undefined && grid.jqGrid('getGridParam', 'records') != 0)		
					grid.jqGrid("editCell", grid.data('SelectedCell').row, grid.data('SelectedCell').col, false);

				if(grid.data('settings').single_record.active)
					$.jset.fn.single_record(grid);
		
				$.jset.fn.selectMultiselectedRows.call(grid);

				var nav_buttons = $('#edit_' + grid.attr('id') + ', #view_' + grid.attr('id') + ', #export_' + grid.attr('id'), $.jset.fn.get_grid_container(grid));
				grid.getGridParam("reccount") == 0 ? nav_buttons.addClass('ui-state-disabled') : nav_buttons.removeClass('ui-state-disabled');
	
				var del_copy_buttons = $('#del_' + grid.attr('id') + ', #copy_' + grid.attr('id'), $.jset.fn.get_grid_container(grid));
				grid.getGridParam("reccount") != 0 && !$.jset.fn.readonlyCheck(grid) ? del_copy_buttons.removeClass('ui-state-disabled') : del_copy_buttons.addClass('ui-state-disabled');

				var add_button = $('#add_' + grid.attr('id'), $.jset.fn.get_grid_container(grid));
				!$.jset.fn.readonlyCheck(grid) ? add_button.removeClass('ui-state-disabled') : add_button.addClass('ui-state-disabled');

				if($.isFunction(grid.data('settings').loadComplete))
					grid.data('settings').loadComplete.call(grid, data);
					
				if(grid.data('reopen_form')){
					var id = grid.data('reopen_form');
					grid.removeData('reopen_form');
					grid.data('settings').navigation.options.editfunc.call(grid, id, $.extend(true, {}, grid.data('settings').navigation.edit, {focusSelector: false}));
				}
			},
			beforeSelectRow: function (rowid, e) {
			    var grid = $(this);
			    if(grid.data('settings').grid.cellEdit === true)
			    	return true;
			    	
			    if(grid.data('settings').row_selection !== true)
			    	return false;
			    	
			    if(grid.data('settings').grid.multiselect){
					var i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
			        cm = grid.jqGrid('getGridParam', 'colModel');
				    if(cm[i].name === 'cb' && $(e.target).attr('id') && $(e.target).attr('id').substr(0,4) === 'jqg_'){
			        	$.jset.fn.updateMultiselectedRow.call(grid, rowid, $(e.target).attr('checked') == 'checked');
			        	$.jset.fn.updateNavigationSelectedCounter.call(grid);
			        	return true;
				    }
			    } else
			    	return true;
			},
			onSelectRow: function(id, isSelected) {
				var grid = $(this);
				var selrow = grid.jqGrid('getGridParam', 'selrow');
				
				if(id != grid.data('last_selection')){
					if (grid.data('settings').detail){
						$.each(grid.data('settings').detail, function(i){
							var elem = $.jset.fn.get_elem(this.elem);
							if(this.recreate && elem.jset('defined')){
								var settings = this.settings;
								elem.jset('unload', [true]);
								if(settings.db_fields){
									settings.host = settings.db_fields.host ? grid.jqGrid('getCell', id, settings.db_fields.host) : '';
									settings.db_name = settings.db_fields.db_name ? grid.jqGrid('getCell', id, settings.db_fields.db_name) : '';
								}
								elem = $.jset.fn.get_elem(this.elem);
								setTimeout(function(){elem.jset($.extend(true, {master: grid}, settings));}, 0);
							}
						});

						$.jset.fn.db_details(grid, id);
						$.jset.fn.filter_details(grid, id);
					}
					grid.data('last_selection', id);
					
					if($.isFunction(grid.data('settings').onSelectRow))
						grid.data('settings').onSelectRow.call(grid, id, isSelected);
				}
			},
			
			onSelectAll: function (aRowids, isSelected) {
				var grid = $(this);
				var ids = grid.jqGrid('getGridParam','selarrrow');
				$.jset.fn.updateMultiselectedRows.call(grid, aRowids, isSelected);
		    },

			ondblClickRow: function(rowId, iRow, iCol, e){
				var grid = $(this);					
				if(rowId && grid.data('settings').navigation.options.edit != false && !grid.data('settings').grid.multiselect){
					grid.data('settings').navigation.options.editfunc.call(grid, rowId, grid.data('settings').navigation.edit);
					grid.jqGrid('setSelection',rowId);	
				}
			},
			
			resizeStop: function () {
				var grid = $(this);
				if(grid.data('settings').persist)
					$.jset.fn.saveGridState.call(grid);
			},
			
			onSelectCell: function(rowid, cellname, value, iRow, iCol){
				var grid = $(this);
				grid.data('SelectedCell', {row: iRow, col: iCol});
				
				if($.isFunction(grid.data('settings').onSelectCell))
					grid.data('settings').onSelectCell.call(grid, rowid, cellname, value, iRow, iCol);
			},
			   
			afterEditCell: function(rowid, cellname, value, iRow, iCol){
				var grid = $(this);
				$('td.edit-cell', grid).find(':input').select();
				
				if($.isFunction(grid.data('settings').afterEditCell))
					grid.data('settings').afterEditCell.call(grid, rowid, cellname, value, iRow, iCol);
			},
			
			beforeSubmitCell: function(rowid, cellname, value, iRow, iCol){
				var grid = $(this);
				var hard_post = {};
				hard_post[grid.data('settings').prmNames.source] = $.jset.fn.get_value(grid.data('settings').source);
				if(grid.data('settings').target)
					hard_post[grid.data('settings').prmNames.target] = $.jset.fn.get_value(grid.data('settings').target);
				if(grid.data('settings').host)
					hard_post[grid.data('settings').prmNames.host] = $.jset.fn.get_value(grid.data('settings').host);
				if(grid.data('settings').db_name)
					hard_post[grid.data('settings').prmNames.db_name] = $.jset.fn.get_value(grid.data('settings').db_name);
				if(grid.data('settings').db_name_target)
					hard_post[grid.data('settings').prmNames.db_name] = $.jset.fn.get_value(grid.data('settings').db_name_target);
				if($.jset.version)
					hard_post[grid.data('settings').prmNames.version] = $.jset.version;
					
				if($.isFunction(grid.data('settings').beforeSubmitCell))
					return $.extend(hard_post, grid.data('settings').beforeSubmitCell.call(grid, rowid, cellname, value, iRow, iCol));

				return hard_post;
			},
			
			afterSaveCell: function (rowid, cellname, value, iRow, iCol){
				var grid = $(this);
				
				if($.isFunction(grid.data('settings').afterSaveCell))
					grid.data('settings').afterSaveCell.call(grid, rowid, cellname, value, iRow, iCol);
			}
		},
		
		navigation:{
			edit: add_edit_events,			
			add: add_edit_events,
			
			view:{
				beforeShowForm: function(formid){
					var grid = $(this);
					//$.jset.fn.set_help_tips(grid, formid);
					//$.jset.fn.readonly_fields(formid);
					//$('#sData', $.jset.fn.get_grid_container(grid)).hide();
					if($.isFunction(grid.data('settings').beforeShowFormView))
						grid.data('settings').beforeShowFormView.call(grid, formid);
				}
			},
			
			del:{
				afterSubmit: function(response, postdata){
					var grid = $(this);
					var obj = $.parseJSON(response.responseText);
					if(obj.error !== undefined){
						if(obj.error.type !== undefined && obj.error.type == 'version'){
							var message = $.jset.messages.versionUpdated;
							setTimeout(function(){$.jset.fn.version_check(obj);}, 0);
						}
						else
							var message = obj.error.message + '<br />' + (obj.error.dump !== undefined ? obj.error.dump : '') + '<br />' + (obj.error.info !== undefined ? (obj.error.info[0] + '<br />' + obj.error.info[1] + '<br />' + obj.error.info[2]) : '');
						return [false, message];
					}
					
					if(grid.data('settings').single_record.active && grid.data('settings').single_record.displayAlert)
						alert('record deleted!');

					if($.isFunction(grid.data('settings').afterSubmit))
						grid.data('settings').afterSubmit.call(grid, response, postdata);
			
					return [true];
				},
				
				onclickSubmit : function(eparams){
					var grid = $(this);
					var post = {};
					var settings = grid.data('settings');
					if(settings.target)
						post[settings.prmNames.target] = $.jset.fn.get_value(settings.target);
					if(settings.host)
						post[settings.prmNames.host] = $.jset.fn.get_value(settings.host);
					if(settings.db_name)
						post[settings.prmNames.db_name] = $.jset.fn.get_value(settings.db_name);
					if(settings.db_name_target)
						post[settings.prmNames.db_name] = $.jset.fn.get_value(settings.db_name_target);
					if($.jset.version)
						post[settings.prmNames.version] = $.jset.version;
					return post;
				},

				beforeSubmit: function(id){
					return [true];
				}
			}
		}
	};

	// public functions	
	$.extend($.jset.fn, {
		colNames: function(col){
			return col.title ? col.title : col.Comment ? col.Comment : col.Field;
		},
		
		get_column: function(grid, column_name){
			return grid.data('index')[column_name] != undefined ? grid.data('columns')[grid.data('index')[column_name]] : false;
		},
		
		get_grid_container: function(grid){
			return $('div#gbox_' + grid.attr('id'));
		},
		
		get_grid_from_container: function(container){
			return container.find('table.jset_table[id="' + container.attr('id').replace('gbox_', '') +'"]');
		},
		
		get_grid: function(id){
			return $('div#gview_' + id).find('.jset_table');
		},
		
		get_grid_by_formid: function(formid){
			return $('table#' + $(formid).attr('id').substr(8));
		},
		
		get_formid_by_grid: function(grid){
			return $('form#FrmGrid_' + $(grid).attr('id'));
		},
		
		get_grid_by_element: function(elem){
			var container_div_id = $(elem).parents('div[id^="gbox_"]:first').attr('id');
			var grid_id = container_div_id.substr(5);
			return $('table[id=' + grid_id + ']' );
		},
		
		get_form_field: function(formid, name){
			var exclude = $("div.ui-jqgrid[id^='gbox_'] .FormElement, .ui-search-input .FormElement", $(formid).closest('form'));
			return $(formid).find(':input[name=' + name + '],table[name=' + name + ']').not(exclude);
		},
		
		get_form_field_label: function(formid, name){
			return $(formid).find('label[for=' + name + ']');
		},
		
		get_form_field_value: function(formid, name){
			var field = $.jset.fn.get_form_field(formid, name);
			var grid = $.jset.fn.get_grid_by_formid(formid);
			var colModel = grid.jqGrid('getGridParam', 'colModel');
			$.each(colModel, function(){
				if(this.index == name && this.editoptions && $.isFunction(this.editoptions.custom_value))
					return this.editoptions.custom_value.call(grid, field, 'get');
			});
			
			return field.val();
		},
		
		set_form_field_value: function(formid, name, value){
			var field = $.jset.fn.get_form_field(formid, name);
			var grid = $.jset.fn.get_grid_by_formid(formid);
			var colModel = grid.jqGrid('getGridParam', 'colModel');
			$.each(colModel, function(){
				if(this.index == name && this.editoptions && $.isFunction(this.editoptions.custom_value))
					return this.editoptions.custom_value.call(grid, field, 'set', value);
			});
			
			return field.val(value);
		},
		
		get_filterToolbar_field: function(grid, field_name){
			//var exclude = $("div.ui-jqgrid[id^='gbox_'] .FormElement, .ui-search-input .FormElement", $.jset.fn.get_grid_container(grid));
			var exclude = $("div.ui-jqgrid[id^='gbox_'] .FormElement", $.jset.fn.get_grid_container(grid));
			return $(':input[id=gs_' + field_name + ']', $.jset.fn.get_grid_container(grid)).not(exclude);
		},
		
		show_field: function(formid, name){
			$.jset.fn.get_form_field_label(formid, name).show();
			return $.jset.fn.get_form_field(formid, name).show();
		},

		hide_field: function(formid, name){
			$.jset.fn.get_form_field_label(formid, name).hide();
			return $.jset.fn.get_form_field(formid, name).hide();
		},

		enable_show_field: function(formid, name){
			$.jset.fn.enable_field(formid, name);
			$.jset.fn.show_field(formid, name);
		},

		disable_hide_field: function(formid, name){
			$.jset.fn.disable_field(formid, name);
			$.jset.fn.hide_field(formid, name);
		},
		
		enable_field: function(formid, name){
			return $.jset.fn.get_form_field(formid, name)
			.removeAttr('disabled')
			.removeAttr('readonly')
			.removeClass('jset-field-readonly');
		},

		disable_field: function(formid, name){
			return $.jset.fn.get_form_field(formid, name).attr('disabled', true)
			.addClass('jset-field-readonly');
		},

		readonly_field: function(formid, name){
			return $.jset.fn.get_form_field(formid, name).attr('readonly', 'readonly')
			.addClass('jset-field-readonly');
		},

		disable_fields: function(formid){
			var grid = $.jset.fn.get_grid_by_formid(formid);
			$.each(grid.data('settings').grid.colModel, function(i, col){
				if(col.editoptions.custom_options && $.isFunction(col.editoptions.custom_options.disable))
					col.editoptions.custom_options.disable(formid, col.index);
				else
					$.jset.fn.disable_field(formid, col.index);
			});
		},
		
		readonly_fields: function(formid){
			var grid = $.jset.fn.get_grid_by_formid(formid);
			$.each(grid.data('settings').grid.colModel, function(i, col){
				if(col.editoptions.custom_options && $.isFunction(col.editoptions.custom_options.readonly))
					col.editoptions.custom_options.readonly.call(grid, formid, col.index);
				else
					$.jset.fn.readonly_field(formid, col.index);
			});
		},
		
		enable_fields: function(formid){
			var grid = $.jset.fn.get_grid_by_formid(formid);
			$.each(grid.data('settings').grid.colModel, function(i, col){
				if(!col.editoptions.readonly)
					if(col.editoptions.custom_options && $.isFunction(col.editoptions.custom_options.enable))
						col.editoptions.custom_options.enable.call(grid, formid, col.index);
					else
						$.jset.fn.enable_field(formid, col.index);
			});
		},
		
		readonlyCheck: function(grid){
			return $('a[id=sData]', grid.closest('form').siblings('table.EditTable')).length && 				
				!$('a[id=sData]', grid.closest('form').siblings('table.EditTable')).is(':visible');
		},
		
		readonlySet: function(grid, formid, flag){
			if(flag)
			{
				$.jset.fn.readonly_fields(formid);
				$('a[id=sData]', $.jset.fn.get_grid_container(grid)).hide();
			}
			else
			{	
				$.jset.fn.enable_fields(formid);
				$('a[id=sData]', $.jset.fn.get_grid_container(grid)).show();				
			}
		},
		
		block: function(elem, options){
			options = $.extend(true, {
				message: $.jgrid.defaults.loadtext,
				overlayCSS: {
					backgroundColor: '#AAAAAA',
					opacity: 0.3
				}
			}, options);
			$(elem).block(options);
		},
		
		pending_refresh: function(context){
			$.each($('table.jset_table', context), function(){
				grid = $(this);
				if (grid.data('pending_refresh') && grid.data('settings').master.jqGrid('getGridParam','selrow') != grid.data('pending_refresh') && grid.is(':visible')) {
					grid.data('pending_refresh', false);
					this.triggerToolbar();
				}
			});
		},
		
		pending_create: function(context){
			$.each($('table.jset_table', context), function(){
				grid = $(this);
				if(grid.data('settings').detail){
					$.each(grid.data('settings').detail, function(){
						if(!$.jset.fn.get_elem(this.elem).jset('defined') && $.jset.fn.get_elem(this.elem).is(':visible'))
							$.jset.fn.get_elem(this.elem).jset($.extend(true, {master: grid}, this.settings));
					});
				}
			});
		},
		
		registerGridDefinition: function(name, definition){
			var obj = {};
			obj[name] = definition;
			$.jset.gridDefinitions = $.extend($.jset.gridDefinitions || {}, true, obj);
		},
		
		unregisterGridDefinition: function(name){
			name ? delete $.jset.gridDefinitions[name] : delete $.jset.gridDefinitions;
		},
		
		getGridDefinition: function(name){
			return name ? $.jset.gridDefinitions[name] : $.jset.gridDefinitions;
		},
		
		get_rows: function(grid, sql, callback){
			var params = {
				_methods_: 'rows',
				_source_: sql,
				_no_init_: true,
				async: false
			};
			if (grid.data('settings').host) 
				params[grid.data('settings').prmNames.host] = grid.data('settings').host;
			if (grid.data('settings').db_name) 
				params[grid.data('settings').prmNames.db_name] = grid.data('settings').db_name;
			if($.jset.version)
				params[grid.data('settings').prmNames.version] = $.jset.version;

			$.post(grid.data('settings').grid.url, params, callback, 'json');
		},
		
		'import': function(grid, filename, callback){
			var params = {
				_methods_: 'import',
				_source_: grid.data('settings').source,
				_filename_: filename,
				_fields_: [],
				async: false
			};
			if (grid.data('settings').host) 
				params[grid.data('settings').prmNames.host] = grid.data('settings').host;
			if (grid.data('settings').db_name) 
				params[grid.data('settings').prmNames.db_name] = grid.data('settings').db_name;
			if($.jset.version)
				params[grid.data('settings').prmNames.version] = $.jset.version;

			if(grid.data('settings').filter.length > 0)
				$.each(grid.data('settings').filter, function(){
					params['_fields_'].push({name: this.target, value: $.jset.fn.get_filterToolbar_field(grid, this.target).val()});
				});
				
			if($.isFunction(grid.data('settings').beforeImport))
				grid.data('settings').beforeImport.call(grid, params);

			params['_fields_'] = JSON.stringify(params['_fields_']);			
			$.post(grid.data('settings').grid.url, params, callback, 'json');
		},
		
		hub: function(url, params, callback){
			$.post(url, params, callback, 'json');
		},

		store_grid: function(source, data){
			var obj = {};
			obj[source] = data;
			$.jset.gridStore = $.extend($.jset.gridStore || {}, true, obj);
		},
		
		fetch_grid: function(source){
			return $.jset.gridStore ? (source ? $.jset.gridStore[source] : $.jset.gridStore) : false;
		},
		
		unfetch_grid: function(source){
			source ? delete $.jset.gridStore[source] : delete $.jset.gridStore;
		},
		
		get_grid_definitions: function(settings, callback){
			var grid_definitions = $.jset.fn.fetch_grid(settings.source);
			if(grid_definitions){
				callback.call(this, grid_definitions);
				return;
			}
			
			var jsetParams = {};
			jsetParams[settings.grid.prmNames.oper] = 'columns,table,index';
			jsetParams[settings.prmNames.source] = settings.source;
			if(settings.db_name && settings.db_remote_definitions) jsetParams[settings.prmNames.db_name] = settings.db_name;
			if(settings.host && settings.db_remote_definitions) jsetParams[settings.prmNames.host] = settings.host;
			if($.jset.version)
				jsetParams[settings.prmNames.version] = $.jset.version;
				
			if(settings.params)
				$.each(settings.params, function(key, value){
					jsetParams[settings.prmNames.param + key] = value;
				});	
			$.post(settings.dir_rel + settings.url, jsetParams, callback, 'json');
		},
		
		set_source_param: function(settings){
			var obj = {};
			obj[settings.prmNames.source] = settings.source;
			if(settings.db_name) obj[settings.prmNames.db_name] = settings.db_name;
			if(settings.host) obj[settings.prmNames.host] = settings.host;
			if(!settings.db_remote_definitions) obj[settings.prmNames.db_remote_definitions] = settings.db_remote_definitions;
			if($.jset.version)
				obj[settings.prmNames.version] = $.jset.version;
				
			settings.navigation.edit.editData = obj;
			settings.navigation.add.editData = obj;
			if(settings.target){
				var delobj = $.extend({}, obj);
				delobj[settings.prmNames.target] = settings.target;
				settings.navigation.del.delData = delobj;
			}else
				settings.navigation.del.delData = obj;
		},

		setup_grid: function(t, i, data){
			var grid = $(t[i]);
			grid.data({
				settings: t.p,
				columns: data.columns,
				table: data.table,
				index: data.index,
				store: {},
				init: true,
				loadCompleteInit: true,
				loaded: false,
				lastID: false,
				idsOfSelectedRows: []
			});

			$.jset.fn.set_master_details(grid);
			$.jset.fn.create_pager_div(grid, i);
			grid.addClass('jset_table');
			if(grid.data('settings').searchall === true && grid.parent('div.jset-grid-container').length == 0){
				var div = $('<div class="jset-grid-container"></div>')
					.insertBefore(grid)
					.append('<div class="jset-grid-searchall ui-widget-header ui-corner-all ui-state-default"><label class="jset-grid-searchall">' + $.jset.captions.searchall +
					 ': </label><input class="ui-widget-content ui-corner-all" disabled="disabled" size="60" /></div>')
					.append(grid)
					.css('direction', grid.data('settings').grid.direction);
			}
				
			var grid_settings = {};
			if(grid.data('settings').persist){
				$.extend(true, grid_settings, t.p.grid);
				$.jset.fn.restoreGridState.call(grid, grid_settings);
			}
			grid.jqGrid(t.p.persist ? grid_settings : grid.data('settings').grid);

			if(grid.data('settings').persist)
				$.jset.fn.get_grid_container(grid).bind("sortstop", function(){
				    $.jset.fn.saveGridState.call(grid);
				});
				
			$.jset.fn.create_navigator(grid, $.jset.fn.get_grid_container(grid));															
			if(grid.data('settings').create_navigator === false)
				$('div.ui-jqgrid-pager', $.jset.fn.get_grid_container(grid)).hide();
			
			if(grid.data('settings').grid.scroll == 1)
				$('td' + grid.data('settings').grid.pager + '_center', $.jset.fn.get_grid_container(grid)).css('width', '0');
		},
		
		create_pager_div: function(grid, i){
			var pname = 'pscrolling_' + grid.attr('id') + i;
			$('body').append('<div id="' + pname + '"></div>');
			grid.data('settings').grid.pager = '#' + pname;
		},
		
		create_navigator: function(grid, grid_container){
			grid.jqGrid('navGrid', grid.data('settings').grid.pager,
				grid.data('settings').navigation.options,
				$.extend(true, grid.data('settings').navigation.edit, $.jset.fn.navigation_edit(grid)),
				$.extend(true, grid.data('settings').navigation.add, $.jset.fn.navigation_add(grid)),
				grid.data('settings').navigation.del,
				grid.data('settings').navigation.search,
				grid.data('settings').navigation.view
			);
			
			$.jset.fn.navigator_clear_filter_toolbar_button(grid, grid_container);
			$.jset.fn.navigator_refresh_button(grid, grid_container);
			$.jset.fn.navigator_export_button(grid, grid_container);
			$.jset.fn.navigator_import_button(grid, grid_container);
			$.jset.fn.navigator_filter_button(grid, grid_container);
			$.jset.fn.navigator_copy_button(grid, grid_container);
			$.jset.fn.navigator_help_button(grid, grid_container);
			$.jset.fn.navigator_dump_button(grid, grid_container);
			$.jset.fn.navigator_setup_button(grid, grid_container);
			$.jset.fn.navigator_columnChooser_button(grid, grid_container);
			$.jset.fn.navigator_clearPersist_button(grid, grid_container);
			$.jset.fn.filter_toolbar_init(grid, grid_container);
		},
		
		navigation_add: function(grid){
			return {
				addCaption: $.jgrid.format($.jset.nav.addCaption, grid.data('settings').item_name)
			};
		},
		
		navigation_edit: function(grid){
			return {
				//top: -1,
				editCaption: $.jgrid.format($.jset.nav.editCaption, grid.data('settings').item_name)
			};
		},
		
		navigator_refresh_button: function(grid, grid_container){
			if(grid.data('settings').navigation.options.refresh){
				$('td#refresh_' + grid.attr('id'), grid_container).unbind('click');
				$('td#refresh_' + grid.attr('id'), grid_container).bind('click', function(){
					grid[0].triggerToolbar();
				});
				
				if (grid.data('settings').navigation.options.cloneToTop) {
					$('td#refresh_' + grid.attr('id') + '_top', grid_container).unbind('click');
					$('td#refresh_' + grid.attr('id') + '_top', grid_container).bind('click', function(){
						grid[0].triggerToolbar();
					});
				}
			}
		},
		
		navigator_clear_filter_toolbar_button: function(grid, grid_container){
			if (!grid.data('settings').filterToolbar.hide && grid.data('settings').clearFilterToolbar.navButtonAdd){
				var options = $.extend(true, {}, grid.data('settings').clearFilterToolbar.options,
					{onClickButton: function(){
						grid_container.find('tr.ui-search-toolbar input[id^="gs_"]:visible, tr.ui-search-toolbar select[id^="gs_"]:visible').val('');
						grid[0].triggerToolbar();
					}});
				
				grid.jqGrid('navButtonAdd', grid.data('settings').grid.pager, options);
				if (grid.data('settings').navigation.options.cloneToTop)
					grid.jqGrid('navButtonAdd', grid.attr('id') + '_toppager', options);
			}
		},
		
		navigator_export_button: function(grid, grid_container){
			if (grid.data('settings').export.navButtonAdd){
				var options = $.extend(true, {}, grid.data('settings').export.options,
					{onClickButton: function(){
						grid.data('export', true);
						grid[0].triggerToolbar();
					},
					id: 'export_' + grid.attr('id')
					});
				
				grid.jqGrid('navButtonAdd', grid.data('settings').grid.pager, options);
				if (grid.data('settings').navigation.options.cloneToTop)
					grid.jqGrid('navButtonAdd', grid.attr('id') + '_toppager', options);
			}
		},
		
		navigator_import_button: function(grid, grid_container){
			if (grid.data('settings').import.navButtonAdd){
				var options = $.extend(true, {}, grid.data('settings').import.options,
					{onClickButton: function(){
						$('input[type="file"]', $(grid.data('settings').grid.pager)).trigger('click');
					}
				});
				
				grid.jqGrid('navButtonAdd', grid.data('settings').grid.pager, options);
				$('<div class="upload-file-div" style="display:none;"></div>').appendTo($(grid.data('settings').grid.pager))
					.fineUploader(grid.data('settings').import.fineUploader.options)
					.on('error', grid.data('settings').import.fineUploader.events.error)
					.on('complete', grid.data('settings').import.fineUploader.events.complete)
					.on('progress', grid.data('settings').import.fineUploader.events.progress);

				if (grid.data('settings').navigation.options.cloneToTop)
					grid.jqGrid('navButtonAdd', grid.attr('id') + '_toppager', options);
			}
		},
		
		navigator_filter_button: function(grid, grid_container){
			if (grid.data('settings').filterToolbar.navButtonAdd){
				var options = {
					caption:'',
					title:'Toggle Search Toolbar',
					buttonicon :'ui-icon-search',
					onClickButton:function(){
						grid[0].toggleToolbar();
						var height = grid.jqGrid('getGridParam', 'height');
						grid.jqGrid('setGridHeight', $('tr.ui-search-toolbar', grid_container).css('display') == 'none' ? height + 23 : height - 23);
					}
				};
				
				grid.jqGrid('navButtonAdd',grid.data('settings').grid.pager, options);
				if (grid.data('settings').navigation.options.cloneToTop)
					grid.jqGrid('navButtonAdd', grid.attr('id') + '_toppager', options);
			}
		},

		navigator_help_button: function(grid, grid_container){
			if(grid.data('settings').help.navButtonAdd && grid.data('table').help !== undefined && grid.data('table').help){
				var help = $('<div id ="' + 'help_' + grid.attr('id') + '"></div>');
				help.html(grid.data('table').help);
				grid_container.append(help);
				help.dialog(grid.data('settings').help.dialog);
				
				var options = $.extend(true, {}, grid.data('settings').help.options,
					{onClickButton:function(){
						help.dialog('isOpen') ? help.dialog('close') : help.dialog('open');					
					}});
				
				grid.jqGrid('navButtonAdd',grid.data('settings').grid.pager, options);				
				if (grid.data('settings').navigation.options.cloneToTop)
					grid.jqGrid('navButtonAdd', grid.attr('id') + '_toppager', options);			
			}
		},
		
		navigator_setup_button: function(grid, grid_container){
			if (grid.data('settings').setup.navButtonAdd){
				var setup_id = 'setup_' + grid.attr('id');
				var setup = $('<div></div>');
				setup.html('<table id ="' + setup_id + '"></table>');
				grid_container.append(setup);
				setup.dialog(grid.data('settings').setup.dialog);
				
				var options = $.extend(true, {}, grid.data('settings').setup.options,
					{
					onClickButton:function(){
						if(!$('#' + setup_id).jset('defined'))
							$('#' + setup_id).jset($.extend(true, {}, grid.data('settings').setup.settings, {search_default:[{name: 'parent', value: grid.data('table').id}]}));
						var position = grid_container.offset();
						setup.dialog('isOpen') ? setup.dialog('close') : setup.dialog('option', 'position', [parseInt(position.left), parseInt(position.top)]), setup.dialog('open');
					}
				});
				
				grid.jqGrid('navButtonAdd',grid.data('settings').grid.pager, options);			
				if (grid.data('settings').navigation.options.cloneToTop)
					grid.jqGrid('navButtonAdd', grid.attr('id') + '_toppager', options);		
			}
		},
		
		navigator_dump_button: function(grid, grid_container){
			if(grid.data('settings').dump.navButtonAdd){
				grid.data('settings').dump.id = 'dump_' + grid.attr('id');
				var dump = $('<textarea cols="100" rows="20" id ="' + grid.data('settings').dump.id + '"></textarea>');
				grid_container.append(dump);
				dump.dialog(grid.data('settings').dump.dialog);
				
				var options = {
					caption:'',
					title:'SQL Dump',
					buttonicon :'ui-icon-comment',
					position: 'last',
					onClickButton:function(){
						dump.dialog('isOpen') ? dump.dialog('close') : dump.dialog('open');
						if(dump.dialog('isOpen')){
							var id = grid.jqGrid('getGridParam', 'selrow');
							if (id > 0) {
								$('#' + grid.data('settings').dump.id).html('');
								$.jset.fn.get_dump(grid, grid.data('settings'), function(data){
									$('#' + grid.data('settings').dump.id).html(htmlspecialchars(data));
									$('#' + grid.data('settings').dump.id).focus().select();
								});
							}						
						}
					}
				};
				
				grid.jqGrid('navButtonAdd',grid.data('settings').grid.pager, options);
				if (grid.data('settings').navigation.options.cloneToTop)
					grid.jqGrid('navButtonAdd', grid.attr('id') + '_toppager', options);			
			}
		},
		
		navigator_copy_button: function(grid, grid_container){
			if (grid.data('settings').copy.navButtonAdd) {
				var options = $.extend(true, {}, grid.data('settings').copy.options,
					{
						onClickButton: function(){
							var id = grid.jqGrid('getGridParam', 'selrow');
							if (id > 0) {
								grid.data('copy_form', true);
								grid.data('form_action', 'copy');
								var options = $.extend(true, {}, grid.data('settings').navigation.edit , grid.data('settings').copy.properties);
								if($.isFunction(grid.data('settings').copyfunc))
									grid.data('settings').copyfunc.call(grid, id, options);
								else					
									grid.jqGrid('editGridRow', id, options);
							}
					},
					id: 'copy_' + grid.attr('id')
				});
				
				grid.jqGrid('navButtonAdd', grid.data('settings').grid.pager, options);
				if (grid.data('settings').navigation.options.cloneToTop)
					grid.jqGrid('navButtonAdd', grid.attr('id') + '_toppager', options);
			}
		},
		
		navigator_columnChooser_button: function(grid, grid_container){
			if (grid.data('settings').columnChooser.navButtonAdd) {
				var options = $.extend(true, {}, grid.data('settings').columnChooser.options,
					{
						onClickButton: function(){
							grid.jqGrid('columnChooser',{
								done: function (perm) {
				                    if (perm) {
				                        grid.jqGrid("remapColumns", perm, true);
				                        grid.jqGrid("setGridWidth", grid.data('grid_width'));
										if(grid.data('settings').persist)
											$.jset.fn.saveGridState.call(grid);
									}
								}
							});
					}
				});
				$.extend(true, $.ui.multiselect, grid.data('settings').columnChooser.multiselect);
				$.extend(true, $.jgrid.col, grid.data('settings').columnChooser.col);	
							
				grid.jqGrid('navButtonAdd', grid.data('settings').grid.pager, options);
				if (grid.data('settings').navigation.options.cloneToTop)
					grid.jqGrid('navButtonAdd', grid.attr('id') + '_toppager', options);
			}
		},

		navigator_clearPersist_button: function(grid, grid_container){
			if(grid.data('settings').persist && grid.data('settings').clearPersist.navButtonAdd) {
				grid.jqGrid('navButtonAdd', grid.data('settings').grid.pager, grid.data('settings').clearPersist.options);
				if (grid.data('settings').navigation.options.cloneToTop)
					grid.jqGrid('navButtonAdd', grid.attr('id') + '_toppager', grid.data('settings').clearPersist.options);
			}
		},

		get_dump: function(grid, settings, callback){
			var jsetParams = {};
			jsetParams[settings.grid.prmNames.oper] = 'dump';
			jsetParams[settings.prmNames.source] = $.jset.fn.get_value(settings.source);
			jsetParams[settings.grid.prmNames.id] = grid.jqGrid('getGridParam', 'selrow');
			jsetParams['_editing_state_'] = grid.jqGrid('getCell', jsetParams[settings.grid.prmNames.id], 'editing_state');
			if(settings.db_name && settings.db_remote_definitions) jsetParams[settings.prmNames.db_name] = settings.db_name;
			if(settings.host && settings.db_remote_definitions) jsetParams[settings.prmNames.host] = settings.host;		
			if($.jset.version)
				jsetParams[settings.prmNames.version] = $.jset.version;
			$.post(settings.dir_rel + settings.url, jsetParams, callback, 'json');
		},
		
		filter_toolbar_init: function(grid, grid_container){
			grid.jqGrid('filterToolbar', grid.data('settings').filterToolbar.options);
			if (grid.data('settings').filterToolbar.hide)
				grid[0].toggleToolbar();
			
			if (grid.data('settings').search_default.length > 0) {
				$.each(grid.data('settings').search_default, function(i){
					var acolModel = grid.data('settings').grid.colModel[grid.data('index')[this.name]];
					if(acolModel != undefined){
						//var $elem = $('#gs_' + acolModel.name, grid_container);
						var $elem = $('tr.ui-search-toolbar', $.jset.fn.get_grid_container(grid)).find('input[name=' + acolModel.name + '], select[name=' + acolModel.name + ']');
						if(acolModel.stype === 'custom' && acolModel.searchoptions != undefined && $.isFunction(acolModel.searchoptions.custom_value))
							acolModel.searchoptions.custom_value.call(grid, $elem, "set", this.value);
						else
							$elem.val(this.value);

		    			var asoper = $elem.closest('tr').find('td.ui-search-oper').find('a.soptclass');
		    			if(asoper != undefined){
		    				asoper.attr('soper', this.soper);
			    			asoper.html(grid.data('settings').filterToolbar.options.operands[this.soper]);
		    			}
					}
				});
				grid[0].triggerToolbar();
			}
		},
		
		define_grid_columns: function(columns, t){
			$.each(columns, function(i){
				t.p.grid.colNames[i] = $.jset.fn.colNames(this);
				t.p.grid.colModel[i] = $.jset.fn.colModel(this, i, t);
				if(this.search_default) $.jset.fn.search_default(this, t);
			}); 
		},

		set_master_details: function(grid){
			if(grid.data('settings').master){
				var row = grid.data('settings').master.jqGrid('getGridParam', 'records') != 0 ? grid.data('settings').master.jqGrid('getGridParam','selrow') : '_empty_';
				$.each(grid.data('settings').filter, function(){
					grid.data('settings').search_default.push({
						name: this.target,
						value: row == '_empty_' ? row : grid.data('settings').master.jqGrid('getCell', row, this.source)
					});
				});
				
				if(row != '_empty_'){
					if(grid.data('settings').db_fields.host)
						grid.data('settings').host = grid.data('settings').master.jqGrid('getCell', row, grid.data('settings').db_fields.host);
					if(grid.data('settings').db_fields.db_name)
						grid.data('settings').db_name = grid.data('settings').master.jqGrid('getCell', row, grid.data('settings').db_fields.db_name);
				}
			}
		},
		
		colModel: function(col, i, t){
			var obj = {};
			var col_object = $.jset.fn.get_col_object(col);
			obj.name = col.index ? col.index : col.Field;
			obj.index = col.Field;
			obj.width = col.width ? col.width : 80;
			obj.align = $.jset.fn.align(col, t);
			if(col.hidden == 1){
				obj.hidden = true;
				obj.hidedlg = true;
			}
			if(col.unsortable == 1) obj.sortable = false;
			obj.export = col.export;
			obj.editable = (col.noedit == 1) ? false : true;
			obj.edittype = $.jset.fn.edittype(col, t);
			obj.editoptions = $.jset.fn.editoptions(col, t);
			obj.editrules = $.jset.fn.editrules(col);
			obj.formatter = $.jset.fn.formatter(col, t);
			obj.unformat = $.jset.fn.unformat(col);
			obj.formatoptions = $.jset.fn.formatoptions(col, t);
			obj.formoptions = $.jset.fn.formoptions(col, i, t, col_object);
			obj.searchoptions = $.jset.fn.searchoptions(col, t);
			obj.stype = $.jset.fn.stype(col, t);
			
			if(col_object.searchoptions && col_object.searchoptions.sopt && obj.searchoptions.sopt && obj.searchoptions.sopt.length > 0)
				obj.searchoptions.sopt = [];
				
			obj = $.extend(true, {}, obj, col_object);
			
			return obj;
		},
		
		get_col_object: function(col){
			if (col.object){
				try {
					return eval('({' + col.object + '})');
				} 
				catch (e) {
					alert( 'column ' + obj.name + '\nobject definition ' + e.name + '\n' + e.message);
				}
			}
			else
				return {};
		},
		
		search_default: function(col, t){
			if(t.p.filterToolbar.options.ignore_column_search_default === true)
				return;
				
		  	t.p.search_default.push({
		  		name: col.Field,
		  		value: col.search_default
		  	});
		},
		
		align: function(col, t){
			return (t.p.control[col.control] && t.p.control[col.control].align) ? t.p.control[col.control].align : t.p.control.align;
		},
		
		formatter: function(col, t){
		  	var f = $.jset.fn[col.control + '_formatter'];
			return (t.p.control[col.control] && t.p.control[col.control].formatter) ? t.p.control[col.control].formatter : f ? f : '';
		},

		unformat: function(col){
		  	var f = $.jset.fn[col.control + '_unformatter'];
		  	return f ? f : null;
		},

		formatoptions: function(col, t){
			var obj = {};
			if (t.p.control[col.control]) 
				if (t.p.control[col.control].formatoptions) 
					$.extend(true, obj, t.p.control[col.control].formatoptions);
				
			if(col.precision){
				obj.decimalPlaces = col.precision;
				return obj;
			}
			
			return $.isEmptyObject(obj) ? undefined : obj;
		},

		edittype: function(col, t){
			return (t.p.control[col.control] && t.p.control[col.control].edittype) ? t.p.control[col.control].edittype : t.p.control.edittype;
		},

		editoptions: function(col, t){
			var obj = {};
			if(col.validation) obj[t.p.validate.meta] = '{' + t.p.validate.meta + ':{' + col.validation + '}}';
			if(col.readonly == 1)
			{ 
				obj.readonly = 'readonly';
				obj.class = 'jset-field-readonly';
			}
			if(t.p.control[col.control]){
				if(t.p.control[col.control].edittype){
					if(t.p.control[col.control].edittype == 'custom'){
						if(!(t.p.control[col.control].editoptions && t.p.control[col.control].editoptions.custom_element && t.p.control[col.control].editoptions.custom_value)){
							obj.custom_element = $.jset.fn[col.control + '_element'];
							obj.custom_value = $.jset.fn[col.control + '_value'];
						}
					}
				}		
				if(t.p.control[col.control].editoptions){
					$.each(t.p.control[col.control].editoptions, function(key, value){
						if(key == 'custom_element' || key == 'custom_value'){
							obj[key] = value;
						}else{
							if($.isFunction(value)) value = value(col);
							if(key === 'value'){
								if(col.values && col.values.error !== undefined)
									alert('critical error in select options of field: ' +  col.Field + '\n' + col.values.error.message + '\n' + col.values.error.dump);
								else
									obj.value = col.values ? col.values : value;
							}else 
								obj[key] = value;
						}
					});
				}
			}
							
			return obj;
		},

		editrules: function(col){
			var obj = {};
			if(col.edithidden == 1)	obj.edithidden = true;
			return obj;
		},
				
		searchoptions: function(col, t){
			var obj = {};
			obj.name =  col.index;
			if(t.p.control[col.control]){
				if(t.p.control[col.control].searchoptions){
					$.each(t.p.control[col.control].searchoptions, function(key, value){
						if(key == 'custom_element' || key == 'custom_value'){
							obj[key] = value;
						}else{
							if($.isFunction(value)) value = value(col);
							if(key === 'value'){
								if(col.values && col.values.error !== undefined)
									alert('critical error in select options of search field: ' +  col.Field + '\n' + col.values.error.message + '\n' + col.values.error.dump);
								else
//									obj.value = col.values ? $.extend({}, value, col.values) : value;
									obj.value = col.values ? col.values : value;
							}
							else
								obj[key] = value;
						}
					});
				}
			}
			
			if(t.p.clearSearch === false)
				obj.clearSearch = false;
			return obj;
		},

		stype: function(col, t){
			return (t.p.control[col.control] && t.p.control[col.control].stype) ? t.p.control[col.control].stype : t.p.control.stype;
		},
		
		formoptions: function(col, i, t, col_object){
			var obj = {};
			var control_formoptions = t.p.control[col.control] && t.p.control[col.control].formoptions ? t.p.control[col.control].formoptions : {};
			var col_formoptions = col_object.formoptions ? col_object.formoptions : {};
			var options = $.extend(true, {}, control_formoptions, col_formoptions);
			if(col.rowpos){
				obj.rowpos = col.rowpos;
				obj.elmprefix = '<label name="' + col.Field +'" ' + (options.label_hide ? '' : 'class="' + t.p.caption_class + '"') + ' for="' + (col.index ? col.index : col.Field) + '">' + (options.label_hide ? '' : $.jset.fn.colNames(col) + ': ') + "</label>";
				obj.elmsuffix = '<span name="' + col.Field + '_span" style="display:inline-block; width:' + t.p.spacing + '"/>';
				obj.label = col.rowlabel;
			}else{
				obj.rowpos = i + 1;
				obj.label = $.jset.fn.colNames(col);
			}
			return obj;
		},

		unformat_columns: function(grid, postdata){
			var post = {};
			var postData = postdata ? postdata : $(grid).jqGrid('getGridParam', 'postData');
			var columns = $(grid).data('columns');
			var controls = $(grid).data('settings').control;
			var colModel = $(grid).data('settings').grid.colModel;
			var rownumber = 0;
			$.each(colModel, function(i){
				if (postData[this.index] != undefined && controls[columns[rownumber].control] != undefined) {
					if ($.isFunction(controls[columns[rownumber].control].unformat))
				  	post[this.index] = controls[columns[rownumber].control].unformat.call(grid, postData[this.index]);
					
					if (controls[columns[rownumber].control].empty_url != undefined) 
						if (postData[this.index] == controls[columns[rownumber].control].empty_url) 
							post[this.index] = '';
			}
				rownumber++;
			});
			
			return post;
		},
		
		filter_details: function(grid, ids){
			$.each(grid.data('settings').detail, function(){
				var elem = $.jset.fn.get_elem(this.elem);
				if(elem.data('loaded')){
					$.each(elem.data('settings').filter, function(){
						$('#gs_' + this.target, $.jset.fn.get_grid_container(elem)).val(ids == '_empty_' ? ids : grid.jqGrid('getCell', ids, this.source));
					});
					
					if(elem.is(':visible')) {
						elem[0].triggerToolbar();
						elem.data('pending_refresh', false);
					}else if(!elem.data('pending_refresh'))
						elem.data('pending_refresh', grid.data('last_selection'));
				}
			});
		},
		
		db_details: function(grid, ids){
			$.each(grid.data('settings').detail, function(){
				var elem = $.jset.fn.get_elem(this.elem);

				if(elem.data('loaded')){
					if(elem.data('settings').db_fields.host)
						elem.data('settings').host = grid.jqGrid('getCell', ids, elem.data('settings').db_fields.host);
					if(elem.data('settings').db_fields.db_name)
						elem.data('settings').db_name = grid.jqGrid('getCell', ids, elem.data('settings').db_fields.db_name);					
				}
			});
		},
		
		single_record: function(grid){
			var grid_container = $.jset.fn.get_grid_container(grid);
			if(grid.data('settings').single_record.mode == 'new' || grid.jqGrid('getGridParam', 'records') == 0){
				var options = $.extend(true, {}, grid.data('settings').navigation.add, grid.data('settings').single_record.options);
				grid.jqGrid('editGridRow', 'new', options);
			}else{
				var options = $.extend(true, {}, grid.data('settings').navigation.edit, grid.data('settings').single_record.options);
				var ids = grid.jqGrid('getDataIDs');
				grid.jqGrid('editGridRow', ids[0], options);
			}
			$('.ui-jqdialog-titlebar-close', grid_container).hide();
			$('#cData', grid_container).hide();
		},
		
		run_columns_event: function(grid, formid, event_name){
			$.each(grid.data('columns'), function(){
				if($.isFunction($.jset.defaults.control[this.control][event_name]))
					$.jset.defaults.control[this.control][event_name].call(grid, formid, this.index || this.Field);
			});	
		},
		
		set_help_tips: function(grid, formid){
			if(!grid.data('settings').help.hide)
				$.each(grid.data('columns'), function(){
					if (this.rowpos) 
						$('label[for="' + this.Field + '"]', formid).attr('title', this.help);
					else {
						$('#tr_' + this.Field + ' td:first-child', formid).attr('title', this.help);
						$('#trv_' + this.Field + ' td:first-child', formid).attr('title', this.help);						
					}
				});							
		},
		
		set: function(target, value){
			return value ? value : target;
		},
		
		get_elem: function(elem){
			if(typeof elem === 'function')
				return elem();
			else if(typeof elem === 'string' || typeof elem === 'number')
				return $(elem);
			else
				return elem;
		},

		get_value: function(elem){
			if(typeof elem === 'function')
				return elem();
			else
				return elem;
		},
		
		editfunc: function(grid, id, options){
			if ($.isFunction(grid.data('settings').editfunc)) 
				grid.data('settings').editfunc.call(grid, id, $.extend(true, {}, grid.data('settings').navigation.edit, options));
			else 
				grid.jqGrid('editGridRow', id, $.extend(true, {}, grid.data('settings').navigation.edit, options));
		},
		
		addfunc: function(grid, options){
			if($.isFunction(grid.data('settings').addfunc))
				grid.data('settings').addfunc.call(grid, $.extend(true, {}, grid.data('settings').navigation.add, options));
			else
				grid.jqGrid('editGridRow', 'new', $.extend(true, {}, grid.data('settings').navigation.add, options));
		},
		
		load_edit_record: function(grid, id, options){
			var rowid = grid.jqGrid('getGridParam', 'selrow');
			if (rowid > 0) {
				if (typeof options.formid != 'undefined')
					$.jset.fn.block(options.formid);
				else
					$.jset.fn.block(grid);
				var params = {
					filters: '{"groupOp":"AND","rules":[{"field":"id","op":"eq","data":' + rowid + '}]}',
					_methods_: 'grid_rows',
					_search_: true,
					_source_: $.jset.fn.get_value(grid.data('settings').source),
					async: false
				};
				if (grid.data('settings').host) 
					params[grid.data('settings').prmNames.host] = grid.data('settings').host;
				if (grid.data('settings').db_name) 
					params[grid.data('settings').prmNames.db_name] = grid.data('settings').db_name;
				if($.jset.version)
					params[grid.data('settings').prmNames.version] = $.jset.version;

				$.post(grid.data('settings').grid.url, params, function(data){
					if (data != null && typeof data.rows != 'undefined') {
						var data_array = data.rows[0].cell;
						var row_array = [];
						
						$.each(grid.data('settings').grid.colModel, function(i){
							row_array[this.name] = data_array[i];
						});
						grid.jqGrid('setRowData', rowid, row_array);
						if (typeof options.formid != 'undefined')
							$(options.formid).unblock();
						else
							$(grid).unblock();
						$.jset.fn.editfunc(grid, id, options);
					}else{
						alert('this record no longer exists');
						if (typeof options.formid != 'undefined')
							$(options.formid).unblock();
						else
							$(grid).unblock();
						$.jset.fn.get_grid_container(grid).find('.ui-jqdialog-titlebar-close').trigger('click');
						grid[0].triggerToolbar();						
					}
				}, 'json');
			}
		},
		
		clear_tooltip: function(element){
        	$(element).removeProp('tooltip')
            .tooltip('close');
		},
		
		clear_form_tooltips: function(formid){
			var list = $(formid).find(':input');
			$.each(list, function(i, e){
				if($(e).prop('tooltip'))
					$.jset.fn.clear_tooltip(e);
			});
		},

		initMultiselectedRows: function(){
			var grid = $(this);
			if(grid.data('settings').grid.multiselect)
				grid.data('multiselectedRows', {array: [], rows: {}, filters: '', params: '', include: true});
		},
			
		updateMultiselectedRow: function(id, isSelected){
			var grid = $(this);
	        var index = $.inArray(id, grid.data('multiselectedRows').array);
	        if (!isSelected && index >= 0){
	            grid.data('multiselectedRows').array.splice(index, 1); // remove id from the list
	            delete grid.data('multiselectedRows').rows[id]; // remove id from the list
	        } else if(index < 0){
	            grid.data('multiselectedRows').array.push(id);
	            grid.data('multiselectedRows').rows[id] = grid.jqGrid ('getRowData', id);
	        }
		},
		
		updateMultiselectedRows: function(ids, isSelected) {
			var grid = $(this);
			var i, count;
			for (i = 0, count = ids.length; i < count; i++) {
				$.jset.fn.updateMultiselectedRow.call(grid, ids[i], isSelected);
			}
			$.jset.fn.updateNavigationSelectedCounter.call(grid);			
		},
		
		selectMultiselectedRows: function(){
			var grid = $(this);
			if(grid.data('settings').grid.multiselect){
				var i, count;
				for (i = 0, count = grid.data('multiselectedRows').array.length; i < count; i++) {
					grid.jqGrid('setSelection', grid.data('multiselectedRows').array[i], false);
				}
			}
		},
		
		resetMultiselectedRows: function(){
			var grid = $(this);
			if(grid.data('settings').grid.multiselect){
				grid.jqGrid('resetSelection');
				grid.data('multiselectedRows').array.length = 0;
				grid.data('multiselectedRows').rows = {};
				$.jset.fn.updateNavigationSelectedCounter.call(grid);
			}
		},
		
		updateNavigationSelectedCounter: function(){
			var grid = $(this);
			if(!grid.data('settings').grid.scroll == 1)
				$('div.ui-paging-info-selected', $.jset.fn.get_grid_container(grid))
					.html($.jgrid.format($.jset.nav.selectedCounter, grid.data('multiselectedRows').array.length));
		},
		
		setNavigationSelectedFilters: function(post){
			var grid = $(this);
			if(!grid.data('settings').grid.multiselect)
				return;
			
			var reset = false;
			var filters = post['filters'];
			filters = (filters === undefined || filters == '{"groupOp":"AND","rules":[]}' || filters == '') ? '' : filters;
			if(grid.data('multiselectedRows').filters != filters){
				grid.data('multiselectedRows').filters = filters;
				reset = true;
			}
			
			var params = '';
			$.each(post, function(key, value){
				if(key.substr(0,7) == '_param_')
					params += key + value;
			});
			
			if(grid.data('multiselectedRows').params != params){
				grid.data('multiselectedRows').params = params;
				reset = true;
			}
			
			if(reset)
				$.jset.fn.resetMultiselectedRows.call(grid);
		},
		
		closeForm: function(grid){
			return $("a[id='cData']", $.jset.fn.get_grid_container(grid)).trigger('click');
		},
		
		closeSubForms: function(formid, grid){
			return $("div.ui-jqgrid[id^='gbox_'] a[id='cData']", $(formid).closest('form')).trigger('click');
		},
		
		version_check: function(data){
			if(data.error && data.error.type == 'version'){
				if($('div#version_check').length == 0)
					$('body').append('<div id="version_check" style="display:none;direction:' + $.jset.direction + ';">' + $.jset.messages.versionUpdated + '</div>');

				setTimeout("location.reload(false)", 2000);
			    $("#version_check").dialog({
			    	title: $.jset.messages.warning,
			        modal: true
			    });
				//alert($.jset.messages.versionUpdated);
			}
		},
		
		searchall_action: function(grid){
			grid.data('searchall').timer = null;
			if(grid.data('searchall').phrase != grid.data('searchall').elem.val()){
				grid.data('searchall').phrase = grid.data('searchall').elem.val();
				grid[0].triggerToolbar();
			}
		},
		
		setup_custom_events: function(grid){
			/*grid.on('jqGridToolbarBeforeSearch', function() {
				return grid.data('stop_triggerToolbar') ? 'stop' : '';
			});*/
		}
	});
})(jQuery);