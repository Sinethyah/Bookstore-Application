import React, {Component} from "react";
import UserDataService from './../../services/user-header.js';
import {useParams, Link, NavLink} from 'react-router-dom'
import {Button} from 'react-bootstrap'

class SingleUser extends Component{

    constructor(props){
        super(props);
        this.searchUser = this.searchUser.bind(this);
        this.updateUser = this.updateUser.bind(this);

        this.onChangeUserfname = this.onChangeUserfname.bind(this);
        this.onChangeUserLname = this.onChangeUserLname.bind(this);
        this.onChangeBAddress = this.onChangeBAddress.bind(this);
        this.onChangeSAddress = this.onChangeSAddress.bind(this);
        this.onChangePhoneNum = this.onChangePhoneNum.bind(this);
        this.onChangeBankName = this.onChangeBankName.bind(this);
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        


        this.state={
            user:"",
            newUserInfo:{
                userID:"",
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

    //retrieves book of this id
    componentDidMount(){
        let {id} = this.props.params;
        this.searchUser(id);
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


    
    //search user with the following id
    searchUser(id){
        UserDataService.get(id)
        .then(response =>{
            this.setState({
                user:response.data,
                newUserInfo:{
                    userID:response.data.userid,
                    Userfname:response.data.userfname,
                    Userlname:response.data.userlname,
                    BAddress:response.data.baddress,
                    SAddress:response.data.saddress,
                    PhoneNum:response.data.phonenum,
                    bankName: response.data.bankname,
                    cardNumber: response.data.cardnumber
                }
                
            })
        })
        .catch(err => console.log(err))
    }

    //update the user if update button is clicked
    updateUser(){
        let data =this.state.newUserInfo;
        UserDataService.update(this.state.newUserInfo.userID, data)
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

        const {newUserInfo} = this.state;

        return(
            <div>
                <div className="centerText">
                    <NavLink to={"/" }>Back to Main Home Page</NavLink>
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

                    <h3>BAddress</h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="BAddress"
                    value={newUserInfo.BAddress}
                    onChange={this.onChangeBAddress}
                    />

                    <h3>SAddress</h3>
                    <input
                    type="text"
                    style={{'maxWidth':'100%'}}
                    placeholder="SAddress"
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

                    <Button variant="primary" type="submit" id="button" onClick={this.updateUser}>
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
    <SingleUser
        {...props}
        params={useParams()}
    />
); 
