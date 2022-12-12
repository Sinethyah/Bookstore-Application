
DROP TABLE book, author, publisher, userlibrary, bookauthor, bookpublisher, orderuser, orderbook CASCADE;

/*Creates new author*/
CREATE TABLE author(
	authorid INT NOT NULL UNIQUE,
	authorfname varchar(255) NOT NULL,
	authorlname varchar(255),
	country varchar(255),
	PRIMARY KEY(authorID)
);

/*creates new publisher*/
CREATE TABLE publisher(
	publisherid INT NOT NULL UNIQUE, 
	pname varchar(255) NOT NULL,
	paddress VARCHAR(255),
	pemail varchar(255),
	phoneNum varchar(255),
	bankName VARCHAR(255) NOT NULL,
	cardNumber VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (publisherid)
);


/*creates new book*/
CREATE TABLE book(
	bookid INT NOT NULL UNIQUE, 
	b_isbn varchar(13) NOT NULL UNIQUE,
	bookName varchar(255),
	genre varchar(255),
	numPages INT, 
	price DECIMAL(100,2), 
	quantity INT,
	yearPub INT,
	monthPub varchar(255), 
	dayPub INT,
	PRIMARY KEY(bookid)
);

/*book author relationship*/
CREATE TABLE bookauthor (
	bookid INT NOT NULL, 
	authorid INT NOT NULL,
	PRIMARY KEY(bookID, authorid),
	FOREIGN KEY(bookid) REFERENCES book(bookid),
	FOREIGN KEY(authorid) REFERENCES author(authorid) 

);

/*book and publisher relationship*/
CREATE TABLE bookpublisher(
	bookid INT NOT NULL,
	publisherid INT NOT NULL,
	PRIMARY KEY(bookid, publisherid),
	FOREIGN KEY(bookid) REFERENCES book(bookid),
	FOREIGN KEY(publisherid) REFERENCES publisher(publisherid)
);

/*create user table*/
CREATE TABLE userlibrary(
	userID INT UNIQUE NOT NULL,
	userFname varchar(255) NOT NULL,
	userLname varchar(255),
	bAddress varchar(255),
	sAddress varchar (255),
	phoneNum varchar(255),
	bankName VARCHAR(255) NOT NULL,
	cardNumber VARCHAR(255) NOT NULL,	
	PRIMARY KEY(userid)
);
*/


/*create order and user relation*/
CREATE TABLE orderuser(
	orderid INT NOT NULL UNIQUE, 
	userid INT NOT NULL, 
	dateOrd date, 
	PRIMARY KEY(orderid, userid),
	FOREIGN KEY(userid) REFERENCES userlibrary(userid)	

);

/*create order and book relation*/
CREATE TABLE orderbook(
	orderid INT NOT NULL, 
	bookid INT NOT NULL,
	quantityOrd INT, 
	priceord DECIMAL(100,2), 
	PRIMARY KEY(orderid, bookid),
	FOREIGN KEY (orderid) REFERENCES orderuser(orderid),
	FOREIGN KEY (bookid) REFERENCES book(bookid)
);









