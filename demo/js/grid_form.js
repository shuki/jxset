$(function(){
	$.jset.fn.registerGridDefinition('demo_form', {
	  	source: 'demo_form',
		searchall: false,
		//form_sent_button: true,
		template: {
			use: true,
			columns: 1
		},
		single_record: {
			active: true,
			displayAlert: false,
			mode: 'new',
			options:{
				closeOnEscape: false,
				closeAfterEdit: false,
				closeAfterAdd: false,
				reloadAfterSubmit: false,
				drag: false,
				resize: false,
				viewPagerButtons: false,
				//editCaption: '',
				addCaption: 'Add Item'
			}
		},
		persist: false,
		columnChooser:{
			navButtonAdd: false
		},
		clearPersist: {
			navButtonAdd: false
		},
		clearFilterToolbar:{
			navButtonAdd: false,
		},
		'export':{
			navButtonAdd: false,
		},
		//form_save_button: true,
		onInitializeForm: function(formid){
			var grid = $(this);

			
			$(formid).closest('.ui-jqdialog').css({
			    position: 'absolute',
			    right: -5,
			    top: -5
			});

			var container = $.jset.fn.get_grid_container(grid);
			container.css({
			    position: 'absolute',
			    right: 20,
			    top: 20
			});
			
		},
		beforeShowForm: function(formid){
			var grid = $(this);
		},
		afterShowForm: function(formid){
			$("div#tabs-1").siblings('img').hide();
			$("div#tabs-1").show();
			$.jset.fn.get_form_field(formid, 'first_name').focus();
		},
		beforeSubmit: function(postdata, formid){
			var grid = $(this);
			return [true];
		},
		afterSubmit: function(response, postdata, frmoper){
			var grid = $(this);
			console.log(grid.data('valid'));
			if(grid.data('valid')){
				$("div#tabs-1").hide();
				alert("מועמד/ת יקר/ה,\nבקשתך התקבלה ותיבדק.\nאישור על הגשת מועמדותך נשלח אל תיבת האימייל שלך.\nבהצלחה.");
				return [true];
			}
			
			return [true];
		},
		afterSubmitError: function(response, postdata, frmoper, obj){
			var message = obj.error.message;
			alert(message);
			return [false, message];
		},
	    grid: {
	    	direction: 'ltr',
		    width: 100,
		    height: 60,
			rownumbers: false,
		    scroll: false
	  	},
	  	navigation:{
			options : {
				del: false,
				add: false,
				search: false,
				view: false
			},
			edit:{
				checkOnUpdate:true
			},
			add:{
				checkOnUpdate:false
			},
			del:{
			},
			search:{
			},
			view:{
			}
		}
	});

	var grid_form = $('table[id="grid_form"]');
	if(!grid_form.jset('defined'))
		grid_form.jset($.extend(true, {}, $.jset.defaults, $.jset.fn.getGridDefinition('demo_form')));
	
	$(window).bind('beforeunload', function(e){			
		var message = 'נתונים השתנו! האם ברצונך לעזוב את הדף ללא שמירה?',
		stay = !grid_form.data('valid'),
		e = e || window.event;

		if(e)
			e.returnValue = message;
		
		if(stay)
			return message;			
 	});
});
