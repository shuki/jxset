;(function ($) {
/*
 * jset  1.0 - jset
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */
	$.extend($.jset.fn, {
		colsize : function(col){
			return col.usize ? col.usize : col.size > $.jset.defaults.max_field_size ? $.jset.defaults.max_field_size : col.size ? col.size : $.jset.defaults.field_size;
		},

		dateInit: function (elem){
			if($(elem).children('input').length == 1)
				$(elem).children('input').datepicker($.jset.defaults.datepicker);
			else
				$(elem).datepicker($.jset.defaults.datepicker);
		},

		intInit: function (elem){
			$(elem).inputfilter({type: 'int'});
		},
		
		pintInit: function (elem){
			$(elem).inputfilter({type: 'pint'});
		},
		
		numInit: function (elem){
			$(elem).inputfilter({type: 'num'});
		},
		
		pnumInit: function (elem){
			$(elem).inputfilter({type: 'pnum'});
		},

		disabled: function(elem){
			$(':input', elem)
				.attr('disabled', true)
				.addClass('jset-field-readonly');
		},
		
		default_sopt: function(){
			return ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','in','ni','ew','en','nu','nn'];
		},
		
		prepend_empty_select_option: function(elem){
			$(elem).prepend('<option value=""></option>');
			$(elem).val('');
		},
		
		dataInit_checkbox: function(elem){
			//$.jset.fn.set_search_refresh(elem);
			return $.jset.fn.prepend_empty_select_option(elem);
			
		},

		set_select_options: function (elem, grid, source, value, dont_preserve_value, name){
			if(!name){
				alert('set_select_options: missing name for select');
				return;
			}
			var no_empty_first_row = grid.data('settings').grid.colModel[grid.data('index')[name]]['editoptions'].no_empty_first_row;
			var select_options = no_empty_first_row ? '' : '<option value=""></option>';
			if($.isArray(source))
				$.each(source, function(i, obj){
					select_options += '<option value="' + obj.id + '" ' + (obj.disabled ? 'style="color:gray"' : '') + '>' + obj.name + '</option>';
				});
			else if($.isPlainObject(source))
				$.each(source, function(key, val){
					select_options += '<option value="' + key + '">' + val + '</option>';
				});
			$(elem).html(select_options);
			
			if(dont_preserve_value)
				$(elem).val(value);
			else
				$.jset.fn.handle_change_select_options(elem, value, grid);
		},
		
		set_dependent_fields: function(elem, search){
			$(elem).on('change.dependent_fields', function(event, preserve_value){
				var name = $(elem).attr('name');
				var grid = $.jset.fn.get_grid_by_element(this);
				var dependent_fields = grid.data('columns')[grid.data('index')[name]]['dependent_fields'];
				if(dependent_fields)
					$.each(dependent_fields, function(i, field){
						var sql = $.jset.fn.get_select_list_sql(grid, field, $(elem).val());						
						sql = sql.replace('{' + name + '}', $(elem).val());
						var target_element = $.jset.fn.get_dependent_field_element(elem, field);
						if(target_element !== false && target_element.length > 0)
							$.jset.fn.get_rows(grid, sql, function(data){
								$.jset.fn.set_select_options(target_element, grid, data, target_element.val(), !preserve_value, target_element.attr('name'));
								if(search)
									grid[0].triggerToolbar();							
							});
					});
			});
			return elem;
		},

		get_dependent_field_element: function(source, target_name){
			if($(source).parent('td[class="ui-search-input"]').length > 0){
				var container = $(source).closest('tr[class="ui-search-toolbar"]');
				var target = $('select[name="' + target_name + '"]', container);
				return target;
			}
			else if($(source).parent('span[class="FormElement"]').length > 0){
				var container = $(source).closest('form');
				var target = $('select[name="' + target_name + '"]', container);
				return target;
			}
			
			return false;
		},
		
		select_list_refresh: function(elem, value, update_toolbar){
			var name = $(elem).attr('name');
			var grid = $.jset.fn.get_grid_by_element(elem);
			var sql = $.jset.fn.get_select_list_sql(grid, name);
			var value = value ? value : $(elem).val();
			$.jset.fn.get_rows(grid, sql, function(data){
				elem.children('option').remove();
				$.jset.fn.set_select_options(elem, grid, data, value, false, name);
				elem.trigger('change.selectbox_plus');
				grid.jqGrid('setColProp', name, {editoptions:{value:data}}); 
				if(update_toolbar){
					toolbar_elem = $.jset.fn.get_filterToolbar_field(grid, name);
					value = toolbar_elem.val();
					toolbar_elem.children('option').remove();
					$.jset.fn.set_select_options(toolbar_elem, grid, data, value, false, name);
				}
			});
			return elem;
		},
		
		set_select_list_refresh: function(elem){
			$(elem).on('mousedown.jset', function(event, preserve_value){
				var name = $(this).attr('name');
				var grid = $.jset.fn.get_grid_by_element(this);
				if(grid.data('settings').grid.colModel[grid.data('index')[name]]['editoptions'].select_list_refresh)
				{
					var sql = $.jset.fn.get_select_list_sql(grid, name, $(this).val());
					$.jset.fn.get_rows(grid, sql, function(data){
						// shuki - change this to actually check if there are differences and add/remove items.
						$.jset.fn.select_option_append(elem, 45, 45);
					});
				}
			});
			return elem;
		},
		
		set_search_refresh: function(elem){
			$(elem).bind('change.search', function(){
				var elem = $(this);
				var grid = $.jset.fn.get_grid_by_element(elem);
				if(elem.attr('id').substr(0,3) == 'gs_' && elem.attr('name').substr(0,3) != 'gs_')
					grid[0].triggerToolbar();
				else if(elem.parent().hasClass('input-elm'))
					elem.parent().trigger('change');
			});
			return elem;
		},
		
		set_selectbox_plus_change: function(elem){
			$(elem).bind('change.selectbox_plus', function(){
				var button = $(this).siblings('button');
				button.html($(this).val() ? '?' : '+');
				var s = button.data();
				s.dlg.dialog('close');
			});
			return elem;
		},
		
		get_select_list_sql: function(grid, name, value){
			return (value && grid.data('columns')[grid.data('index')[name]]['sqls']) ?
				grid.data('columns')[grid.data('index')[name]]['sqls'][1] :
				grid.data('columns')[grid.data('index')[name]]['list'];
		},

		format_date: function (value){
			value = $.trim(value);
			if(value == '') return '';
			
			var arr = value.split('-');
			if (arr.length == 1) return value;
			//return arr[2] + '/' + arr[1] + '/' + arr[0];
			return (arr[2] != undefined ? arr[2] + '/' : '') + (arr[1] ? arr[1] : '') + '/' + arr[0];
		},

		unformat_date: function (value){
			value = $.trim(value);
			if(value == '') return '';
			
			var arr = value.split('/');
			if (arr.length == 1) return value;
			return (arr[2] != undefined ? arr[2] + '-' : '') + (arr[1] ? ('0' + arr[1]).substr(-2) : '') + '-' + ('0' + arr[0]).substr(-2);
		},

		format_datetime: function (value){
			value = $.trim(value);
			if(value == '') return '';

			var arr = value.split(' ');
			if (arr.length != 2) return value;

			return $.jset.fn.format_date(arr[0]) + ' ' +  arr[1];
		},

		unformat_datetime: function (value){
			value = $.trim(value);
			if(value == '') return '';

			var arr = value.split(' ');
			if(arr.length != 2) return value;

			return $.jset.fn.unformat_date(arr[0]) + ' ' +  arr[1];
		},

		format_time: function (value, minutes, seconds){
			value = $.trim(value);
			if(value == '') return '';

			var arr = value.split(':');
			if (arr.length == 1) return value;

			if(minutes === false) return arr[0];
			if(seconds !== true) return arr[0] + ':' + arr[1];
			return value;
		},

		unformat_time: function (value){
			value = $.trim(value);
			if(value == '') return '';

			var arr = value.split(':');
			if(arr.length == 1) return value + ':00';

			return value;
		},


		unformat_checkbox: function (cellvalue, options, cellobject){
			return cellvalue;
		},

		custom_date_element: function(value, options){
			return $('<input type="text">')
			.val($.jset.fn.format_date(value))
			.attr('size', options.size)
			.attr('validate', options.validate);
		},
		
		custom_date_value: function(elem, action, value){
			if(action == 'get')
				return $.jset.fn.unformat_date($(elem).val());
			else if(action == 'set')
				$(elem).val($.jset.fn.format_date(value));
		},
		
		upload_file_element: function(value, options){
			var grid = $(this);
			return $(options.custom_options.input_element)
			.val(value)
			.attr('validate', options.validate)
			.addClass('upload_file');
		},
		
		upload_file_value: function(elem, action, value){
			if(action == 'get')
				return $(elem).val();
			else if(action == 'set')
				$(elem).val(value);
		},

		upload_video_element: function(value, options){
			var elem = $('<input type="text">');
			elem.val(value);
			elem.addClass('upload_video');
			elem.attr('validate', options.validate);
			return elem;
		},
		
		upload_video_value: function(elem, action, value){
			if(action == 'get')
				return $(elem).val();
			else if(action == 'set')
				$(elem).val(value);
		},

		unformat_video: function (value){
			if(value.search(/youtube/) != -1){
				var v = value.match(/\?v=(.*)&/);
				if(v == null){
					v = value.match(/\?v=(.*)$/);
				}
				
				if(v != null)
					value = v[v.length - 1];
			}
			
			return value;
		},

		editor_element: function(value, options){
			var elem = $("<textarea size='10'/>");
			//$(elem).tinymce($.extend(true, {}, $.jset.defaults.editor, options));
			$(elem).val(value);
			//elem.attr('validate', options.validate);
			return elem;
		},
		
		editor_value: function(elem, action, value){
			if($(elem).length == 0)
				return '';
				
			if(action == 'get')
				return $(elem).html();
			else if(action == 'set'){
				$(elem).html(value);
				var editor_id = $(elem).attr('id');
				if(typeof tinymce !== 'undefined' && typeof tinymce.get(editor_id) !== 'undefined')
					tinymce.get(editor_id).undoManager.clear();
			}
		},

		editor_textarea_element: function(value, options){
			var elem = $("<textarea size='10'/>");
			elem.addClass('editor_textarea');
			elem.addClass('ui-widget-content ui-corner-all');
			elem.attr('cols', options.cols);
			elem.attr('rows', options.rows);
			elem.attr('dir', 'rtl');
			elem.val(value);
			return elem;
		},
		
		editor_textarea_value: function(elem, action, value){
			if (action == 'get') {
				if ($('#' + $(elem).attr('id') + '_switch').attr('checked')) {
					value = $('#' + $(elem).attr('id') + '_editor').html();
				}
				else 
					value = $(elem).val();
				return value;
			}
			else if (action == 'set') {
				$(elem).val(value);
			}
		},

		
		enum_element: function(value, options){
			var elem = $('<select />');
			var select_options = '<option value=""></option>';
			$.each(options.value, function(key, value){
				select_options += '<option value="' + key + '">' + value + '</option>';
			});
			$(elem).append(select_options);
			$(elem).val(value);
			elem.attr('validate', options.validate);
			return elem;
		},
		
		enum_value:function(elem, action, value){
			if(action == 'get')
				return $(elem).val();
			else if(action == 'set')
				$(elem).val(value);
		},
		
		jsetgrid_element: function(value, options){
			var grid = $(this);
			var settings = grid.data('settings').grid.colModel[grid.data('index')[options.name]].settings;
			var filter_name = settings.filter[0].target;
			settings.search_default.push({
		  		name: filter_name,
		  		value: value
		  	});
			var elem = $('<TABLE></TABLE>');
			return elem;
		},
		
		jsetgrid_value: function(elem, action, value){
			if(elem.length == 0 || action == 'get')
				return '';
				
			var filter_field = $.jset.fn.get_filterToolbar_field($.jset.fn.get_grid_by_element(elem), elem.data('settings').filter[0].target);
			if(filter_field.val() != value)
			{
				filter_field.val(value);
				elem[0].triggerToolbar();
			}
		},
		
		grid_frame_element: function(value, options){
			var elem = $('<IFRAME></IFRAME>');
			$(elem).attr($.jset.defaults.grid_frame.iframe);
			$(elem).attr('height', options.height);
			$(elem).attr('width', options.width);
			$(elem).attr('src', options.src);
			$(elem).load(function(){
				var w = $(elem)[0].contentWindow;
				//playing with accessing the parent settings
				//var x = window.parent.host();
				var filter_name = w.settings.filter[0].target;
				w.settings.search_default.push({
			  		name: filter_name,
			  		value: value
			  	});
				w.settings.grid.height = options.height - $.jset.defaults.grid_frame.height_offset;
				w.settings.grid.width = options.width - $.jset.defaults.grid_frame.width_offset;
				w.create_grid();
			});
			return elem;
		},
		
		grid_frame_value: function(elem, action, value){
			if($(elem).length == 0)
				return '';
			if(action == 'get'){
				return '';
			}
			else if(action == 'set'){
				var w = $(elem)[0].contentWindow;
				var filter_name = w.settings.filter[0].target;
				$(elem).contents().find("#gs_" + filter_name).val(value);
				var e = $(elem).contents().find(".jset_table");
				e[0].triggerToolbar();
			}
			if(value== '')
				$(elem).hide();
			else
				$(elem).show();
		},
				
		multicheckbox_element: function(value, options){
			return $('<input />')
				.val(value)
				.attr('validate', options.validate)
				.addClass('jset-multicheckbox');
		},
		
		multicheckbox_value: function(elem, action, value){
			var fields = elem.closest('div').find('input[type="checkbox"].jset-multicheckbox');
			if(action == 'get'){
				var s = [];
				$.each(fields, function(){
					if($(this).is(':checked'))
						s.push($(this).val());
				});
				
				$(elem).val(s.join(','));
				return $(elem).val();
			}
			else if(action == 'set'){
				var values = value.split(',');
				$.each(fields, function(){
					if(values.indexOf($(this).val()) != -1)
						$(this).attr('checked', 'checked');
					else
						$(this).removeAttr('checked');
				});
				$(elem).val(value);
			}
		},
		
		multiselect_element: function(value, options){
			var elem = $("<select multiple='multiple' />");
			if(options.size) $(elem).css('width', options.size);
			if(options.height) $(elem).css('height', options.height);
			var s = '';
			if($.isArray(options.value))
			for (var i = 0; i < options.value.length; i++) {
				var option = options.value[i];
				s += '<option value="' + option.id + '">' + option.name + '</option>';
			}
			else
				$.each(options.value, function(key, val){
					s += '<option value="' + key + '">' + val + '</option>';
				});
			
			$(elem).html(s);
			$(elem).addClass('multiselector');
			var v = value.split(',');
			$(elem).val(v);
			elem.attr('validate', options.validate);
			return elem;
		},
		
		multiselect_value: function(elem, action, value){
			if(action == 'get'){
				return $(elem).val() ? $(elem).val().join(',') : '';
			} 
			else if(action == 'set'){
				var v = value.split(',');
				$(elem).val(v);
			}
		},

		grid_multiselect_element: function(value, options){
			var elem = $("<table />");
			var settings = $.jset.defaults.grid_multiselect;
			settings.source = options.colSettings.list;
			settings.grid.height = options.colSettings.height;
			settings.grid.width = options.colSettings.usize;
			var init = true;
			settings.grid.loadComplete = function(data){
				if(init){
					setTimeout(function(){
						$.jset.fn.grid_multiselect_value(elem, 'set', value);
						init = false;
					}, 0);
				}
			};
			elem.jset(settings);
			return elem;
		},
		
		grid_multiselect_value: function(elem, action, value){
			if(action == 'get'){
				return elem.jqGrid('getGridParam', 'selarrrow').join();
			} 
			else if(action == 'set'){
				elem.jqGrid('resetSelection');
				var v = value.split(',');
				$.each(v, function(key, val){
					elem.jqGrid('setSelection', val);
				});
			}
		},

		selectbox_element: function(value, options){
			var grid = $(this);
			var elem = $('<select />');
			$.jset.fn.set_select_options(elem, grid, options.value, value, false, options.name);
			$.jset.fn.set_dependent_fields(elem);
			$.jset.fn.set_select_list_refresh(elem);
			$.jset.fn.set_search_refresh(elem);
			elem.attr('validate', options.validate)
			.addClass('jset-field-padding');
			return elem;
		},
		
		selectbox_value:function(elem, action, value){
			if(action == 'get')
				return $(elem).val();
			else if(action == 'set')
				$.jset.fn.handle_change_select_options(elem, value);
		},
		
		selectbox_plus_element: function(value, options){
			var grid = $(this);
			var elem = $('<select />');
			$.jset.fn.set_select_options(elem, grid, options.value, value, false, options.name);
			$.jset.fn.set_dependent_fields(elem);
			$.jset.fn.set_select_list_refresh(elem);
			$.jset.fn.set_search_refresh(elem);
			$.jset.fn.set_selectbox_plus_change(elem);
			elem.attr('validate', options.validate)
			.addClass('jset-field-padding');
			return elem;
		},
		
		selectbox_plus_value:function(elem, action, value){
			if(action == 'get')
				return $(elem).val();
			else if(action == 'set')
				$.jset.fn.handle_change_select_options(elem, value);
		},
		
		autocomplete_element: function(value, options){
			var elem = $('<input />');
			$(elem).val(value);
			//elem.attr('validate', options.validate);
			elem.addClass('jset_autocomplete');
			return elem;
		},
		
		autocomplete_value: function(elem, action, value){
			if(action == 'get')
				return $(elem).val();
			else if(action == 'set')
				$(elem).val(value);
		},
		
		get_autocomplete_element: function(formid, name){
			var grid = $.jset.fn.get_grid_by_formid(formid);
			var parent_div = $.jset.fn.get_form_field(formid, name).parent('div');
			return parent_div.children('input[name!="' + name + '"]');
		},
		
		editor_formatter : function(cellvalue, options, rowobject) {
			var store = $(this).data('store');
			if(store[options.colModel.name] == undefined)
				store[options.colModel.name] = {};
			store[options.colModel.name][options.rowId] = cellvalue;
			
			return $('<div>' + cellvalue + '</div>').text().replace(/\n/g, ' ');
		},
		
		editor_unformatter: function(cellvalue, options, cellObject) {
			var table = $(cellObject).parents('table:first');
			var store = table.data('store');
			return store[options.colModel.name][options.rowId];
		},
		
		editor_textarea_formatter : function(cellvalue, options, rowobject) {
			var store = $(this).data('store');
			if(store[options.colModel.name] == undefined)
				store[options.colModel.name] = {};
			store[options.colModel.name][options.rowId] = cellvalue;
			
			return $('<div>' + cellvalue + '</div>').text().replace(/\n/g, ' ');
		},
		
		editor_textarea_unformatter: function(cellvalue, options, cellObject) {
			var table = $(cellObject).parents('table:first');
			var store = table.data('store');
			return store[options.colModel.name][options.rowId];
		},
		
		textarea_formatter : function(cellvalue, options, rowobject) {
			var store = $(this).data('store');
			if(store[options.colModel.name] == undefined)
				store[options.colModel.name] = {};
			store[options.colModel.name][options.rowId] = cellvalue;
			
			return $('<div>' + cellvalue + '</div>').text().replace(/\n/g, ' ');
		},
		
		textarea_unformatter: function(cellvalue, options, cellObject) {
			var table = $(cellObject).parents('table:first');
			var store = table.data('store');
			return store[options.colModel.name][options.rowId];
		},
		
		select_option_exists: function(elem, value){
			var exists = false;
			$(elem).find('option').each(function(){
			    if (this.value == value) {
			        exists = true;
			        return false;
			    }
			});
			
			return exists;
		},
		
		handle_change_select_options: function(elem, value, grid){
			if(!$.jset.fn.select_option_exists(elem, value)){
				$.jset.fn.select_option_append(elem, value, value);
				$(elem).val(value);
				/*if($.jset.message_flag){
					if($(elem).attr('name') != undefined)
					{
						$.jset.message_flag = false;
						grid = grid == undefined ? $.jset.fn.get_grid_by_element($(elem)) : grid;
						var field_label = grid.data('settings').grid.colNames[grid.data('index')[$(elem).attr('name')]];
						alert($.jgrid.format($.jset.messages.selectboxItemNotFound, field_label, value));
					}
				}*/
			}
			else
				$(elem).val(value);
		},
		
		select_option_append: function(elem, key, value){
			select_option = '<option value="' + key + '">' + value + '</option>';
			$(elem).append(select_option);
		}
	});

	$.extend(true, $.jset.defaults, {
		max_field_size: 150,
		field_size:10,
		autocomplete: {
	        minLength: 2,
	        autoFocus: true,
	        source: function( request, response){
				var d = new Date();
				var nd = d.getTime();
				$.ajax({
					type: 'POST',
					url: 'jset/server/jset.php',
					data: {
					_methods_: 'grid_rows',
					_nd_: nd,
					_order_by_:	'label',
					_order_direction_: 'asc',
					_page_:	1,
					_rows_:	10,
					_search_: true,
					_source_: 'patient_list',
					filters: '{"groupOp":"AND","rules":[{"field":"value","op":"bw","data":"' + request.term + '"}]}'			
					},
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function(data){
						var rows = [];
						if(data.records != 0){
							$.each(data.rows, function(){
								var obj = {};
								obj.id = this.id;
								obj.value = this.cell[1];
								obj.label = this.cell[2];
								obj.info = this.cell;
								rows.push(obj);
							});
						}
						response(rows);
					},
					error: function(message){
						response([]);
						alert(message);
					}
				});
	        },
            response: function(event, ui){
            	if(ui.content.length == 0){
            		$(this).addClass('autocomplete-empty-list');
            		$(this).data('empty', true);
            	}
            	else
            	{
            		$(this).removeClass('autocomplete-empty-list');
            		$(this).removeData('empty');
            		$(this).data('firstitem', ui.content[0]);
            	}
            },
            select: function(event, ui){
            	$(this).removeClass('autocomplete-empty-list');
            	$(this).removeData('firstitem');
            }
		},
		datepicker: {
			dateFormat:'dd/mm/yy',
			changeYear:true,
			changeMonth:true,
			yearRange:'1800:2100',
			onSelect: function(dateText, inst){
				$(this).trigger('change');
				if($(this).parents('tr.ui-search-toolbar').length != 0)
				{
					var grid = $.jset.fn.get_grid_by_element(this);
					grid[0].triggerToolbar();
				}
				else if($(this).parent().hasClass('input-elm')){
					$(this).parent().trigger('change');
				}
			}
		},
		
		upload_file: {
			height: '140',
			row_height: '80',
			max_width: '1000',
			browse_title: 'Upload File',
			delete_title: 'Delete File',
			show_image: true,
			show_target: true,
			show_link: true,
			show_icon: true,
			input_element: '<input type="text"/>',
			target_element: '<input type="image" value=""/>',
			target_selector: 'input[type="image"]',
			fineUploader: {
		        debug: false,
		        request: {
		            endpoint: $.jset.defaults.dir_pre + 'jset/server/jset_upload.php',
		            inputName: "userfile",
		            paramsInBody: true,
		            params: {
		            	dir: "files/",
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
				  	//acceptFiles: 'jpeg,png',
				  	//allowedExtensions: ['jpg','jpeg','gif', 'png']
				  }
			},

			configure_target: function(element, editoptions)
			{
				$(element).bind('load', function(){
					$(this).width() > editoptions.custom_options.max_width ? $(this).width(editoptions.custom_options.max_width) : null;
				})
				.bind('error', function(){
					$(this).hide();
				})
				.bind('click', function(){
					var path = $(this).attr('path') ? $(this).attr('path') : $(this).attr('src');
					window.open(path);
				});
				
				return element;
			},
			target_value: function(val, options)
			{	
				var target_element = $(this);
				var target_link = $('.file-link-target', target_element.siblings('div'));
				var target_icon = $('.file-icon-target', target_element.siblings('div'));
				var trash = $('.qq-trash-button', target_element.siblings('div'));
				
				if(!val){
					target_element.hide();
					target_link.hide();
					target_icon.hide();
					trash.hide();
					return;
				}
				
				trash.show();
				
				if(options.editoptions.custom_options.show_link)	
					target_link.html($.fn.fmatter.uploadFileFmatter(val, options))
					.show();
				else
					target_link.hide();
				
				if(options.editoptions.custom_options.show_icon)	
					target_icon.html($.fn.fmatter.uploadFileIconFmatter(val, options))
					.show();
				else
					target_icon.hide();
				
				if(options.editoptions.custom_options.show_target){
					var extension = val.split('.').pop().toLowerCase();
										
					$(this).removeAttr('width').removeAttr('height').css({ width: '', height: '' });
					if(options.editoptions.custom_options.show_image && (extension == 'jpg' || extension == 'jpeg' || extension == 'gif' || extension == 'png')){
						$(this).attr('src', val) == '' ? $(this).hide() : $(this).show();
						$(this).removeAttr('path');
					}
					else
					{
						$(this).attr('src', '../jxset/jset/img/file.jpg');
						$(this).attr('path', val);
						$(this).show();
					}
				}			
			},
			error_handler: function(event, id, fileName, reason) {
		        alert("id: " + id + ", fileName: " + fileName + ", reason: " + reason);
		   },
		},
		
		upload_video: {
			//empty_url: $.jset.defaults.dir_pre + 'jset/img/empty_image.jpg',
			empty_url: '',
			ajax:{
				action: $.jset.defaults.dir_pre + 'jset/server/jset_upload.php',
				dir_pre: '',
				data: {
					dir: 'video/',
					ext: 'flv|mp4|mov',
					max: 1000000000
				},
				responseType: 'json'
			},
			height: '240px',
			width: '320px',
			row_height: '80'
		},
		
		editor:{
			directionality : 'ltr',
			statusbar: true,
		    setup: function (ed) {
		        ed.on('init', function(args) {
		            if(!$('link[href="'+ $.jset.defaults.dir_pre + 'jset/css/tinymce.css"]').length)
						$('<link>')
						  .appendTo($('head'))
						  .attr({type : 'text/css', rel : 'stylesheet'})
						  .attr('href', $.jset.defaults.dir_pre + 'jset/css/tinymce.css');
		        });
		    }
		},
		editor_old:{
			directionality : 'ltr',
			// Location of TinyMCE script
			script_url : $.jset.defaults.dir_pre + 'jset/widget/tinymce/jscripts/tiny_mce/tiny_mce.js',
			// General options
			theme : 'advanced',
			plugins : 'jbimages,safari,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template',
			language : 'en',
			// Theme options
			theme_advanced_buttons1 : 'newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect',
			theme_advanced_buttons2 : 'cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor',
			theme_advanced_buttons3 : 'tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen',
			theme_advanced_buttons4 : 'jbimages,|,insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak',
			theme_advanced_toolbar_location : 'top',
			theme_advanced_toolbar_align : 'left',
			theme_advanced_statusbar_location : 'bottom',
			theme_advanced_resizing : true,
			theme_advanced_resizing_use_cookie : true,
			// Example content CSS (should be your site CSS)
			//content_css : $.jset.defaults.dir_pre + 'css/content.css',
			// Drop lists for link/image/media/template dialogs
			template_external_list_url : $.jset.defaults.dir_pre + 'lists/template_list.js',
			external_link_list_url : $.jset.defaults.dir_pre + 'lists/link_list.js',
			external_image_list_url : $.jset.defaults.dir_pre + 'lists/image_list.js',
			media_external_list_url : $.jset.defaults.dir_pre + 'lists/media_list.js',
			// Replace values for the template plugin
			template_replace_values : {
				username : 'Some User',
				staffid : '991234'
			},
			
			relative_urls : false,
			//for removing the <p></p> inital tag
			//force_p_newlines : false,
			//force_br_newlines : false,
			//forced_root_block : ''
			
			//for <div></div> initial tag
			force_p_newlines : true,
			force_br_newlines : false,
			forced_root_block : 'div'
			//height: '600'
			//width: '444' the minimum width
		},
		
		grid_frame:{
			iframe: {
				frameborder: '0',
				marginheight: '0',
				marginwidth: '0',
				jsetype: 'grid_frame'
			},

			width: 902,
			height: 444,
			width_offset: 20,
			height_offset: 122,
			new_record_show: false
		},
						
		grid_multiselect:{
			filterToolbar:{
				hide: true,
				navButtonAdd: false
			},
			'export': false,
			grid:{
				height: 120,
				width: 250,
				multiselect: true,
				rownumbers: false
			},
			navigation:{
				options : {
					search: false,
					add: false,
					edit: false,
					del: false,
					refresh: true,
					view: false
				}
			}
		}
	});

	$.extend(true, $.jset.defaults, {
		control:{
			align: 'left',
			edittype: 'text',
			stype: 'text',
			autocomplete:{
				align: 'left',
				//formatter: 'select',
				edittype: 'custom',
				editoptions: {
					value: {},
					size: $.jset.fn.colsize,
					defaultValue: function(col){
						return col.default_value;
					},
					dataInit: function(col){
						return col.readonly != 1 ? undefined : $.jset.fn.disabled;
					},
					custom_options: {
						autocomplete: $.jset.defaults.autocomplete,
						readonly: function(formid, name){
							var elem = $.jset.fn.get_autocomplete_element(formid, name);
							$.jset.fn.readonly_field(formid, $(elem).attr('name'));
						},
						disable: function(formid, name){
							var elem = $.jset.fn.get_autocomplete_element(formid, name);
							$.jset.fn.disable_field(formid, $(elem).attr('name'));
						},
						enable: function(formid, name){
							var elem = $.jset.fn.get_autocomplete_element(formid, name);
							$.jset.fn.enable_field(formid, $(elem).attr('name'));
						}
					}
				},
				stype: 'text',
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				},
				onInitializeForm: function(formid, id){
					var elem = $(formid).find('#' + id);
					var grid = $(this);
					var empty_ui_object = {};
					empty_ui_object.item = {
						id: '',
						value: ''
					};

					var editoptions = grid.data('settings').grid.colModel[grid.data('index')[elem.attr('name')]]['editoptions'];							
					//$.dump(editoptions.custom_options.autocomplete);
					if(elem.siblings().length == 0){
						elem.hide();

						var div = $('<div></div>')
						.insertBefore(elem)
						.append(elem);
						
						var target_element = $('<input/>')
						.attr('id', elem.attr('name') + '_autocomplete')
						.attr('name', elem.attr('name') + '_autocomplete')
						.attr('size', editoptions.size)
						.addClass('ui-widget-content ui-corner-all ui-widget')
						.css({'font-size': '1em', display: 'inline-block', 'vertical-align': 'text-top'})
						.addClass('jset-field-padding')
						.attr('validate', editoptions.validate);

						//editoptions.custom_options.configure_target(target_element, editoptions);
						target_element.insertAfter(elem);
						target_element.autocomplete(editoptions.custom_options.autocomplete);
						target_element.on( "autocompleteselect.jset", function( event, ui ) {
        					$(this).siblings('input').val(ui.item.id);
        				})
        				.focusout(function(){
        					$(this).removeClass('autocomplete-empty-list');
        					if($(this).val().length < $(this).autocomplete( "option", "minLength" ))
        					{
        						$(this).val('');
        						if(elem.val() != '')
        							$(this).trigger("autocompleteselect", [empty_ui_object]);
        					}
        					else if($(this).val() == '' && elem.val() != '')
        						$(this).trigger("autocompleteselect", [empty_ui_object]);
        					else if($(this).data('empty'))
        					{
        						$(this).val('');
        						$(this).trigger("autocompleteselect", [empty_ui_object]);
        					} 
        					else if($(this).data('firstitem'))
        					{
    							$(this).val($(this).data('firstitem').value);
    							var ui = {};
    							ui.item = $(this).data('firstitem');
    							$(this).removeData('firstitem');
    							$(this).trigger("autocompleteselect", [ui]);
        					} 
        				});
        				/*.on("autocompletechange.dependent_fields", function(event, ui){
        					$.dump(ui.item.id);
        					$('ul.ui-autocomplete').css('background-image', 'url("../gui_lib/panel/images/panel_bg_green.gif")');
        				});*/
					}
				}
			},
			bigint:{
				align:'right',
				formatter:'integer',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pintInit : $.jset.fn.intInit;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pintInit : $.jset.fn.intInit;
					},
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				}
			},
			bit: {
				align: 'center'
			},
			button:{
				edittype: 'button'
			},
			'char':{
				align:'left',
				edittype:'text',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				}
			},
			checkbox: {
				align: 'center',
				formatter: 'checkbox',
				edittype: 'checkbox',
				editoptions: {
					value: '1:0',
					defaultValue: function(col){
						return col.default_value ? col.default_value : undefined; 
					},
					dataInit: function(col){
						return col.readonly != 1 ? undefined : $.jset.fn.disabled;
					},
					custom_options: {
						readonly: function(formid, name){
							$.jset.fn.disable_field(formid, name);
						}
					}
				},
				stype: 'select',
				searchoptions:{
					sopt:['eq'],
					searchOperators: false,					
					value: {0:'No', 1:'Yes'},
					dataInit: function(col){
						return $.jset.fn.dataInit_checkbox;
					}						
				}
			},
			custom_checkbox: {
				align: 'center',
				formatter: 'checkbox',
				edittype: 'checkbox',
				editoptions: {
					value: '1:0',
					defaultValue: function(col){
						return col.default_value ? col.default_value : undefined; 
					},
					dataInit: function(col){
						return col.readonly != 1 ? undefined : $.jset.fn.disabled;
					},
					custom_options: {
						readonly: function(formid, name){
							$.jset.fn.disable_field(formid, name);
						}
					}
				},
				stype: 'custom',
				searchoptions:{
					custom_element: $.jset.fn.selectbox_element,
					custom_value: $.jset.fn.selectbox_value,
					value: {0:'No', 1:'Yes'},
					defaultValue: function(col){
						//return col.search_default ? col.search_default : '';
					},
					sopt:['eq','ne'],					
					//dataInit: function(col){
						//return $.jset.fn.select_searchoptions_dataInit;
					//},
					searchOperators: true				
				}
			},
			currency:{
				align:'right',
				formatter:'currency',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.unsigned ? parseInt(col.size) + 2 : parseInt(col.size) + 1;
					},
					dataInit: function(col){ 
						return col.unsigned ? $.jset.fn.pnumInit : $.jset.fn.numInit;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn'],
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pnumInit : $.jset.fn.numInit;
					}
				}
			},
			custom_date:{
				align: 'right',
				formatter:'date',
				edittype:'custom',
				stype: 'custom',
				unformat: $.jset.fn.unformat_date,
				formatoptions:{
					reformatAfterEdit: true
				},
				editoptions:{
					size: $.jset.fn.colsize,
					defaultValue: function(col){
						return col.default_value;
					}
				},
				onInitializeForm: function(formid, id){
					var elem = $(formid).find('#' + id);
					if(elem.length > 0)
						$.jset.fn.dateInit(elem);
				},
				searchoptions:{
					custom_element: $.jset.fn.custom_date_element,
					custom_value: $.jset.fn.custom_date_value,
					sopt:['cn','nc','eq','ne','lt','le','gt','ge','nu','nn'],					
					dataInit: function(col){
						return $.jset.fn.dateInit;
					}
				}
			},
			date:{
				align:'right',
				formatter:'date',
				formatoptions: {reformatAfterEdit: true},
				unformat: $.jset.fn.unformat_date,
				editoptions:{
					size: function(col){
						return col.usize ? col.usize : 15;
					},
					dataInit: function(col){
						return col.readonly != 1 ?  $.jset.fn.dateInit : undefined;
					},
					defaultValue: function(col){
						return $.jset.fn.format_date(col.default_value);
					}
				},
				searchoptions:{
					sopt:['cn','nc','eq','ne','lt','le','gt','ge','nu','nn'],					
					dataInit: function(col){
						return $.jset.fn.dateInit;
					}
				}
			},
			datetime:{
				align:'right',
				formatter:'datetimeFmatter',
				unformat: $.jset.fn.unformat_datetime,
				edittype:'text',
				editoptions:{
					size: function(col){
						return col.usize ? col.usize : 20;
					},
					maxlength: function(col){
						return col.size;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				}
			},
			decimal:{
				align:'right',
				formatter:'number',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.unsigned ? parseInt(col.size) + 2 : parseInt(col.size) + 1;
					},
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pnumInit : $.jset.fn.numInit;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn'],
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pnumInit : $.jset.fn.numInit;
					}
				}
			},
			'double':{
				align:'right',
				formatter:'number',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size ? (col.unsigned ? parseInt(col.size) + 2 : parseInt(col.size) + 1): $.jset.defaults.field_size;
					},
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pnumInit : $.jset.fn.numInit;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn'],
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pnumInit : $.jset.fn.numInit;
					}
				}
			},
			editor:{
				align: 'left',
				edittype:'custom',
				editoptions:{
					height: function(col){
						return col.height ? col.height : $.jset.defaults.editor.height;
					},
					width: function(col){
						return col.usize ? col.usize : $.jset.defaults.editor.width;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				},
				onInitializeForm: function(formid, id){
					var grid = $(this);
					var elem = $(formid).find('textarea#' + id);
					var options = grid.data('settings').grid.colModel[grid.data('index')[elem.attr('name')]].editoptions;
					$(elem).tinymce($.extend(true, {}, $.jset.defaults.editor, options));
				}
			},
			
			email:{
				align: 'left',
				formatter: 'emailFmatter'
			},
			
			'enum':{
				align: 'left',
				formatter: 'select',
				edittype: 'custom',
				editoptions: {
					value: {},
					defaultValue: function(col){
						return col.default_value;
					},
					dataInit: function(col){
						return col.readonly != 1 ? undefined : $.jset.fn.disabled;
					}
				},
				stype: 'select',
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn'],
					dataInit: function(col){
						return $.jset.fn.prepend_empty_select_option;
					}	
				}
			},
			'float':{
				align:'right',
				formatter:'number',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size ? (col.unsigned ? parseInt(col.size) + 2 : parseInt(col.size) + 1): $.jset.defaults.field_size;
					},
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pnumInit : $.jset.fn.numInit;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn'],
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pnumInit : $.jset.fn.numInit;
					}
				}
			},
			jsetgrid:{
				edittype:'custom',
				editoptions: {
				},
				formoptions:{
					label_hide: true
				},
				onInitializeForm: function(formid, id){
					var elem = $(formid).find('table#' + id);
					var grid = $(this);
					if(grid.data('form_action') == 'add' || grid.data('form_action') == 'copy')
						elem.closest('span.FormElement').hide();
						
					var settings = grid.data('settings').grid.colModel[grid.data('index')[elem.attr('name')]].settings;
					elem.jset(settings);
				},
				beforeShowForm: function(formid, id){
					var elem = $(formid).find('table#' + id);
					var grid = $(this);

					if(grid.data('form_action') == 'add' || grid.data('form_action') == 'copy')
						elem.closest('span.FormElement').hide();
					else
						elem.closest('span.FormElement').show();
				}
			},
			grid_frame:{
				edittype:'custom',
				editoptions: {
					src: function(col){
						return col.src ? col.src : undefined;
					},
					width: function(col){
						return col.usize ? col.usize : $.jset.defaults.grid_frame.width;
					},
					height: function(col){
						return col.height ? col.height : $.jset.defaults.grid_frame.height;
					}
				},
				formoptions:{
					label_hide: true
				},
				onInitializeForm: function(formid){
					var grid = $.jset.fn.get_grid($(formid).selector.substr(9));
					if(grid.data('form_action') == 'add' && !grid.data('settings').control.grid_frame.new_record_show)
						$(formid).find('iframe[jsetype=grid_frame]').hide();
					else
						$(formid).find('iframe[jsetype=grid_frame]').show();					
				}
			},
			grid_multiselect:{
				edittype:'custom',
				editoptions: {
					colSettings: function(col){
						return col;
					}
				},
				onInitializeForm: function(formid){
				}
			},
			'int':{
				align:'right',
				formatter:'integer',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pintInit : $.jset.fn.intInit;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn'],
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pintInit : $.jset.fn.intInit;
					}
				}
			},
			'link':{
				align:'left',
				formatter:'linkFmatter',
				formatoptions:{
					url: '<a href="?id=#idname#" target="_blank">#value#</a>',
					idname: 'id'
				},
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				}
			},
			longtext:{
				align:'left',
				edittype:'textarea',
				editoptions:{
					cols: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					rows: function(col){
						return col.height ? col.height : 2;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				}
			},
			mediumint:{
				align:'right',
				formatter:'integer',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pintInit : $.jset.fn.intInit;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn'],
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pintInit : $.jset.fn.intInit;
					}
				}
			},
			mediumtext:{
				align:'left',
				edittype:'text',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				}
			},
			multicheckbox:{
				edittype:'custom',
				editoptions: {
					value: {},
					size: function(col){
						return col.usize ? col.usize : undefined;
					},
					height: function(col){
						return col.height ? col.height : undefined;
					},
					defaultValue: function(col){
						return col.default_value;
					},
					custom_options: {
						columns: 2
					}
				},
				searchoptions:{
					sopt: ['cn'],
					searchOperators:false
				},
				formoptions:{
					label_hide: true
				},
				beforeInitData: function(formid){
					$(formid).find('input.multicheckbox').attr('checked', false);
				},
				onInitializeForm: function(formid, id){
					var elem = $(formid).find('input.jset-multicheckbox#' + id);
					var grid = $(this);
					var editoptions = grid.data('settings').grid.colModel[grid.data('index')[elem.attr('name')]]['editoptions'];							

					if(elem.siblings().length == 0){
						elem.hide();

						var div = $('<div></div>')
							.insertBefore(elem)
							.append(elem);
						var table = $('<table class="jset-multicheckbox"><tr><td></td></tr></table>')
							.appendTo(div);
						
						var td = $('td', table);
						for(var i = 1; i < editoptions.custom_options.columns; i++)
							td.clone().appendTo($('tr', table));
					
						value = elem.val();
						var v = value.split(',');
						
						if($.isArray(editoptions.value)){
							for (var i = 0; i < editoptions.value.length; i++) {	
								var option = editoptions.value[i];
								$('<label class="jset-multicheckbox"><input type="checkbox" value="' + option.id + '" ' + (v.indexOf(option.id) != -1 ? '" checked="checked"' : '') + ' class="jset-multicheckbox"/> ' + option.name + '</label><br />')
									.appendTo($('td:nth-child(' + ((i % editoptions.custom_options.columns) + 1) + ')', table));
							}						
						}
					}
				}
			},
			multiselect:{
				edittype: 'custom',
				//formatter: 'select',
				editoptions: {
					value: {},
					size: function(col){
						return col.usize ? col.usize : undefined;
					},
					height: function(col){
						return col.height ? col.height : undefined;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn'],
					searchOperators: false
				},
				onInitializeForm: function(formid){
					//if in add mode
					if($(formid).find('input[name=id]').val() == '')
						$(formid).find('.multiselector').val('');
				}
			},
			password:{
				align:'left',
				edittype:'password',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				}
			}, 
			selectbox:{
				align: 'left',
				formatter: 'selectbox',
				edittype: 'custom',
				editoptions: {
					value: {},
					defaultValue: function(col){
						return col.default_value;
					},
					dataInit: function(col){
						return col.readonly != 1 ? undefined : $.jset.fn.disabled;
					},
					no_empty_first_row: false,
					select_list_refresh: false,
					custom_options: {
						readonly: function(formid, name){
							$.jset.fn.disable_field(formid, name);
						}
					}
				},
				//stype: 'select',
				stype: 'custom',
				searchoptions:{
					custom_element: $.jset.fn.selectbox_element,
					custom_value: $.jset.fn.selectbox_value,
					value: '',
					defaultValue: function(col){
						//return col.search_default ? col.search_default : '';
					},
					sopt:['eq','ne']				
				},
				afterShowForm: function(formid, id){
					var grid = $(this);
					var elem = $(formid).find('#' + id);
					var name = $(elem).attr('name');
					if(grid.data('columns')[grid.data('index')[name]]['dependent_fields'])
						$(elem).trigger('change.dependent_fields', [true]);
				},
				afterclickPgButtons : function(whichbutton, formid, rowid, id){
					var grid = $(this);
					var elem = $(formid).find('#' + id);
					var name = $(elem).attr('name');
					if(grid.data('columns')[grid.data('index')[name]]['dependent_fields'])
						$(elem).trigger('change.dependent_fields', [true]);
				},
			},
			selectbox_plus:{
				align: 'left',
				formatter: 'selectbox',
				edittype: 'custom',
				editoptions: {
					value: {},
					defaultValue: function(col){
						return col.default_value;
					},
					dataInit: function(col){
						return col.readonly != 1 ? undefined : $.jset.fn.disabled;
					},
					no_empty_first_row: false,
					select_list_refresh: false,
					custom_options: {
						readonly: function(formid, name){
							$.jset.fn.disable_field(formid, name);
						}
					},
					dialog: {
						autoOpen: false,
						resizable: false,
						dialogClass: 'selectbox_plus-dialog'
					},
					settings:{
						search_default:[{name:'id', value:''}],
						single_record: {
							active: true
						},
						onInitializeForm : function(formid) {
							var grid = $(this);
							var s = grid.data('selectbox_plus');
							var source_grid = $('table#' + s.source_grid_id);

							s.dlg.children('img').hide();
							s.dlg.children('div').show();
							$('.ui-jqdialog-titlebar', $(formid).closest('.ui-jqdialog')).hide();
							$(formid).closest('.ui-jqdialog').offset({ top: -4, left: -3});

							s.dlg.dialog('option', 'width', $(formid).closest('.ui-jqdialog').width()+1)
								.dialog('option', 'height', $(formid).closest('.ui-jqdialog').height()+33)
								.dialog("widget").position({
								   my: (source_grid.data('settings').grid.direction  == 'ltr') ? 'left' : 'right',
								   at: (source_grid.data('settings').grid.direction  == 'ltr') ? 'right' : 'left',
							       of: s.button
							    })
							    .on( "dialogclose", function(event, ui) {
							    	$.jset.fn.clear_form_tooltips(formid);
							    });
						},		
						beforeShowForm: function(formid){
							var grid = $(this);
							var s = grid.data('selectbox_plus');
							s.dlg.dialog('option', 'title', $('.ui-jqdialog-titlebar span.ui-jqdialog-title', $(formid).closest('.ui-jqdialog')).html() + ' ' + s.dlg.dialog('option', 'record_name'));
							s.dlg.children('img').hide();
							s.dlg.children('div').show();
						},
						afterSubmit: function(response, postdata){
							var grid = $(this);
							var s = grid.data('selectbox_plus');
							var value = grid.data('lastID') ? grid.data('lastID') : false;
							$.jset.fn.select_list_refresh(s.source_field, value, true);
							s.dlg.dialog('close');
							return [true];
						},
						 grid: {
							width:80,
							height:50
						}					}
				},
				stype: 'custom',
				searchoptions:{
					custom_element: $.jset.fn.selectbox_element,
					custom_value: $.jset.fn.selectbox_value,
					value: '',
					defaultValue: function(col){
						//return col.search_default ? col.search_default : '';
					},
					sopt:['eq','ne']				
				},
				onInitializeForm: function(formid, id){
					var grid = $(this);
					var elem = $(formid).find('select#' + id);
					var target_grid_id = 'dlg_' + id + '_' + grid.attr('id');
					var dlg = $('<div style="overflow:hidden;"><img src="' + $.jset.dir_pre + grid.data('settings').loading_img + '"><div style="display:none"><table id ="' + target_grid_id + '"></table></div></div>');
					var button = $('<button class="selectbox_plus-button">+</button>');
					var options = grid.data('settings').grid.colModel[grid.data('index')[elem.attr('name')]]['editoptions'];

					elem.after(button);

					dlg.dialog($.extend(true, {}, options.dialog, {
						record_name: grid.data('settings').grid.colNames[grid.data('index')[elem.attr('name')]],
						position: { 
						    my: (grid.data('settings').grid.direction  == 'ltr') ? 'left' : 'right',
						    at: (grid.data('settings').grid.direction  == 'ltr') ? 'right' : 'left',
						    of: button
					    }
					}));
					$.jset.fn.get_grid_container(grid).append(dlg.parent());
					
					button.data({
						dlg: dlg,
						options: options,
						target_grid_id: target_grid_id,
						source_grid_id: grid.attr('id'),
						formid: formid
					});
					
					button.bind('click', function(){
						var s = $(this).data();
						if(s.dlg.dialog('isOpen')){
							s.dlg.dialog('close');
							return;
						}
						
						var source_field = $(this).siblings('select');
						var value = source_field.val();
						
						if(!$('table#' + s.target_grid_id, s.dlg).jset('defined')){
							s.dlg.children('div').hide();
							s.dlg.children('img').show();
							s.dlg.dialog('open');
							$('table#' + s.target_grid_id, s.dlg).data('selectbox_plus', {
								source_field: source_field,
								source_grid_id: s.source_grid_id,
								dlg: s.dlg,
								button: $(this)
							});
						
							value = value ? value : -1;
							s.options.settings.search_default[0].value = value;
							$('table#' + s.target_grid_id, s.dlg).jset(s.options.settings);
							return;
						}
						
						var this_container = $.jset.fn.get_grid_container($('table#' + s.target_grid_id, s.dlg));
						var filter_field = this_container.find("#gs_" + s.options.settings.search_default[0].name);
						if(value == ''){
							filter_field.val(-1);
							$('table#' + s.target_grid_id, s.dlg).jqGrid('editGridRow', 'new', s.options);
							$('.ui-jqdialog-titlebar-close', this_container).hide();
							$('#cData', this_container).hide();
							s.dlg.dialog('option', 'title', $.jgrid.format($.jset.nav.addCaption, s.dlg.dialog('option', 'record_name')));
							s.dlg.dialog('open');
							return;
						}
						
						if(filter_field.val() == value){
							s.dlg.dialog('open');							
						}else{
							s.dlg.children('div').hide();
							s.dlg.children('img').show();
							s.dlg.dialog('open');
							filter_field.val(value);
							$('table#' + s.target_grid_id, s.dlg)[0].triggerToolbar();
						}			
					});
				},
				afterShowForm: function(formid, id){
					var grid = $(this);
					var elem = $(formid).find('select#' + id);
					var name = $(elem).attr('name');
					$(elem).trigger('change.selectbox_plus');
					if(grid.data('columns')[grid.data('index')[name]]['dependent_fields'])
						$(elem).trigger('change.dependent_fields', [true]);
				},
				afterclickPgButtons : function(whichbutton, formid, rowid, id){
					var grid = $(this);
					var elem = $(formid).find('select#' + id);
					var name = $(elem).attr('name');
					var button = elem.siblings('button');
					var s = button.data();
					s.dlg.dialog('close');
					$(elem).trigger('change.selectbox_plus');
					if(grid.data('columns')[grid.data('index')[name]]['dependent_fields'])
						$(elem).trigger('change.dependent_fields', [true]);
				},
				onClose: function(formid, id){
					var grid = $(this);
					var elem = $(formid).find('select#' + id);
					var button = elem.siblings('button');
					var s = button.data();
					s.dlg.dialog('close');
				}
			},
			select: {
				align: 'left',
				formatter: 'select',
				edittype: 'select',
				editoptions: {
					value: {},
					defaultValue: function(col){
						return col.default_value;
					},
					dataInit: function(col){
						return col.readonly != 1 ? $.jset.fn.prepend_empty_select_option : $.jset.fn.disabled;
					}
				},
				stype: 'select',
				searchoptions:{
					sopt: ['eq','ne'],
					dataInit: function(col){
						return $.jset.fn.prepend_empty_select_option;
					}	
				}
			}, 
			smallint:{
				align:'right',
				formatter:'integer',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pintInit : $.jset.fn.intInit;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn'],
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pintInit : $.jset.fn.intInit;
					}
				}
			},
			text:{
				align:'left',
				edittype:'textarea',
				editoptions:{
					cols: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					rows: function(col){
						return col.height ? col.height : 2;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt:['eq','bw','bn','cn','nc','ew','en','nu','nn']
				}
			},
			plain:{
				align:'left',
				formatter: 'plainFmatter',
				edittype:'textarea',
				editoptions:{
					cols: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					rows: function(col){
						return col.height ? col.height : 2;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				}
			},
			textarea:{
				align:'left',
				edittype:'textarea',
				editoptions:{
					cols: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					rows: function(col){
						return col.height ? col.height : 2;
					},
					defaultValue: function(col){
						return col.default_value;
					},
					'class': 'jset-field-padding'
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				}
			},
			editor_textarea:{
				align:'left',
				edittype:'custom',
				editoptions:{
					cols: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					rows: function(col){
						return col.height ? col.height : 2;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				},
				onInitializeForm: function(formid, id){
					var grid = $(this);
						
					$.each($('#' + id, formid), function(){
						var $this = $(this);
						var options = grid.data('settings').grid.colModel[grid.data('index')[$(this).attr('name')]]['editoptions'];
						var checkbox_id = $this.attr('id') + '_switch';
						var editor_id = $this.attr('id') + '_editor';
						if($('#' + checkbox_id, formid).length == 0){
							var checkbox = $('<input type="checkbox" />');
							checkbox.attr('id',  checkbox_id);
							checkbox.insertBefore($this);
							var label = $('<label> ' + grid.data('settings').control.editor_textarea.label_title + '</label><br />');
							label.insertAfter(checkbox);
							if($this.val().indexOf('/>') != -1 || $this.val().indexOf('</') != -1)
								checkbox.attr('checked','checked');
							
							checkbox.bind('change', function(e, params){
								if(typeof params != 'undefined'){
									if($this.val().indexOf('/>') != -1 || $this.val().indexOf('</') != -1)
										$(this).attr('checked','checked');
									else
										$(this).removeAttr('checked');
								}
									
								if($(this).attr('checked')){
									$.jset.fn.disable_hide_field(formid, $this.attr('id'));
									if($('#' + editor_id, formid).length == 0){
										if (typeof params == 'undefined') {
											var str = $this.val().replace(/[ ]/g, '&nbsp;');
											str = str.replace(/\n\r?/g, '<br />');
										}else
											var str = $this.val();
										var elem = $("<textarea size='10'/>");
										elem.attr('id', editor_id);
										elem.val(str);
										elem.insertAfter($this);
										elem.tinymce($.extend(true, {}, $.jset.defaults.editor, {
											forced_root_block : 'div',
											directionality : 'rtl',
											theme_advanced_resizing : false,
											theme_advanced_resizing_use_cookie : false,
											height: $this.attr('rows') * 14,
											width: $this.attr('cols')* 5.25
										}));
										elem.attr('validate', options.validate);

									} else{
										if (typeof tinyMCE !== 'undefined' && typeof tinyMCE.get(editor_id) !== 'undefined') {
											tinyMCE.get(editor_id).show();
											if (typeof params == 'undefined') {
												var str = $this.val().replace(/[ ]/g, '&nbsp;');
												str = str.replace(/\n\r?/g, '<br />');
											}
											else 
												var str = $this.val();
											
											if (typeof $this.data('previous') == 'undefined' || $this.val() != $this.data('previous')) 
												tinyMCE.get(editor_id).setContent(str);
										}
									}
								}else{
									if(typeof tinyMCE !== 'undefined' && typeof tinyMCE.get(editor_id) !== 'undefined'){
										if (typeof params == 'undefined') {
											var str = $('#' + editor_id).html();
											if (str) {
												str = str.replace(/<br \/>/g, '###newline###');
												str = $('<div />').html(str).text().replace(/###newline###/g, '\n');
												$this.val(str);
											}
											else 
												$this.val('');
											$this.data('previous', $this.val());	
										}else
											$this.removeData('previous');
										
										tinyMCE.get(editor_id).hide();
									}
									$('#' + editor_id, formid).hide();
									$.jset.fn.enable_show_field(formid, $this.attr('id'));
								}
							});
							
						}

						
						$('#' + checkbox_id, formid).trigger('change', [true]);
						grid.data('init_editor_textarea', true);
					});
				},
				
				afterclickPgButtons : function(whichbutton, formid, rowid, id){
					$('#' + id + '_switch', formid).trigger('change', [true]);
				},
			},
			
			time:{
				align:'right',
				edittype:'text',
				formatter:'timeFmatter',
				formatoptions: {seconds:false, minutes:true},
				unformat: $.jset.fn.unformat_time,
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				}
			},
			timestamp:{
				align:'right',
				edittype:'text',
				editoptions:{
					size: 20,
					maxlength: function(col){
						return col.size;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				}
			},
			tinyint:{
				align:'right',
				formatter:'integer',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pintInit : $.jset.fn.intInit;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn'],
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pintInit : $.jset.fn.intInit;
					}
				}
			},
			tinytext:{
				align:'left',
				edittype:'text',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				}
			},
			real:{
				align:'right',
				formatter:'number',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.unsigned ? parseInt(col.size) + 2 : parseInt(col.size) + 1;
					},
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pnumInit : $.jset.fn.numInit;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn'],
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pnumInit : $.jset.fn.numInit;
					}
				}
			},

			upload_file:{
				align:'left',
				edittype: 'custom',
				formatter: 'uploadFileFmatter',
				formatoptions:{
					picture_lable: 'Picture',
					file_lable: 'File'
				},
				editoptions:{
					custom_options: $.jset.defaults.upload_file,
					id: function(col){
						return col.Field;
					}
				},
				formoptions:{
					label_hide: true
				},
				onInitializeForm: function(formid, id){
					var grid = $(this);
					var $this = $('#' + id, formid);
					var options = grid.data('settings').grid.colModel[grid.data('index')[$this.attr('name')]];							
					var editoptions = options['editoptions'];							

					$this.hide()
					.bind('change', function(){
						target_element.attr('src', $(this).val()) == '' ? target_element.hide() : target_element.show();
					});

					var div = $('<div></div>')
					.insertBefore($this)
					.append($this);
					
					var target_element = $(editoptions.custom_options.target_element).hide();
					editoptions.custom_options.configure_target(target_element, editoptions);
					target_element.insertAfter(div);
											
					var span = $('<span></span>')
						.attr('title', editoptions.custom_options.browse_title)
						.appendTo(div);
						
				    var fineUploader = span.fineUploader(editoptions.custom_options.fineUploader)
				        .on('error', editoptions.custom_options.error_handler)
				        .on('complete', function(event, id, filename, response){
							if(response.error !== undefined){
								alert(response.error);
								return;
							}

							var dir = response.dir.replace(/\\\//g, "/");
							$this.val(dir + response.fileName);
							editoptions.custom_options.target_value.call(target_element, $this.val(), options);
				        })
				        .on('progress', function (event, id, fileName, uploadedBytes, totalBytes) {
							if (uploadedBytes < totalBytes) {
								var progress = Math.round(uploadedBytes / totalBytes * 100);
								
								$('div.qq-progress-bar', this).show()
								.css('width', (progress > 20 ? progress : '20') + 'px')
								.html(progress + '%');
							}
							else {
								$('div.qq-progress-bar', this).hide();
							}
						});
							
					$('ul.qq-upload-list').hide();
					
					var trash = span.find('.qq-trash-button')
						.attr('title', editoptions.custom_options.delete_title)
						.bind('click', function(){
							$this.val('');
							editoptions.custom_options.target_value.call(target_element, '', options);
						});
				},
				beforeShowForm: function(formid, id){
					var grid = $(this);
					var $this = $('#' + id, formid);
					var options = grid.data('settings').grid.colModel[grid.data('index')[$this.attr('name')]];							
					var editoptions = options['editoptions'];							
					var target_element = $($this.parent('div')).siblings(editoptions.custom_options.target_selector);
					editoptions.custom_options.target_value.call(target_element, $this.val(), options);
				},
				afterclickPgButtons : function(whichbutton, formid, rowid, id){
					var grid = $(this);
					var $this = $('#' + id, formid);
					var options = grid.data('settings').grid.colModel[grid.data('index')[$this.attr('name')]];							
					var editoptions = options['editoptions'];							
					var target_element = $($this.parent('div')).siblings(editoptions.custom_options.target_selector);
					editoptions.custom_options.target_value.call(target_element, $this.val(), options);
				},
			},
			upload_video:{
				edittype:'custom',
				unformat: $.jset.fn.unformat_video,
				editoptions:{
					custom_options: $.jset.defaults.upload_video,
					upload: $.jset.defaults.upload_video,
					id: function(col){
						return col.Field;
					}
				},
				beforeInitData: function(formid){
				},
				onInitializeForm: function(formid){
					var grid = $(this);
					$.each($('.upload_video'), function(){
						var $this = $(this);
						var options = grid.data('settings').grid.colModel[grid.data('index')[$(this).attr('id')]]['editoptions'];
						var video_id = $(this).attr('id') + '_video';
						if($('#' + video_id, formid).length == 0){
							var div = $('<div></div>');
							div.insertBefore($this);
							var browse = $('<button>Browse..</button>');							
							browse.appendTo(div);
							$this.appendTo(div);
							var button = $('<button>Clear</button>');							
							button.appendTo(div);
							var video = $('<a></a>');
							video.attr('id', video_id);
							video.css('height', options.upload.height);
							video.css('width', options.upload.width);
							video.css('display', 'block');
							video.insertAfter(div);
							button.bind('click', function(){
								$this.val('');
								video.attr('href', '');
								flowplayer(video_id, $.jset.dir_pre + "jset/widget/flowplayer/flowplayer-3.2.7.swf", {
									clip: {
										autoPlay: false,
										autoBuffering: true
									}
								});						
							});

							$this.bind('change', function(){
								video.attr('href', ($(this).val().search(/\./) == -1) || ($(this).val().search(/youtube/) != -1) ? '' : $(this).val());
								flowplayer(video_id, $.jset.dir_pre + "jset/flowplayer/flowplayer-3.2.7.swf", {
									clip: {
										autoPlay: false,
										autoBuffering: true
									}
								});						
							});
							
							new AjaxUpload(browse, $.extend({}, options.upload.ajax,{
								onSubmit : function(file , ext){
									rg =	new RegExp("^(" + options.upload.ajax.data.ext + ")$", "i");
							        if (!(ext && rg.test(ext))){
							        	alert('this file extension is not allowed');
							        	return false;
							        }
								},
								onComplete: function(file, response){
									if(response.error !== undefined){
										alert(response.error.message);
										return;
									}
						
									$this.val(options.upload.ajax.dir_pre + options.upload.ajax.data.dir + response.fileName);
									video.attr('href', $this.val());
									flowplayer(video_id, $.jset.dir_pre + "jset/widget/flowplayer/flowplayer-3.2.7.swf", {
										clip: {
											autoPlay: false,
											autoBuffering: true
										}
									});
									$(formid).validate().element( $this );
								}
							})); 
						
						}
						
						$('#' + video_id, formid).attr('href', ($this.val().search(/\./) == -1) || ($this.val().search(/youtube/) != -1) ? '' : $this.val());
						flowplayer(video_id, $.jset.dir_pre + "jset/widget/flowplayer/flowplayer-3.2.7.swf", {
							clip: {
								autoPlay: false,
								autoBuffering: true
							}
						});						
					});							
				},
				empty_url: $.jset.defaults.dir_pre + 'jset/img/empty_image.jpg'
			},
			varchar:{
				align:'left',
				edittype:'text',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				}
			},
			weekday:{
				formatter: 'weekdayFmatter',
				edittype:'custom',
				editoptions: {
					value: {},
					size: function(col){
						return col.usize ? col.usize : undefined;
					},
					height: function(col){
						return col.height ? col.height : undefined;
					},
					defaultValue: function(col){
						return col.default_value;
					},
					custom_element: $.jset.fn.multicheckbox_element,
					custom_value: $.jset.fn.multicheckbox_value
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn']
				},
				beforeInitData: function(formid){
					$(formid).find('input.multicheckbox').attr('checked', false);
				}
			},
			year:{
				align:'right',
				formatter:'integer',
				editoptions:{
					size: $.jset.fn.colsize,
					maxlength: function(col){
						return col.size;
					},
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pintInit : $.jset.fn.intInit;
					},
					defaultValue: function(col){
						return col.default_value;
					}
				},
				searchoptions:{
					sopt: ['cn','nc','eq','ne','lt','le','gt','ge','bw','bn','ew','en','nu','nn'],
					dataInit: function(col){
						return col.unsigned ? $.jset.fn.pintInit : $.jset.fn.intInit;
					}
				}
			}
		}
	});	
})(jQuery);