import React, {Component} from "react";
import OrderDataService from './../../services/order-header'
import { Link, NavLink } from "react-router-dom";
import add from './../add.png'
import remove from './../remove.png'


export default class reportList extends Component{

    constructor(props){
        super(props);
        this.getGenreSaleReport = this.getGenreSaleReport.bind(this);
    

        this.state = {
            currentuser: sessionStorage.getItem("currentuser"),
            report:[]
        };

    }

    componentDidMount(){
        this.getGenreSaleReport();
    }

    getGenreSaleReport() {
        OrderDataService.showGenreSaleReport()
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
                <NavLink to={"/owner" }>Back to Owner Home Page</NavLink>
                <br/>
    
                <h4>Sales Per Genre</h4>
                <table className="table table-bordered" width="75%" >
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Genre</th>
                            <th scope="col">Sales in quantity</th>
                            
    
                        </tr>
                    </thead>
                    
                    <tbody>
                    {report &&
                        report.map((r, index) => (
                        <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{r.genre}</td>
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