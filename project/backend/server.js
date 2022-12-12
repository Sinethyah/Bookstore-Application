const client = require('./app/config/connection.js')
const express = require('express');
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");


//allows information from the frontend at port 3000 while the server is at 3300
var corsOptions = {
    origin: "http://localhost:3000"
  };
  
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
  

app.get("/", function(req,res,next){
    res.json("Hello")
})

require("./app/routes/book-routes.js")(app);
require("./app/routes/author-routes.js")(app);
require("./app/routes/user-routes.js")(app);
require("./app/routes/publisher-routes.js")(app);
require("./app/routes/order-routes.js")(app);






app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

