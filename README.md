twitter-minesweeper
===================

Detects _mines_ in twitter.
A _mine_ is a fake, inactive, or just plain lazy twitter user.

[Try it out for yourself](http://twitter-minesweeper.herokuapp.com)

Request: `http://twitter-minesweeper.herokuapp.com/:username`
Responds in JSON.

### Example:

Request: `http://twitter-minesweeper.herokuapp.com/the_mrap`
Response:

    {
      "username": "the_mrap",
      "is_fake": false,
      "error": null
    }

-------------------------------------------------

### Criteria
The user is deemed a mine when they:

 1. have the "egghead" profile image (img url contains `/default_profile_images`)
 2. follow exactly 2001 users
 4. lack a bio && lack personal url

### TODO: 
 * check if user has more than a 3:1 following:followers ratio (following count > 10)
  - This is more of an assumption at this point, need better data first.
