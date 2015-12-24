$(function(){
	var settings = {
		source: 'jset_error',
		filterToolbar:{
			navButtonAdd: false
		},
		copy:{
			navButtonAdd: false
		},
  		grid: {
  			caption: 'Errors',
  			autowidth: true,
		    height: $(window).height() - 104
  		},
		navigation: {
  			options: {view:false, add:false}
		}
	};
									
	$('#error').jset(settings);
});