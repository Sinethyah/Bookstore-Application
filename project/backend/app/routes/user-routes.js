const users = require("../controllers/user.controller.js");
var router = require("express").Router();

module.exports = app => {

    // Retrieve all users with username specified
    router.get("/",  users.findUsersByFullName);

    router.get("/allusers",  users.findAllUsers);


    // Retrieve a single user with id
    router.get("/:id", users.findOne);

    // Update a user with id
    router.put("/:id",  users.update);

    router.post("/", users.insertNewUser);

    
    app.use('/api/users', router);

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

  };