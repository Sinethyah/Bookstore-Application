import React, {Component} from "react";
import AuthorDataService from './../../services/author-header';
import {useParams, Link, NavLink} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default class newAuthorpostNewAuthor extends Component{

    constructor(props){
        super(props);
        this.postNewAuthor = this.postNewAuthor.bind(this);

        this.onChangeAuthorfname = this.onChangeAuthorfname.bind(this);
        this.onChangeAuthorLname = this.onChangeAuthorLname.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);

        


        this.state={
            newAuthorInfo:{
                authorfname :"",
                authorlname:"",
                country:""
            },
            successful:false,
            message:""
            
        }
    }


    //take Country input
    onChangeCountry(e){
        let country = e.target.value;
        this.setState(function(prevState) {
            return {
                newAuthorInfo: {
                ...prevState.newAuthorInfo,
                country: country
                }
            };
        });
    }


    onChangeAuthorfname(e){
        let authorfname = e.target.value;
        this.setState(function(prevState) {
            return {
                newAuthorInfo: {
                ...prevState.newAuthorInfo,
                authorfname: authorfname
                }
            };
        });
    }

    onChangeAuthorLname(e){
        let authorlname = e.target.value;
        this.setState(function(prevState) {
            return {
                newAuthorInfo: {
                ...prevState.newAuthorInfo,
                authorlname : authorlname
                }
            };
        });
    }

    //post new author
    postNewAuthor(){
        let data =this.state.newAuthorInfo;
        AuthorDataService.create(data)
        .then (response => {
            console.log(response)
            this.setState({
                successful:true,
                message:response.data.message
            })
            window.setTimeout(function(){

                // Move to a request history
                window.location.href = "/";
        
            }, 2000);
        })
        .catch(err => {
            console.log(err)
            this.setState({
                successful:false,
                message:err.response.data.message
            })
            
        });
    }

    render(){

        const {newAuthorInfo} = this.state;

        return(
            <div>
                <div className="centerText">
                    <NavLink to={"/owner" }>Back</NavLink>
                </div>

                <div className="center">

                    <h2>New Author</h2>

                    <h3>Author First Name <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Author First Name"
                    value={newAuthorInfo.authorfname}
                    onChange={this.onChangeAuthorfname}
                    />

                    <h3>Author Last Name <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Author Last Name"
                    value={newAuthorInfo.authorlname}
                    onChange={this.onChangeAuthorLname}
                    />

                    <h3>Country <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Country"
                    value={newAuthorInfo.country}
                    onChange={this.onChangeCountry}
                    />

                    <br/>
                    <br/>

                    <Button variant="primary" type="submit" id="button" onClick={this.postNewAuthor}>
                        Submit
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
        )
    }
}
