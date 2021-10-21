import React, {Component} from 'react'
export default class UserSignIn extends Component{
    constructor(){
        super()
        this.state = {
            emailAddress: '',
            password: '',
            errors: []
        }
        
       
    }

    //access the value of input
    handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        this.setState(()=> {
            return{
                [name]: value
            }
            
            
        })
    }

    //handles the logic on submit
    handleSubmit = (e) => {
        e.preventDefault()
        const {emailAddress, password} = this.state
        console.log(`your username is ${emailAddress} and your password is ${password}`)
    }
    render() {
        const {
            emailAddress,
            password,
            errors
        } = this.state
        return(
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                
                <form onSubmit={this.handleSubmit}>
                    <label htmlfor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={this.handleChange}/>
                    <label htmlfor="password">Password</label>
                    <input id="password" name="password" type="password" value={password} onChange={this.handleChange} />
                    <button className="button" type="submit">Sign In</button><a className="button button-secondary" href="/">Cancel</a>
                </form>
                <p>Don't have a user account? Click here to <a href="/signup">sign up</a>!</p>
                
            </div>
        </main>
        )
    }
}