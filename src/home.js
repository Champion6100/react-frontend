import React from 'react'
import axios from 'axios'

export class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

   
    submitHandler = e => {
        e.preventDefault()

        console.log(this.state)
        axios.get('https://dashboard.heroku.com/apps/mynodeapp6/api/home', {
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

