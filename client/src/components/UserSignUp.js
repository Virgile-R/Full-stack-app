import React, {useState} from 'react'
import { useHistory } from 'react-router'
//refactor as a function...
export default function UserSignUp (){
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [emailAddress, setEmailAddress] = useState('')
   const [password, setPassword] = useState('')
   const [errors, setErrors] = useState('')
   const history = useHistory()
    //access the value of input
    function handleChange (event) {
        const name = event.target.name
        const value = event.target.value

        switch (name) {
            case 'firstName':
                setFirstName(value) 
                break;
            case 'lastName':
                setLastName(value)
                break;
            case 'emailAddress':
                setEmailAddress(value)
                break
            case 'password':
                setPassword(value)
                break   
            default:
                break;
        }
       
    }

    //handles the logic on submit
    function handleSubmit (e) {
        e.preventDefault()
        const request = {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({firstName, lastName, emailAddress, password})
        }
      
        fetch('http://localhost:5000/api/users', request)
            .then(response => {
                if (response.status !== 201){
                    return response.json()
                    
                } else {
                    history.push("/")
                    
                } 
                })
            .then(response => {
                if (response){
                   setErrors(response)
                   console.log(errors)
                }
            })
            
               
                
          
            
    }


        
        return(
            <main>
            <div className="form--centered">
                
                <h2>Sign Up</h2>
                
                <form onSubmit={handleSubmit}>
                    <label htmlfor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value={firstName} onChange={handleChange} />
                    <label htmlfor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value={lastName} onChange={handleChange}/>
                    <label htmlfor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={handleChange}/>
                    <label htmlfor="password">Password</label>
                    <input id="password" name="password" type="password" value={password} onChange={handleChange}/>
                    <button className="button" type="submit">Sign Up</button><a className="button button-secondary" href='/'>Cancel</a>
                </form>
                <p>Already have a user account? Click here to <a href="/signin">sign in</a>!</p>
            </div>
        </main>

        )
    }

