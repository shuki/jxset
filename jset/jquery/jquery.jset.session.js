;(function ($){
	$.jset = $.extend(true, $.jset, {
		session: {
			params:{
				timoutWarning: 1500000, // 25 minutes
				timoutNow: 300000, // 5 minutes
				//timoutWarning: 5000, // 5 seconds
				//timoutNow: 10000, // 10 seconds
				logoutUrl: 'login.php?signout',
			},
			vars:{	
				warningTimer: null,
				timeoutTimer: null,
				timeoutCountdownTimer: null,
				countdown: null
			}
		}
	});
	
	$.extend($.jset.fn, {
		sessionSetup: function(settings){
			settings = $.extend(true, $.jset.session, settings);
			$('body').append('<div id="timeout" style="display:none;direction:' + $.jset.direction + ';">' + $.jset.messages.timoutWarning + ' <span id="countdown"></span> ' + $.jset.messages.timoutWarning1 + '</div>');
			$(window).on('load', function(){
				$.jset.fn.sessionStartTimers();
			})
			.on('mousemove.session keypress.session click.session', function(){
				$.jset.fn.sessionResetTimers();
			});
		},
		
		sessionStartTimers: function() {
		    $.jset.session.vars.warningTimer = setTimeout("$.jset.fn.sessionIdleWarning()", $.jset.session.params.timoutWarning);
		    $.jset.session.vars.timeoutTimer = setTimeout("$.jset.fn.sessionIdleTimeout()", $.jset.session.params.timoutWarning + $.jset.session.params.timoutNow);
		},

		sessionResetTimers: function() {
		    clearTimeout($.jset.session.vars.warningTimer);
		    clearTimeout($.jset.session.vars.timeoutTimer);
		    clearTimeout($.jset.session.vars.timeoutCountdownTimer);
		    $.jset.fn.sessionStartTimers();
			if ($("#timeout").hasClass('ui-dialog-content')) {
			     $("#timeout").dialog('close');
			}
		},
		
		sessionIdleWarning: function() {
		    $("#timeout").dialog({
		    	title: $.jset.messages.warning,
		        modal: true
		    });
		    $.jset.session.vars.countdown = $.jset.session.params.timoutNow / 1000 + 1;
		    $.jset.fn.sessionUpdateCountdown();
		    $.jset.session.vars.timeoutCountdownTimer = setInterval("$.jset.fn.sessionUpdateCountdown()", 1000);
		},
		
		sessionUpdateCountdown: function(){
			$.jset.session.vars.countdown -= 1;
			$('span#countdown').html($.jset.session.vars.countdown);
		},
	
		sessionIdleTimeout: function() {
		    window.location = $.jset.session.params.logoutUrl;
		}		
	});
})(jQuery);