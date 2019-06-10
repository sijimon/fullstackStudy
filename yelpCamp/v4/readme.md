INDEX   /dogs       GET     Display a list of all dogs
NEW     /dogs/new   GET     Display form to create a new dog
CREATE  /dogs       POST    Add new dog to DB
SHOW    /dogs/:id   GET     Show info about one dog


INDEX   /campgrounds
NEW     /campgrounds/new
CREATE  /campgrounds
SHOW    /campgrounds/:id

NEW     /campgrounds/:id/comments/new    GET
CREATE  /campgrounds/:id/comments        POST