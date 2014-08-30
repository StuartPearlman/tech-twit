#tech twit

My fork of the Twitter API Client for node known as **twit**.

Get the original **twit** here: <https://github.com/ttezel/twit>

##Usage
Tracks the tech community on Twitter and either follows a user tweeting about tech (40% of the time), retweets a recent tweet about tech (20% of the time), or unfollows a user who hasn't followed me back (40% of the time).

##Make your own
Add a file called: `config1.js` at the root of the `twit` folder. It should look something like this (insert your API keys between the ' '):

```
module.exports = {
    consumer_key: '...'
  , consumer_secret: '...'
  , access_token: '...'
  , access_token_secret: '...'
}
```
##Acknowledgements
Check out Christian Paulsen's amazing blog entry on getting started using node and the twit module: 

<http://www.apcoder.com/2013/10/03/twitter-bot-20-minutes-node-js/>
