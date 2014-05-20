twitter-minesweeper
===================

Detects _mines_ in twitter.
A _mine_ is a fake, inactive, or just plain lazy twitter user.

### Criteria
The user is deemed a mine when they:

 1. have the "egghead" profile image (img url contains `/default_profile_images`)
 2. follow exactly 2001 users
 3. have more than a 3:1 following:followers ratio (following count > 10)
 4. lack a bio && lack personal url
