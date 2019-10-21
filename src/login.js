import React from 'react';
import axios from 'axios';
export class Login extends React.Component {
    constructor(props){
        super(props);
        this.state= {isLoggedIn: false,
            authValidate: false
        };
        this.logout = this.logout.bind(this);
    }
    handleLogin() {
        let login_values = [];
        let status = '';
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
        axios.post(`http://localhost:3000/api/login`, user_login)
            .then(res => {
                console.log(res);
                console.log(res.data.success);
                localStorage.setItem('jwtToken', res.data.token);
                //history.push('/dashboard');
            })
            .catch((error) => {
                if(error.response.status === 401) {
                  console.log('Login failed. Username or password not match');
                }
              });
        

    }
    logout(){
        this.setState({authValidate: !this.state.authValidate, isLoggedIn:false});
    }
    render() {
        console.log("authValidate", this.state.authValidate);
        console.log("login",this.state.isLoggedIn);
        return(
            (!this.state.authValidate)?(
                <div>
                    <h2>Login</h2>
                    <hr />
                    <form>
                        <div className="form-group">
                            <label for="email">Email:</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" required />
                            <div id="validate_name"></div>
                        </div>
                        <div className="form-group">
                            <label for="pwd">Password:</label>
                            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" required/>
                        </div>
                        <button type="submit" className="btn" onClick={this.logout}>Login</button>
                    </form>
                </div>
            ):(
                <div>
                    <h2>You Successfully Logged In!!!</h2>
                    <button onClick={this.logout} className="btn">Logout</button>
                    {/* <LoginSignup handleLogin={this.state.isLoggedIn}/> */}
                </div>
            )
        );
    }
}