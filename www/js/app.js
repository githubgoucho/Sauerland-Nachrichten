// cordova intit event
//window.localStorage["verCode"] = "-";
if (!desktop){
	window.document.addEventListener("deviceready", onDeviceReady, false);
} else {window.localStorage["verCode"] = " :: desktop";}

function onDeviceReady() {
/* Globalisation plugin needed
     navigator.globalization.getPreferredLanguage(
        function (language) {
		//	alert('language: ' + language.value + '\n');
		},
        function () {
		//	alert('Error getting language\n');
		}
    );
*/
	if (!desktop)
		cordova.getAppVersion.getVersionNumber().then(function (version) {
			window.localStorage["verCode"] = " V: " + version;
	});
}

/*
 Angular.js App
 alle in "config" mit "this.xyz" registrierte
		 "Var" und "funktion" sind im "module" verfügbar
		 
		 Config und Init Sektion der App
*/
var mediaApp = angular.module('mediaApp', ['onsen', 'ngSanitize']).config(function($sceProvider) {
    // For demonstration purposes only!
    // Completely disable SCE (Strict Contextual Escaping services) to allow all URLs to be loaded.
	$sceProvider.enabled(false);
	this.verCode = window.localStorage["verCode"];

	this.language = window.navigator.userLanguage || window.navigator.language;
	this.language = this.language.substr(0, 2).toLowerCase();
	if (this.language != "de" && this.language != "en" && this.language != "es" && this.language != "fr" ) // check if language available
		this.language = "en"; // default language
	this.language = "i18n/"+ this.language +".json"; // document.URL + 
//	this.language = "file:///C:/Users/altmeier/AndroidStudioProjects/myRssFeed/www/i18n/"+ this.language +".json";
	console.log(this.language);
	this.feedsAbo = [];
	res = window.localStorage["feedsAbo"];
	
//	res = null;
	if (res == null){
		this.feedsAbo.push({"name":"Sauerland","url":"https://www.google.de/alerts/feeds/14640318110525154270/9485445488817477971","content":""});		
		this.feedsAbo.push({"name":"SW-Nachrichten","url":"http://www.suedwestfalen-nachrichten.de/feed","content":""});		
		this.feedsAbo.push({"name":"Guten-Tach","url":"http://guten-tach.de/category/kurz-notiert-lennetal/feed/","content":""});
		this.feedsAbo.push({"name":"Plettenberg","url":"https://www.google.de/alerts/feeds/14640318110525154270/9603431206693055341","content":""});		
		this.feedsAbo.push({"name":"Lüdenscheid","url":"http://www.come-on.de/luedenscheid/rssfeed.rdf","content":""});		
		this.feedsAbo.push({"name":"Balve","url":"http://www.wp.de/staedte/balve/rss","content":""});
		this.feedsAbo.push({"name":"Sundern","url":"http://www.wp.de/staedte/sundern/rss","content":""});
		this.feedsAbo.push({"name":"Arnsberg","url":"http://www.wp.de/staedte/arnsberg/rss","content":""});
		this.feedsAbo.push({"name":"Attendorn/Olpe","url":"http://www.wp.de/staedte/kreis-olpe/rss","content":""});
		this.feedsAbo.push({"name":"Wittgenstein","url":"http://www.wp.de/staedte/wittgenstein/rss","content":""});
		this.feedsAbo.push({"name":"Meschede","url":"http://www.wp.de/staedte/meschede-und-umland/rss","content":""});
		this.feedsAbo.push({"name":"Lennespiegel","url":"http://lennespiegel.de/feed/","content":""});		
		this.feedsAbo.push({"name":"BVB","url":"http://www.derwesten.de/sport/fussball/bvb/rss","content":""});		
		this.feedsAbo.push({"name":"Schalke","url":"http://www.derwesten.de/sport/fussball/s04/rss","content":""});		
		window.localStorage["feedsAbo"] = JSON.stringify(this.feedsAbo);
	} else {
		this.feedsAbo = JSON.parse(res);
	}

	this.lastFeed = window.localStorage["lastFeed"];
	if (this.lastFeed == null){
		this.lastFeed = 0;
		window.localStorage["lastFeeds"] = this.lastFeed;
	}
	if(this.lastFeed >= this.feedsAbo.length)
		this.lastFeed = 0;

	this.numResults = window.localStorage["numResults"];
	if (this.numResults == null){
		this.numResults = 50;
		window.localStorage["numResults"] = this.numResults;
	}
	
	if(this.feedsAbo.length == 0) {
		
	}else{
		this.name = this.feedsAbo[this.lastFeed].name;
		this.url = this.feedsAbo[this.lastFeed].url;
	}

	this.fontSize = parseFloat(window.localStorage["fontSize"]);
	if (this.fontSize == null || isNaN(fontSize)){
		this.fontSize = 1;
		window.localStorage["fontSize"] = this.fontSize;
	}

})
