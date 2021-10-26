import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Context } from "../Context";

export default function CreateCourse() {
    let context = useContext(Context)
    const history = useHistory()
    const authuser = context.authenticatedUser
    const [errors, setErrors] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [estimatedTime, setEstimatedTime] = useState('')
    const [materialsNeeded, setMaterialsNeeded] = useState('')

    

    function handleChange(event){
        const name = event.target.name
    const value = event.target.value

    switch (name) {
        case 'courseTitle':
            setTitle(value) 
            break;
        case 'courseDescription':
            setDescription(value)
            break;
        case 'estimatedTime':
            setEstimatedTime(value)
            break
        case 'materialsNeeded':
            setMaterialsNeeded(value)
            break   
        default:
            break;
    }

    }

    function handleSubmit(e){
        e.preventDefault()
        
        const newCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userID: authuser.id
        }
        const request = {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authuser.authenticationToken}`
            },
            body: JSON.stringify(newCourse)
        }
        fetch('http://localhost:5000/api/courses/', request)
            .then(response => {
                if (response.status === 201){
                    const location = response.headers.get('Location')
                   
                    history.push(location)
                   
                } else if (response.status === 400) {
                    response.json()
                    .then(errors => setErrors(errors.errors))
                    
                    

                } else {
                    throw Error()
                }
            })
            .catch(() => {
                history.push("/error")
            })
        }
    return(
        <main>
        <div className="wrap">
            <h2>Create Course</h2>
            {errors &&
            <div className="validation--errors">
                    <h3>Your course has not been created</h3>
                    
                    <ul> {errors.map((error, index) => 
                        <li key={index}>{error}</li>
                    )}
                        
                    </ul>
                </div>
            }
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text"  onChange={handleChange}/>
    
                      
    
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription"  onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text"  onChange={handleChange}/>
    
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleChange} ></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button><a className="button button-secondary" href='/'>Cancel</a>
            </form>
        </div>
    </main>
      )
    
}