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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCourse)
        }
        fetch('http://localhost:5000/api/courses/', request)
            .then(response => {
                if (response.status === 201){
                    console.log(response)
                } else if (response.status === 400) {
                    console.log(response)
                    setErrors(response)
                }
            })
    }
    return(
        <main>
        <div className="wrap">
            <h2>Create Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value='' onChange={handleChange}/>
    
                      
    
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" value='' onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value='' onChange={handleChange}/>
    
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleChange} value=''></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button><a className="button button-secondary" href='/'>Cancel</a>
            </form>
        </div>
    </main>
      )
    
}