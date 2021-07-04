import React, { Component } from 'react'
import { Fieldset } from 'primereact/fieldset';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputSwitch } from 'primereact/inputswitch';
import Axios from 'axios';
import {backendUrlBooking } from '../BackendURL';

export class book extends Component {
    constructor(props) {
        super(props);
        this.state = {
                bookingForm: {
                    noOfPersons: sessionStorage.getItem('noOfPersons'),
                    checkInDate: sessionStorage.getItem('checkInDate'),
                    flights: sessionStorage.getItem('flight')
                },
                bookingFormErrorMessage: {
                    noOfPersons: "",
                    checkInDate: ""
                },
                bookingFormValid: {
                    noOfPersons: false,
                    checkInDate: false,
                    buttonActive: false
                },
                dataTobeAdded:{
                    noOfPersons: "",
                    checkInDate: sessionStorage.getItem('checkInDate'),
                    userId: sessionStorage.getItem('userId'),
                    destinationName: "",
                    checkOutDate: "",
                    totalCharges: "",
                    timeStamp: "",
                    destId:""
                },
                bookingPage: false,
                show: true,
                showItinerary: false,
                packages: [],
                currentPackage:"",
                errorMessage: "",
                successMessage: "",
                bookingId:"",
                totalCharges: sessionStorage.getItem('totalCharges'),
                loadnext: false,
                packagePage: false,
                checkOutDate: sessionStorage.getItem('checkOutDate'),
                visibleRight: false,
                date:{
                chkInYear:"",
                chkInMonth:"",
                chkOutYear:"",
                chkOutMonth:""
                },
            selectedDeal: this.props.location.state.deal
        }
    }

    addData=()=>{
        const dataTobeAdded=this.state.dataTobeAdded
        dataTobeAdded.destinationName=this.state.selectedDeal.name;
        dataTobeAdded.checkOutDate=this.state.checkOutDate;
        dataTobeAdded.totalCharges=this.state.totalCharges;
        dataTobeAdded.destId=this.state.selectedDeal.destinationId;
        dataTobeAdded.timeStamp=new Date().getTime();
        dataTobeAdded.noOfPersons=this.state.bookingForm.noOfPersons;
    }

    bookdetail=()=>{
        this.addData();
        console.log(this.state.dataTobeAdded);
        Axios.post(backendUrlBooking+"/"+this.state.dataTobeAdded.userId+"/"+this.state.selectedDeal.destinationId,this.state.dataTobeAdded)
        .then(response => {
            console.log(response);
            this.setState({loadnext: true,bookingId:response.data.bookingId})
        }).catch(error => {
            console.log(error);
            if (error.response) {
                this.setState({ errorMessage: error.response.data.message });
            }
            else {
                this.setState({ errorMessage: "Boooking failed!!! Please try again later"})
            }
        })
        this.modifyDate()
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        if (target.checked) {
            var value = target.checked;
        } else {
            value = target.value;
        }
        const { bookingForm } = this.state;
        
        this.setState({
            bookingForm: { ...bookingForm, [name]: value }
        });
        this.validateField(name, value);
    }

    displayPackageInclusions = () => {
        const packageInclusions = this.state.selectedDeal.details.itinerary.packageInclusions;
        if (this.state.selectedDeal) {
            return packageInclusions.map((pack, index) => (<li key={index}>{pack}</li>))
        }
        else {
            return null;
        }
    }

    displayPackageHighlights = () => {
        let packageHighLightsArray = [];
        let firstElement = (
            <div key={0}>
                <h3>Day Wise itinerary</h3>
                <h5>Day 1</h5>
                {this.state.selectedDeal ? <div>{this.state.selectedDeal.details.itinerary.dayWiseDetails.firstDay}</div> : null}
            </div>
        );
        packageHighLightsArray.push(firstElement);
        if (this.state.selectedDeal) {
            this.state.selectedDeal.details.itinerary.dayWiseDetails.restDaysSightSeeing.map((packageHighlight, index) => {
                let element = (
                    <div key={index + 1}>
                        <h5>Day {this.state.selectedDeal.details.itinerary.dayWiseDetails.restDaysSightSeeing.indexOf(packageHighlight) + 2}</h5>
                        <div>{packageHighlight}</div>
                    </div>
                );
                packageHighLightsArray.push(element)
                return packageHighLightsArray
            });
            let lastElement = (
                <div key={666}>
                    <h5>Day {this.state.selectedDeal.details.itinerary.dayWiseDetails.restDaysSightSeeing.length + 2}</h5>
                    {this.state.selectedDeal.details.itinerary.dayWiseDetails.lastDay}
                    <div className="text-danger">
                        **This itinerary is just a suggestion, itinerary can be modified as per requirement. <a
                            href="#contact-us">Contact us</a> for more details.
                        </div>
                </div>
            );
            packageHighLightsArray.push(lastElement);
            return packageHighLightsArray;
        } else {
            return null;
        }
    }

    validateField = (fieldname, value) => {
        let fieldValidationErrors = this.state.bookingFormErrorMessage;
        let formValid = this.state.bookingFormValid;
        switch (fieldname) {
            case "noOfPersons":
                if (value === "") {
                    fieldValidationErrors.noOfPersons = "This field can't be empty!";
                    formValid.noOfPersons = false;
                } else if (value < 1 ) {
                    fieldValidationErrors.noOfPersons = "No. of persons can't be less than 1!";
                    formValid.noOfPersons = false;
                } else if (value > 5) {
                    fieldValidationErrors.noOfPersons = "No. of persons can't be more than 5.";
                    formValid.noOfPersons = false;
                } else {
                    fieldValidationErrors.noOfPersons = "";
                    formValid.noOfPersons = true;
                }
                break;
            case "checkInDate":
                if (value === "") {
                    fieldValidationErrors.checkInDate = "This field can't be empty!";
                    formValid.checkInDate = false;
                } else {
                    let checkInDate = new Date(value);
                    let today = new Date();
                    if (today.getTime() > checkInDate.getTime()) {
                        fieldValidationErrors.checkInDate = "Check-in date cannot be a past date!";
                        formValid.date = false;
                    } else {
                        fieldValidationErrors.checkInDate = "";
                        formValid.checkInDate = true;
                    }
                }
                break;
            default:
                break;
        }

        formValid.buttonActive = formValid.noOfPersons && formValid.checkInDate;
        this.setState({
            loginformErrorMessage: fieldValidationErrors,
            loginformValid: formValid,
            successMessage: ""
        });
        
    }

    modifyDate=()=>{
        let dateValue = this.state.date;
        console.log(this.state.dataTobeAdded.checkInDate,this.state.dataTobeAdded.checkOutDate);
         dateValue.checkInDate=new Date(this.state.dataTobeAdded.checkInDate).toDateString()
         dateValue.checkOutDate=new Date(this.state.dataTobeAdded.checkOutDate).toDateString()
    }

    calculateCharges = () => {
        this.setState({ totalCharges: 0 });
        let oneDay = 24 * 60 * 60 * 1000;
        let checkInDate = new Date(this.state.bookingForm.checkInDate);
        let checkOutDateinMs = Math.round(Math.abs((checkInDate.getTime() + (this.state.selectedDeal.noOfNights) * oneDay)));
        let finalCheckOutDate = new Date(checkOutDateinMs);
        this.setState({ checkOutDate: finalCheckOutDate.toDateString() });
        if (this.state.bookingForm.flights) {
            let totalCost = (-(-this.state.bookingForm.noOfPersons)) * this.state.selectedDeal.chargesPerPerson + this.state.selectedDeal.flightCharges;
            this.setState({ totalCharges: totalCost });
        } else {
            let totalCost = (-(-this.state.bookingForm.noOfPersons)) * this.state.selectedDeal.chargesPerPerson;
            this.setState({ totalCharges: totalCost });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // this.calculateCharges();
    }

    wait = () => {
        setTimeout(() => {
          this.setState({ show: false })
        }, 1500);
    
      }

    render() {
        if (this.state.loadnext === false) {
        return (
            <div className="cardSection">
                <div className="container-fluid">
                    <div className="row">
                        <div className="content-section implementation col-md-7">
                            <div className="row">
                                <h2 >{this.state.selectedDeal.name}</h2><br></br><br></br>
                                <div className="content-section implementation col-md-12 text-left">
                                    <Fieldset legend="Overview" toggleable={true} collapsed="false">
                                        
                                        <p>{this.state.selectedDeal.details.about}</p>
                                    </Fieldset>
                                </div>
                            </div>

                            <div className="row">
                                <div className="content-section implementation col-md-12 text-left">
                                    <Fieldset legend="Package Includes" toggleable={true} collapsed="false">
                                        <ul>
                                            {this.displayPackageInclusions()}
                                        </ul>
                                    </Fieldset>
                                </div>
                            </div>

                            <div className="row">
                                <div className="content-section implementation col-md-12 text-left">
                                    <Fieldset legend="Itinerary" toggleable={true} collapsed="false">
                                        <ul>
                                            {this.displayPackageHighlights()}
                                        </ul>
                                    </Fieldset>
                                </div>
                            </div>
                        </div>
                        
                            <div className="col-5">
                            <div className="card" style={{padding:15}}>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group text-left">
                                        <label htmlFor="noOfPersons">Number of Travelers</label>
                                        <input
                                            type="number"
                                            id="noOfPersons"
                                            className="form-control"
                                            name="noOfPersons"
                                            value={this.state.bookingForm.noOfPersons}
                                            onFocus={this.calculateCharges}
                                            onChange={this.handleChange}
                                        />
                                        {this.state.bookingFormErrorMessage.noOfPersons ?
                                            <span className="text-danger">{this.state.bookingFormErrorMessage.noOfPersons}</span>
                                            : null}
                                    </div>
                                    <div className="form-group text-left">
                                        <label htmlFor="date">Trip start Date</label>
                                        <input
                                            type="date"
                                            id="date"
                                            className="form-control"
                                            name="checkInDate"
                                            value={this.state.bookingForm.checkInDate}
                                            
                                            onChange={this.handleChange}
                                        />
                                        {this.state.bookingFormErrorMessage.checkInDate ?
                                            <span className="text-danger">{this.state.bookingFormErrorMessage.checkInDate}</span>
                                            : null}
                                    </div>
                                    <div className="form-group text-left">
                                        <label>Include Flights:</label>&nbsp;
                                    <InputSwitch name="flights" id="flights"
                                            checked={this.state.bookingForm.flights}
                                            onFocus={this.calculateCharges}
                                            onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                    
                                </div>
                                
                                </form>
                                {!this.state.totalCharges ?
                (
                    <React.Fragment><span>**Charges Exclude flight charges.</span><br /></React.Fragment>
                )
                :
                (
                    <h4 className="text text-left">
                        Your trip ends on: {this.state.checkOutDate} <br></br>
                        you will pay ${this.state.totalCharges}
                    </h4>
                )
            }
            <div className="text-center">
                <button className="btn btn-success" onClick={this.bookdetail}>Confirm Booking</button>
                                &nbsp; &nbsp; &nbsp;
                                <button type="button" className="btn btn-link" onClick={(e) => this.setState({ showItinerary: false })}>Go Back</button><br></br><br></br>
                                <span className="text text-danger">{this.state.errorMessage}</span>
            </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
        }
        else{
            if (this.state.show) {
                return(
                  <div id="details" className="details-section">
                  <div className="text-center">
                    <ProgressSpinner onload={this.wait()}></ProgressSpinner>
                  </div>
                </div>
                )
              }
              else{
                return (
                    
                    <div>
                        <section id="registerPage" className="bookingSection">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-10 offset-1">
                                    <h2 className="text">Booking Confirmed!!</h2><br></br>
                                    <h2 className="text text-success">Congratulations! Trip planned to {this.state.selectedDeal.name}</h2><br></br>
                                    <h2 className="text" style={{fontSize:25}}>Trip start on: {this.state.date.checkInDate}</h2>
                                    <h2 className="text" style={{fontSize:25}}>Trip Ends on: {this.state.date.checkOutDate}</h2><br></br>
                                    <a href="/viewBookings"><h4 className="text text-primary" style={{fontSize:18}}>Click Here to View your Bookings</h4></a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )
              }
        }
    }
}

export default book
