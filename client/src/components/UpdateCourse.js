import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import Loading from "./Loading";


export default function UpdateCourse() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [course, setCourse] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [estimatedTime, setEstimatedTime] = useState('')
    const [materialsNeeded, setMaterialsNeeded] = useState('')
    const history = useHistory()
    let { id } = useParams();
  //useEffect to retrieve the course
  useEffect(() => {
    fetch("http://localhost:5000/api/courses/" + id, { mode: "cors" })
      .then((results) => results.json())
      .then(
        (result) => {
          setCourse(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [id]);
  
  function handleChange (event) {
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
      const updatedCourse = {
          title,
          description,
          estimatedTime,
          materialsNeeded
      }
      const request = {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedCourse)
      }
      fetch('http://localhost:5000/api/courses/' + id, request)
      .then(response => {
        if (response.status !== 204){
            return response.json()
            
        } else {
            history.push("/courses/" + id)
            
        } 
        })
    .then(response => {
        if (response){
           setError(response)
           console.log(error)
        }
    })
  }

 
  if (!isLoaded){
      return <Loading />
  } else {
  return(
    <main>
    <div className="wrap">
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
            <div className="main--flex">
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={handleChange}/>

                    <p>By {course.courseOwner}</p>

                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea id="courseDescription" name="courseDescription" value={description} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={handleChange}/>

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleChange} value={materialsNeeded}></textarea>
                </div>
            </div>
            <button className="button" type="submit">Update Course</button><a className="button button-secondary" href='/'>Cancel</a>
        </form>
    </div>
</main>
  )
} 
}