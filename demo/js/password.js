$(function(){
	$('#current_password').val('');
	
	$(':input').on('keyup paste',function(e){
		setTimeout(function () { 
			if($('#current_password').val() != '' && $('#new_password').val() != '' && ($('#new_password').val() == $('#retype_password').val()) && ($('#new_password').val() != $('#current_password').val()))
				$('input[type="submit"]').removeAttr('disabled');
			else
				$('input[type="submit"]').attr('disabled','disabled');
		}, 100);
	});
});
