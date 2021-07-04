import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { backendUrlUser } from '../BackendURL';
import '../App.css';
import '../index.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginform: {
                contactNo: "",
                password: ""
            },
            loginformErrorMessage: {
                contactNo: "",
                password: ""
            },
            loginformValid: {
                contactNo: false,
                password: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            loadHome: false,
            loadRegister: false,
            userId: ""
        }
    }

    handleClick = () => {
        this.setState({ loadRegister: true })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { loginform } = this.state;
        this.setState({
            loginform: { ...loginform, [name]: value }
        });
        this.validateField(name, value);
    }

    login = () => {
        const { loginform } = this.state;
        axios.post(backendUrlUser + '/login', loginform)
            .then(response => {
                console.log(response);
                let userId = response.data.userId;
                sessionStorage.setItem("userId", userId);
                sessionStorage.setItem("userName", response.data.name);
                window.location.reload();
                this.setState({ loadHome: true, userId: userId })
            }).catch((err) => {
                console.log(err);
                if (err.response) {
                    this.setState({ errorMessage: err.response.data.message });
                }
                else {
                    this.setState({ errorMessage: " Login failed! Please try again" })
                }
                sessionStorage.clear();
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.login();
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.loginformErrorMessage;
        let formValid = this.state.loginformValid;
        switch (fieldName) {
            case "contactNo":
                let cnoRegex = /^[1-9]\d{9}$/
                if (!value || value === "") {
                    fieldValidationErrors.contactNo = "Please enter your contact Number";
                    formValid.contactNo = false;
                } else if (!value.match(cnoRegex)) {
                    fieldValidationErrors.contactNo = "Contact number should be a valid 10 digit number";
                    formValid.contactNo = false;
                } else {
                    fieldValidationErrors.contactNo = "";
                    formValid.contactNo = true;
                }
                break;
            case "password":
                if (value === "") {
                    fieldValidationErrors.password = "Password is manadatory";
                    formValid.password = false;
                } else if (!(value.match(/^[A-Za-z0-9]+[!@#$%^&*]+$/))||(value.length<=5 && value.length>=15)) {
                        fieldValidationErrors.password = "Please Enter a valid password"
                        formValid.password = false;
                } else {
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.contactNo && formValid.password;
        this.setState({
            loginformErrorMessage: fieldValidationErrors,
            loginformValid: formValid,
            successMessage: ""
        });
    }

    render() {
        if (this.state.loadHome === true) return <Redirect to={'/home/' + this.state.userId} />
        if (this.state.loadRegister === true) return <Redirect to={'/register'} />
        const { classes } = this.props;
        return (
            <div>
                <section id="loginPage" className="loginSection">
                    <div className="container-fluid">
                        <div className={classes.root}>
                            <div className="row">
                                <div className="col-md-4 offset-4">
                                    <h1>Login</h1>
                                    <br></br>
                                    <form className="form" onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <TextField
                                                type="number"
                                                value={this.state.loginform.contactNo}
                                                onChange={this.handleChange}
                                                label="Contact Number *"
                                                id="uContactNo"
                                                variant="outlined"
                                                name="contactNo"
                                                className="form-control"
                                            />
                                        </div>
                                        {this.state.loginformErrorMessage.contactNo ? (<span className="text-danger">
                                            {this.state.loginformErrorMessage.contactNo}
                                        </span>)
                                            : null}
                                        <br></br>
                                        <br></br>
                                        <div className="form-group">
                                            <TextField
                                                type="password"
                                                value={this.state.loginform.password}
                                                onChange={this.handleChange}
                                                label="Password *"
                                                variant="outlined"
                                                id="uPass"
                                                name="password"
                                                className="form-control"
                                            />
                                        </div>
                                        {this.state.loginformErrorMessage.password ? (<span className="text-danger">
                                            {this.state.loginformErrorMessage.password}
                                        </span>)
                                            : null}<br />
                                        <span><span className="text-danger">*</span> marked feilds are mandatory</span>
                                        <br />
                                        <div class="form-group">
                                            <div class="text-danger">
                                                <h6>{this.state.errorMessage}</h6>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={!this.state.loginformValid.buttonActive}
                                            className="btn btn-primary btn-lg form-control"
                                            style={{ height: 60, color: "white", fontSize: 15 }}
                                            onClick={this.login}>
                                            Login
                                    </button>
                                    </form>
                                    <br />
                                    <button className="btn btn-lg form-control" style={{ height: 70, backgroundColor: "#4f837f", color: "white", fontSize: 15 }} onClick={this.handleClick} >Click here to Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <div * ngIf= "!registerPage" >
            <router-outlet></router-outlet>
            </div > */}
                {/* *ngIf="!registerPage" */}
                {/* </div > */}
            </div>
        )
    }
}

export default withStyles(useStyles)(Login);