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
		url: 'jset/server/jset.php'
	};
	
	$.jset = ($.jset == undefined) ? jset : $.extend(true, jset, $.jset);
	
	// private function used in defaults
	var fd = {
		onclickSubmit: function(params, postdata){
			switch($(params.the_grid).data('form_action')){
			case 'copy':
				$(params.the_grid).data('copy', true);
				break;
			default:
				$(params.the_grid).data('copy', false);
			}
		}
	};

	// defaults
	$.jset = $.extend(true, $.jset, {
		defaults: {
			prmNames:{
				source: '_source_',
				target: '_target_',
				db_name: '_db_name_',
				host: '_host_',
				db_remote_definitions: '_db_remote_definitions_',
				copy: '_copy_'
			},
			host: '',
			db_name: '',
			db_name_target: '',
			db_remote_definitions: true,
			dir_pre: $.jset.dir_pre,
			url: $.jset.url,
			loading_img: '/jset/img/loading.gif',
			spacing: '20px',
			load_edit_record: false,
			pending_create: false,
			hide_submit_row: false,
			filterToolbar:{
				hide: false,
				navButtonAdd: false
			},
			help:{
				hide: false,
				navButtonAdd: true,
				dialog: {
					autoOpen: false,
					title: 'Help',
					width: 600,
					position: 'top'
				},
				options: {
					caption:'',
					title:'Help', 
					buttonicon :'ui-icon-lightbulb', 
					position: 'last'
				}
			},
			dump:{
				navButtonAdd: false,
				dialog: {
					autoOpen: false,
					title: 'SQL Dump',
					width: 1000,
					position: 'top'
				}
			},
			copy:{
				navButtonAdd: true,
				showFormInit: null,
				properties: {
					closeAfterAdd: true,
					editCaption: 'Copy Record',
					viewPagerButtons: false,
					onclickSubmit: fd.onclickSubmit
					/*
					onclickSubmit: function(params, postdata){
						$(params.the_grid).data('copy', true);
						return {};
					}*/
				},
				clear_id: true,
				options: {
					caption: '',
					title: 'Copy selected row',
					buttonicon: 'ui-icon-copy',
					position: 'last'
				}
			},
			setup:{
				navButtonAdd: false,
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
					title: 'Setup Grid',
					width: 880,
					position: ['left', 'top']
				}
			},
			'export': true,
			export_options:{
					caption: '',
					title: 'Export Data',
					buttonicon: 'ui-icon-star',
					position: 'last'
			},
			columnChooser:{
				navButtonAdd: true,
				options: {
					caption: '',
					title: 'Choose Columns',
					buttonicon: 'ui-icon-calculator',
					position: 'last'
				},
				multiselect:{
				    locale: {
				        addAll: 'Make all visible',
				        removeAll: 'Hidde All',
				        itemsCount: 'Avlialble Columns'
				    }
				},
				col:{
				    width: 420,
				   // modal: true,
				    msel_opts: {dividerLocation: 0.5},
				    dialog_opts: {
				        minWidth: 470,
				        minHeight: 370,
				        show: 'blind',
				        hide: 'explode'
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
					drag: false,
					resize: false,
					viewPagerButtons: false,
					editCaption: 'Edit',
					addCaption: 'Add'
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
				invalidHandler: function(form, validator) {
				    var errors = validator.numberOfInvalids();
				    if (errors) {
				        //alert(validator.errorList[0].message);  //Only show first invalid rule message!!!
				        validator.errorList[0].element.focus(); //Set Focus
				    }
				}
				//errorClass: 'ui-state-error',
				/*messages: {
			    	integer_field : "Please specify your name"
				},*/
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
				scrollrows: false,
				page:1,
				url: $.jset.dir_pre + $.jset.url,
				editurl: $.jset.dir_pre + $.jset.url,
				cellurl: '',
				cellEdit: false,
				cellurl: $.jset.dir_pre + $.jset.url,
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
				sortorder: 'asc',
				caption: '',
				//toolbar : [true,'top'],
				toppager: false,
				hiddengrid: false
			},
			navigation:{
				options : {
					search: true,
					refresh: true,
					view: true,
					cloneToTop: false,
					editfunc: function(id, options){
						var grid = $(options.the_grid);
						grid.data('form_action', 'edit');
						if (grid.data('settings').load_edit_record)
							fn.load_edit_record(grid, id, options);
						else
							fn.editfunc(grid, id, options);
					},
					addfunc: function(options){
						var grid = $(this);
						grid.data('form_action', 'add');
						fn.addfunc(grid, options);
					}
				},
				edit:{
					width: 'auto',
					reloadAfterSubmit: true,
					jqModal: true,
					closeOnEscape: false,
					closeAfterEdit: true,
					closeAfterAdd: true,
					onclickSubmit: fd.onclickSubmit
				},
				add:{
					width: 'auto',
					reloadAfterSubmit: true,
					jqModal: true,
					closeOnEscape: false,
					closeAfterAdd: true,
					clearAfterAdd: false,
					closeAfterEdit: true,
					onclickSubmit: fd.onclickSubmit
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
					sFilter:'_filters_'
				},
				view:{
					width: 'auto',
					jqModal: true,
					closeOnEscape: false
				}
			}
		},
		
		fn:{}
	});

	// main function
	$.fn.jset = function(param){
		if (typeof param == 'string') {
		  	var f = fx[param];
		  	if (!f) {
		  		throw ('jset - No such method: ' + param);
		  	}
		  	var args = $.makeArray(arguments).slice(1);
		  	return f.apply(this, args);
		}
		
		var t = this;
		t.p = $.extend(true, {}, $.jset.defaults, events, param || {});
		$(t).append('<img src="' + $.jset.dir_pre + t.p.loading_img + '">');
		fn.set_source_param(t.p);
		
		fn.get_grid_definitions(t.p, function(data){
			t.p.grid.caption = fn.set(t.p.grid.caption, data.table.title);
			fn.define_grid_columns(data.columns, t);

			t.each(function(i){
				fn.setup_grid(t, i, data);
			});
		});
	
		return this;
	};	

	// exposed functions
	var fx = {
		defined: function(){
			return ($(this).data('settings') != undefined);
		},
		
		unload: function(){
			var $t = $(this);
			if($t.data('settings') && $t.data('settings').detail){
				$.each($t.data('settings').detail, function(){
					fn.get_elem(this.elem).jset('unload');
				});
			}
			
			$($(this).jqGrid('getGridParam', 'pager')).remove();
			$(this).jqGrid('GridUnload');
		},
		
		addGrid: function(){
			
		}
	};
	
	// common events
	var add_edit_events = {
		beforeInitData: function(formid){
			var grid = $(this);
			$.each(grid.data('columns'), function(){
				if($.isFunction($.jset.defaults.control[this.control].beforeInitData))
					$.jset.defaults.control[this.control].beforeInitData(formid);
			});	
					
			if($.isFunction(grid.data('settings').beforeInitData))
				grid.data('settings').beforeInitData(formid);
		},
		
		onInitializeForm : function(formid) {
			var grid = $(this);			
			$.metadata.setType('attr', grid.data('settings').validate.meta);
			$(formid).validate(grid.data('settings').validate);

			if($.isFunction(grid.data('settings').onInitializeForm))
				grid.data('settings').onInitializeForm(formid);
		},
		
		beforeShowForm: function(formid){
			var grid = $(this);
			$.each(grid.data('columns'), function(){
				if($.isFunction($.jset.defaults.control[this.control].beforeShowForm))
					$.jset.defaults.control[this.control].beforeShowForm(formid, this.Field);
			});			
	
			fn.set_help_tips(grid, formid);
			
			$('select').addClass('inputfilter FormElement ui-widget-content ui-corner-all');
			
			if (grid.data('settings').hide_submit_row) 
				$(formid).parent().find('#TblGrid_' + grid.attr('id') + '_2').hide();

			if($.isFunction(grid.data('settings').beforeShowForm))
				grid.data('settings').beforeShowForm(formid);
		},
		
		afterShowForm: function(formid){
			$(formid).validate().resetForm();
			var grid = $(this);
			$.each(grid.data('columns'), function(){
				if($.isFunction($.jset.defaults.control[this.control].afterShowForm))
					$.jset.defaults.control[this.control].afterShowForm(formid, this.Field);
			});			
			var id = $(formid).find('#id').val();
			if(grid.data('copy_form')){
				grid.data('copy_form', false);
				var source_id = $(formid).find('#id').val();
				if(grid.data('settings').copy.clear_id)
					$(formid).find('#id').val('');
				if($.isFunction(grid.data('settings').copy.showFormInit))
					grid.data('settings').copy.showFormInit(formid, source_id);
			}
			if($.isFunction(grid.data('settings').afterShowForm))
				grid.data('settings').afterShowForm(formid);			
		},
		
		afterclickPgButtons : function(whichbutton, formid, rowid){
			var grid = $(this);
			$.each(grid.data('columns'), function(){
				if($.isFunction($.jset.defaults.control[this.control].afterclickPgButtons))
					$.jset.defaults.control[this.control].afterclickPgButtons(whichbutton, formid, rowid, this.Field);
			});
			
			fn.load_edit_record(grid, rowid, $.extend(true, {}, grid.data('settings').navigation.edit, {focusSelector: false,  formid: formid}));
			
			if($.isFunction(grid.data('settings').afterclickPgButtons))
				grid.data('settings').afterclickPgButtons(whichbutton, formid, rowid);
		},
		
		beforeSubmit: function(postdata, formid){
			var grid = $(this);
			if(!$(formid).valid())
				return [false];
			
			var validation_error = '';
			eval(grid.data('table').validation);
			if(validation_error)
			{
				//$('#FormError', formid).show();
				//$('#FormError', formid).focus();
				//$('form:first *:input[type!=hidden]:first').focus();
				//$('#company_code', formid).focus();
				$('html, body').animate({ scrollTop: 0 }, 200);
				//$("body").scrollTop(100);
				return [false, validation_error];
			}
			
			var colModel = grid.data('settings').grid.colModel;
			$.each(colModel, function(i){
				if(this.index != this.name){
					postdata[this.index] = postdata[this.name];
					delete postdata[this.name];
				}
			});
			
			var post = fn.unformat_columns(this, postdata);
			var hard_post = {};
			
			$.each(grid.data('settings').filter, function(){
				hard_post[this.target] = $.jset.fn.get_filterToolbar_field(grid, this.target).val();
			});
			
			if(grid.data('settings').target)
				hard_post[grid.data('settings').prmNames.target] = fn.get_value(grid.data('settings').target);
			if(grid.data('settings').host)
				hard_post[grid.data('settings').prmNames.host] = fn.get_value(grid.data('settings').host);
			if(grid.data('settings').db_name)
				hard_post[grid.data('settings').prmNames.db_name] = fn.get_value(grid.data('settings').db_name);
			if(grid.data('settings').db_name_target)
				hard_post[grid.data('settings').prmNames.db_name] = fn.get_value(grid.data('settings').db_name_target);
	
			if(grid.data('copy')){
				var obj = $.extend(true, {}, grid.jqGrid('getGridParam', 'prmNames'), {
					editoper: 'add'
				});
				grid.jqGrid('setGridParam', {
					prmNames: obj
				});
				hard_post[grid.data('settings').prmNames.copy] = true; 
			}
						
			$.extend(postdata, post, hard_post);
			
			if($.isFunction(grid.data('settings').beforeSubmit))
				return grid.data('settings').beforeSubmit(postdata, formid);
			
			return [true];
		},
	
		afterSubmit: function(response, postdata){
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
				//var message = obj.error.message + '<br />' + obj.error.dump + '<br />' + obj.error.info[0] + '<br />' + obj.error.info[1] + '<br />' + obj.error.info[2];
				var message = obj.error.message;
				return [false, message];
			}
			
			if(grid.data('settings').single_record.active && grid.data('settings').single_record.displayAlert)
				alert('record updated successfuly');
			
			if(obj.id !== undefined)
				grid.data('lastID', obj.id);

			
			grid.jqGrid('setGridParam', {scrollrows: true});

			if($.isFunction(grid.data('settings').afterSubmit))
				return grid.data('settings').afterSubmit(response, postdata);
			
			return [true];
		},
		
		onClose: function(formid){
		}
	};
	
	// events
	var events = {
		grid: {
			beforeRequest: function(){
				var $t = $(this);
				var post = fn.unformat_columns(this);
				post[$t.data('settings').prmNames.source] = fn.get_value($t.data('settings').source);
				if($t.data('settings').db_name) post[$t.data('settings').prmNames.db_name] = fn.get_value($t.data('settings').db_name);
				if($t.data('settings').host) post[$t.data('settings').prmNames.host] = fn.get_value($t.data('settings').host);
				if(!$t.data('settings').db_remote_definitions) post[$t.data('settings').prmNames.db_remote_definitions] = $t.data('settings').db_remote_definitions;
		
				if ($t.data('init')) {
					if ($t.data('settings').empty) {
						post[$t.data('settings').grid.prmNames.oper] = 'grid_empty';
						$.extend($t.jqGrid('getGridParam', 'postData'), post);
						return;
					}
		
					if ($t.data('settings').search_default.length > 0) {
					  	$.each($t.data('settings').search_default, function(){
					  		post[this.name] = this.value;
					  	});
					  	post[$t.data('settings').grid.prmNames.search] = true;
				  }
				} 
				
				if($t.data('export') === true){
					$t.data('export', false);
					var get = $.extend({}, $t.jqGrid('getGridParam', 'postData'), post);
					get[$t.data('settings').grid.prmNames.oper] = 'export';
					var url = $t.data('settings').dir_pre + $.jset.defaults.url + '?';
					$.each(get, function(key, value){
						url += key + '=' + value + '&';
					});

					window.open(url);
				}
				
				post[$t.data('settings').grid.prmNames.oper] = 'grid_rows';
				$.extend($t.jqGrid('getGridParam', 'postData'), post);

				if($.isFunction($t.data('settings').beforeRequest))
					$t.data('settings').beforeRequest();
			},
			
			gridComplete: function(){
				
			},
		
			loadComplete: function(data){
				var $t = $(this);
				if ($t.data('init')) {
					$t.data('init', false);
					
					if ($t.data('settings').filterToolbar.hide)
						this.toggleToolbar(); // for initialy hiding the toolbar
					/*else
						$t.jqGrid('setGridHeight', $t.data('settings').grid.height - 23);*/
						
					if($t.data('settings').detail){
						$.each($t.data('settings').detail, function(){
							if(!$t.data('settings').pending_create || ($t.data('settings').pending_create && fn.get_elem(this.elem).is(':visible')))
								fn.get_elem(this.elem).jset($.extend(true, {master: $t}, this.settings));
						});
					}
					
					if($t.data('settings').master){
						$t.data('loaded', true);
					}
					
					$t.data('grid_width', $t.jqGrid('getGridParam', 'width'));

					if($.isFunction($t.data('settings').loadCompleteInit))
						$t.data('settings').loadCompleteInit(data);
				}
				
				if ($t.jqGrid('getGridParam', 'records') != 0) {
					if($t.data('lastID')){
						$t.jqGrid('setSelection', $t.data('lastID'));
						$t.data('lastID', false);
						if(!$t.jqGrid('getGridParam', 'selrow'))
							$t.jqGrid('setSelection', $t.jqGrid('getDataIDs')[0]);
					} else
					$t.jqGrid('setSelection', $t.jqGrid('getDataIDs')[0]);
				}
				else 
					if ($t.data('settings').detail /*&& $t.data('settings').detail.elem.data('loaded')*/) {
						$t.data('last_selection', null);
						fn.filter_details($t, '_empty_');
					}
		
				if ($t.data('settings').single_record.active)
					fn.single_record($t);
		
				$t.jqGrid('setGridParam', {scrollrows: false});
				if($.isFunction($t.data('settings').loadComplete))
					$t.data('settings').loadComplete(data);
			},
			onSelectRow: function(ids) {
				var $t = $(this);
				var selrow = $t.jqGrid('getGridParam', 'selrow');
				if(ids != $t.data('last_selection')){
					if ($t.data('settings').detail){
						$.each($t.data('settings').detail, function(i){
							var elem = fn.get_elem(this.elem);
							if(this.recreate && elem.jset('defined')){
								var settings = this.settings;
								elem.jset('unload');
								if(settings.db_fields){
									settings.host = settings.db_fields.host ? $t.jqGrid('getCell', ids, settings.db_fields.host) : '';
									settings.db_name = settings.db_fields.db_name ? $t.jqGrid('getCell', ids, settings.db_fields.db_name) : '';
								}
								elem = fn.get_elem(this.elem);
								setTimeout(function(){elem.jset($.extend(true, {master: $t}, settings));}, 0);
							}
						});

						fn.db_details($t, ids);
						fn.filter_details($t, ids);
					}
					$t.data('last_selection', ids);
					
					if($.isFunction($t.data('settings').onSelectRow))
						$t.data('settings').onSelectRow(ids);
				}
			},
			
			ondblClickRow: function(rowId, iRow, iCol, e){
				if(rowId && $(this).data('settings').navigation.options.edit != false){
					$(this).data('settings').navigation.options.editfunc(rowId, $(this).data('settings').navigation.edit);
					$(this).jqGrid('setSelection',rowId);	
				}
			}
		},
		
		navigation:{
			edit: add_edit_events,			
			add: add_edit_events,
			
			view:{
				beforeShowForm: function(formid){
					var grid = $(this);
					fn.set_help_tips(grid, formid);
					if($.isFunction(grid.data('settings').beforeShowFormView))
						grid.data('settings').beforeShowFormView(formid);
				}
			},
			
			del:{
				afterSubmit: function(response, postdata){
					var grid = $(this);
					var obj = $.parseJSON(response.responseText);
					if(obj.error !== undefined){
						var message = obj.error.message + '<br />' + obj.error.dump + '<br />' + obj.error.info[0] + '<br />' + obj.error.info[1] + '<br />' + obj.error.info[2];
						return [false, message];
					}
					
					if(grid.data('settings').single_record.active && grid.data('settings').single_record.displayAlert)
						alert('record deleted!');

					if($.isFunction(grid.data('settings').afterSubmit))
						grid.data('settings').afterSubmit(response, postdata);
			
					return [true];
				},
				
				onclickSubmit : function(eparams){
					var post = {};
					var settings = $(eparams.the_grid).data('settings');
					if(settings.target)
						post[settings.prmNames.target] = fn.get_value(settings.target);
					if(settings.host)
						post[settings.prmNames.host] = fn.get_value(settings.host);
					if(settings.db_name)
						post[settings.prmNames.db_name] = fn.get_value(settings.db_name);
					if(settings.db_name_target)
						post[settings.prmNames.db_name] = fn.get_value(settings.db_name_target);
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
		
		get_grid_container: function(grid){
			return $('#gbox_' + grid.attr('id'));
		},
		
		get_grid: function(id){
			return $('#gview_' + id).find('.jset_table');
		},
		
		get_grid_by_formid: function(formid){
			return $('#' + $(formid).attr('id').substr(8));
		},
		
		get_grid_by_element: function(elem){
			var container_div_id = $(elem).parents('div[id^="gbox_"]:first').attr('id');
			var grid_id = container_div_id.substr(5);
			return $('table[id=' + grid_id + ']' );
		},
		
		get_form_field: function(formid, name){
			return $(formid).find('[name=' + name + ']');
		},
		
		get_form_field_label: function(formid, name){
			return $(formid).find('label[for=' + name + ']');
		},
		
		get_filterToolbar_field: function(grid, field_name){
			return $('#gs_' + field_name, $.jset.fn.get_grid_container(grid));
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
					col.editoptions.custom_options.disable(formid, col.name);
				else
					$.jset.fn.disable_field(formid, col.name);
			});
		},
		
		readonly_fields: function(formid){
			var grid = $.jset.fn.get_grid_by_formid(formid);
			$.each(grid.data('settings').grid.colModel, function(i, col){
				if(col.editoptions.custom_options && $.isFunction(col.editoptions.custom_options.readonly))
					col.editoptions.custom_options.readonly(formid, col.name);
				else
					$.jset.fn.readonly_field(formid, col.name);
			});
		},
		
		enable_fields: function(formid){
			var grid = $.jset.fn.get_grid_by_formid(formid);
			$.each(grid.data('settings').grid.colModel, function(i, col){
				if(!col.editoptions.readonly)
					if(col.editoptions.custom_options && $.isFunction(col.editoptions.custom_options.enable))
						col.editoptions.custom_options.enable(formid, col.name);
					else
						$.jset.fn.enable_field(formid, col.name);
			});
		},
		
		block: function(elem, options){
			options = $.extend(true, {
				message: $.jgrid.defaults.loadtext,
				overlayCSS: {
					backgroundColor: '#AAAAAA',
					opacity: 0.3
				}
			}, options)
			$(elem).block(options);
		},
		
		pending_refresh: function(context){
			$.each($('table.jset_table', context), function(){
				$t = $(this);
				if ($t.data('pending_refresh') && $t.data('settings').master.jqGrid('getGridParam','selrow') != $t.data('pending_refresh') && $t.is(':visible')) {
					$t.data('pending_refresh', false);
					this.triggerToolbar();
				}
			});
		},
		
		pending_create: function(context){
			$.each($('table.jset_table', context), function(){
				$t = $(this);
				if($t.data('settings').detail){
					$.each($t.data('settings').detail, function(){
						if(!fn.get_elem(this.elem).jset('defined') && fn.get_elem(this.elem).is(':visible'))
							fn.get_elem(this.elem).jset($.extend(true, {master: $t}, this.settings));
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

			$.post(grid.data('settings').grid.url, params, callback, 'json');
		}

	});

	// private functions
	var fn = {
		get_grid_definitions: function(settings, callback){
			var jsetParams = {};
			jsetParams[settings.grid.prmNames.oper] = 'columns,table,index';
			jsetParams[settings.prmNames.source] = settings.source;
			if(settings.db_name && settings.db_remote_definitions) jsetParams[settings.prmNames.db_name] = settings.db_name;
			if(settings.host && settings.db_remote_definitions) jsetParams[settings.prmNames.host] = settings.host;		
			$.post(settings.dir_pre + $.jset.defaults.url, jsetParams, callback, 'json');
		},
		
		set_source_param: function(settings){
			var obj = {};
			obj[settings.prmNames.source] = settings.source;
			if(settings.db_name) obj[settings.prmNames.db_name] = settings.db_name;
			if(settings.host) obj[settings.prmNames.host] = settings.host;
			if(!settings.db_remote_definitions) obj[settings.prmNames.db_remote_definitions] = settings.db_remote_definitions;
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
			var $t = $(t[i]);
			$t.data({
				settings: t.p,
				columns: data.columns,
				table: data.table,
				index: data.index,
				store: {},
				init: true,
				loaded: false,
				lastID: false
			});

			fn.set_grid_reference($t);
			fn.set_master_details($t);
			fn.create_pager_div($t, i);
			$t.addClass('jset_table');	
			$t.jqGrid($t.data('settings').grid);
			fn.create_navigator($t, $.jset.fn.get_grid_container($t));															
		},
		
		set_grid_reference: function($t){
				$t.data('settings').navigation.edit.the_grid = $t[0];
				$t.data('settings').navigation.add.the_grid = $t[0];
				$t.data('settings').navigation.del.the_grid = $t[0];
				$t.data('settings').navigation.view.the_grid = $t[0];
		},
		
		create_pager_div: function($t, i){
			var pname = 'pscrolling_' + $t.attr('id') + i;
			$('body').append('<div id="' + pname + '"></div>');
			$t.data('settings').grid.pager = '#' + pname;
		},
		
		create_navigator: function($t, grid_container){
			$t.jqGrid('navGrid', $t.data('settings').grid.pager,
				$t.data('settings').navigation.options,
				$t.data('settings').navigation.edit,
				$t.data('settings').navigation.add,
				$t.data('settings').navigation.del,
				$t.data('settings').navigation.search,
				$t.data('settings').navigation.view
			);
			
			fn.navigator_refresh_button($t, grid_container);
			fn.navigator_export_button($t, grid_container);
			fn.navigator_filter_button($t, grid_container);
			fn.navigator_copy_button($t, grid_container);
			fn.navigator_help_button($t, grid_container);
			fn.navigator_dump_button($t, grid_container);
			fn.navigator_setup_button($t, grid_container);
			fn.navigator_columnChooser_button($t, grid_container);
			fn.filter_toolbar_init($t, grid_container);
		},
		
		navigator_refresh_button: function($t, grid_container){
			if($t.data('settings').navigation.options.refresh){
				$('td#refresh_' + $t.attr('id'), grid_container).unbind('click');
				$('td#refresh_' + $t.attr('id'), grid_container).bind('click', function(){
					$t[0].triggerToolbar();
				});
				
				if ($t.data('settings').navigation.options.cloneToTop) {
					$('td#refresh_' + $t.attr('id') + '_top', grid_container).unbind('click');
					$('td#refresh_' + $t.attr('id') + '_top', grid_container).bind('click', function(){
						$t[0].triggerToolbar();
					});
				}
			}
		},
		
		navigator_export_button: function($t, grid_container){
			if ($t.data('settings')['export']) {
				var options = $.extend(true, {}, $t.data('settings').export_options,
					{onClickButton: function(){
						$t.data('export', true);
						$t[0].triggerToolbar();
					}});
				
				$t.jqGrid('navButtonAdd', $t.data('settings').grid.pager, options);
				if ($t.data('settings').navigation.options.cloneToTop)
					$t.jqGrid('navButtonAdd', $t.attr('id') + '_toppager', options);
			}
		},
		
		navigator_filter_button: function($t, grid_container){
			if ($t.data('settings').filterToolbar.navButtonAdd){
				var options = {
					caption:'',
					title:'Toggle Search Toolbar',
					buttonicon :'ui-icon-search',
					onClickButton:function(){
						$t[0].toggleToolbar();
						var height = $t.jqGrid('getGridParam', 'height');
						$t.jqGrid('setGridHeight', $('tr.ui-search-toolbar', grid_container).css('display') == 'none' ? height + 23 : height - 23);
					}
				};
				
				$t.jqGrid('navButtonAdd',$t.data('settings').grid.pager, options);
				if ($t.data('settings').navigation.options.cloneToTop)
					$t.jqGrid('navButtonAdd', $t.attr('id') + '_toppager', options);
			}
		},

		navigator_help_button: function($t, grid_container){
			if($t.data('settings').help.navButtonAdd && $t.data('table').help !== undefined && $t.data('table').help){
				var help = $('<div id ="' + 'help_' + $t.attr('id') + '"></div>');
				help.html($t.data('table').help);
				grid_container.append(help);
				help.dialog($t.data('settings').help.dialog);
				
				var options = $.extend(true, {}, $t.data('settings').help.options,
					{onClickButton:function(){
						help.dialog('isOpen') ? help.dialog('close') : help.dialog('open');					
					}});
				
				$t.jqGrid('navButtonAdd',$t.data('settings').grid.pager, options);				
				if ($t.data('settings').navigation.options.cloneToTop)
					$t.jqGrid('navButtonAdd', $t.attr('id') + '_toppager', options);			
			}
		},
		
		navigator_setup_button: function($t, grid_container){
			if ($t.data('settings').setup.navButtonAdd){
				var setup_id = 'setup_' + $t.attr('id');
				var setup = $('<div></div>');
				setup.html('<table id ="' + setup_id + '"></table>');
				grid_container.append(setup);
				setup.dialog($t.data('settings').setup.dialog);
				
				var options = {
					caption:'',
					title:'Setup Grid', 
					buttonicon :'ui-icon-wrench', 
					onClickButton:function(){
						if(!$('#' + setup_id).jset('defined'))
							$('#' + setup_id).jset($.extend(true, {}, $t.data('settings').setup.settings, {search_default:[{name: 'parent', value: $t.data('table').id}]}));
						var position = grid_container.offset();
						setup.dialog('isOpen') ? setup.dialog('close') : setup.dialog('option', 'position', [parseInt(position.left), parseInt(position.top)]), setup.dialog('open');
					}
				};
				
				$t.jqGrid('navButtonAdd',$t.data('settings').grid.pager, options);			
				if ($t.data('settings').navigation.options.cloneToTop)
					$t.jqGrid('navButtonAdd', $t.attr('id') + '_toppager', options);		
			}
		},
		
		navigator_dump_button: function($t, grid_container){
			if($t.data('settings').dump.navButtonAdd){
				$t.data('settings').dump.id = 'dump_' + $t.attr('id');
				var dump = $('<textarea cols="100" rows="20" id ="' + $t.data('settings').dump.id + '"></textarea>');
				grid_container.append(dump);
				dump.dialog($t.data('settings').dump.dialog);
				
				var options = {
					caption:'',
					title:'SQL Dump',
					buttonicon :'ui-icon-comment',
					position: 'last',
					onClickButton:function(){
						dump.dialog('isOpen') ? dump.dialog('close') : dump.dialog('open');
						if(dump.dialog('isOpen')){
							var id = $t.jqGrid('getGridParam', 'selrow');
							if (id > 0) {
								$('#' + $t.data('settings').dump.id).html('');
								fn.get_dump($t, $t.data('settings'), function(data){
									$('#' + $t.data('settings').dump.id).html(htmlspecialchars(data));
									$('#' + $t.data('settings').dump.id).focus().select();
								});
							}						
						}
					}
				};
				
				$t.jqGrid('navButtonAdd',$t.data('settings').grid.pager, options);
				if ($t.data('settings').navigation.options.cloneToTop)
					$t.jqGrid('navButtonAdd', $t.attr('id') + '_toppager', options);			
			}
		},
		
		navigator_copy_button: function($t, grid_container){
			if ($t.data('settings').copy.navButtonAdd) {
				var options = $.extend(true, {}, $t.data('settings').copy.options,
					{
						onClickButton: function(){
							var id = $t.jqGrid('getGridParam', 'selrow');
							if (id > 0) {
								$t.data('copy_form', true);
								$t.data('form_action', 'copy');
								var options = $.extend(true, {}, $t.data('settings').navigation.edit , $t.data('settings').copy.properties);
								if($.isFunction($t.data('settings').copyfunc))
									$t.data('settings').copyfunc(id, options);
								else					
									$t.jqGrid('editGridRow', id, options);
							}
					}
				});
				
				$t.jqGrid('navButtonAdd', $t.data('settings').grid.pager, options);
				if ($t.data('settings').navigation.options.cloneToTop)
					$t.jqGrid('navButtonAdd', $t.attr('id') + '_toppager', options);
			}
		},
		
		navigator_columnChooser_button: function($t, grid_container){
			if ($t.data('settings').columnChooser.navButtonAdd) {
				var options = $.extend(true, {}, $t.data('settings').columnChooser.options,
					{
						onClickButton: function(){
							$t.jqGrid('columnChooser',{
								done: function (perm) {
				                    if (perm) {
				                        $t.jqGrid("remapColumns", perm, true);
				                        $t.jqGrid("setGridWidth", $t.data('grid_width'));
									}
								}
							});
					}
				});
				$.extend(true, $.ui.multiselect, $t.data('settings').columnChooser.multiselect);
				$.extend(true, $.jgrid.col, $t.data('settings').columnChooser.col);	
							
				$t.jqGrid('navButtonAdd', $t.data('settings').grid.pager, options);
			}
		},
		
		get_dump: function($t, settings, callback){
			var jsetParams = {};
			jsetParams[settings.grid.prmNames.oper] = 'dump';
			jsetParams[settings.prmNames.source] = fn.get_value(settings.source);
			jsetParams[settings.grid.prmNames.id] = $t.jqGrid('getGridParam', 'selrow');
			jsetParams['_editing_state_'] = $t.jqGrid('getCell', jsetParams[settings.grid.prmNames.id], 'editing_state');
			if(settings.db_name && settings.db_remote_definitions) jsetParams[settings.prmNames.db_name] = settings.db_name;
			if(settings.host && settings.db_remote_definitions) jsetParams[settings.prmNames.host] = settings.host;		
			$.post(settings.dir_pre + $.jset.defaults.url, jsetParams, callback, 'json');
		},
		
		filter_toolbar_init: function($t, grid_container){
			$t.jqGrid('filterToolbar', {searchOnEnter: false});
			//$t.jqGrid('filterToolbar'); //test creaing a second filtertoolbar.
			
			if ($t.data('settings').search_default.length > 0) {
				$.each($t.data('settings').search_default, function(i){
					$('#gs_' + this.name, grid_container).val(this.value);
				});
				$t[0].triggerToolbar();
			}
		},
		
		define_grid_columns: function(columns, t){
			$.each(columns, function(i){
				t.p.grid.colNames[i] = $.jset.fn.colNames(this);
				t.p.grid.colModel[i] = fn.colModel(this, i, t);
				if(this.search_default) fn.search_default(this, t);
			}); 
			//alert('colModel length is ' + t.p.grid.colModel.length)
		},

		set_master_details: function($t){
			if($t.data('settings').master){
				var row = $t.data('settings').master.jqGrid('getGridParam', 'records') != 0 ? $t.data('settings').master.jqGrid('getGridParam','selrow') : '_empty_';
				$.each($t.data('settings').filter, function(){
					$t.data('settings').search_default.push({
						name: this.target,
						value: row == '_empty_' ? row : $t.data('settings').master.jqGrid('getCell', row, this.source)
					});
				});
				
				if(row != '_empty_'){
					if($t.data('settings').db_fields.host)
						$t.data('settings').host = $t.data('settings').master.jqGrid('getCell', row, $t.data('settings').db_fields.host);
					if($t.data('settings').db_fields.db_name)
						$t.data('settings').db_name = $t.data('settings').master.jqGrid('getCell', row, $t.data('settings').db_fields.db_name);
				}
			}
		},
		
		colModel: function(col, i, t){
			var obj = {};
			obj.name = col.index ? col.index : col.Field;
			obj.index = col.Field;
			obj.width = col.width ? col.width : 80;
			obj.align = fn.align(col, t);
			if(col.hidden == 1){
				obj.hidden = true;
				obj.hidedlg = true;
			}
			if(col.unsortable == 1) obj.sortable = false;
			obj.editable = (col.noedit == 1) ? false : true;
			obj.edittype = fn.edittype(col, t);
			obj.editoptions = fn.editoptions(col, t);
			obj.editrules = fn.editrules(col);
			obj.formatter = fn.formatter(col, t);
			obj.unformat = fn.unformat(col);
			obj.formatoptions = fn.formatoptions(col, t);
			obj.formoptions = fn.formoptions(col, i, t);
			obj.searchoptions = fn.searchoptions(col, t);
			obj.stype = fn.stype(col, t);
			if (col.object)
				try {
					obj = $.extend(true, {}, obj, eval('({' + col.object + '})'));
				} 
				catch (e) {
					alert( 'column ' + obj.name + '\nobject definition ' + e.name + '\n' + e.message);
				}
			else
			{
				//alert('default');
				//$.dump(eval(obj));
			}
			if(obj.name == 'client_id')
			{
				//alert('default: ' + obj.name);
				//$.dump(obj);
			}
			return obj;
		},
		
		search_default: function(col, t){
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
							if (key === 'value') {
								//obj.value = col.values ? (/*$.dump(col.values),*/ $.extend({}, value, col.values)) : value;
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
			if(t.p.control[col.control]){
				if(t.p.control[col.control].searchoptions){
					$.each(t.p.control[col.control].searchoptions, function(key, value){
						if($.isFunction(value)) value = value(col);
						if(key === 'value')
							obj.value = col.values ? $.extend({}, value, col.values) : value;
						else
							obj[key] = value;
					});
				}
			}
			return obj;
		},

		stype: function(col, t){
			return (t.p.control[col.control] && t.p.control[col.control].stype) ? t.p.control[col.control].stype : t.p.control.stype;
		},
		
		formoptions: function(col, i, t){
			var obj = {};
			var options = t.p.control[col.control].formoptions ? t.p.control[col.control].formoptions : {};
			if(col.rowpos){
				obj.rowpos = col.rowpos;
				obj.elmprefix = options.label_hide ? '' : (col.title ? '<label for="' + col.Field + '">' + col.title + ": </label>" : '');
				obj.elmsuffix = '<span name="' + col.Field + '" style="display:inline-block; width:' + t.p.spacing + '"/>';
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
				  	post[this.index] = controls[columns[rownumber].control].unformat(postData[this.index]);
					
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
				var elem = fn.get_elem(this.elem);
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
				var elem = fn.get_elem(this.elem);

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
				// deal with the filter_name field here later
				//if(grid.data('settings').master && $.jset.fn.get_filterToolbar_field(grid, grid.data('settings').filter_name).val() == '_empty_')
				//	$('#sData', grid_container).hide();
			}else{
				var options = $.extend(true, {}, grid.data('settings').navigation.edit, grid.data('settings').single_record.options);
				var ids = grid.jqGrid('getDataIDs');
				grid.jqGrid('editGridRow', ids[0], options);
				//$('#sData', grid_container).show();
			}
			$('.ui-jqdialog-titlebar-close', grid_container).hide();
			$('#cData', grid_container).hide();
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
				grid.data('settings').editfunc(id, options);
			else 
				grid.jqGrid('editGridRow', id, options);
		},
		
		addfunc: function(grid, options){
			if($.isFunction(grid.data('settings').addfunc))
				grid.data('settings').addfunc(options);
			else
				grid.jqGrid('editGridRow', 'new', options);
		},
		
		load_edit_record: function(grid, id, options){
			var rowid = grid.jqGrid('getGridParam', 'selrow');
			if (rowid > 0) {
				if (typeof options.formid != 'undefined')
					$.jset.fn.block(options.formid);
				else
					$.jset.fn.block(grid);
				var params = {
					id: rowid,
					_methods_: 'grid_rows',
					_search_: true,
					_source_: fn.get_value(grid.data('settings').source),
					async: false
				};
				if (grid.data('settings').host) 
					params[grid.data('settings').prmNames.host] = grid.data('settings').host;
				if (grid.data('settings').db_name) 
					params[grid.data('settings').prmNames.db_name] = grid.data('settings').db_name;

				$.post(grid.data('settings').grid.url, params, function(data){
					if (data != null && typeof data.rows != 'undefined') {
						var data_array = data.rows[0].cell;
						var row_array = [];
						$.each(grid.data('settings').grid.colModel, function(i){
							row_array[this.index] = data_array[i];
						});
						grid.jqGrid('setRowData', rowid, row_array);
						if (typeof options.formid != 'undefined')
							$(options.formid).unblock();
						else
							$(grid).unblock();
						fn.editfunc(grid, id, options);
					}else{
						alert('this record no longer exists');
						//var rowind = grid.jqGrid('getInd', rowid);
						if (typeof options.formid != 'undefined')
							$(options.formid).unblock();
						else
							$(grid).unblock();
						$.jset.fn.get_grid_container(grid).find('.ui-jqdialog-titlebar-close').trigger('click');
						grid[0].triggerToolbar();						
					}
				}, 'json');
			}
		}
	};
})(jQuery);