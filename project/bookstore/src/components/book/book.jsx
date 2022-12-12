import React, {Component} from "react";
import BookDataService from './../../services/book-header.js';
import {useParams, Link, NavLink} from 'react-router-dom'
import {Button} from 'react-bootstrap'

class Book extends Component{

    constructor(props){
        super(props);
        this.searchBook = this.searchBook.bind(this);
        this.updateBook = this.updateBook.bind(this);

        this.onChangeISBN = this.onChangeISBN.bind(this);
        this.onChangeAuthorfname = this.onChangeAuthorfname.bind(this);
        this.onChangeAuthorLname = this.onChangeAuthorLname.bind(this);
        this.onChangeBookName = this.onChangeBookName.bind(this);
        this.onChangePublisherName = this.onChangePublisherName.bind(this)
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onChangeNumPages = this.onChangeNumPages.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeYearPub = this.onChangeYearPub.bind(this);
        this.onChangeMonthPub = this.onChangeMonthPub.bind(this);
        this.onChangeDayPub = this.onChangeDayPub.bind(this);


        this.state={
            currentuser:sessionStorage.getItem("currentuser"),
            book:"",
            updatedBookInfo:{
                bookid:"",
                b_isbn:"",
                bookname:"",
                authorfname:"",
                authorlname:"",
                publishername:"",
                genre:"",
                numpages:"",
                price:"",
                quantity:"",
                yearpub:"",
                monthpub:"",
                daypub:""
            },
            successful:false,
            message:""
            
        }
    }

    //retrieves book of this id
    componentDidMount(){
        let {id} = this.props.params;
        this.searchBook(id);
    }

    //take isbn input
    onChangeISBN(e){
        let isbn = e.target.value;
        this.setState(function(prevState) {
            return {
                updatedBookInfo: {
                ...prevState.updatedBookInfo,
                b_isbn: isbn
                }
            };
        });
    }

    onChangeBookName(e){
        let bookname = e.target.value;
        this.setState(function(prevState) {
            return {
                updatedBookInfo: {
                ...prevState.updatedBookInfo,
                bookname: bookname
                }
            };
        });
    }

    onChangeAuthorfname(e){
        let authorfname = e.target.value;
        this.setState(function(prevState) {
            return {
                updatedBookInfo: {
                ...prevState.updatedBookInfo,
                authorfname: authorfname
                }
            };
        });
    }

    onChangeAuthorLname(e){
        let authorlname = e.target.value;
        this.setState(function(prevState) {
            return {
                updatedBookInfo: {
                ...prevState.updatedBookInfo,
                authorlname : authorlname
                }
            };
        });
    }

    onChangePublisherName(e){
        let publishername= e.target.value;
        this.setState(function(prevState) {
            return {
                updatedBookInfo: {
                ...prevState.updatedBookInfo,
                publishername : publishername
                }
            };
        });
    }

    onChangeGenre(e){
        let genre = e.target.value;
        this.setState(function(prevState) {
            return {
                updatedBookInfo: {
                ...prevState.updatedBookInfo,
                genre  : genre 
                }
            };
        });
    }

    onChangeNumPages(e){
        let numpages = e.target.value;
        this.setState(function(prevState) {
            return {
                updatedBookInfo: {
                ...prevState.updatedBookInfo,
                numpages  : numpages
                }
            };
        });
    }

    onChangePrice(e){
        let price = e.target.value;
        this.setState(function(prevState) {
            return {
                updatedBookInfo: {
                ...prevState.updatedBookInfo,
                price  : price
                }
            };
        });
    }

    onChangeQuantity(e){
        let quantity = e.target.value;
        this.setState(function(prevState) {
            return {
                updatedBookInfo: {
                ...prevState.updatedBookInfo,
                quantity : quantity
                }
            };
        });
    }


    onChangeYearPub(e){
        let yearpub = e.target.value;
        this.setState(function(prevState) {
            return {
                updatedBookInfo: {
                ...prevState.updatedBookInfo,
                yearpub : yearpub
                }
            };
        });
    }

    onChangeMonthPub(e){
        let monthpub = e.target.value;
        this.setState(function(prevState) {
            return {
                updatedBookInfo: {
                ...prevState.updatedBookInfo,
                monthpub : monthpub 
                }
            };
        });
    }


    onChangeDayPub(e){
        let daypub = e.target.value;
        this.setState(function(prevState) {
            return {
                updatedBookInfo: {
                ...prevState.updatedBookInfo,
                daypub: daypub
                }
            };
        });
    }

    //search book with the following id
    searchBook(id){
        BookDataService.get(id)
        .then(response =>{
            this.setState({
                book:response.data,
                updatedBookInfo:{
                    bookid: response.data.bookid,
                    b_isbn: response.data.b_isbn,
                    bookname: response.data.bookname,
                    authorfname: response.data.authorfname,
                    authorlname: response.data.authorlname,
                    publishername: response.data.pname, 
                    genre: response.data.genre,
                    numpages: response.data.numpages,
                    price: response.data.price,
                    quantity: response.data.quantity,
                    yearpub: response.data.yearpub,
                    monthpub: response.data.monthpub,
                    daypub: response.data.daypub
                }
                
            })
        })
        .catch(err => console.log(err))
    }

    //update the book if update button is clicked
    updateBook(){
        let data =this.state.updatedBookInfo;
        BookDataService.update(this.state.updatedBookInfo.bookid, data)
        .then (response => {
            console.log(response)
            this.setState({
                successful:true,
                message:response.data.message
            })
            window.setTimeout(function(){

                // Move to a request history
                window.location.href = window.location.href;
        
            }, 2000);
        })
        .catch(err => {
            this.setState(
                {
                    successful:false,
                    message:err.response.data.message
                }
            )
        });
    }

    render(){

        const {book, updatedBookInfo, currentuser} = this.state;

        return(
                <div className="centerText">

                    {currentuser ? (

                        <div className="center">
                        <h3>Book Details </h3>
                        <b>ISBN: </b><span>{book.b_isbn}</span>
                        <br></br>
                        <b>Book: </b><span>{book.bookname}</span>
                        <br></br>
                        <b>Author: </b><span>{book.authorfname} {book.authorlname}</span>
                        <br></br>
                        <b>Publisher: </b><span>{book.pname}</span>
                        <br></br>
                        <b>Genre: </b><span>{book.genre}</span>
                        <br></br>
                        <b>Number of pages: </b><span>{book.numpages}</span>
                        <br></br>
                        <b>Price: </b><span>{book.price}</span>
                        <br></br>
                        <b>Date of publication: </b><span>{book.yearpub}/{book.monthpub}/{book.daypub}</span>

                        </div>

                    ): (

                        <div>
                            <NavLink to={"/books" }>Back</NavLink>
                            <div className="center">
                                <h3>Book Details </h3>
                                <b>ISBN: </b><span>{book.b_isbn}</span>
                                <br></br>
                                <b>Book: </b><span>{book.bookname}</span>
                                <br></br>
                                <b>Author: </b><span>{book.authorfname} {book.authorlname}</span>
                                <br></br>
                                <b>Publisher Name </b><span>{book.pname}</span>
                                <br></br>
                                <b>Genre: </b><span>{book.genre}</span>
                                <br></br>
                                <b>Number of pages: </b><span>{book.numpages}</span>
                                <br></br>
                                <b>Price: </b><span>{book.price}</span>
                                <br></br>
                                <b>Date of publication: </b><span>{book.yearpub}/{book.monthpub}/{book.daypub}</span>

                            </div>

                            <div className="center">

                                <h2>Edit Book</h2>

                                <h3>ISBN </h3>
                                <input
                                type="text"
                                style={{'maxWidth':'100%'}}
                                placeholder="ISBN"
                                value={updatedBookInfo.b_isbn}
                                onChange={this.onChangeISBN}
                                />

                                <h3>Book Name </h3>
                                <input
                                type="text"
                                style={{'maxWidth':'100%'}}
                                placeholder="Book Name"
                                value={updatedBookInfo.bookname}
                                onChange={this.onChangeBookName}
                                />

                                <h3>Author First Name </h3>
                                <input
                                type="text"
                                style={{'maxWidth':'100%'}}
                                placeholder="Author First Name"
                                value={updatedBookInfo.authorfname}
                                onChange={this.onChangeAuthorfname}
                                />

                                <h3>Publisher Name </h3>
                                <input
                                type="text"
                                style={{'maxWidth':'100%'}}
                                placeholder="Author First Name"
                                value={updatedBookInfo.publishername}
                                onChange={this.onChangePublisherName}
                                />

                                <h3>Author Last Name </h3>
                                <input
                                type="text"
                                style={{'maxWidth':'100%'}}
                                placeholder="Author Last Name"
                                value={updatedBookInfo.authorlname}
                                onChange={this.onChangeAuthorLname}
                                />

                                <h3>Genre </h3>
                                <input
                                type="text"
                                style={{'maxWidth':'100%'}}
                                placeholder="Genre"
                                value={updatedBookInfo.genre}
                                onChange={this.onChangeGenre}
                                />

                                <h3>Number of pages</h3>
                                <input
                                type="text"
                                style={{'maxWidth':'100%'}}
                                placeholder="Number of Pages"
                                value={updatedBookInfo.numpages}
                                onChange={this.onChangeNumPages}
                                />

                                <h3>Price </h3>
                                <input
                                type="text"
                                style={{'maxWidth':'100%'}}
                                placeholder="Price"
                                value={updatedBookInfo.price}
                                onChange={this.onChangePrice}
                                />

                                <h3>Quantity </h3>
                                <input
                                type="text"
                                style={{'maxWidth':'100%'}}
                                placeholder="Quantity"
                                value={updatedBookInfo.quantity}
                                onChange={this.onChangeQuantity}
                                />

                                <h3>Year Published </h3>
                                <input
                                type="text"
                                style={{'maxWidth':'100%'}}
                                placeholder="Year"
                                value={updatedBookInfo.yearpub}
                                onChange={this.onChangeYearPub}
                                />

                                <h3>Month Published</h3>
                                <input
                                type="text"
                                style={{'maxWidth':'100%'}}
                                placeholder="Month"
                                value={updatedBookInfo.monthpub}
                                onChange={this.onChangeMonthPub}
                                />

                                <h3>Day Published</h3>
                                <input
                                type="text"
                                style={{'maxWidth':'100%'}}
                                placeholder="Day"
                                value={updatedBookInfo.daypub}
                                onChange={this.onChangeDayPub}
                                />


                                <br/>
                                <br/>

                                <Button variant="primary" type="submit" id="button" onClick={this.updateBook}>
                                    Update
                                </Button>

                                {this.state.message && (
                                    <div>
                                        {(this.state.successful==true) ? (
                                            <div>
                                                <p style={{'color':'green'}}>{this.state.message}</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p style={{'color':'red'}}>{this.state.message}</p>
                                            </div>
                                        )}
                                    
                                    </div>
                                )}

                                

                        </div>
                        </div>

                    )}
       
            </div>
        )
    }
}

export default (props) => (
    <Book
        {...props}
        params={useParams()}
    />
); 