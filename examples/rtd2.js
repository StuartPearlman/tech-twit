//
// Makes new friends and prunes its followings.
//
var Bot = require("./bot")
, config1 = require("../config1");
 
var bot = new Bot(config1);
 
console.log('RTD2: Running.');
 
//get date string for today's date (e.g. 2011-01-01)
function datestring () {
  var d = new Date(Date.now());
  return d.getUTCFullYear() + "-" + 
         (d.getUTCMonth() + 1) + "-" + 
         d.getDate();
};
 
setInterval(function() {
  var rand = Math.random();
 
  if(rand <= .75) {  // do a targeted follow
    var params = {
        q: "tech"
      , since: datestring()
      , result_type: "mixed"
      , lang: "en"
    };
 
    bot.searchFollow(params, function(err, reply) {
      if(err) return handleError(err);
 
      var name = reply.screen_name;
      console.log("\nSearchFollow: followed @" + name);
    });
    
  } else if(rand <= .90) {  // retweet
    var params = {
        q: "tech"
      , since: datestring()
      , result_type: "mixed"
      , lang: "en"
    };
 
    bot.retweet(params, function(err, reply) {
      if(err) return handleError(err);
 
      console.log("\nRetweet: retweeted response: " + reply.id);
    });
  } else {                 //  prune a friend
    bot.prune(function(err, reply) {
      if(err) return handleError(err);
 
      var name = reply.screen_name
      console.log("\nPrune: unfollowed @"+ name);
    });
  }
}, 210000);
 
function handleError(err) {
  console.error("response status:", err.statusCode);
  console.error("data:", err.data);
}