const orders = require("../controllers/order.controller.js");
var router = require("express").Router();

module.exports = app => {

    // Retrieve all orders with username specified

    router.get("/", orders.findOrderByOrdId)

    router.get("/orderSummary/:userid", orders.displayOrdsUser)

    // Retrieve a single book with id
    router.get("/:orderid/:bookid", orders.findOne);

    router.get("/genresalereport", orders.displayGenreSaleReport);

    router.get("/publishersalereport", orders.displayPublisherSaleReport);

    router.get("/authorsalereport", orders.displayAuthorSaleReport);


    router.post("/", orders.insertNewOrder);

    
    app.use('/api/orders', router);

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

  };