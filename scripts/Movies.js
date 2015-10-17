function MoviePage(){
	var self = this;

	self.newTitle = ko.observable();
	self.errorVisible = ko.observable(false);
	self.errorMessage = ko.observable();
	self.movieCollection = ko.observableArray([]);

	self.addMovie = function(){
		getMovie(self.newTitle());
	};

	function isMovieAlreadyAdded(title){
		var exists = false;
		self.movieCollection().forEach(function (item){
			if(item.Title === title) { exists = true; }
		});
		return exists;
	}

	function getMovie(title){
		if(isMovieAlreadyAdded(title)){
			showErrorMessage('This movie was already added.');
		}else{
			var searchTitle = title.split(' ').join('+');
			var url = "http://www.omdbapi.com/?t={title}&y=&plot=full&r=json".replace('{title}', searchTitle);

			$.getJSON(url, function(json){

				if(json.Response === 'True') {
					self.movieCollection.push(json);
					self.errorVisible(false);
					self.newTitle('');
				} else {
					showErrorMessage(json.Error);
				}
			});
		}
	}

	function showErrorMessage(message){
		self.errorMessage(message);
		self.errorVisible(true);
	}

	getMovie("The Avengers");
	
}

ko.applyBindings(new MoviePage());