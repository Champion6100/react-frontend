import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import  { Redirect } from 'react-router-dom'
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const formValid = formErrors => {
    let valid = true;    
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid=false)
    });
    return valid;
}
export class Signup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            full_name: '',
            e_mail: '',
            pswd: '',
            formErrors: {
                full_name: '',
                e_mail: '',
                pswd: ''
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /*
    handleSignup() {
        let signup_values = [];
        let status = '';
        var form_all = document.getElementsByTagName("INPUT");
        console.log(form_all);
        for (var i = 0; i < form_all.length; i++) {
            signup_values[i] = form_all[i].value;
        }
        console.log(signup_values);
        const user_signup = {
            'full_name': signup_values[1],
            'e_mail': signup_values[2],
            'pswd': signup_values[0]
        }
        console.log('Values', user_signup);
        axios.post(`http://localhost:3000/signup`, user_signup)
            .then(res => {
                console.log(res);
                console.log(res.data.msg);
                if (res.data.success) {
                    swal("Hello  " + signup_values[0], res.data.msg, "success",{
                        button: {
                            text: "Login Now !!",
                            value: "catch",
                        } 
                    })
                    .then((value) => {
                        return <Redirect to='/login'  />
                          
                     
                      });
                    
                    
                }
                this.setState({ signup_status: status });
                console.log('Status out', status);
                console.log('Sign up Status', this.state.signup_status)

            })


    }
*/
    changeHanldler = e => {
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();

        if(formValid(this.state.formErrors)) {
            console.log(`
                --SUBMITTING-- 
                Full Name: ${this.state.full_name}
                Email: ${this.state.e_mail}
                Password: ${this.state.pswd}
            `)
        
            let signup_values = [];
        let status = '';
        var form_all = document.getElementsByTagName("INPUT");
        console.log(form_all);
        for (var i = 0; i < form_all.length; i++) {
            signup_values[i] = form_all[i].value;
        }
        console.log(signup_values);
        const user_signup = {
            'full_name': signup_values[1],
            'e_mail': signup_values[2],
            'pswd': signup_values[0]
        }
        console.log('Values', user_signup);
        axios.post(`http://localhost:3000/api/signup`, this.state)
            .then(res => {
                console.log(res);
                console.log(res.data.msg);
                
                if (res.data.success) {
                    swal("Hello  " + signup_values[0], res.data.msg, "success",{
                        button: {
                            text: "Login Now !!",
                            value: "catch",
                        } 
                    })

                    .then((value) => {
                        return <Redirect to='/login'  />
                          
                     
                      });
                    
                    
                
               // this.setState({ signup_status: status });
                //console.log('Status out', status);
               // console.log('Sign up Status', this.state.signup_status)

            })


        }
        else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    }

    handleChange = e => {
        e.preventDefault();

        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
 
        switch(name) {
            case 'full_name': 
                formErrors.full_name = value.length < 6 ? "Minimum 6 characters required" : "";
                break;
                
            case 'e_mail': 
                formErrors.e_mail = emailRegex.test(value) ? "" : "Invalid Email Address";
                break;

            case 'pswd': 
                formErrors.pswd = value.length < 8 ? "Minimum 8 characters required" : "";
                break;        
        
            default:
                break;
        }

        this.setState({formErrors, [name]: value }, () => console.log(this.state));
    }
    
    render() {

        const {formErrors} = this.state;
        return(
            <div>
                <h2>Signup</h2>
                <hr />
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="form-group">
                        <label for="full_name">Full Name:</label>
                        <input onChange={this.changeHandler} type="text" className="form-control" id="full_name" placeholder="Enter Full Name" name="full_name" required noValidate onChange={this.handleChange} />
                        {formErrors.full_name.length > 0 && (
                            <span className="errorMessage">{formErrors.full_name}</span>
                        )}
                    </div>                                
                    <div className="form-group">
                        <label for="e_mail">Email Id:</label>
                        <input onChange={this.changeHandler} type="email" className="form-control" id="e_mail" placeholder="Enter Email ID" name="e_mail" required noValidate onChange={this.handleChange} />
                        {formErrors.e_mail.length > 0 && (
                            <span className="errorMessage">{formErrors.e_mail}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label for="pswd">Password:</label>
                        <input onChange={this.changeHandler} type="password" className="form-control" id="pswd" placeholder="Enter password" name="pswd" required noValidate onChange={this.handleChange} />
                        {formErrors.pswd.length > 0 && (
                            <span className="errorMessage">{formErrors.pswd}</span>
                        )}
                    </div>
                    <button type="submit" className="btn">Sign Up</button>
                </form>
            </div>
        );
    }
}