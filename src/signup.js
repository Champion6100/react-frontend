import React from 'react'
import axios from 'axios'
import swal from 'sweetalert';
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
export class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            full_name: '',
            e_mail: '',
            pswd: '',
            formErrors: {
                full_name: '',
                e_mail: '',
                pswd: ''
            }
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitHandler = e => {
        e.preventDefault()
        console.log(`
         --SUBMITTING-- 
         Full Name: ${this.state.full_name}
         Email: ${this.state.e_mail}
         Password: ${this.state.pswd}
     `)
        console.log(this.state)
        axios.post('https://dashboard.heroku.com/apps/mynodeapp6/api/signup', this.state)
            .then(response => {
                console.log(response)
                console.log(response.data.message);
                if (response.data.message) {
                    swal("Hello,  success!!",
                        {
                            button: {
                                text: "Login Now !!",
                                value: "catch",
                            }
                        })
                }
            })
            .catch(error => {
                console.log(error)
            }
            )
    }
    handleChange = e => {
        e.preventDefault();

        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
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

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }

    render() {
        const { full_name, e_mail, pswd } = this.state
        const { formErrors } = this.state;
        return (
            <div>
                <h2>Signup</h2>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label for="full_name">Full Name:</label>
                        <input type="text" name="full_name" value={full_name} placeholder="Enter Full Name" className="form-control" onChange={this.changeHandler} onChange={this.handleChange} />
                        {formErrors.full_name.length > 0 && (
                            <span className="errorMessage">{formErrors.full_name}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label for="e_mail">Email Id:</label>
                        <input type="text" name="e_mail" value={e_mail} placeholder="Enter Email ID" className="form-control" onChange={this.changeHandler} onChange={this.handleChange} />
                        {formErrors.e_mail.length > 0 && (
                            <span className="errorMessage">{formErrors.e_mail}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label for="pswd">Password:</label>
                        <input type="password" name="pswd" value={pswd} placeholder="Enter password" className="form-control" onChange={this.changeHandler} onChange={this.handleChange} />
                        {formErrors.pswd.length > 0 && (
                            <span className="errorMessage">{formErrors.pswd}</span>
                        )}
                    </div>
                    <div>
                        <button type="submit">Signup</button>
                    </div>

                </form>

            </div>
        )
    }
}

