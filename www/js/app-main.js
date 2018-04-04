
/*
	Controller sind nur in ihrem html scope verfügbar
*/
mediaApp.controller('MainController', function (ItemsModel, $scope) {
    var main = this;
    this.searchTerm = "";
	main.lastFeed = lastFeed;
	main.feedsAbo = feedsAbo;	
	main.name = name;
	main.version = verCode;
	main.desktop = desktop;
    main.feed = [];
	var el = document.getElementsByClassName("outWin");
	
	this.plusText = function() {
		fontSize += 0.02;
		window.localStorage["fontSize"] = fontSize;
		this.setText();
	};
	this.minusText = function() {
	    if(fontSize > 0.5)
		    fontSize -= 0.02;
		window.localStorage["fontSize"] = fontSize;
		this.setText();
	};
	main.setText = function() {
        //console.log("Pinch zoom "+fontSize);
		for ( var i = 0; i < el.length; i ++ ) {
			el[i].style.fontSize = fontSize + "em";
		}
	}
    // in controller
    $scope.init = function () {
        main.setText();
        // check if there is query in url
        // and fire search in case its value is not empty
    };
	this.openUrl = function(item) {
		console.log("openurl: " + item.link);
        var android = navigator.userAgent.search( "Android" ) >= 0;
		if (android) {
			navigator.app.loadUrl(item.link, {openExternal:true});
		}
		else {
			window.open( item.link, '_blank' );
		}
    };
	
	this.getLanguage = function() {
		ItemsModel.url = language;
		ItemsModel.getLanguagePack()
            .then(function (result) {
                main.language = result.data.language;
				main.getFeeds();  
			});
	}
    this.getFeeds = function() {
		ItemsModel.url = url;
		ItemsModel.numResults = numResults;
        ItemsModel.getFeedContent().then(function (result) {
			
			//main.feed.items = result.data;
			main.feedsAbo[main.lastFeed].content = result.data;
		window.localStorage["feedsAbo"] = JSON.stringify(main.feedsAbo);
       });
			//if(!main.feed.items)
				main.feed.items = main.feedsAbo[main.lastFeed].content;
			
			angular.forEach(main.feed.items, function(post){
					post.content = post.content.replace(/href="([^"])*"/ig, function($0) { 
							return $0 + " target='_blank'"; 
					});
					if(post.author.name == "")
						post.author.name = main.language.unknown;
			});
    }
	this.getLanguage();
 })
