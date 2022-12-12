const publishers = require("../controllers/publisher.controller.js");
var router = require("express").Router();

module.exports = app => {

    // Retrieve all publishers with username specified
    router.get("/",  publishers.findpublishersByName);

    // Retrieve a single user with id
    router.get("/:id", publishers.findOne);

    // Update a user with id
    router.put("/:id",  publishers.update);

    router.post("/", publishers.insertNewPublisher);

    
    app.use('/api/publishers', router);

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

  };