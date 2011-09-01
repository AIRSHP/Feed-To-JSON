//plugin to get a feed as json via YQL
//created by dboz@airshp.com
(function($) {
  
  $.fn.feedToJson = function(options, callback) {
		if ($.isFunction(options)) {
		  callback = options;
		  options = null;
		}
		options = $.extend($.fn.feedToJson.defaults,options);
		var url = options.yqlURL + options.yqlQS + "'" + encodeURIComponent(options.feed) + "'" + "&_nocache=" + options.cacheBuster;
		return $.getJSON(url, function(data){  
				//console.log(data.query.results);
				data = data.query.results;
				$.isFunction(callback) && callback(data);
				$.isFunction(options.success) && options.success(data);
			}); 
	};
  
  //defaults
  $.fn.feedToJson.defaults = {
  	yqlURL : 'http://query.yahooapis.com/v1/public/yql',  
  	yqlQS : '?format=json&callback=?&q=select%20*%20from%20rss%20where%20url%3D',  
  	feed:'http://instagr.am/tags/tacos/feed/recent.rss',
  	cachebuster: Math.floor((new Date().getTime()) / 1200 / 1000),
  	success:null
  };
  
})(jQuery);
// eo feedToJson plugin

