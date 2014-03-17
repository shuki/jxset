//$(function(){
function set_panel_img_on_click_handler(context){
	$('img.panel-toggle', context).on('click', function(){
		var panel = $(this).closest('div.panel');
		var panel_body = panel.find('div.panel-body:first');
		panel_body.slideToggle(
			'slow',
			function()
			{
				panel.toggleClass('panel-closed panel-open');
			}
		);
	});
}
//});