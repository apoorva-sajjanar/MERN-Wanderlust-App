import React, { Component } from 'react'
import Axios from 'axios';
import { backendUrlBooking } from '../BackendURL';
import { Growl } from 'primereact/growl';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ProgressSpinner } from 'primereact/progressspinner';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export class viewBookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: sessionStorage.getItem('userId'),
      displayModal: false,
      reload: false,
      allBookings: [],
      show: true,
      bookingId: "",
      currPack: "",
      errorMessage:"",
      date:{
        checkInDate:"",
        checkOutDate:""
      }
    }
    this.onClick = this.onClick.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  // wait=()=>{
  //   setTimeout(()=>{
  //     this.setState({show:true},3000)
  //   })
  // }
  
  wait = () => {
    setTimeout(() => {
      this.setState({ show: false })
    }, 1500);

  }

  onClick(name, position) {
    let state = {
      [`${name}`]: true
    };

    if (position) {
      state = {
        ...state,
        position
      }
    }
    this.setState(state);
  }

  deleteq = () => {
    console.log(this.state.bookingId);
    Axios.delete(backendUrlBooking + "/cancelBooking/" + this.state.bookingId).then(() => {
    }).catch((error) => {
      console.log(error);
      if (error.response) {
          this.setState({ errorMessage: error.response.data.message });
      }
      else {
          this.setState({ errorMessage: "Cancellation failed!!! Please try again later"})
      }
  })
    this.reload()
    
  }

  onHide(name) {
    this.setState({
      [`${name}`]: false
    });
  }

  reload=()=>{
    this.handleResponse(this.state.bookingId)

    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }

  handleResponse = (bookingId) => {
    return (
      <div>
        {this.growl.show({ severity: 'info', summary: 'Successfully delete the booking with id ' + bookingId })}
      </div>
    )
  }


  renderFooter(name) {
    return (
      <div>
        <Button label="Confirm Cancellation" icon="pi pi-check" onClick={() => { this.onHide(name); this.deleteq() }} />
        <Button label="Back" icon="pi pi-times" onClick={() => this.onHide(name)} className="p-button-secondary" />
      </div>
    );
  }

  componentDidMount = () => {
    Axios.get(backendUrlBooking + "/getDetails/" + this.state.userId).then((response) => {
      this.setState({ allBookings: response.data })
    })
  }

  currPack = (currPack) => {
    this.setState({ currPack: currPack, bookingId: currPack.bookingId })
    let date=this.state.date
    let checkInDate=new Date(currPack.checkInDate).toDateString()
    let checkOutDate=new Date(currPack.checkOutDate).toDateString()
    date.checkInDate=checkInDate
    date.checkOutDate=checkOutDate
    console.log(this.state.bookingId);
  }

  displayPackages = () => {
    let packagesArray = [];
    for (let mypackage of this.state.allBookings) {
      let checkInDate = new Date(mypackage.checkInDate).toDateString()
      let checkOutDate = new Date(mypackage.checkOutDate).toDateString()

      let element = (
        <div class="card viewBookings loginSection">
          <h5 class="card-header h5">Booking Id: {mypackage.bookingId}</h5>
          <div class="card-body">
            <h5 class="card-title">{mypackage.destinationName}</h5>
            <p class="card-text">
              Trip Starts on :{checkInDate}<br></br>
            Trip Ends on :{checkOutDate}<br></br>
            Travellers :{mypackage.noOfPersons}<br></br>
            Fare Details: ${mypackage.totalCharges}
            </p>
            <Button label="Claim Refund" icon="pi pi-external-link" className="view-booking-buttons" onClick={() => { this.onClick('displayModal'); this.currPack(mypackage) }} /><br></br>
            <span className="text text-danger">{this.state.errorMessage}</span>
            <Dialog className="text-left" header="Confirm Cancellation" visible={this.state.displayModal} style={{ width: '50vw' }} onHide={() => this.onHide('displayModal')} modal={false}
              footer={this.renderFooter('displayModal')}>
              <h5 className="text text-danger">Are you sure you want to cancel trip to {this.state.currPack.destinationName}?</h5>
              <p className="text-left">
                Trip Starts on :{this.state.date.checkInDate}<br></br>
                Trip Ends on :{this.state.date.checkOutDate}<br></br>
                Refund Amount:{this.state.currPack.totalCharges}
              </p>
            </Dialog>
            <div>
              <Growl ref={(el) => this.growl = el} style={{position:"absolute",left:350,zIndex:9999}}></Growl>
            </div>
          </div>
        </div>
      )
      packagesArray.push(element);
    }
    return packagesArray;
  }
  render() {
    if (this.state.show) {
      return(
        <div id="details" className="details-section">
        <div className="text-center">
          <ProgressSpinner onload={this.wait()}></ProgressSpinner>
        </div>
      </div>
      )
    }
    if ((this.state.allBookings).length === 0) {
      return (
        <div className="bookingSection">
          <h2>Sorry you have not planned any trips with us yet</h2><br />
          <a href="/" className="btn btn-success">Click Here to start Booking</a>
        </div>
      )
    }
    else {
      return (
        <div>
          {this.displayPackages()}
        </div>
      )
    }
  }
}


export default withStyles(useStyles)(viewBookings) 
