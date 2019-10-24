import React from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom'
export class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

   
    submitHandler = e => {
        e.preventDefault()

        console.log(this.state)
        axios.get('http://localhost:3000/home', {
          headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => {
          console.log('success'
            );
        }).catch(reject => {
          console.log('token incorrect');
        })
    }


    render() {
           
        return (         
            <div>               
                <form onSubmit={this.submitHandler}>                  
                    <div>
                        <button type="submit">home</button>
                    </div>
                 </form>
            </div>             
            )      
    }
}

