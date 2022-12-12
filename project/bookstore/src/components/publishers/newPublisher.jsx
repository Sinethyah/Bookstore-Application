import React, {Component} from "react";
import PublisherDataService from './../../services/publisher-header.js';
import {useParams, Link, NavLink} from 'react-router-dom'
import {Button} from 'react-bootstrap'

class Singlepublisher extends Component{

    constructor(props){
        super(props);
        this.postPublisher = this.postPublisher.bind(this);

        this.onChangepName = this.onChangepName.bind(this);
        this.onChangepAddress = this.onChangepAddress.bind(this);
        this.onChangepEmail = this.onChangepEmail.bind(this);
        this.onChangePhoneNum = this.onChangePhoneNum.bind(this);
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

    onChangePhoneNum(e){
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

    postPublisher(){
            let data =this.state.newPublisherInfo;
            PublisherDataService.create(data)
            .then (response => {
                console.log(response)
                this.setState({
                    successful:true,
                    message:response.data.message
                })
                window.setTimeout(function(){
    
                    // Move to a request history
                    window.location.href = "/owner";
            
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

        const {newPublisherInfo} = this.state;

        return(
            <div>
                <div className="centerText">
                    <NavLink to={"/owner" }>Back</NavLink>
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
                    onChange={this.onChangePhoneNum}
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

                    <Button variant="primary" type="submit" id="button" onClick={this.postPublisher}>
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
