import React, { Component } from "react";
import axios from "axios";
import { backendUrlUser } from '../BackendURL';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Password } from 'primereact/password';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    }
}));

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerform: {
                name: "",
                emailId: "",
                contactNo: "",
                password: ""
            },
            registerformErrorMessage: {
                name: "",
                emailId: "",
                contactNo: "",
                password: ""
            },
            registerformValid: {
                contactNo: false,
                password: false,
                buttonActive: false
            },
            loadsucc: false,
            successMessage: "",
            errorMessage: "",
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { registerform } = this.state;
        this.setState({
            registerform: { ...registerform, [name]: value }
        });
        this.validateField(name, value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    register = () => {
        const { registerform } = this.state;
        axios.post(backendUrlUser + '/register', registerform)
            .then(response => {
                console.log(response);
                this.setState({ loadsucc: true })
            }).catch((error) => {
                console.log(error);
                if (error.response) {
                    this.setState({ errorMessage: error.response.data.message });
                }
                else {
                    this.setState({ errorMessage: "Registration failed! Please try againr"})
                }
            })
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.registerformErrorMessage;
        let formValid = this.state.registerformValid;
        switch (fieldName) {
            case "name":
                let nameRegex = /^[a-zA-Z]*([ ]+[A-Za-z]+)*$/
                if (!value || value === "") {
                    fieldValidationErrors.name = "Please enter your name";
                    formValid.name = false;
                } else if (!value.match(nameRegex)) {
                    fieldValidationErrors.name = "Please enter valid name";
                    formValid.name = false;
                } else {
                    fieldValidationErrors.name = "";
                    formValid.name = true;
                }
                break;
            case "emailId":
                let emailRegex = /\S+@\S+\.\S+/
                if (!value || value === "") {
                    fieldValidationErrors.emailId = "Please enter your Email Id";
                    formValid.emailId = false;
                } else if (!value.match(emailRegex)) {
                    fieldValidationErrors.emailId = "Please enter valid Email Id";
                    formValid.emailId = false;
                } else {
                    fieldValidationErrors.emailId = "";
                    formValid.emailId = true;
                }
                break;

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
                let paaswordRegex = /^[A-z]+[0-9]+[\W]+$/
                if (!value || value === "") {
                    fieldValidationErrors.password = "Password is manadatory";
                    formValid.password = false;
                } else if (!value.match(paaswordRegex) && (!(value.length >= 7 && value.length <= 15))) {
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
            registerformErrorMessage: fieldValidationErrors,
            registerformValid: formValid,
            successMessage: ""
        });
    }
    render() {
        const { classes } = this.props;
        if (this.state.loadsucc === false) {
            return (
                <div>
                    <section id="registerPage" className="loginSection">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-4 offset-4 ">
                                    <h1>Join Us</h1>
                                    <form className={classes.root} onSubmit={this.handleSubmit}>
                                        
                                        <div className="form-group">
                                            <TextField
                                                id="standard-full-width"
                                                label="Name *"
                                                style={{ margin: 8 }}
                                                value={this.state.registerform.name}
                                                onChange={this.handleChange}
                                                fullWidth
                                                margin="normal"
                                                className="form-control"
                                                name="name"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>
                                        {this.state.registerformErrorMessage.name ? (<span className="text-danger">
                                            {this.state.registerformErrorMessage.name}
                                        </span>)
                                            : null}

                                        <div className="form-group">
                                            
                                            <TextField
                                                id="standard-full-width"
                                                label="Email Id *"
                                                margin="normal"
                                                value={this.state.registerform.emailId}
                                                onChange={this.handleChange}
                                                fullWidth
                                                style={{ margin: 8 }}
                                                name="emailId"
                                                className="form-control"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>
                                        {this.state.registerformErrorMessage.emailId ? (<span className="text-danger">
                                            {this.state.registerformErrorMessage.emailId}
                                        </span>)
                                            : null}

                                        <div className="form-group">
                                            <TextField
                                                type="number"
                                                label="Contact Number *"
                                                value={this.state.registerform.contactNo}
                                                onChange={this.handleChange}
                                                name="contactNo"
                                                className="form-control"
                                                margin="normal"
                                                id="standard-full-width"
                                                fullWidth
                                                style={{ margin: 8 }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>
                                        {this.state.registerformErrorMessage.contactNo ? (<span className="text-danger">
                                            {this.state.registerformErrorMessage.contactNo}
                                        </span>)
                                            : null}
                                        {/* p-password-panel */}
                                        <div className="form-group">
                                            <label style={{fontSize:12,marginRight:390}}>Password *</label>
                                            <Password
                                                type="password"
                                                label="Password *"
                                                value={this.state.registerform.password}
                                                onChange={this.handleChange}
                                                name="password"
                                                className="form-control p-password-panel"
                                                margin="normal"
                                                id="standard-full-width"
                                                fullWidth
                                                style={{ margin: 8 }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>
                                        
                                        {this.state.registerformErrorMessage.password ? (<span className="text-danger">
                                            {this.state.registerformErrorMessage.password}
                                        </span>)
                                            : null}
                                        <br />
                                        <span><span className="text-danger">*</span> marked feilds are mandatory</span>
                                        <br />
                                        <div class="form-group">
                                        <div class="text-danger">
                                            <h6>{ this.state.errorMessage }</h6>
                                        </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={!this.state.registerformValid.buttonActive}
                                            className="btn btn-primary form-control"
                                            style={{ height: 60, color: "white", fontSize: 15 }}
                                            onClick={this.register}>
                                            REGISTER
                                    </button>
                                        {/* </div> */}
                                    </form>

                                    <br />
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
        else {
            return (
                <div>
                    <section id="registerPage" className="loginSection">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-4 offset-4">
                                    <h2 className="text text-success">Registed successfully</h2><br></br>
                                    <a href="/login"><h4 className="text text-primary">Click Here to Login</h4></a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )
        }
    }
}

export default withStyles(useStyles)(Login);