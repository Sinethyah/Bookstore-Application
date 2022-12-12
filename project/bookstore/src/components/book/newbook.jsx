import React, {Component} from "react";
import BookDataService from './../../services/book-header.js';
import {useParams, Link, NavLink} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default class newBook extends Component{

    constructor(props){
        super(props);
        this.postNewBook = this.postNewBook.bind(this);

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
            newBookInfo:{
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


    //take isbn input
    onChangeISBN(e){
        let isbn = e.target.value;
        this.setState(function(prevState) {
            return {
                newBookInfo: {
                ...prevState.newBookInfo,
                b_isbn: isbn
                }
            };
        });
    }

    onChangeBookName(e){
        let bookname = e.target.value;
        this.setState(function(prevState) {
            return {
                newBookInfo: {
                ...prevState.newBookInfo,
                bookname: bookname
                }
            };
        });
    }

    onChangeAuthorfname(e){
        let authorfname = e.target.value;
        this.setState(function(prevState) {
            return {
                newBookInfo: {
                ...prevState.newBookInfo,
                authorfname: authorfname
                }
            };
        });
    }

    onChangeAuthorLname(e){
        let authorlname = e.target.value;
        this.setState(function(prevState) {
            return {
                newBookInfo: {
                ...prevState.newBookInfo,
                authorlname : authorlname
                }
            };
        });
    }

    onChangeGenre(e){
        let genre = e.target.value;
        this.setState(function(prevState) {
            return {
                newBookInfo: {
                ...prevState.newBookInfo,
                    genre: genre 
                }
            };
        });
    }

    onChangeNumPages(e){
        let numpages = e.target.value;
        this.setState(function(prevState) {
            return {
                newBookInfo: {
                ...prevState.newBookInfo,
                numpages  : numpages
                }
            };
        });
    }

    onChangePrice(e){
        let price = e.target.value;
        this.setState(function(prevState) {
            return {
                newBookInfo: {
                ...prevState.newBookInfo,
                price  : price
                }
            };
        });
    }

    onChangeQuantity(e){
        let quantity = e.target.value;
        this.setState(function(prevState) {
            return {
                newBookInfo: {
                ...prevState.newBookInfo,
                quantity : quantity
                }
            };
        });
    }

    onChangePublisherName(e){
        let publishername= e.target.value;
        this.setState(function(prevState) {
            return {
                newBookInfo: {
                ...prevState.newBookInfo,
                publishername : publishername
                }
            };
        });
    }


    onChangeYearPub(e){
        let yearpub = e.target.value;
        this.setState(function(prevState) {
            return {
                newBookInfo: {
                ...prevState.newBookInfo,
                yearpub : yearpub
                }
            };
        });
    }

    onChangeMonthPub(e){
        let monthpub = e.target.value;
        this.setState(function(prevState) {
            return {
                newBookInfo: {
                ...prevState.newBookInfo,
                monthpub : monthpub 
                }
            };
        });
    }


    onChangeDayPub(e){
        let daypub = e.target.value;
        this.setState(function(prevState) {
            return {
                newBookInfo: {
                ...prevState.newBookInfo,
                daypub: daypub
                }
            };
        });
    }

    //update the book if update button is clicked
    postNewBook(){
        let data =this.state.newBookInfo;
        BookDataService.create(data)
        .then (response => {
            console.log(response)
            this.setState({
                successful:true,
                message:response.data.message
            })
            window.setTimeout(function(){

                // Move to a request history
                window.location.href = "/owner";
        
            }, 2000);
        })
        .catch(err => {
            console.log(err)
            this.setState({
                successful:false,
                message:err.response.data.message
            })
            
        });
    }

    render(){

        const {newBookInfo} = this.state;

        return(
            <div>
                <div className="centerText">
                    <NavLink to={"/owner" }>Back</NavLink>
                    <br/>
                    <NavLink to="/authors/newAuthor"> Create New Author</NavLink>
                    <br/>
                    <NavLink to="/publishers/newPublisher"> Create New Publisher</NavLink>
                </div>

                <div className="center">

                    <h2>New Book</h2>

                    <h3>ISBN <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="ISBN"
                    value={newBookInfo.b_isbn}
                    onChange={this.onChangeISBN}
                    />

                    <h3>Book Name <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Book Name"
                    value={newBookInfo.bookname}
                    onChange={this.onChangeBookName}
                    />

                    <h3>Author First Name <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Author First Name"
                    value={newBookInfo.authorfname}
                    onChange={this.onChangeAuthorfname}
                    />

                    <h3>Author Last Name <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Author Last Name"
                    value={newBookInfo.authorlname}
                    onChange={this.onChangeAuthorLname}
                    />

                    <h3>Publisher Name </h3>
                        <input
                        type="text"
                        style={{'maxWidth':'100%'}}
                        placeholder="Publisher name"
                        value={newBookInfo.publishername}
                        onChange={this.onChangePublisherName}
                        />

                    <h3>Genre <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Genre"
                    value={newBookInfo.genre}
                    onChange={this.onChangeGenre}
                    />

                    <h3>Number of pages<span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Number of Pages"
                    value={newBookInfo.numpages}
                    onChange={this.onChangeNumPages}
                    />

                    <h3>Price <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Price"
                    value={newBookInfo.price}
                    onChange={this.onChangePrice}
                    />

                    <h3>Quantity <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Quantity"
                    value={newBookInfo.quantity}
                    onChange={this.onChangeQuantity}
                    />

                    <h3>Year Published <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Year"
                    value={newBookInfo.yearpub}
                    onChange={this.onChangeYearPub}
                    />

                    <h3>Month Published<span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Month"
                    value={newBookInfo.monthpub}
                    onChange={this.onChangeMonthPub}
                    />

                    <h3>Day Published<span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Day"
                    value={newBookInfo.daypub}
                    onChange={this.onChangeDayPub}
                    />


                    <br/>
                    <br/>

                    <Button variant="primary" type="submit" id="button" onClick={this.postNewBook}>
                        Submit
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
        )
    }
}
