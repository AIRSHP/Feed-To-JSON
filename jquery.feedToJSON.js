//jQuery extension to fetch an rss feed and return it as json via YQL
//created by dboz@airshp.com
(function($) {
  
    $.extend({
        feedToJson: function(options, callback) {
            if ($.isFunction(options)) {
              callback = options;
              options = null;
            }
            options = $.extend($.feedToJson.defaults,options);
            var url = options.yqlURL + options.yqlQS + encodeURIComponent(options.feed) + options.yqlOPTS;
            return $.getJSON(url, function(data){
                    data = data.query.results;
                    $.isFunction(callback) && callback(data); //allows the callback function to be the only option
                    $.isFunction(options.success) && options.success(data);
                });
        }
    });
  
    //defaults
    $.feedToJson.defaults = {
        yqlURL: "https://query.yahooapis.com/v1/public/yql",
        yqlQS: "?q=select%20*%20from%20xml%20where%20url%20%3D%20'",
        yqlOPTS: "'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",
        feed: "http://instagr.am/tags/tacos/feed/recent.rss",
        cachebuster: Math.floor((new Date().getTime()) / 1200 / 1000), //yql caches feeds, so we change the feed url every 20min
        success:null //success callback 
    };
  
})(jQuery);
// eo feedToJson
