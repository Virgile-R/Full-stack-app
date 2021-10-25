import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import Errors from "./Errors";
import Loading from "./Loading";
import { Context } from "../Context";

export default function CourseDetails() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [course, setCourse] = useState([]);

  let { id } = useParams();
  let context = useContext(Context)
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

 
  //destructuring course and user for readability
  const { title, description, estimatedTime, materialsNeeded, courseOwner } = course;



  if (error) {
    return <Errors errors={error} />;
  } else if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <main>
       {context.authenticatedUser && context.authenticatedUser.user.id === course.userId ? <div className="actions--bar">
          <div className="wrap">
            <a className="button" href={`/courses/${id}/update`}>
              Update Course
            </a>
            <a className="button" href={`/courses/${id}/delete`}>
              Delete Course
            </a>
            <a className="button button-secondary" href="/">
              Return to List
            </a>
          </div>
        </div>
        :  <div className="wrap">
        <a className="button button-secondary" href="/">
              Return to List
            </a>
        </div>}
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{title}</h4>
                <p>{`By ${courseOwner}`}</p>

                {description.split("\n").map((phrase, index) => (
                  <p key={index}>{phrase}</p>
                ))}
               </div>     
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  {!estimatedTime &&
                  <p>N/A</p>}
                  <p>{estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                    { materialsNeeded &&
                      materialsNeeded.slice(1).split("\n*").map((material, index) => (
                      
                      <li key={index}>{material}</li>
                    ))}
                    { !materialsNeeded &&
                      <li> N/A</li>}
                  </ul>
                </div>
              </div>
            
          </form>
        </div>
      </main>
    );
  }
}
