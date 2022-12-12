import React, { Component } from "react";
import { NavLink } from "react-router-dom";


export default class Owner extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    
    render() {

        
        return (
            <div className="center">
                <br/>
                <h2>Owner Home Page</h2>
                <br/>
                <NavLink to="/">Back to Home Page</NavLink>
                <br/>
                <br/>
                <h3>Books</h3>
                <NavLink to="/books/newBook"> Create New Book </NavLink>
                <br/>
                <NavLink to="/books"> View Book </NavLink>
                <br/>
                <h3>Authors</h3>
                <NavLink to="/authors/newAuthor"> Create New Author</NavLink>
                <br/>
                <NavLink to="/authors"> View Authors </NavLink>
                <h3>Users</h3>
                <NavLink to="/users"> View Users</NavLink>
                <br/>
                <h3>Publishers</h3>
                <NavLink to="/publishers/newPublisher"> Create New Publisher</NavLink>
                <br/>
                <NavLink to="/publishers"> View Publishers</NavLink>
                <br/>
                <h3>Orders</h3>
                <NavLink to="/orders">View Orders</NavLink>
                <br/>
                <h3>Reports</h3>
                <b>Users have to make some orders for the reports to be generated</b>
                <p></p>
                <NavLink to="/orders/genresalereport">Sales Per Genre Report </NavLink>
                <br/>
                <NavLink to="/orders/authorsalereport">Authors Per Genre Report </NavLink>
                <br/>
                <NavLink to="/orders/publishersalereport">Publishers Per Genre Report </NavLink>
                
            </div>
        );
    }
}