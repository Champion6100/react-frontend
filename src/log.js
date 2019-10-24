import React from 'react';
import axios from 'axios';
export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
        this.logout = this.logout.bind(this);
    }
    handleLogin() {
        let login_values = [];
        //let status = '';
        var form_all = document.getElementsByTagName("input");
        console.log(form_all);
        for (var i = 0; i < form_all.length; i++) {


            login_values[i] = form_all[i].value;


        }
        console.log(login_values);
        const user_login = {
            'username': login_values[0],
            'password': login_values[1]

        }
        console.log('Values', user_login);
        axios.post(`http://localhost:3000/login`, user_login)
            .then(res => {
                console.log(res);
                console.log(res.data.success);
                localStorage.setItem('token', res.data.token);
                //history.push('/dashboard');
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.log('Login failed. Username or password not match');
                }
            });


    }
   
    render() {
   
        return (
          
                <div>
                    <h2>Login</h2>
                    <hr />
                    <form>
                        <div className="form-group">
                            <label for="full_name">full_name:</label>
                            <input type="full_name" className="form-control" id="full_name" placeholder="Enter full_name" name="email" required />
                            <div id="validate_name"></div>
                        </div>
                        <div className="form-group">
                            <label for="pwd">Password:</label>
                            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" required />
                        </div>
                        <button type="submit" className="btn" onClick={this.logout}>Login</button>
                    </form>
                </div>
          
        );
    }
}