$.validator.addMethod(
    "ddmmyyyyDate",
    function(value, element) {
    	//https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy
    	the_regex = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
    	return this.optional( element ) || the_regex.test(value);
    },
    "Please enter a date in the format dd/mm/yyyy"
);

$.validator.addMethod( "time", function( value, element ) {
	return this.optional( element ) || /^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2}$/.test( value );
}, "Please enter a valid time, between 00:00 and 23:59" );

