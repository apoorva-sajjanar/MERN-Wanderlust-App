import React, { Component } from "react";
import axios from "axios";
import {backendUrlUser,backendUrlPackage,backendUrlBooking} from '../BackendURL';


class HotDeals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotDeals: [],
            errorMessage: "",
            loadBook:false
        }
    }

    getHotDeals = () => {
        axios.get(backendUrlPackage+'/hotDeals')
            .then(response => {
                this.setState({ hotDeals: response.data, errorMessage: null })
            }).catch(error => {
                this.setState({ errorMessage: error.message, hotDeals: null })
            })
    }

    getitenary = (hotDeal) => {
        console.log(hotDeal);
    }

    loadBookingPage = (destId) => {
        console.log(destId);
        if (sessionStorage.getItem('userId')) {
            this.setState({ loadBook: true })
        }
    }

    displayHotDeals = () => {
        let hotDealsArray = [];
        for (let hotDeal of this.state.hotDeals) {
            let element = (
                <div className="container" key={hotDeal.destinationId}>
                    <div className="row align-items-center no-gutters mb-4 mb-lg-5">
                        <div className="col-md-5">
                            <div className="image">
                                <img className="img-fluid mb-3 mb-lg-0" src="../assets/aus1" alt="" />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="featured-text text-center text-lg-left">
                                <h4>{hotDeal.name}</h4><span className="discount text-danger">{hotDeal.discount}% Instant Discount</span>
                                <p className="text-dark mb-0">{hotDeal.details.about}</p>
                            </div><br />
                            <button className="btn btn-primary book" onClick={() => this.getitenary(hotDeal)}>Check Itenary</button>
                            <button className="btn btn-primary book" onClick={() => this.loadBookingPage(hotDeal.destinationId)}>Book</button>
                        </div>
                    </div>
                </div >
            );
            hotDealsArray.push(element);
        }
        return hotDealsArray;
    }

    componentDidMount() {
        this.getHotDeals();
    }
    render() {
        return (
            <div>
                {/* <!-- hot deals normal list display --> */}
                <div className="row destination card">  {/* *ngIf="!bookingPage" */}
                    {this.displayHotDeals()}
                </div >
            </div >
        )
    }
}

export default HotDeals;