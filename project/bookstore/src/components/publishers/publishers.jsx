import React, {Component} from "react";
import PublisherDataService from './../../services/publisher-header'
import { Link, NavLink } from "react-router-dom";


export default class publishersList extends Component{

    constructor(props){
        super(props);
        this.onChangepublishername = this.onChangepublishername.bind(this);
        this.searchpublisher = this.searchpublisher.bind(this);

        this.state = {
            publishers: [],
            publishername: "",
        };

    }

    onChangepublishername(e) {
        const publishername = e.target.value;
        this.setState({
            publishername: publishername
        });
    }



    searchpublisher(){
        PublisherDataService.findByPublisherName(this.state.publishername)
        .then(response => {
            this.setState({
                publishers: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    render(){

        const { publishername, publishers} = this.state;

        return(
            <div>

            <div className="center">

            <NavLink to={"/owner" }>Back to Owner Home Page</NavLink>
            <br/>

            <h4>Search for publishers with publisher First Name or Last Name or both </h4>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    style={{'maxWidth':'100%'}}
                    placeholder="publisher's First Name"
                    value={publishername}
                    onChange={this.onChangepublishername}
                />


                <div className="input-group-append">
                <button className="input-group-text"
                    onClick={this.searchpublisher}>
                        Search
                        </button>
                </div>

                <br />            
            </div>

            

            <table className="table table-bordered" width="75%" >
                <thead>
                    <tr>
                        <th></th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Email</th>
                    

                    </tr>
                </thead>
                
                <tbody>
                {publishers &&
                    publishers.map((publisher, index) => (
                    <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{<NavLink to={"/publishers/" + publisher.publisherid }>{publisher.pname} </NavLink>}</td>
                    <td>{publisher.paddress}</td>
                    <td>{publisher.pemail}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>

            </div>
        )
    }
}