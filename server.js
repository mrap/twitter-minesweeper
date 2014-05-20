'use strict'

var http        = require('http')
  , port        = Number(process.env.PORT || 5000)
  , minesweeper = require('./minesweeper');

var usernameExp = new RegExp('^[A-Za-z0-9_]{1,15}$');
var isValidTwitterUsername = function(str){
  return usernameExp.test(str);
};

var server = http.createServer(function(req, res){
  var url = req.url;
  var username = url.substr(1, url.length);

  var respondWithError = function(err){
    res.writeHead(400, {"Content-Type": "application/json"});
    res.end(JSON.stringify({
      username: username,
      is_fake: null,
      error: err
    }));
  };

  if (!isValidTwitterUsername(username))
    return respondWithError(username+" is not a valid Twitter username");

  minesweeper.isUserFake(username, function(err, isFake){
    if (err) return respondWithError(err);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({
      username: username,
      is_fake: isFake,
      error: null
    }));
  });

}).listen(port, null, function(){
  console.log("Now listening on port "+port);
});
