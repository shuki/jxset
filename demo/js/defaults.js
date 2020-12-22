$(function(){
	$.extend(true, $.jset.defaults, {
		editor:{
			directionality : 'ltr',
			language : 'en',
			menubar : false,
			//toolbar: 'fontselect fontsizeselect bold italic underline forecolor backcolor alignleft aligncenter alignright bullist numlist outdent indent blockquote removeformat',
			toolbar: 'styleselect fontselect fontsizeselect | fullscreen forecolor backcolor bullist numlist outdent indent ltr rtl removeformat',
			plugins : 'textcolor directionality fullscreen'
		}
	});
});