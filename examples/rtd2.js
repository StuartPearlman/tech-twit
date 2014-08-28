//
// Makes new friends and prunes its followings.
//
var Bot = require("./bot"),
    config1 = require("../config1");

var bot = new Bot(config1);

console.log('RTD2: Running.');
console.log(timestring());


//get date string for today's date (e.g. 2011-01-01)
function datestring() {
    var d = new Date(Date.now());
    return d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getDate();
};

function timestring() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return hour + ":" + min + ":" + sec;
};

function techTwit() {
    setInterval(function() {
        var rand = Math.random();

        if (rand <= 0) { // do a targeted follow
            console.log("FOLLOW");
            var params = {
                q: "tech",
                since: datestring(),
                result_type: "mixed",
                lang: "en"
            };

            bot.searchFollow(params, function(err, reply) {
                if (err) return handleError(err);

                var name = reply.screen_name;
                console.log("\nSearchFollow: followed @" + name);
                console.log(timestring());
            });

        } else if (rand <= .20) { // retweet
            console.log("RETWEET");
            var params = {
                q: "tech",
                since: datestring(),
                result_type: "mixed",
                lang: "en"
            };

            bot.retweet(params, function(err, reply) {
                if (err) return handleError(err);

                console.log("\nRetweet: retweeted response: " + reply.id);
                console.log(timestring());
            });
        } else { //  prune a friend
            console.log("PRUNE");
            bot.prune(function(err, reply) {
                if (err) return handleError(err);

                var name = reply.screen_name
                console.log("\nPrune: unfollowed @" + name);
                console.log(timestring());
            });
        }
    }, 210000);
};

techTwit();

function handleError(err) {
    console.error("response status:", err.statusCode);
    // console.error("data:", err.data);
    console.log(timestring());
    clearInterval(techTwit());
    setTimeout(techTwit(), 210000); //  wait one interval to prevent API banning
};