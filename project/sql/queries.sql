/*The SQL queries are directly from my code for the web application*/

/*Authors*/
/*If the owner wants to find the authors by their first name*/
/*could retrieve multiple authors if their first name is the same*/
SELECT * FROM author WHERE LOWER(authorfname) LIKE LOWER('%${author_fname}%')

/*If the owner wants to find the authors by their last name*/
/*could retrieve multiple authors if their last name is the same*/
SELECT * FROM author WHERE LOWER(authorfname) LIKE LOWER('%${author_lname}%')

/*If the owner wants to find the author using the first and the last name*/
SELECT * FROM author WHERE LOWER(authorfname) LIKE LOWER('%${author_lname}%') and 
LOWER(authorlname) LIKE LOWER('%${author_lname}%')

/*Retrieves information about a specific author. pid is the author id*/
SELECT * FROM author WHERE authorid='${pid}'

/*Insert a new author*/
INSERT INTO author(authorid, authorfname, authorlname, country) VALUES ('${authorId}','${authorfname}', 
'${authorlname}', '${country}')

/*Update author information. Through the web application you can change one or all of the fields.*/
UPDATE author SET authorfname='${authorfname}', authorlname='${authorlname}',
country = '${country}' WHERE authorid= '${authorid}'


/*Publishers*/

/*If an owner needs to find a publisher by name*/
SELECT * FROM publisher WHERE LOWER(pname) LIKE LOWER('%${pname}%')

/*Retrieve specific publisher information*/
SELECT * from publisher where publisherid='${pid}'

/*Update publisher information. Through the web application, one or more fields associated with this
publisher can be changed*/
UPDATE publisher SET publisherid='${pid}', pname='${pName}', paddress= '${pAddress}'
pemail='${pEmail}', phonenum='${phoneNum}', 
bankname='${bankName}', cardnumber='${cardNumber}' WHERE publisherid= '${publisherid}'

/*Insert new publiser*/
INSERT INTO publisher(publisherid, 
pname,paddress,pemail, phonenum, bankname, cardnumber) VALUES ('${pid}','${pName}','${pAddress}',
'${pEmail}', '${phoneNum}', '${bankName}', '${cardNumber}')


/*BOOKS*/

/*find books using bookname*/
SELECT * FROM book JOIN bookauthor ON book.bookid = bookauthor.bookid JOIN author ON bookauthor.authorid = author.authorid
WHERE LOWER(bookname) LIKE LOWER('%${bookname}%')

/*find books by author first name*/
SELECT * FROM book JOIN bookauthor ON book.bookid = bookauthor.bookid JOIN author 
ON bookauthor.authorid = author.authorid WHERE LOWER(author.authorfname) LIKE LOWER('%${author}%')

/*find books by author last name*/
SELECT * FROM book JOIN bookauthor ON book.bookid = bookauthor.bookid JOIN author 
ON bookauthor.authorid = author.authorid WHERE LOWER(author.authorlname) LIKE LOWER('%${author}%')

/*find books by author full name*/
SELECT * FROM book JOIN bookauthor ON book.bookid = bookauthor.bookid JOIN author 
ON bookauthor.authorid = author.authorid WHERE LOWER(author.authorfname) 
LIKE LOWER('%${author_fname}%') 
and LOWER(author.authorlname) LIKE LOWER('%${author_lname}%')

/*find books by the genre name*/
SELECT * FROM book JOIN bookauthor ON book.bookid = bookauthor.bookid JOIN author 
ON bookauthor.authorid = author.authorid WHERE LOWER(genre) LIKE LOWER('%${genre}%')

/*find books using ISBN*/
SELECT * FROM book JOIN bookauthor 
ON book.bookid = bookauthor.bookid JOIN author ON bookauthor.authorid = author.authorid WHERE b_isbn='${isbn}'

/*find the required information about the specific book*/
SELECT * FROM book JOIN bookauthor ON book.bookid = bookauthor.bookid 
JOIN bookpublisher ON book.bookid = bookpublisher.bookid
JOIN author ON bookauthor.authorid = author.authorid 
JOIN publisher ON bookpublisher.publisherid = publisher.publisherid
WHERE book.bookid='${pid}'

/*Update information about the book, which includes updating the book, bookauthor and bookpublisher tables*/
UPDATE book SET b_isbn='${b_isbn}', bookname='${bookname}', 
genre='${genre}', numpages='${numpages}', price='${price}', quantity='${quantity}', 
yearpub='${yearpub}', monthpub='${monthpub}', daypub='${daypub}'
WHERE bookid= '${bookid}'

UPDATE bookauthor SET authorid='${a_id}' WHERE bookid='${bookid}'

UPDATE bookpublisher SET publisherid='${p_id}' WHERE bookid='${bookid}'

/*Insert a new book which includes inserting a new book into the book, bookauthor and bookpublisher tables*/
INSERT INTO book(bookid, b_isbn, bookname,  genre, numpages, price, quantity, yearpub, monthpub, daypub)
VALUES('${newBookId}', '${b_isbn}', '${bookname}', '${genre}', '${numpages}',
'${price}', '${quantity}', '${yearpub}',
'${monthpub}', '${daypub}')
																		
INSERT INTO bookauthor(bookid, authorid) VALUES('${newBookId}','${a_id}')

INSERT INTO bookpublisher(bookid, publisherid) VALUES('${newBookId}', '${p_id}')

/*delete book from database which includes deleting the relations in bookauthor, bookpublisher and book table*/
DELETE FROM bookauthor WHERE bookid='${id}'

DELETE FROM bookpublisher WHERE bookid='${id}'

DELETE FROM book WHERE bookid='${id}'

/*ORDERS*/

/*find the order using the order id*/
SELECT orderuser.orderid,book.bookid, book.bookname,userfname, userlname FROM userlibrary JOIN orderuser 
ON userlibrary.userid = orderuser.userid
JOIN orderbook ON orderuser.orderid = orderbook.orderid 
JOIN book ON orderbook.bookid = book.bookid
WHERE orderuser.orderid='${orderid}'

/*if a user wants to view their own order history*/
SELECT * FROM  orderuser 
JOIN orderbook ON orderuser.orderid = orderbook.orderid 
WHERE orderuser.userid='${userid}'

/*Make/Insert a new Order, which includes inserting in the orderuser table with orderid and userid and 
in the orderbook table with the orderid and different bookids*/
INSERT INTO orderuser (orderid, userid, dateord) 
VALUES('${newOrderId}', '${Number(currentuser)}', '${currentDate}')

INSERT INTO orderbook (orderid, bookid, quantityord, priceord) 
VALUES ('${newOrderId}','${Number(key)}' , '${Number(value)}', '${totalprice[key]}')

/*displays information about the specific order*/
SELECT * FROM userlibrary
JOIN orderuser ON userlibrary.userid = orderuser.userid
JOIN orderbook on orderuser.orderid = orderbook.orderid 
JOIN book ON orderbook.bookid=book.bookid 
JOIN bookauthor ON book.bookid = bookauthor.bookid 
JOIN author ON bookauthor.authorid = author.authorid
WHERE orderuser.orderid='${Number(orderid)}' and book.bookid='${Number(bookid)}';


/*Reports*/
/*displays Genre vs Sales report*/
SELECT book.genre, SUM(orderbook.quantityord) AS quantitysum FROM orderbook JOIN 
orderuser ON orderuser.orderid = orderbook.orderid JOIN 
BOOK ON BOOK.bookid = orderbook.bookid 
GROUP BY (book.genre) ORDER BY quantitysum DESC;

/*displays Authors vs Sales report*/
SELECT author.authorfname, author.authorlname, SUM(orderbook.quantityord) AS quantitysum FROM orderbook JOIN 
orderuser ON orderuser.orderid = orderbook.orderid JOIN 
bookauthor ON bookauthor.bookid = orderbook.bookid 
JOIN author ON author.authorid = bookauthor.authorid
GROUP BY (author.authorfname, author.authorlname) ORDER BY quantitysum DESC LIMIT 5;


/*displays Publishers vs Sales */
SELECT publisher.pname, SUM(orderbook.quantityord) AS quantitysum FROM orderbook 
JOIN bookpublisher ON bookpublisher.bookid = orderbook.bookid 
JOIN publisher ON publisher.publisherid = bookpublisher.publisherid
GROUP BY (publisher.pname) ORDER BY quantitysum DESC LIMIT 5;



