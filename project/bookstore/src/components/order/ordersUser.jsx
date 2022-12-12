import React, {Component} from "react";
import OrderDataService from './../../services/order-header'
import { Link, NavLink } from "react-router-dom";
import add from './../add.png'
import remove from './../remove.png'


export default class OrdsUser extends Component{

    constructor(props){
        super(props);
        this.searchOrdersForUser = this.searchOrdersForUser.bind(this);
        

        this.state = {
            currentuser: sessionStorage.getItem("currentuser"),
            allorders:[]
            
        };

    }

    componentDidMount(){
        this.searchOrdersForUser();
    }


    searchOrdersForUser() {
        console.log(this.state.currentuser);
        OrderDataService.showOrdersOfUser(this.state.currentuser)
        .then(response => {
            this.setState({
                allorders:response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    
    render(){

        const {currentuser, allorders} = this.state;

        return(
            <div>

            {currentuser ? (
                <div className="center">
                <NavLink to={"/user" }>Back to User Home Page</NavLink>
                <br/>
    
            
    
                <table className="table table-bordered" width="75%" >
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Order</th>
                            
    
                        </tr>
                    </thead>
                    
                    <tbody>
                    {allorders &&
                        allorders.map((order, index) => (
                        <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td><NavLink to={"/orders/"+order.orderid+"/"+order.bookid}>{order.orderid}</NavLink></td>
                        
                        </tr>
                        ))}
                    </tbody>
                </table>
    
                
                </div>

            )
            : (
                <div>
                    <p className="center">You are not signed in as a User. 
                    You are given access as an Owner.
                    Click here to view orders of your customers 
                    <NavLink to="/orders">Here</NavLink></p>
            

            </div>
        )
    }
    </div>
        )
}}
