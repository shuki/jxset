$(function(){
	$(':input').on('keyup paste',function(e){
		setTimeout(function () { 
			if($('#user').val() != '')
				$('input[type="submit"]').removeAttr('disabled');
			else
				$('input[type="submit"]').attr('disabled','disabled');
		}, 100);
	});
});
