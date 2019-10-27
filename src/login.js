import React from 'react'
import axios from 'axios'
export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            full_name: '',
            pswd: '',          
            formErrors: {
                full_name: '',
                pswd: ''
            }
        }
    }

    changeHandler = (e) => {                                   //e=event
        this.setState({ [e.target.name]: e.target.value })
    }
    submitHandler = e => {
        e.preventDefault()
        console.log(`
         --SUBMITTING-- 
         Full Name: ${this.state.full_name}
           Password: ${this.state.pswd}
     `)
        console.log(this.state)
        axios.post('https://dashboard.heroku.com/apps/mynodeapp6/api/login', this.state)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('token', res.data);         
         
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.log('Login failed. Username or password not match');
                }
            });
    }
    handleChange = e => {
        e.preventDefault();

        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'full_name':
                formErrors.full_name = value.length < 6 ? "Minimum 6 characters required" : "";
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
        const { full_name, pswd } = this.state
        const { formErrors } = this.state;    
        
        return (           
            <div>
                <h2>Login</h2>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label for="full_name">Full Name:</label>
                        <input type="text" name="full_name" value={full_name} placeholder="Enter Full Name" className="form-control" onChange={this.changeHandler} onChange={this.handleChange} />
                        {formErrors.full_name.length > 0 && (
                            <span className="errorMessage">{formErrors.full_name}</span>
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
                        <button type="submit">Login</button>
                    </div>
                  

                </form>

            </div>
            
            
            )
        
    }
}

