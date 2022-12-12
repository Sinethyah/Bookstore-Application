const client = require('./../config/connection.js')

exports.findBooks = (req,res) =>{

    let bookname = req.query.bookname;

    let info={}

    client.query(`Select * from book` , (err,result) => {
        if (!err){
            let allbooks = result.rows
            info.allbooks = allbooks;
            client.query(`SELECT * FROM book JOIN bookauthor ON book.bookid = bookauthor.bookid JOIN author ON bookauthor.authorid = author.authorid
             WHERE LOWER(bookname) LIKE LOWER('%${bookname}%')`, (err,result)=>{
                if (!err){
                    let data = result.rows;
                    info.data=data;
                    res.status(200).send(info);
                }
                else{
                    res.status(500).send("Error")
                }
            })

        }
        else{
            res.status(500).send("Error occured")
        }
    })

    
}

exports.findBooksByAuthor = (req,res) =>{

    let author_fname = req.query.authorfname;

    let author_lname = req.query.authorlname;

    if (author_fname!="" && author_lname==""){
        findBooksByAuthorfname(author_fname,res);
    }
    else if (author_lname!="" && author_fname==""){
        findBooksByAuthorlname(author_lname,res);
    }
    else if (author_fname!="" && author_lname!=""){
        findBooksByAuthorFullName(author_fname,author_lname,res);
    }

}

exports.findBooksByGenre = (req,res,next) =>{

    let genre = req.query.genre;

    if (genre!=""){
        findBooksByGenre (genre, res);
    }

}

exports.findBooksByISBN = (req,res,next) => {

    let isbn = req.query.isbn;

    if (isbn!=""){
        findBooksByISBN (isbn,res);
    }

}

function findBooksByAuthorfname(author,res){

    let info={}
    client.query(`SELECT * FROM book`, (err,result)=>{
        if (!err){
            let allbooks = result.rows;
            info.allbooks = allbooks;

            client.query(`SELECT * FROM book JOIN bookauthor ON book.bookid = bookauthor.bookid JOIN author ON bookauthor.authorid = author.authorid WHERE LOWER(author.authorfname) LIKE LOWER('%${author}%')`, (err,result) => {
                if (!err){
                    let data = result.rows;
                    info.data =data
                    res.status(200).send(info);
                }
                else{
                    res.status(500).send({message:"Author does not exist on the database"})
                }
            })
        }})

            


}


function findBooksByAuthorlname(author,res){

    let info={}
    client.query(`SELECT * FROM book`, (err,result)=>{
        if (!err){
            let allbooks = result.rows;
            info.allbooks = allbooks;

            client.query(`SELECT * FROM book JOIN bookauthor ON book.bookid = bookauthor.bookid JOIN author ON bookauthor.authorid = author.authorid WHERE LOWER(author.authorlname) LIKE LOWER('%${author}%')`, (err,result) => {

                if (!err){
                    let data = result.rows;
                    info.data = data;
                    res.status(200).send(info);
                }
                else{
                    res.status(500).send({message:"Author does not exist on the database"})
                }
            })
        }})

            


}

function findBooksByAuthorFullName(author_fname,author_lname,res){

    let info={}
    client.query(`SELECT * FROM book`, (err,result)=>{
        if (!err){
            let allbook = result.rows;
            info.allbook = allbook;

            client.query(`SELECT * FROM book JOIN bookauthor ON book.bookid = bookauthor.bookid JOIN author ON bookauthor.authorid = author.authorid WHERE LOWER(author.authorfname) LIKE LOWER('%${author_fname}%') 
            and LOWER(author.authorlname) LIKE LOWER('%${author_lname}%')`, (err,result) => {

                if (result.rows.length > 0){
                    let data = result.rows;
                    info.data = data;
                    res.status(200).send(info);
                }
                else{
                    res.status(500).send({message:"Author does not exist on the database"})
                }
            })
        }})

            
    
    client.end;


}

function findBooksByGenre(genre,res){

    let info={}
    client.query(`SELECT * FROM book`, (err,result)=>{
        if (!err){
            let allbooks = result.rows;
            info.allbooks = allbooks
            client.query(`SELECT * FROM book JOIN bookauthor ON book.bookid = bookauthor.bookid JOIN author ON bookauthor.authorid = author.authorid WHERE LOWER(genre) LIKE LOWER('%${genre}%')`, (err,result)=>{
                if (!err){
                    let data = result.rows;
                    info.data = data;
                    res.status(200).send(info);
                }
                else{
                    res.status(500).send("Error")
                }
            });
        }
        else{
            res.status(500).send("Error")
        }
    });

    
    client.end;



}


function findBooksByISBN(isbn,res){

    let info={}
    client.query(`SELECT * FROM book`, (err,result)=>{
        if (!err){
            let allbooks = result.rows;
            info.allbooks = allbooks
            client.query(`SELECT * FROM book JOIN bookauthor ON book.bookid = bookauthor.bookid JOIN author ON bookauthor.authorid = author.authorid WHERE b_isbn='${isbn}'`, (err,result)=>{
                if (!err){
                    let data = result.rows;
                    info.data=data;
                    res.status(200).send(info);
                }
                else{
                    res.status(500).send("Error")
                }
            });
        }
        else{
            res.status(500).send("Error")
        }
    });

    
    client.end;



}


exports.findOne = (req,res) =>{

    let pid = req.params.id;
    client.query(`SELECT * FROM book JOIN bookauthor ON book.bookid = bookauthor.bookid 
    JOIN bookpublisher ON book.bookid = bookpublisher.bookid
    JOIN author ON bookauthor.authorid = author.authorid 
    JOIN publisher ON bookpublisher.publisherid = publisher.publisherid
    WHERE book.bookid='${pid}'`, (err,result) => {
        if(!err){
            let data = result.rows[0];
            res.status(200).send(data);
        }
        else{
            res.status(500).send("Error");
        }
    })

}

exports.update = (req,res) => {

    let pid = req.params.id 
    let data = req.body;
    let {bookid, b_isbn, authorfname, authorlname, publishername,bookname, genre, numpages, price, quantity, yearpub, monthpub, 
    daypub} = data;
    

    client.query(`SELECT * from author WHERE authorfname='${authorfname}' and authorlname='${authorlname}'`, (err,authorresult)=>{
        if (!err){

            //if the author exists, get the authorid 
            if (authorresult.rows.length > 0){
                let authorid = authorresult.rows[0];
                let a_id = Number(authorid.authorid);
                let newBookId = Math.floor(Math.random()*1000);

                client.query(`SELECT * FROM publisher where pname='${publishername}'`, (err,publisherresult) => {
                    if (!err){

                        if (publisherresult.rows.length > 0){
                            let publisherid = publisherresult.rows[0];
                            let p_id = Number(publisherid.publisherid);

                            client.query(`UPDATE book SET b_isbn='${b_isbn}', bookname='${bookname}', 
                            genre='${genre}', numpages='${numpages}', price='${price}', quantity='${quantity}', 
                            yearpub='${yearpub}', monthpub='${monthpub}', daypub='${daypub}'
                            WHERE bookid= '${bookid}'`, (err,result) => {
                                if (!err){
                                    client.query(`UPDATE bookauthor SET authorid='${a_id}' WHERE bookid='${bookid}'`, (err,result) => {
                                        if (!err){
                                            client.query(`UPDATE bookpublisher SET publisherid='${p_id}' WHERE bookid='${bookid}'`, (err,result) => {
                                                if (!err){
                                                    res.status(200).send({message:"Updated successfully!"})
                                                }
                                                else{
                                                    res.status(500).send({message:"Error 1"})
                                                }
                                        })}
                                        else{
                                            res.status(500).send({message:"Error 2"})
                                        }

                                })
                            }
                            })

                        }
                        else{
                            res.status(500).send({message:"Publisher not present in the database. Add an existing Publisher or create a new one in the link above."})
                        }
                    }
                }
                )
            }
            else{
            res.status(500).send({message:"Author not present in the database. Add an existing Author or create a new one in the link above."})
        }}
        })
}

//post request 
exports.insertNewBook = (req,res) => {

    let data = req.body;

    let {b_isbn, authorfname, authorlname, publishername, bookname, genre, numpages, price, quantity, yearpub, monthpub, 
        daypub} = data;

    client.query(`SELECT * from author WHERE authorfname='${authorfname}' and authorlname='${authorlname}'`, (err,authorresult)=>{
        if (!err){

            //if the author exists, get the authorid 
            if (authorresult.rows.length > 0){
                let authorid = authorresult.rows[0];
                let a_id = Number(authorid.authorid);
                let newBookId = Math.floor(Math.random()*1000);

                client.query(`SELECT * FROM publisher where pname='${publishername}'`, (err,publisherresult) => {
                    if (!err){

                        if (publisherresult.rows.length > 0){
                            let publisherid = publisherresult.rows[0];
                            let p_id = Number(publisherid.publisherid);

                            client.query(`INSERT INTO book(bookid, b_isbn, bookname,  genre, numpages, price, quantity, yearpub, monthpub, daypub)
                            VALUES('${newBookId}', '${b_isbn}', '${bookname}', '${genre}', '${numpages}', '${price}', '${quantity}', '${yearpub}',
                            '${monthpub}', '${daypub}')`, (err,result) => {
                                if (!err){
                                    client.query(`INSERT INTO bookauthor(bookid, authorid) 
                                    VALUES('${newBookId}','${a_id}')`, (err,result) => {
                                        if (!err){

                                            client.query(`INSERT INTO bookpublisher(bookid, publisherid) VALUES('${newBookId}', '${p_id}')`, (err,result) => {
                                                if (!err){
                                                    res.status(200).send({message:"New Book Added Successfully! Will be redirecting to the main page in a few seconds."})
                                                }
                                                else{
                                                    res.status(500).send({message:"Could not add book due to some error! Try again!"}) 
                                                }
                                            })
                                        }
                                        else{
                                            res.status(500).send({message:"Could not add book due to some error! Try again!"})
                                        }
                                    })  
                                }
                                else{
                                
                                    res.status(500).send({message:"Error! Could not add the book. Fill all boxes. Put Unique ISBN number."})
                                }
                            })

                        }
                        else{
                            res.status(500).send({message:"Publisher not present in the database. First add the publisher using the link above."})
                        }
                    }
                    else{
                        res.status(500).send({message:"Error"})
                    }

                })
                

                
            }
            else{
                res.status(500).send({message:"The author is not present in the database. First, add the author using Create Author."})
            }
            

        }
        else{
            res.status(500).send({message:"Error occured"})
        }
        
        
        
        
        
        })

    
    

}

exports.deleteFromDatabase = (req,res) => {

    let id = req.params.id;

    client.query(`DELETE FROM bookauthor WHERE bookid='${id}'`, (err,result) => {
        if (!err){
            client.query(`DELETE FROM bookpublisher WHERE bookid='${id}'`, (err,result) =>{

                if (!err){
                    client.query(`DELETE FROM book WHERE bookid='${id}'`, (err,result) => {
                        if (!err){
                            res.status(200).send({message:"Successfully deleted!"})
                        }
                        else{
                            res.status(500).send({message:"An unknown error occured. An order might have been placed of this book..."})
                        }
                        
                    })
                    
                }
                else{
                    res.status(500).send({message:"An unknown error occured. An order might have been placed of this book..."})
                }
            })
        }
        else{
            res.status(500).send({message:"An unknown error occured. An order might have been placed of this book..."})
        }
    })

    

}

client.connect();