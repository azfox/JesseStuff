
//this top stuff is very variable to change given how you designed your bot
//not exactly sure how to instanciate.  The more useful stuff is bellow the ####'s
var Botkit = require('botkit')
var dotenv = require('dotenv');
dotenv.load();

if (!process.env.SLACK_TOKEN) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}


var os = require('os');

var controller = Botkit.slackbot({
    debug: false,
});

var bot = controller.spawn({
    token: process.env.SLACK_TOKEN
}).startRTM();

//###################################################################
//Below me is useful to Jesse:

//probably would put this at the top but hey just tyring to structure this
//so its easy to understand
var wit = require('botkit-middleware-witai')({
    token: process.env.WIT_ACCESS_TOKEN //my token is: 6NDWVPQP542QKCOENG4HL2L2LGJETBDI
});


//next line requires: npm botkit-middleware-witai
controller.middleware.receive.use(wit.receive); //now controller runs everything through wit middleware


//now you listen
//i wrote the entire function of finiding "close" deals in one go
//so you could just read the code.  Obviously not how you should do it....

controller.hears(['Hey DealBot'], 'ambient,direct_message,direct_mention',function(bot, message) {


  //figure out if what the highest determined intent was and excectute function if required
  if(message.intents[0].entities.intent[0].value == "deal_show"){
    //bot.reply(message,"Looks like i gotta show you something");
    var dealLocations = require('./locationQuery')
    dealLocations(bot, message);
  }

});
