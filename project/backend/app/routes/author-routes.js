const authors = require("../controllers/author.controller.js");
var router = require("express").Router();

module.exports = app => {

    //find author by its name
    router.get("/", authors.findByAuthorName);

    // Retrieve a single author with id
    router.get("/:id", authors.findOne);

    // Update an author with id
    router.put("/:id",  authors.update);

    //insert new author
    router.post("/", authors.insertNewAuthor);

    
    app.use('/api/authors', router);

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

  };