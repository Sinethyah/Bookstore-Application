import React, {Component} from "react";
import OrderDataService from './../../services/order-header'
import { Link, NavLink } from "react-router-dom";
import add from './../add.png'
import remove from './../remove.png'


export default class reportList extends Component{

    constructor(props){
        super(props);
        this.getPublisherSaleReport = this.getPublisherSaleReport.bind(this);
    

        this.state = {
            currentuser: sessionStorage.getItem("currentuser"),
            report:[]
        };

    }

    componentDidMount(){
        this.getPublisherSaleReport();
    }

    getPublisherSaleReport() {
        OrderDataService.showPublisherSaleReport()
        .then(response => {
            this.setState({
                report: response.data
            });
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        });
    }

    render(){

        const {currentuser, report} = this.state;

        return(
            <div>

            {!currentuser ? (
                <div className="center">
                <NavLink to={"/owner" }>Back to Owner Page</NavLink>
                <br/>
    
                <h4>Sales Per Publisher</h4>
                <table className="table table-bordered" width="75%" >
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Publisher</th>
                            <th scope="col">Sales in quantity</th>
                            
    
                        </tr>
                    </thead>
                    
                    <tbody>
                    {report &&
                        report.map((r, index) => (
                        <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{r.pname}</td>
                        <td>{r.quantitysum}</td>

                        </tr>
                        ))}
                    </tbody>
                </table>
    
                </div>


            )
            : (
                <div className="center">
                    <NavLink to={"/report/reportummary/"+currentuser}>You are logged in as a user. You can view your order history here. </NavLink>
            </div>

            )}
            

            </div>
        )
    }
}