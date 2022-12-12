import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { Routes, Route, Link} from "react-router-dom";

import Home from './components/home/home.component';

import Owner from './components/owner/owner'
import User from './components/user/user'

import BooksListByBookName from './components/book/books-bookname'
import BooksListByAuthor from './components/book/books-AuthorName';
import Book from './components/book/book'
import BooksListByGenre from './components/book/books-genre';
import BooksListByISBN from './components/book/books-isbn';
import NewBook from './components/book/newbook'

import Authors from './components/author/authors'
import Author from './components/author/author'
import NewAuthor from './components/author/newAuthor'

import Users from './components/user/users-name'
import SingleUser from './components/user/singleuser'
import NewUser from './components/user/newuser' 

import Publishers from './components/publishers/publishers'
import Publisher from './components/publishers/publisher'
import NewPublisher from './components/publishers/newPublisher'

import Order from './components/order/order'
import OrdsUser from './components/order/ordersUser'
import OrdersBasedOnOrdNum from './components/order/order-ordnum'

import GenreSaleReport from './components/order/genresalereport'
import AuthorSaleReport from './components/order/authorsalereport'
import PublisherSaleReport from './components/order/publishersalereport'


function App() {
  return (
    <div>
          <Routes>
            <Route exact path="/" element={<Home/>}/>

            <Route exact path="/owner" element={<Owner/>}/>
            <Route exact path="/user" element={<User/>}/>

            <Route exact path="/books" element={<BooksListByBookName/>}/>
            <Route exact path="/books/author" element={<BooksListByAuthor/>}/>
            <Route exact path="/books/genre" element={<BooksListByGenre/>}/>
            <Route exact path="/books/isbn" element={<BooksListByISBN/>}/>
            <Route exact path="/books/:id" element={<Book/>} />
            <Route exact path="/books/newBook" element={<NewBook/>}/>

            <Route exact path="/authors" element={<Authors/>}/>
            <Route exact path="/authors/:id" element={<Author/>}/>
            <Route exact path="/authors/newAuthor" element={<NewAuthor/>}/>

            <Route exact path="/users" element={<Users/>}/>
            <Route exact path = "/users/:id" element={<SingleUser/>}/>
            <Route exact path="/users/newUser" element={<NewUser/>}/>

            <Route exact path="/publishers" element={<Publishers/>}/>
            <Route exact path = "/publishers/:id" element={<Publisher/>}/>
            <Route exact path="/publishers/newPublisher" element={<NewPublisher/>}/>

            <Route exact path="/orders" element={<OrdersBasedOnOrdNum/>}/>
            <Route exact path="/orders/:orderid/:bookid" element={<Order/>}/>
            <Route exact path="/orders/orderSummary/:userid" element={<OrdsUser/>}/>

            <Route exact path="/orders/genresalereport" element={<GenreSaleReport/>}/>
            <Route exact path="/orders/authorsalereport" element={<AuthorSaleReport/>}/>
            <Route exact path="/orders/publishersalereport" element={<PublisherSaleReport/>}/>


            


          </Routes>
      </div>
  );
}

export default App;

/*
<Route exact path="/orders/:ordNum" element={<Order/>}/>
            <Route exact path="/orders/orderSummary" element={<OrdsUser/>}/>
*/