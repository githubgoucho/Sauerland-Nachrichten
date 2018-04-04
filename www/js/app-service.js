

mediaApp.service('ItemsModel', function ($http) {
    var service = this;
    var selectedItem;
	var myData;
  
	service.getFeedContent = function () {
		var res = $http.jsonp("http://www.suederlaender.de/_rss/index.php?num=" + this.numResults+ "&callback=JSON_CALLBACK&feed=" + this.url);
//		var res = $http.jsonp("http://www.suederlaender.de/rss-feed/read-feed.php?num=" + this.numResults+ "&callback=JSON_CALLBACK&url=" + this.url);
// 		var res = $http.jsonp("https://api.rss2json.com/v1/api.json?rss_url=" + this.url + "&callback=JSON_CALLBACK&count=" + this.numResults + "&api_key=tgwn7dlc0aem1wpdaxgiszoerempamfsccbiw0i0");

		return res;
    };
	service.searchFeeds = function () {
		// doku :: https://developers.google.com/feed/v1/jsondevguide
		var res = $http.jsonp("https://ajax.googleapis.com/ajax/services/feed/find?v=1.0&callback=JSON_CALLBACK&q=" + this.query);
 		return res;
    };	
 	service.getLanguagePack = function () {
		var res = $http.get(this.url + "?callback=JSON_CALLBACK");
 		return res;
    };
   service.setSelectedItem = function(item) {
        selectedItem = item;
    };
    service.getSelectedItem = function() {
        return selectedItem;
    }
})
