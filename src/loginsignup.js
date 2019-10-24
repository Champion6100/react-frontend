import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Login } from './login';
import { Signup } from './signup';
import { Home } from './home';
export class LoginSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: props.handleLogin };
  }

  render() {
    const { isLoggedIn } = this.state;
    console.log("isLoggedIn", this.state.isLoggedIn);
    return (
      <Router>
        <div className="container">
          <nav className="navbar">
            <ul style={{ float: "right" }}>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                {!isLoggedIn && <Link to="/signup">Signup</Link>}
              </li>
              <li>
              {!isLoggedIn && <Link to="/home">Home</Link>}
              </li>
            </ul>
          </nav>
          <hr />
          <Route path="/login" component={login} />
          <Route path="/signup" component={signup} />
          <Route path="/home" component={home} />
       
        </div>
      </Router>
    );
  }
}

LoginSignup.defaultProps = {
  handleLogin: false
}


function login() {
  return (
    <Login />
  );
}

function signup() {
  return (
    <Signup />
  );
}
function home() {
  return (
    <Home />
  );
}