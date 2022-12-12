import React, {Component} from "react";
import UserDataService from './../../services/user-header'
import { Link, NavLink } from "react-router-dom";


export default class UsersList extends Component{

    constructor(props){
        super(props);
        this.onChangeSearchUserfname = this.onChangeSearchUserfname.bind(this);
        this.onChangeSearchUserlname = this.onChangeSearchUserlname.bind(this);
        this.searchuser = this.searchuser.bind(this);

        this.state = {
            users: [],
            searchUserfname: "",
            searchUserlname:""
        };

    }

    onChangeSearchUserfname(e) {
        const searchUserfname = e.target.value;
        this.setState({
            searchUserfname: searchUserfname
        });
    }

    onChangeSearchUserlname(e) {
        const searchUserlname = e.target.value;
        this.setState({
            searchUserlname: searchUserlname
        });
    }


    searchuser(){
        UserDataService.findByUserFullName(this.state.searchUserfname, this.state.searchUserlname)
        .then(response => {
            this.setState({
                users: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    render(){

        const { searchUserfname, searchUserlname, users} = this.state;

        return(
            <div>

            <div className="center">

            <NavLink to={"/owner" }>Back to Owner Home Page</NavLink>
            <br/>

            <h4>Search for users with User First Name or Last Name or both </h4>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    style={{'maxWidth':'100%'}}
                    placeholder="User's First Name"
                    value={searchUserfname}
                    onChange={this.onChangeSearchUserfname}
                />

                <input
                    type="text"
                    className="form-control"
                    style={{'maxWidth':'100%'}}
                    placeholder="User's Last Name"
                    value={searchUserlname}
                    onChange={this.onChangeSearchUserlname}
                />

                <div className="input-group-append">
                <button className="input-group-text"
                    onClick={this.searchuser}>
                        Search
                        </button>
                </div>

                <br />            
            </div>

            

            <table className="table table-bordered" width="75%" >
                <thead>
                    <tr>
                        <th></th>
                        <th scope="col">User Name</th>


                    </tr>
                </thead>
                
                <tbody>
                {users &&
                    users.map((user, index) => (
                    <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{<NavLink to={"/users/" + user.userid }>{user.userfname} {user.userlname}</NavLink>}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>

            </div>
        )
    }
}