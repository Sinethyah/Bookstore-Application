import React, { Component } from 'react';
import OrderDataService from './../../services/order-header'
import {useParams, Link, NavLink} from 'react-router-dom'
import {Button} from 'react-bootstrap'

class Order extends Component{

    constructor(props){
        super(props);
        this.searchOrder = this.searchOrder.bind(this);

        this.state={
            order:"",
            
        }
    }

    componentDidMount(){

        const {orderid, bookid} = this.props.params;
        console.log(this.props.params);
        this.searchOrder(orderid, bookid);
    }

    searchOrder(orderid, bookid){
        OrderDataService.get(orderid, bookid)
        .then(response =>{
            this.setState({
                order:response.data,
                
            })
        })
        .catch(err => {
            console.log(err)
            
        })
    }

    

    render(){

        const {order} = this.state;
        return(
            <div>
                <div className='center'>

                    <NavLink to="/orders" >Back To Orders Page</NavLink>
                    <h3>Order ID </h3>
                    <p>{order.orderid}</p>
                    <h3>User First Name</h3>
                    <p>{order.userfname}</p>
                    <h3>User Last Name</h3>
                    <p>{order.userlname}</p>
                    <h3>Book Name</h3>
                    <p>{order.bookname}</p>
                    <h3>Author</h3>
                    <p>{order.authorfname} {order.authorlname}</p>
                    <h3>Quantity Ordereed</h3>
                    <p>{order.quantity}</p>
                    <h3>Amount Paid</h3>
                    <p>{order.priceord}</p>
                    <h3>Date Ordered</h3>
                    <p>{order.dateord}</p>
                </div>

                <div>
                </div>
            </div>
        )
    }


}

export default (props) => (
    <Order
        {...props}
        params={useParams()}
    />
); 