module.exports = function(bot, message) {

var geocoder = require('geocoder');
// Geocoding
var lat = -1000.0
var lng = -1000.0
var location = ''

try {
  //get the location the person asked for
  location = message.intents[0].entities.location[0].value

  //convert the location to lng and lat
  geocoder.geocode(location, function ( err, data ) {
  // do stuff with data
  if(err){
    bot.reply(message, "Uh Oh, it didn\'t quite understand the location you suggested : " + location +
                " did you maybe forget the state?"
              )
    return;
  }else {
      var loc = data.results[0].geometry.location
      //console.log(JSON.parse(loc))
      lat = loc.lat
      lng = loc.lng

      //ussing the lng and lat you found, search your db and return results..
      //obvs will be more complicated that this..
      getNearestDeals(lng, lat, function(deals_found){
        bot.reply(message, "I found this deals that might interest you in " + location + ": " + deals_found);
      });
  };

});
}catch(err){
  bot.reply(message, "Would love to show you something but couldn\'t quite understand where you were looking. Care to try again?")
}

};

function getNearestDeals(lng, lat,callback){
  //query you deals and find the closest ones...not gonna write for you...
  var dealsFound = "all dem deals";
  callback(dealsFound)
}
