import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router";
import Loading from "./Loading";
import { Context } from "../Context";
import ReactMarkdown from "react-markdown";

export default function CourseDetails() {
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);
  const [course, setCourse] = useState([]);

  let { id } = useParams();
  let context = useContext(Context);
  //useEffect to retrieve the course
  useEffect(() => {
    fetch("http://localhost:5000/api/courses/" + id, { mode: "cors" })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((result) => {
            setCourse(result);
            setIsLoaded(true);
          });
        } else if (response.status === 404) {
          history.push("/notfound");
        } else {
          throw Error();
        }
      })
      .catch(() => {
        history.push("/error");
      });
  }, [id, history]);

  //destructuring course and user for readability
  const { title, description, estimatedTime, materialsNeeded, courseOwner } =
    course;

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <main>
        {context.authenticatedUserToken &&
        context.authenticatedUserToken.user.id === course.userId ? (
          <div className="actions--bar">
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
        ) : (
          <div className="wrap">
            <a className="button button-secondary" href="/">
              Return to List
            </a>
          </div>
        )}
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{title}</h4>
                <p>
                  By <span className="course-owner">{courseOwner}</span>
                </p>

                <ReactMarkdown>{description}</ReactMarkdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                {!estimatedTime && <p>N/A</p>}
                <p>{estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  {materialsNeeded && (
                    <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                  )}
                  {!materialsNeeded && <li> N/A</li>}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
