import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Error from "./Error";
import Loading from "./Loading";

export default function CourseDetails() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [course, setCourse] = useState([]);

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

 
  //destructuring course and user for readability
  const { title, description, estimatedTime, materialsNeeded, courseOwner } = course;



  if (error) {
    return <Error errors={error} />;
  } else if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            <a className="button" href={`/courses/update/${id}`}>
              Update Course
            </a>
            <a className="button" href={`/courses/delete/${id}`}>
              Delete Course
            </a>
            <a className="button button-secondary" href="/">
              Return to List
            </a>
          </div>
        </div>
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{title}</h4>
                <p>{`${courseOwner}`}</p>

                {description.split("\n").map((phrase, index) => (
                  <p key={index}>{phrase}</p>
                ))}

                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                    { 
                      materialsNeeded.split("\n*").map((material, index) => (
                      
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
