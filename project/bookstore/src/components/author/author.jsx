import React, { Component } from 'react';
import AuthorDataService from './../../services/author-header'
import {useParams, Link, NavLink} from 'react-router-dom'
import {Button} from 'react-bootstrap'

class Author extends Component{

    constructor(props){
        super(props);
        this.searchAuthor = this.searchAuthor.bind(this);
        this.updateAuthor = this.updateAuthor.bind(this);
        this.onChangeAuthorFname = this.onChangeAuthorFname.bind(this);
        this.onChangeAuthorlname = this.onChangeAuthorlname.bind(this);
        this.onChangeAuthorCountry = this.onChangeAuthorCountry.bind(this);

        this.state={
            id:"",
            author:"",
            authorfname:"",
            authorlname:"",
            country:"",
            successful:"",
            message:""
        }
    }

    componentDidMount(){

        const {id} = this.props.params;
        this.searchAuthor(id);
    }

    searchAuthor(id){
        AuthorDataService.get(id)
        .then(response =>{
            this.setState({
                author:response.data,
                id: response.data.authorid,
                authorfname: response.data.authorfname, 
                authorlname: response.data.authorlname,
                country: response.data.country
            })
        })
        .catch(err => {
            console.log(err)
            
        })
    }

    updateAuthor(){
        let data= {authorid:this.state.id,authorfname: this.state.authorfname, authorlname: this.state.authorlname, country:
        this.state.country}
        AuthorDataService.update(this.state.id, data)
        .then(response =>{
            this.setState({
                message:response.data.message,
                successful:true
            })
        })
        .catch(err => this.setState({
            successful:false,
            message: err.response.data.message
        }))
    }

    onChangeAuthorFname(e){
        let authorfname = e.target.value;
        this.setState({
            authorfname:authorfname
        })
    }

    onChangeAuthorlname(e){
        let authorlname = e.target.value;
        this.setState({
            authorlname:authorlname
        })
    }

    onChangeAuthorCountry(e){
        let country = e.target.value;
        this.setState({
            country:country
        })
    }

    render(){

        const {author, authorfname, authorlname, country} = this.state;
        return(
            <div>
                <div className='center'>

                    <NavLink to="/owner" >Back To Owner</NavLink>
                    <h3>Author Name: </h3>
                    <p>{author.authorfname} {author.authorlname}</p>
                    <h3>Country of Origin</h3>
                    <p>{author.country}</p>
                </div>

                <div>
                <div className="center">

                    <h2>Edit Author</h2>

                    <h3>Author First Name </h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Author First Name"
                    value={authorfname}
                    onChange={this.onChangeAuthorFname}
                    />

                    <h3>Author Last Name </h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Author First Name"
                    value={authorlname}
                    onChange={this.onChangeAuthorlname}
                    />

                    <h3>Country</h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Author First Name"
                    value={country}
                    onChange={this.onChangeAuthorCountry}
                    />

                    <Button variant="primary" type="submit" id="button" onClick={this.updateAuthor}>
                        Update
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
            </div>
        )
    }


}

export default (props) => (
    <Author
        {...props}
        params={useParams()}
    />
); 