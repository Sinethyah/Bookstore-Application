import React, {Component} from "react";
import OrderDataService from './../../services/order-header'
import { Link, NavLink } from "react-router-dom";
import add from './../add.png'
import remove from './../remove.png'


export default class OrdersList extends Component{

    constructor(props){
        super(props);
        this.onChangeSearchOrdId = this.onChangeSearchOrdId.bind(this);
        this.searchOrderByOrdId = this.searchOrderByOrdId.bind(this);
    




        this.state = {
            currentuser: sessionStorage.getItem("currentuser"),
            orders:[]
        };

    }



    onChangeSearchOrdId(e) {
        const searchOrdId = e.target.value;
        this.setState({
            searchOrdId: searchOrdId
        });
        console.log(this.state.searchOrdId)
    }

    searchOrderByOrdId() {
        console.log(this.state.searchOrdId);
        OrderDataService.searchByUserOrdId(this.state.searchOrdId)
        .then(response => {
            this.setState({
                orders: response.data
            });
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        });
    }

    render(){

        const {searchOrdId, currentuser, orders} = this.state;

        return(
            <div>

            {!currentuser ? (
                <div className="center">
                <NavLink to={"/owner" }>Back to Owner Home Page</NavLink>
                <br/>
    
                <h4>Search for Orders with OrdId</h4>
                <div className="input-group">
    
                    <input
                        type="text"
                        className="form-control"
                        style={{'maxWidth':'100%'}}
                        placeholder="OrdId"
                        value={searchOrdId}
                        onChange={this.onChangeSearchOrdId}
                    />
    
                
    
                    <div className="input-group-append">
                    <button className="input-group-text"
                        onClick={this.searchOrderByOrdId}>
                            Search
                            </button>
                    </div>
    
                    <br />            
                </div>
    
                
    
                <table className="table table-bordered" width="75%" >
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">OrdId</th>
                            <th scope="col">Book Name</th>
                            <th scope="col">User Name</th>
                            
    
                        </tr>
                    </thead>
                    
                    <tbody>
                    {orders &&
                        orders.map((order, index) => (
                        <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{<NavLink to={"/orders/" +order.orderid +"/" +order.bookid }>{order.orderid}</NavLink>}</td>
                        <td>{order.bookname}</td>
                        <td>{order.userfname} {order.userlname}</td>

                        </tr>
                        ))}
                    </tbody>
                </table>
    
                </div>


            )
            : (
                <div className="center">
                    <NavLink to={"/orders/ordersummary/"+currentuser}>You are logged in as a user. You can view your order history here.</NavLink>
            </div>

            )}
            

            </div>
        )
    }
}