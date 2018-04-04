
mediaApp.controller('SettingsController', function (ItemsModel, $scope) {
	var settings = this;
	settings.feeds = feedsAbo;
	this.deleteItem = function(idx) {
		settings.feeds.splice(idx,1); 
		window.localStorage["feedsAbo"] = JSON.stringify(settings.feeds);
		lastFeed = 0;
		window.localStorage["lastFeeds"] = lastFeed;
	};
	this.newFeed = function(feed) {
		if(feed != undefined && feed.name != undefined && feed.url != undefined){
			var newFeed = {"name":feed.name,"url":feed.url};
			settings.feeds.push(newFeed); 
			window.localStorage["feedsAbo"] = JSON.stringify(settings.feeds);

			name = feed.name;
			url = feed.url;
			//numResults = this.numResults;
			myNavigator.pushPage('home.html', { animation : 'slide' });
			//app.menu.close(); 		
		}
	};
	
	this.testItem = function(feed) {
		if(feed != undefined && feed.name != undefined && feed.url != undefined){
			name = feed.name;
			url = feed.url;
			//numResults = this.numResults; 
			myNavigator.pushPage('home.html', { animation : 'lift' });
			//app.menu.close(); 		
		}
	};
    this.searchFeeds = function(item) {
	    ItemsModel.query = item.query;
        ItemsModel.searchFeeds()
            .then(function (result) {
               settings.results = result.data.responseData;
				angular.forEach( settings.results.entries, function(item, idx){
					var parser = document.createElement('a');
					parser.href = item.link;
					item.name = parser.hostname; // => "example.com"
					parser = null;
				});
         });
    };
   this.getLanguage = function() {
		ItemsModel.url = language;
		ItemsModel.getLanguagePack()
            .then(function (result) {
                settings.language = result.data.language;

				settings.tabs = [
					/*{
						title: settings.language.feedsearch,
						url: 'one.tpl.html'
					},*/ 
					{
						title: settings.language.feedadd,
						url: 'two.tpl.html'
					}
				];
			});
   }
 	this.getLanguage();
    settings.currentTab = 'two.tpl.html';

    settings.onClickTab = function (tab) {
        settings.currentTab = tab.url;
    }
    
    settings.isActiveTab = function(tabUrl) {
        return tabUrl == settings.currentTab;
    }

 })

