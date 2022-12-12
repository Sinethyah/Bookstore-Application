const { response } = require('express');
const client = require('./../config/connection.js')

let counter=0;


//find order using the order id
exports.findOrderByOrdId = (req,res) => {

    let query = req.query;
    let orderid= query.orderid;

    client.query(`SELECT orderuser.orderid,book.bookid, book.bookname,userfname, userlname FROM userlibrary JOIN orderuser ON userlibrary.userid = orderuser.userid
    JOIN orderbook ON orderuser.orderid = orderbook.orderid 
    JOIN book ON orderbook.bookid = book.bookid
    WHERE orderuser.orderid='${orderid}'`, (err,result) => {
        if (!err){
            let data = result.rows;
            res.status(200).send(data);
        }
        else{
            res.status(500).send({message:"Error"})
        }
    })

}


//if a user wants to view their own order history
exports.displayOrdsUser = (req,res) => {

    let userid = req.params.userid;
    
    
    client.query(`SELECT * FROM  orderuser 
    JOIN orderbook ON orderuser.orderid = orderbook.orderid 
    WHERE orderuser.userid='${userid}'`, (err,result)=>{
        if (!err){
            let data = result.rows;
            res.status(200).send(data);
        }
        else{
            res.status(500).send("Error")
        }
    })

}


//insert/make new order
exports.insertNewOrder = (req,res) => {

    let query = req.body
    let order = query.order;
    let currentuser = query.currentUser;
    let totalprice = query.price;
    let len_order = Object.keys(order).length;
    let newOrderId = Math.floor(Math.random()*1000);

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    //insert into orderuser table
    client.query(`INSERT INTO orderuser (orderid, userid, dateord) VALUES('${newOrderId}', '${Number(currentuser)}', '${currentDate}')`, (err,result) => {
        if (!err){
            for (const [key, value] of Object.entries(order)) {
                
        
                //insert into orderbook table
                client.query(`INSERT INTO orderbook (orderid, bookid, quantityord, priceord) 
                VALUES ('${newOrderId}','${Number(key)}' , '${Number(value)}', '${totalprice[key]}')`, (err,result) => {
                    if (!err){
                        client.query(`SELECT quantity FROM book where bookid='${Number(key)}'`, (err,result) => {
                            let quantity = Number(result.rows[0].quantity);
                            if (quantity < 10){
                                quantity+=100;
                            }
                            let updatedquantity = Number(quantity) - Number(value);
                            
                            client.query(`UPDATE book SET quantity='${updatedquantity}' WHERE bookid='${Number(key)}'`, (err,result) => {
                                if (err){
                                    res.status(500).send({message:"Error"})
                                }
                            })
                        })
                        counter+=1;
                        if (counter == len_order){
                            counter=0;
                            res.status(200).send({message:"Posted Order Successfully! Redirecting..."})
                            return;
                        }
                    }
                    else{
                        res.status(500).send({message:"Error"})        
                    }
                })
            }
        }
        else{
            res.status(500).send({message:"Error"})
        }
    })

    

}


//displays information about the specific order
exports.findOne = (req,res) => {

    let bookid = req.params.bookid;
    let orderid = req.params.orderid;

    
    client.query(`SELECT * FROM userlibrary
    JOIN orderuser ON userlibrary.userid = orderuser.userid
    JOIN orderbook on orderuser.orderid = orderbook.orderid 
    JOIN book ON orderbook.bookid=book.bookid 
    JOIN bookauthor ON book.bookid = bookauthor.bookid 
    JOIN author ON bookauthor.authorid = author.authorid
    WHERE orderuser.orderid='${Number(orderid)}' and book.bookid='${Number(bookid)}'`, (err,result) => {
        if(!err){
            let data = result.rows[0];
            res.status(200).send(data);
        }
        else{
            res.status(500).send("Error");
        }
    })

}

//genre vs sales sale report 
exports.displayGenreSaleReport = (req,res) => {

    client.query(`SELECT book.genre, SUM(orderbook.quantityord) AS quantitysum FROM orderbook JOIN 
    orderuser ON orderuser.orderid = orderbook.orderid JOIN 
    BOOK ON BOOK.bookid = orderbook.bookid 
    GROUP BY (book.genre) ORDER BY quantitysum DESC`, (err,result) => {
        if (!err){
            res.status(200).send(result.rows);
        }
        else{
            res.status(500).send("Error")
        }
    })
    
}

//authors vs sales report
exports.displayAuthorSaleReport = (req,res) => {

    client.query(`SELECT author.authorfname, author.authorlname, SUM(orderbook.quantityord) AS quantitysum FROM orderbook JOIN 
    orderuser ON orderuser.orderid = orderbook.orderid JOIN 
    bookauthor ON bookauthor.bookid = orderbook.bookid 
    JOIN author ON author.authorid = bookauthor.authorid
    GROUP BY (author.authorfname, author.authorlname) ORDER BY quantitysum DESC LIMIT 5`, (err,result) => {
        if (!err){
            res.status(200).send(result.rows);
        }
        else{
            res.status(500).send("Error")
        }
    })
    
}

//publishers vs sales 
exports.displayPublisherSaleReport = (req,res) => {

    client.query(`SELECT publisher.pname, SUM(orderbook.quantityord) AS quantitysum FROM orderbook 
    JOIN bookpublisher ON bookpublisher.bookid = orderbook.bookid 
    JOIN publisher ON publisher.publisherid = bookpublisher.publisherid
    GROUP BY (publisher.pname) ORDER BY quantitysum DESC LIMIT 5`, (err,result) => {
        if (!err){
            res.status(200).send(result.rows);
        }
        else{
            res.status(500).send("Error")
        }
    })
    
}





