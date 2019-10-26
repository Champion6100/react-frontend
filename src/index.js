import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker'
import { LoginSignup } from './loginsignup';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<LoginSignup />, document.getElementById('root'));

serviceWorker.unregister();
