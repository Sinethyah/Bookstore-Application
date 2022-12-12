import React, {Component} from "react";
import BookDataService from './../../services/book-header'
import OrderDataService from './../../services/order-header'
import { Link, NavLink } from "react-router-dom";
import add from './../add.png'
import remove from './../remove.png'


export default class BooksList extends Component{

    constructor(props){
        super(props);
        this.onChangeSearchISBN = this.onChangeSearchISBN.bind(this);
        this.searchBookByISBN = this.searchBookByISBN.bind(this);
        this.addItemToCart = this.addItemToCart.bind(this);
        this.updateOrder= this.updateOrder.bind(this);
        this.getItem = this.getItem.bind(this);
        this.removeItemFromCart = this.removeItemFromCart.bind(this);
        this.removeItemFromDatabase = this.removeItemFromDatabase.bind(this);
        this.sendOrder = this.sendOrder.bind(this);




        this.state = {
            currentuser: sessionStorage.getItem("currentuser"),
            allbooks:[],
            books: [],
            searchISBN:"",
            order:{},
            price:{}
        };

    }

    componentDidMount(){
        let order = sessionStorage.getItem("order");
        console.log(JSON.parse(order));
        if (order){
            this.setState({
                order: JSON.parse(order)
            })
        }
    }

    onChangeSearchISBN(e) {
        const searchISBN = e.target.value;
        this.setState({
            searchISBN: searchISBN
        });
        console.log(this.state.searchISBN)
    }

    searchBookByISBN() {
        console.log(this.state.searchISBN);
        BookDataService.findByISBN(this.state.searchISBN)
        .then(response => {
            this.setState({
                allbooks:response.data.allbooks,
                books: response.data.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    getItem(id){

        console.log(this.state.allbooks);
        for (let i=0; i < this.state.allbooks.length; ++i){
            console.log(this.state.allbooks[i].bookid + " "+id)
            if (this.state.allbooks[i].bookid == Number(id)){
                console.log(this.state.allbooks[i])
                return this.state.allbooks[i]
            }
        }
        return null;
    }


    addItemToCart(id){

        console.log(this.state.order)
        if (this.state.order[id]){
            this.state.order[id]+=1;
        }
        else{
            this.state.order[id]=1
        }
        this.updateOrder();
    }

    updateOrder(){

        let result = document.createElement("p");

        Object.keys(this.state.order).forEach(id =>{
            console.log(id);
            let book = this.getItem(id);
            console.log(book);
            let snippet = document.createTextNode(`${book.bookname} x ${this.state.order[id]} (${(book.price * this.state.order[id]).toFixed(2)})`);
            this.state.price[Number(id)]=(book.price * this.state.order[id]).toFixed(2)
            result.appendChild(snippet);
            result.appendChild(document.createElement("br"));
        });

        
        document.getElementById("card").innerHTML="";
        document.getElementById("card").appendChild(result);

        sessionStorage.setItem("order", JSON.stringify(this.state.order));

    }

    removeItemFromCart(id){

        if (this.state.order.hasOwnProperty(id)){
            this.state.order[id]-=1;
            console.log(this.state.order)
            if (this.state.order[id] <= 0){
                delete this.state.order[id];
            }
            this.updateOrder();
        }

    }

    removeItemFromDatabase(id){
        BookDataService.deleteFromDatabase(id)
        .then (response => {
            this.setState({
                message:response.data.message
            })
            window.setTimeout(function(){

                // Move to a request history
                window.location.href = window.location.href;
        
            }, 2000);
        })
        .catch(err => console.log(err))

    }

    //sends order to the order to update changes onto the database
    sendOrder(){
        let order = this.state.order
        let price = this.state.price;
        let currentUser = sessionStorage.getItem("currentuser")
        let data ={}
        data.order = order;
        data.currentUser = currentUser
        data.price = price
        OrderDataService.create(data)
        .then (response => {
            this.setState({
                message: response.data.message
            })
            sessionStorage.removeItem("order");

            window.setTimeout(function(){

                // Move to a request history
                window.location.href = window.location.href;
        
            }, 2000);
            
        })
        .catch(err => {
            this.setState({
                message:"Error"
            })
        })

    }


    render(){

        const {searchISBN, books, currentuser, order} = this.state;

        return(
            <div>

            {currentuser ? (
                <div className="center">
                <NavLink to={"/user" }>Back to User Home Page</NavLink>
                <br/>
    
                <h4>Search for books with ISBN</h4>
                <div class="input-group">
    
                    <input
                        type="text"
                        className="form-control"
                        style={{'maxWidth':'100%'}}
                        placeholder="ISBN"
                        value={searchISBN}
                        onChange={this.onChangeSearchISBN}
                    />
    
                    <br />
                    <NavLink to={"/books/author" }>Search By Author Name</NavLink>
                    <br />
                    <NavLink to={"/books" }>Search By Book Name</NavLink>
                    <br/>
                    <NavLink to={"/books/isbn" }>Search By ISBN</NavLink>
                    <br/>
    
                    <div className="input-group-append">
                    <button className="input-group-text"
                        onClick={this.searchBookByISBN}>
                            Search
                            </button>
                    </div>
    
                    <br />            
                </div>
    
                
    
                <table className="table table-bordered" width="75%" >
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Book Name</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Author Name</th>
                            <th scope="col">Add</th>
                            <th scope="col">Remove From Cart</th>
    
                        </tr>
                    </thead>
                    
                    <tbody>
                    {books &&
                        books.map((book, index) => (
                        <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{book.b_isbn}</td>
                        <td>{<NavLink to={"/books/" + book.bookid }>{book.bookname}</NavLink>}</td>
                        <td>{book.genre}</td>
                        <td>{book.authorfname + " "+ book.authorlname}</td>
                        <td>
                            <button onClick={() => this.addItemToCart(book.bookid)}>
                            <img src={add} alt="addbtn" style={{'height':'20px','verticalAlign':'bottom'}}/>
                            </button>
                            </td>
                        <td><button onClick={() => this.removeItemFromCart(book.bookid)}>
                            <img src={remove} alt="removebtn" style={{'height':'20px','verticalAlign':'bottom'}}/>
                            </button></td>
    
                        
                        </tr>
                        ))}
                    </tbody>
                </table>
    
                <h3>Your New/Existing Cart</h3>
                <br/>
    
                <h3>Your Cart</h3>
                <div id="card">
    
                </div>
                {order && (
                    <div>
                    <div className="form-group">
                    <button id="button" type="submit" className="btn btn-primary btn-block m-2" onClick={this.sendOrder}>Submit</button>
                    </div>
                    <div>
                        {(this.state.message!="") ? (
                            <h2>{this.state.message}</h2>
                        ): (
                            <div>
                            </div>
                        )}
                    </div>
                    </div>
                )}
                </div>


            )
            : (
                <div className="center">
            <NavLink to={"/owner" }>Back to Owner Page</NavLink>
            <br/>

            <h4>Search for books with ISBN</h4>
            <div class="input-group">

                <input
                    type="text"
                    className="form-control"
                    style={{'maxWidth':'100%'}}
                    placeholder="ISBN"
                    value={searchISBN}
                    onChange={this.onChangeSearchISBN}
                />

                <br />
                <NavLink to={"/books/author" }>Search By Author Name</NavLink>
                <br />
                <NavLink to={"/books" }>Search By Book Name</NavLink>
                <br/>
                <NavLink to={"/books/isbn" }>Search By ISBN</NavLink>
                <br/>

                <div className="input-group-append">
                <button className="input-group-text"
                    onClick={this.searchBookByISBN}>
                        Search
                        </button>
                </div>

                <br />            
            </div>

            

            <table className="table table-bordered" width="75%" >
                <thead>
                    <tr>
                        <th></th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Book Name</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Author Name</th>
                        <th scope="col">Remove From Database</th>

                        

                    </tr>
                </thead>
                
                <tbody>
                {books &&
                    books.map((book, index) => (
                    <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{book.b_isbn}</td>
                    <td>{<NavLink to={"/books/" + book.bookid }>{book.bookname}</NavLink>}</td>
                    <td>{book.genre}</td>
                    <td>{book.authorfname + " "+ book.authorlname}</td>
                    <td><button onClick={() => this.removeItemFromDatabase(book.bookid)}>
                    <img src={remove} alt="removebtn" style={{'height':'20px','verticalAlign':'bottom'}}/>
                    </button></td>
                    
                    </tr>
                    ))}
                </tbody>
                {(this.state.message!="") ? (
                        <h2>{this.state.message}</h2>
                    ): (
                        <div>
                        </div>
                )}
            </table>

            
            </div>

            )}
            

            </div>
        )
    }
}