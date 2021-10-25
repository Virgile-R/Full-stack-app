import { useState, useEffect } from 'react';
import Errors from "./Errors";
import Loading from "./Loading";


export default function Courses () {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [courses, setCourses] = useState([])
  

  useEffect(() => {
    fetch('http://localhost:5000/api/courses', {mode: 'cors'})
    // Apparently not being an arrow function doesn't work here, investigate why
      .then(results => 
        results.json()
      
      )
      .then(
        (result) => {
          
          setIsLoaded(true)
          setCourses(result)
        },
        (error) =>{
            setIsLoaded(true)
            setError(error)
        }
        
      )
  }, [])


if (error){
    return <Errors errors={error}/>
} else if (!isLoaded) {
    return <Loading/>

} else {
   return( 
   <main>
   <div className="wrap main--grid">
        {courses.map(course => (
            <a key={course.id} className="course--module course--link" href={`/courses/${course.id}`}>
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{course.title}</h3>
            </a>
        ))
        }
        <a className="course--module course--add--module" href="/courses/create">
            <span className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                New Course
            </span>
        </a>
    </div> 
    </main>    
    )

}


}