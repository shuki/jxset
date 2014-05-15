;(function ($) {
/*
 * jset  1.0 - jset
 * Copyright (c) 2010, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Date: 2010-01-01
 */
	$.extend($.fn.fmatter , {
		selectbox: function (cellval,opts, rwd, act) {
			var grid = $(this);
			// jqGrid specific
			cellval = cellval + "";
			var oSelect = false, ret=[];
			if(opts.colModel.formatoptions != undefined){
				oSelect= opts.colModel.formatoptions.value;
			} else if(opts.colModel.editoptions != undefined){
				oSelect= opts.colModel.editoptions.value;
			}
			if (oSelect) {
				var	msl =  opts.colModel.editoptions.multiple === true ? true : false,
				scell = [], sv;
				if(msl) {scell = cellval.split(",");scell = $.map(scell,function(n){return $.trim(n);});}
				//shuki 9/1/2012 passing select options as array of objects
				if(typeof $.jset.message_flag == 'undefined')
					$.jset.message_flag = true;
				if($.isArray(oSelect)/* && flag  == 'undefined'*/){
					var flag = true;
					//$.dump(oSelect);
					for (var i = 0; i < oSelect.length; i++) {
						var id_str = oSelect[i].id + '';
						var cellval_str = cellval + '';
						id_str = id_str.toLowerCase();
						cellval_str = cellval_str.toLowerCase();
		
						if (id_str == $.trim(cellval_str)) {
							ret[0] = oSelect[i].name;
							flag = false;
							break;
						}
					}
					// shuki 24/6/2012 alert on missing values in select box
					if(flag && $.trim(cellval) && $.trim(cellval) != 0)
					{
						if($.jset.message_flag){
							$.jset.message_flag = false;
							var field_label = grid.data('settings').grid.colNames[grid.data('index')[opts.colModel.name]];
							alert($.jgrid.format($.jset.messages.selectboxItemNotFound, field_label, cellval));
						}
						ret[0] = cellval;
					}
					// shuki 24/6/2012 end
	
				} else
				//shuki end passing select options as array of objects
				if ($.fmatter.isString(oSelect)) {
					// mybe here we can use some caching with care ????
					var so = oSelect.split(";"), j=0;
					for(var i=0; i<so.length;i++){
						sv = so[i].split(":");
						if(sv.length > 2 ) {
							sv[1] = jQuery.map(sv,function(n,i){if(i>0) {return n;}}).join(":");
						}
						if(msl) {
							if(jQuery.inArray(sv[0],scell)>-1) {
								ret[j] = sv[1];
								j++;
							}
						} else if($.trim(sv[0])==$.trim(cellval)) {
							ret[0] = sv[1];
							break;
						}
					}
				} else if($.fmatter.isObject(oSelect)) {
					// this is quicker
					if(msl) {
						ret = jQuery.map(scell, function(n, i){
							return oSelect[n];
						});
					} else {
						ret[0] = oSelect[cellval] || "";
					}
				}
			}
			cellval = ret.join(", ");
			return  cellval === "" ? $.fn.fmatter.defaultFormat(cellval,opts) : cellval;
		},

	    currencyFmatter : function(cellvalue, options, rowdata) {
	    	return "$$"+cellvalue;
		},
		
	    emailFmatter : function(cellvalue, options, rowdata, act) {
	    	return '<a href="mailto:' + cellvalue + '">' + cellvalue + '</a>';
		},
		
		checkbox_edit : function(cval, opts, rowdata) {
			var op = $.extend({},opts.checkbox), ds;
			if(opts.colModel.formatoptions != undefined) {
				op = $.extend({},op,opts.colModel.formatoptions);
			}
			if(op.disabled===true) {ds = "disabled=\"disabled\"";} else {ds="";}
			if($.fmatter.isEmpty(cval) || cval != undefined ) {cval = $.fn.fmatter.defaultFormat(cval,op);}
			cval=cval+"";cval=cval.toLowerCase();
			var bchk = cval.search(/(false|0|no|off)/i)<0 ? " checked='checked' " : "";
			return "<input type=\"checkbox\" " + bchk  + " value=\""+ cval+"\" offval=\"no\" "+ds+ " check_name=" + opts.colModel.index + " onClick=\"$.jset.fn.checkbox_submit(this)\"/>";
		},

		checkbox_edit_not_null : function(cval, opts, rowdata) {
			if(cval == '')
				return '';
				
			var op = $.extend({},opts.checkbox), ds;
			if(opts.colModel.formatoptions != undefined) {
				op = $.extend({},op,opts.colModel.formatoptions);
			}
			if(op.disabled===true) {ds = "disabled=\"disabled\"";} else {ds="";}
			if($.fmatter.isEmpty(cval) || cval != undefined ) {cval = $.fn.fmatter.defaultFormat(cval,op);}
			cval=cval+"";cval=cval.toLowerCase();
			var bchk = cval.search(/(false|0|no|off)/i)<0 ? " checked='checked' " : "";
			return "<input type=\"checkbox\" " + bchk  + " value=\""+ cval+"\" offval=\"no\" "+ds+ " check_name=" + opts.colModel.index + " onClick=\"$.jset.fn.checkbox_submit(this)\"/>";
		},

		
		weekdayFmatter : function(cellvalue, options, rowdata){
			var value = cellvalue;
			value = value.replace("0", "Mon");
			value = value.replace("1", "Tue");
			value = value.replace("2", "Wed");
			value = value.replace("3", "Thu");
			value = value.replace("4", "Fri");
			value = value.replace("5", "Sat");
			value = value.replace("6", "Sun");
			return value;
		},
		
		datetimeFmatter: function(cellvalue, options, rowdata){
			return $.jset.fn.format_datetime(cellvalue);
		},
		
		timeFmatter: function(cellvalue, options, rowdata){
			var formatoptions = options.colModel.formatoptions;
			return (formatoptions != undefined) ? $.jset.fn.format_time(cellvalue, formatoptions.minutes, formatoptions.seconds) : $.jset.fn.format_time(cellvalue);
		},
		
		plainFmatter : function(cellvalue, options, rowdata){
			return $('<div>' + cellvalue + '</div>').text().replace(/\n/g, ' ');
		},
		
		linkFmatter : function(cellvalue, options, rowdata, act){
			var grid = $(this);
			var url = options.colModel.formatoptions.url;
			var idname = options.colModel.formatoptions.idname;
			url = url.replace(/#value#/g, cellvalue);
			url = url.replace(/#idname#/g, rowdata[grid.data('index')[idname]]);
			return url;
		},
		
		uploadFileFmatter : function(cellvalue, options, rowdata, act){
			if(!cellvalue)
				return '';
				
			var extension = cellvalue.split('.').pop().toLowerCase();
			var colModel = options.formatoptions ? options : options.colModel;
			var file_lable = (extension == 'jpg' || extension == 'jpeg' || extension == 'gif' || extension == 'png') ? colModel.formatoptions.picture_lable : colModel.formatoptions.file_lable;
			return '<a target="_blank" href="' + cellvalue +'">' + file_lable + ' ' + extension + '</a>';
		}
	});
	
	$.extend($.fn.fmatter.selectbox, {
		unformat: function (cellval,options,pos,cnt) {
			// Spacial case when we have local data and perform a sort
			// cnt is set to true only in sortDataArray
			var ret = [];
			var cell = cellval;
			if(cnt===true) {return cell;}
			var op = $.extend({},options.colModel.editoptions);
			if(op.value){
				var oSelect = op.value,
				msl =  op.multiple === true ? true : false,
				scell = [], sv;
				if(msl) {scell = cell.split(",");scell = $.map(scell,function(n){return $.trim(n);});}
				//shuki 9/1/2012 passing select options as array of objects 
				var flag = true;
				if($.isArray(oSelect)/* && flag  == 'undefined'*/){
					//var flag = true;
					//$.dump(oSelect);
					for (var i = 0; i < oSelect.length; i++) {
						if ($.trim(oSelect[i].name) == $.trim(cell)) {
							ret[0] = oSelect[i].id;
							flag = false;
							break;
						}
					}
					//if value not found in options use the code
					if(flag && $.trim(cell) && $.trim(cell) != 0){
						ret[0] = cell;
					}
		
				} else
				//shuki end passing select options as array of objects
	
				if ($.fmatter.isString(oSelect)) {
					var so = oSelect.split(";"), j=0;
					for(var i=0; i<so.length;i++){
						sv = so[i].split(":");
						if(sv.length > 2 ) {
							sv[1] = jQuery.map(sv,function(n,i){if(i>0) {return n;}}).join(":");
						}					
						if(msl) {
							if(jQuery.inArray(sv[1],scell)>-1) {
								ret[j] = sv[0];
								j++;
							}
						} else if($.trim(sv[1])==$.trim(cell)) {
							ret[0] = sv[0];
							break;
						}
					}
				} else if($.fmatter.isObject(oSelect) || $.isArray(oSelect) ){
					if(!msl) {scell[0] =  cell;}
					ret = jQuery.map(scell, function(n){
						var rv;
						$.each(oSelect, function(i,val){
							if (val == n) {
								rv = i;
								return false;
							}
						});
						if( typeof(rv) != 'undefined' ) {return rv;}
					});
				}
				return ret.join(", ");
			} else {
				return cell || "";
			}
		}
	});
	
	$.extend($.fn.fmatter.currencyFmatter , {
	    unformat : function(cellvalue, options) {
	    	return cellvalue.replace("$$","");
		}
	});	

/*	$.extend($.fn.fmatter.checkbox_edit , {
	    unformat : function(cellvalue, options) {
			alert(cellvalue);
			var cbv = (options.colModel.editoptions) ? options.colModel.editoptions.value.split(":") : ["Yes","No"];
			return $('input',cellvalue).attr("checked") ? cbv[0] : cbv[1];
		}
	});	*/

	$.extend($.fn.fmatter.weekdayFmatter , {
	    unformat : function(cellvalue, options) {
		var value = cellvalue;
		value = value.replace("Mon", "0");
		value = value.replace("Tue", "1");
		value = value.replace("Wed", "2");
		value = value.replace("Thu", "3");
		value = value.replace("Fri", "4");
		value = value.replace("Sat", "5");
		value = value.replace("Sun", "6");
		return value;
		}
	});	
	
	$.extend($.fn.fmatter.datetimeFmatter , {
	    unformat : function(cellvalue, options) {
			return cellvalue;
			//return $.jset.fn.unformat_datetime(cellvalue);
		}
	});	
	
	$.extend($.fn.fmatter.plainFmatter , {
	    unformat : function(cellvalue, options) {
			return cellvalue;
		}
	});
	
	$.extend($.fn.fmatter.linkFmatter , {
	    unformat : function(cellvalue, options) {
			return cellvalue;
		}
	});
	
	$.extend($.fn.fmatter.uploadFileFmatter , {
	    unformat : function(cellval,options,pos,cnt) {
	    	return cellval ? $('a', pos).attr('href') : '';
		}
	});
	
	// public functions for formatters
	$.extend($.jset.fn, {
		checkbox_submit: function(elem){
			var val = $(elem).is(':checked') ? 1 : 0;
			var rowid = $(elem).parents('tr').attr('id');			
			var grid_id = $(elem).parents('table').attr('id');
			var col_name = $(elem).attr('check_name');
			var url = $('#' + grid_id).data('settings').grid.url;
			var source = $('#' + grid_id).data('settings').source;
			var params = {
				_methods_: 'edit',
				_source_: source,
				_id_: rowid
			};
			params[col_name] = val;
			
			$.post(url, params, function(obj){
				if(obj.error !== undefined){
					var message = obj.error.message + '<br />' + obj.error.dump + '<br />' + obj.error.info[0] + '<br />' + obj.error.info[1] + '<br />' + obj.error.info[2];
					alert(message);
					$(elem).is(':checked') ? $(elem).removeAttr('checked') : $(elem).attr('checked','checked');
				}
			}
			,'json');
		}
	});	
})(jQuery);