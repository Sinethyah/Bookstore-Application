import React, {Component} from "react";
import AuthorDataService from './../../services/author-header'
import { Link, NavLink } from "react-router-dom";


export default class authorsList extends Component{

    constructor(props){
        super(props);
        this.onChangeSearchAuthorfname = this.onChangeSearchAuthorfname.bind(this);
        this.onChangeSearchAuthorlname = this.onChangeSearchAuthorlname.bind(this);
        this.searchAuthor= this.searchAuthor.bind(this);

        this.state = {
            authors: [],
            searchAuthorfname: "",
            searchAuthorlname:"",
            message:""
        };

    }

    onChangeSearchAuthorfname(e) {
        const searchAuthorfname = e.target.value;
        this.setState({
            searchAuthorfname: searchAuthorfname
        });
    }

    onChangeSearchAuthorlname(e) {
        const searchAuthorlname = e.target.value;
        this.setState({
            searchAuthorlname: searchAuthorlname
        });
    }


    searchAuthor(){
        AuthorDataService.findByAuthorFullName(this.state.searchAuthorfname, this.state.searchAuthorlname)
        .then(response => {
            this.setState({
                authors: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
            this.setState({
                message: e.response.data.message
            })

        });
    }

    render(){

        const { searchAuthorfname, searchAuthorlname, authors} = this.state;

        return(
            <div>

            <div className="center">
            <NavLink to={"/owner" }>Back</NavLink>
            <h4>Search for authors with Author First Name or Last Name or both </h4>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    style={{'maxWidth':'100%'}}
                    placeholder="Author's First Name"
                    value={searchAuthorfname}
                    onChange={this.onChangeSearchAuthorfname}
                />

                <input
                    type="text"
                    className="form-control"
                    style={{'maxWidth':'100%'}}
                    placeholder="Author's Last Name"
                    value={searchAuthorlname}
                    onChange={this.onChangeSearchAuthorlname}
                />

                <div className="input-group-append">
                <button className="input-group-text"
                    onClick={this.searchAuthor}>
                        Search
                        </button>
                </div>

                <br />            
            </div>

            

            <table className="table table-bordered" width="75%" >
                <thead>
                    <tr>
                        <th></th>
                        <th scope="col">Author Name</th>
                        <th scope="col">Country</th>


                    </tr>
                </thead>
                
                <tbody>
                {authors &&
                    authors.map((author, index) => (
                    <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{<NavLink to={"/authors/" + author.authorid }>{author.authorfname} {author.authorlname}</NavLink>}</td>
                    <td>{author.country}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>

            </div>
        )
    }
}