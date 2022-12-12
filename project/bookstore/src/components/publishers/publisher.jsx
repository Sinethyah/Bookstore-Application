import React, {Component} from "react";
import PublisherDataService from './../../services/publisher-header.js';
import {useParams, Link, NavLink} from 'react-router-dom'
import {Button} from 'react-bootstrap'

class Singlepublisher extends Component{

    constructor(props){
        super(props);
        this.searchpublisher = this.searchpublisher.bind(this);
        this.updatePublisher = this.updatePublisher.bind(this);

        this.onChangepName = this.onChangepName.bind(this);
        this.onChangepAddress = this.onChangepAddress.bind(this);
        this.onChangepEmail = this.onChangepEmail.bind(this);
        this.onChangephoneNum = this.onChangephoneNum.bind(this);
        this.onChangeBankName = this.onChangeBankName.bind(this);
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        


        this.state={
            publisher:"",
            newPublisherInfo:{
                pid:"",
                pName:"",
                pAddress:"",
                pEmail:"",
                phoneNum:"",
                bankName:"",
                cardNumber:""
            },
            successful:false,
            message:""
            
        }
    }

    //retrieves book of this id
    componentDidMount(){
        let {id} = this.props.params;
        this.searchpublisher(id);
    }


    onChangepName(e){
        let pName = e.target.value;
        this.setState(function(prevState) {
            return {
                newPublisherInfo: {
                ...prevState.newPublisherInfo,
                pName: pName
                }
            };
        });
    }

    onChangepAddress(e){
        let pAddress = e.target.value;
        this.setState(function(prevState) {
            return {
                newPublisherInfo: {
                ...prevState.newPublisherInfo,
                pAddress : pAddress
                }
            };
        });
    }

    onChangepEmail(e){
        let pEmail = e.target.value;
        this.setState(function(prevState) {
            return {
                newPublisherInfo: {
                ...prevState.newPublisherInfo,
                    pEmail: pEmail 
                }
            };
        });
    }

    onChangephoneNum(e){
        let phoneNum = e.target.value;
        this.setState(function(prevState) {
            return {
                newPublisherInfo: {
                ...prevState.newPublisherInfo,
                phoneNum  : phoneNum
                }
            };
        });
    }


    onChangeBankName(e){
        let bankName = e.target.value;
        this.setState(function(prevState) {
            return {
                newPublisherInfo: {
                ...prevState.newPublisherInfo,
                bankName : bankName
                }
            };
        });
    }

    onChangeCardNumber(e){
        let cardNumber = e.target.value;
        this.setState(function(prevState) {
            return {
                newPublisherInfo: {
                ...prevState.newPublisherInfo,
                cardNumber : cardNumber
                }
            };
        });
    }


    
    //search publisher with the following id
    searchpublisher(id){
        PublisherDataService.get(id)
        .then(response =>{
            console.log(response.data)
            this.setState({
                publisher:response.data,
                newPublisherInfo:{
                    pid:response.data.publisherid,
                    pName:response.data.pname,
                    pAddress:response.data.paddress,
                    pEmail:response.data.pemail,
                    phoneNum:response.data.phonenum,
                    bankName: response.data.bankname,
                    cardNumber: response.data.cardnumber
                }
                
            })
        })
        .catch(err => console.log(err))
    }

    //update the publisher if update button is clicked
    updatePublisher(){
        let data =this.state.newPublisherInfo;
        PublisherDataService.update(this.state.newPublisherInfo.publisherid, data)
        .then (response => {
            console.log(response)
            this.setState({
                successful:true,
                message:response.data.message
            })
            window.setTimeout(function(){

                // Move to a request history
                window.location.href = window.location.href;
        
            }, 2000);
        })
        .catch(err => {
            this.setState(
                {
                    successful:false,
                    message:err.response.data.message
                }
            )
        });
    }

    render(){

        const {newPublisherInfo} = this.state;

        return(
            <div>
                <div className="centerText">
                    <NavLink to={"/owner" }>Back to Owner Home Page</NavLink>
                </div>

                <div className="center">

                    <h2>New publisher</h2>

                    <h3>publisher First Name <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Publisher First Name"
                    value={newPublisherInfo.pName}
                    onChange={this.onChangepName}
                    />

                    <h3>Publisher Address</h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Publisher Address"
                    value={newPublisherInfo.pAddress}
                    onChange={this.onChangepAddress}
                    />

                    <h3>pEmail</h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="pEmail"
                    value={newPublisherInfo.pEmail}
                    onChange={this.onChangepEmail}
                    />

                    <h3>PhoneNum</h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="phoneNum"
                    value={newPublisherInfo.phoneNum}
                    onChange={this.onChangephoneNum}
                    />


                    <h3>Bank Name <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Bank Name"
                    value={newPublisherInfo.bankName}
                    onChange={this.onChangeBankName}
                    />

                    <h3>Card Number <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Card Number"
                    value={newPublisherInfo.cardNumber}
                    onChange={this.onChangeCardNumber}
                    />



                    <br/>
                    <br/>

                    <Button variant="primary" type="submit" id="button" onClick={this.updatePublisher}>
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

export default (props) => (
    <Singlepublisher
        {...props}
        params={useParams()}
    />
); 
