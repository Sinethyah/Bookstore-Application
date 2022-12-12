import React, { Component } from "react";
import { NavLink } from "react-router-dom";


export default class Home extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    
    render() {

        
        return (
            <div className="center">
                <h3>If you are the Owner, click on the link below</h3>
                <NavLink to="/owner"> Owner </NavLink>
                <br/>
                <br/>
                <h3>If you are new to this application and want to use it as a User instead, first register</h3>
                <NavLink to="/users/newUser"> Create New User</NavLink>
                <br/>
                <h3>If you are an already existing User, click on the link below</h3>
                <NavLink to="/user"> User </NavLink>
                
            </div>
        );
    }
}