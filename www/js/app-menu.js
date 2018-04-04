
mediaApp.controller('MenuController', function (ItemsModel) {
	var menu = this;
	this.feeds = feedsAbo;
	this.numResults = numResults;
	
	this.getResults = function(item) {
		for (i = 0; i < feedsAbo.length; i++){
			if (feedsAbo[i] == item){
				window.localStorage["lastFeed"] = i;
				break;
			}
		}
		name = item.name;
		url = item.url;
		numResults = this.numResults;
        myNavigator.pushPage('home.html', { animation : 'slide' });
		app.menu.close(); 		
	};
	this.setNumResults = function() {
		menu.numResults = this.numResults;
		window.localStorage["numResults"] = this.numResults;
	};

	this.openSettings = function(item) {
        myNavigator.pushPage('settings.html', { animation : 'slide' });
	};
   this.getLanguage = function() {
		ItemsModel.url = language;
		ItemsModel.getLanguagePack()
            .then(function (result) {
                menu.language = result.data.language;
			});
   }
 	this.getLanguage();
})
