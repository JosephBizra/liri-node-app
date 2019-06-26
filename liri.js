require("dotenv").config();
var keys = require("./key.js");
console.log(keys);
var axios = require("axios");
var fs = require("fs")

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
 
// var omdb = (keys.omdb)


var argument = process.argv[2];
var search = process.argv.slice(3).join(" ");
console.log(argument);
function concertThis(artist) {
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(url).then(function(result){
        // console.log(result.data[0]);
        console.log("City: " + result.data[0].venue.city)
        console.log("Name: " + result.data[0].venue.name)
        console.log("Date: " + result.data[0].datetime)
    });
}
function spotifyThis(singer){
    spotify.search({ type: 'track', query: singer }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        if(!singer){
            singer = "The Sign";
        }
            console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].artists[0].href);
            console.log(data.tracks.items[0].album.name);
            console.log(data.tracks.items[0].name);
    });
}
function getOMDB(movie){
    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=35878fb6"
    axios.get(url).then(
        function(response){
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.imdbRating);
            console.log(response.data.Ratings[1].Value);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
        }
    )
}

function itSays(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log(error);
          }
        
        // We will then print the contents of data
            console.log(data);
        // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
        
            argument = dataArr[0];
            search = dataArr[1];

            if(argument == "spotify-this-song"){
                spotifyThis(search);
            }
        });
};


    if(argument == "concert-this"){
        concertThis(search);
    } else if(argument == "spotify-this-song"){
        spotifyThis(search);
    } else if(argument == "movie-this"){
        getOMDB(search);
    } else if(argument == "do-what-it-says"){
        itSays();
    }