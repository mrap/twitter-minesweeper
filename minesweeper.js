'use strict'

var request = require('request')
  , cheerio = require('cheerio')
  , BASE_URL = 'http://twitter.com/';

var userProfileUrl = function(username) { return BASE_URL + username; };

var isNewLayout = function($){
  return $('.Grid').length > 0;
};

var loadUserProfileDom = function(username, done){
  request( userProfileUrl(username), function(err, res, body){
    if (err)                    return done(err, null);
    if (res.statusCode !== 200) return done(new Error('Status code '+res.statusCode+' for username: '+username), null);
    var $ = cheerio.load(body);
    done(null, $);
  });
};

var eggheadExp = new RegExp('default_profile_images');
var hasEggheadProfilePhoto = function($){
  var profileUrl = ( isNewLayout($) ) ?
    $('img.ProfileAvatar-image').first().attr('src') : $('a.profile-picture').first().attr('href');
  return eggheadExp.test(profileUrl);
};

var connectionCount = function($, connectionType){
  if ( isNewLayout($) ) {
    var count = $('a.ProfileNav-stat[data-nav="'+connectionType+'"]').attr('title');
  } else {
    var tableDataElems = $('table.stats').find('td')
      , pos            = (connectionType === 'following') ? 1 : 2
      , count          = $(tableDataElems[pos]).find('strong').attr('title') || 0;
  }
  // count => "1000 Followers"
  // remove non-digits and converts to number
  return Number( count.toString().replace(/[^\d.]/g, "") );
};

var FOLLOWING_LIMIT = 2001;
var reachedFollowingLimit = function($){
  var followersCount = connectionCount($, 'followers')
    , followingCount = connectionCount($, 'following');
  return followingCount >= Math.max(followersCount*1.1, FOLLOWING_LIMIT);
};

var userBio = function($){
  return isNewLayout($) ?
    $('p.ProfileHeaderCard-bio').text() :
    $('p.bio').text();
};

var userUrl = function($){
  return isNewLayout($) ?
    $('span.ProfileHeaderCard-urlText').find('a').attr('href') :
    $('p.location-and-url').find('span.url').find('a').attr('href');
};

var lacksBioAndUrl = function($){
  return !userBio($) && !userUrl($);
};

var isUserVerified = function($){
  if (isNewLayout($)) return $('span.ProfileHeaderCard-badges').find('.Icon--verified').length > 0;
  else                return $('h1.fullname').find('.verified').length > 0;
};

var Minesweeper = {
  userProfileUrl: userProfileUrl,

  isUserFake: function(username, done){
    loadUserProfileDom(username, function(err, $){
      if (err) return done(err, null);

      // Verified users are not fake
      if (isUserVerified($)) return done(null, false)
      var result =
        hasEggheadProfilePhoto($) ||
        reachedFollowingLimit($)  ||
        lacksBioAndUrl($);
      done(null, result);
    });
  }
};

module.exports = Minesweeper;
