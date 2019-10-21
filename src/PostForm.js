import React from 'react'
import axios from 'axios'
 class PostForm extends React.Component {
     constructor(props) {
         super(props)
         this.state = {
            full_name: '',
            e_mail: '',
            pswd: '',
         }
     }

     changeHandler = (e) => {
         this.setState({[e.target.name]:e.target.value})
     }
      submitHandler = e => {
         e.preventDefault()
         console.log(this.state)
          axios.post('http://localhost:3000/signup', this.state)
         .then(response => {
             console.log(response)
         })
         .catch(error => {
             console.log(error)
         }
         )
     }

    render() {
        const { full_name, e_mail, pswd } = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                         <input type="text" name="full_name" value={full_name} onChange={this.changeHandler} />
                    </div>
                    <div>
                         <input type="text" name="e_mail" value={e_mail} onChange={this.changeHandler} />
                    </div>
                    <div>
                         <input type="text" name="pswd" value={pswd} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <button type="submit">submit</button>
                    </div>

                </form>

            </div>
        )
    }
}

export default PostForm