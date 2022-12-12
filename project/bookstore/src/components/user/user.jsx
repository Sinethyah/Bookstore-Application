import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UserDataService from './../../services/user-header'
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

export default class Owner extends Component {

    
    constructor(props) {
        super(props);
        this.searchUsers = this.searchUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            users:[],
            user:"",
            currentuser: sessionStorage.getItem("currentuser")
        };

        
    }

    componentDidMount(){
        this.searchUsers();
        console.log(this.state.user)
        if (this.state.user!=""){
            this.senduserselected();
        }
    }

    handleChange(e){

        let user = document.getElementById("selectuser");
        let usertext = user.options[user.selectedIndex].text;

        this.setState({
            user:usertext
        })
        //console.log(e.target.value)
        if (e.target.value){
            UserDataService.getAll(e.target.value)
            .then (response => {
                console.log("User")
            })
            .catch(err => {
                console.log(err);
            })
        }
        
        //storing which user was selected from the dropdown
        sessionStorage.setItem("currentuser",e.target.value)
        sessionStorage.getItem("currentuser")
        console.log(sessionStorage.getItem("currentuser"))
        
    }

    searchUsers(){
        UserDataService.getAll(this.state.user)
        .then( response => {
            this.setState({
                users:response.data
            })
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    
    render() {

        const {users, user} = this.state;
        
        return (
            <div className="center">
                <br/>
                <h3>Select a User</h3>
                <br/>
                <b>Select a User  </b>
                <select id="selectuser" name="user" value={this.state.selectValue} onChange={this.handleChange}>
                    {users.map((user, key) => {
                        return <option key={key} value={user.userid}>{user.userfname}</option>;
                    })}
                </select>

                {user && (
                    <div>
                        <p> User selected: {user}</p>
                        <br/>
                        <p>Click on one of the links to proceed viewing and ordering books</p>
                        <NavLink to={"/" }>Back to Main Home Page</NavLink>
                        <br/>
                        <br/>
                        <NavLink to="/books"> Search Book By Name </NavLink>
                        <br/>
                        <br/>
                        <NavLink to="/books/author"> Search Book By Author </NavLink>
                        <br/>
                        <br/>
                        <NavLink to="/books/genre"> Search Book By Genre</NavLink>
                        <br/>
                        <br/>
                        <NavLink to="/books/isbn"> Search Book By ISBN</NavLink>
                        <br/>
                        <br/>
                        <NavLink to={"/orders/orderSummary/"+ this.state.currentuser}>View your order summary</NavLink>
                    </div>
                )}


                


            </div>
        );
    }
}