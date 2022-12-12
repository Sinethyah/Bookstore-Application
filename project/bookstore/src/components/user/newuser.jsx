import React, {Component} from "react";
import UserDataService from './../../services/user-header.js';
import {useParams, Link, NavLink} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default class newUser extends Component{

    constructor(props){
        super(props);
        this.postNewUser = this.postNewUser.bind(this);

        this.onChangeUserfname = this.onChangeUserfname.bind(this);
        this.onChangeUserLname = this.onChangeUserLname.bind(this);
        this.onChangeBAddress = this.onChangeBAddress.bind(this);
        this.onChangeSAddress = this.onChangeSAddress.bind(this);
        this.onChangePhoneNum = this.onChangePhoneNum.bind(this);
        this.onChangeBankName = this.onChangeBankName.bind(this);
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        


        this.state={
            newUserInfo:{
                Userfname:"",
                Userlname:"",
                BAddress:"",
                SAddress:"",
                PhoneNum:"",
                bankName:"",
                cardNumber:""
            },
            successful:false,
            message:""
            
        }
    }


    onChangeUserfname(e){
        let Userfname = e.target.value;
        this.setState(function(prevState) {
            return {
                newUserInfo: {
                ...prevState.newUserInfo,
                Userfname: Userfname
                }
            };
        });
    }

    onChangeUserLname(e){
        let Userlname = e.target.value;
        this.setState(function(prevState) {
            return {
                newUserInfo: {
                ...prevState.newUserInfo,
                Userlname : Userlname
                }
            };
        });
    }

    onChangeBAddress(e){
        let BAddress = e.target.value;
        this.setState(function(prevState) {
            return {
                newUserInfo: {
                ...prevState.newUserInfo,
                    BAddress: BAddress 
                }
            };
        });
    }

    onChangeSAddress(e){
        let SAddress = e.target.value;
        this.setState(function(prevState) {
            return {
                newUserInfo: {
                ...prevState.newUserInfo,
                SAddress  : SAddress
                }
            };
        });
    }

    onChangePhoneNum(e){
        let PhoneNum = e.target.value;
        this.setState(function(prevState) {
            return {
                newUserInfo: {
                ...prevState.newUserInfo,
                PhoneNum  : PhoneNum
                }
            };
        });
    }

    onChangeBankName(e){
        let bankName = e.target.value;
        this.setState(function(prevState) {
            return {
                newUserInfo: {
                ...prevState.newUserInfo,
                bankName : bankName
                }
            };
        });
    }

    onChangeCardNumber(e){
        let cardNumber = e.target.value;
        this.setState(function(prevState) {
            return {
                newUserInfo: {
                ...prevState.newUserInfo,
                cardNumber : cardNumber
                }
            };
        });
    }


    
    //post the User if update button is clicked
    postNewUser(){
        let data =this.state.newUserInfo;
        UserDataService.create(data)
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

        const {newUserInfo} = this.state;

        return(
            <div>
                <div className="centerText">
                    <NavLink to={"/owner" }>Back to Main Home Page</NavLink>
                </div>

                <div className="center">

                    <h2>New User</h2>

                    <h3>User First Name <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="User First Name"
                    value={newUserInfo.Userfname}
                    onChange={this.onChangeUserfname}
                    />

                    <h3>User Last Name</h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="User Last Name"
                    value={newUserInfo.Userlname}
                    onChange={this.onChangeUserLname}
                    />

                    <h3>Billing Address </h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Billing Address"
                    value={newUserInfo.BAddress}
                    onChange={this.onChangeBAddress}
                    />

                    <h3>Shipping Address</h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Shipping Address"
                    value={newUserInfo.SAddress}
                    onChange={this.onChangeSAddress}
                    />


                    <h3>PhoneNum</h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="PhoneNum"
                    value={newUserInfo.PhoneNum}
                    onChange={this.onChangePhoneNum}
                    />

                    <h3>Bank Name <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Bank Name"
                    value={newUserInfo.bankName}
                    onChange={this.onChangeBankName}
                    />

                    <h3>Card Number <span style={{'color':'red'}}>*</span></h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="Card Number"
                    value={newUserInfo.cardNumber}
                    onChange={this.onChangeCardNumber}
                    />



                    <br/>
                    <br/>

                    <Button variant="primary" type="submit" id="button" onClick={this.postNewUser}>
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
