const books = require("../controllers/book.controller.js");
var router = require("express").Router();

module.exports = app => {

    // Retrieve all books with username specified
    router.get("/",  books.findBooks);

    router.get("/author",books.findBooksByAuthor)

    router.get("/genre",  books.findBooksByGenre);

    router.get("/isbn",  books.findBooksByISBN);


    // Retrieve a single book with id
    router.get("/:id", books.findOne);

    // Update a book with id
    router.put("/:id",  books.update);

    router.post("/", books.insertNewBook);

    router.delete("/:id", books.deleteFromDatabase);

    
    app.use('/api/books', router);

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

  };