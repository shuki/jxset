;(function ($) {
/*
 * jquery.urlvars
 * get url vars.
 * 
 * source: http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
 * 
 * var vars = $.getUrlVars(); 
 * 		returns all url vars in an array of objects of the form:
 * 		[{id: '5'},{active: 'y'}].
 * 
 * var vid = $.getUrlVar('id');
 * 		returns the url var 'id'.
 * 
 */
	$.extend({
	  getUrlVars: function(){
	    var vars = [], hash;
	    var varsIndexOf = window.location.href.indexOf('?');
	    if(varsIndexOf == -1)
	    	return vars;
	    	
	    var hashes = window.location.href.slice(varsIndexOf + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	      hash = hashes[i].split('=');
	      vars.push(hash[0]);
	      vars[hash[0]] = hash[1];
	    }
	    return vars;
	  },
	  getUrlVar: function(name){
	    return $.getUrlVars()[name];
	  }
	});
})(jQuery);
