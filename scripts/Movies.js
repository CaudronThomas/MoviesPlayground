function MoviePage(){
	var self = this;

	self.newTitle = ko.observable();
	self.movieCollection = ko.observableArray([]);

	self.addMovie = function(){
		getMovie(self.newTitle());
	};

	ko.computed(function () {
		getMovie("The Avengers");
	});

	function isMovieAlreadyAdded(title){
		var exists = false;
		self.movieCollection().forEach(function (item){
			if(item.Title === title) { exists = true; }
		});
		return exists;
	}

	function getMovie(title){
		if(isMovieAlreadyAdded(title)){
			alert("This movie was already added.");
		}else{
			var searchTitle = title.split(' ').join('+');
			var url = "http://www.omdbapi.com/?t={title}&y=&plot=full&r=json".replace('{title}', searchTitle);

			$.getJSON(url, function(json){

				if(json.Response === 'True') {
					self.movieCollection.push(json);
				} else {
					alert(json.Error);
				}
			});
		}
	};

	
}

ko.applyBindings(new MoviePage());
