import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router";
import Loading from "./Loading";

import { Context } from "../Context";

export default function UpdateCourse() {
  const context = useContext(Context);
  const authuser = context.authenticatedUserToken.user;
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [course, setCourse] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const history = useHistory();
  let { id } = useParams();
  //useEffect to retrieve the course
  useEffect(() => {
    fetch("http://localhost:5000/api/courses/" + id, { mode: "cors" }).then(
      (response) => {
        if (response.status === 200) {
          response.json().then((result) => {
            if (result.userId === authuser.id) {
              setCourse(result);
              setIsLoaded(true);
            } else {
              history.push("/forbidden");
            }
          });
        } else if (response.status === 404) {
          history.push("/notfound");
        } else {
          throw Error();
        }
      }
    );
  }, [id, history, authuser.id]);

  //setting the default values so the user have access to the previous values
  useEffect(() => {
    setTitle(course.title);
    setDescription(course.description);
    if (course.estimatedTime) {
      setEstimatedTime(course.estimatedTime);
    }
    if (course.materialsNeeded) {
      setMaterialsNeeded(course.materialsNeeded);
    }
  }, [course]);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "courseTitle":
        setTitle(value);
        break;
      case "courseDescription":
        setDescription(value);
        break;
      case "estimatedTime":
        setEstimatedTime(value);
        break;
      case "materialsNeeded":
        setMaterialsNeeded(value);
        break;
      default:
        break;
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const updatedCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authuser.userToken}`,
      },
      body: JSON.stringify(updatedCourse),
    };

    fetch("http://localhost:5000/api/courses/" + id, request)
      .then((response) => {
        if (response.status === 204) {
          history.push("/courses/" + id);
        } else if (response.status === 400) {
          response
            .json() //this returns a promise but not an error
            .then((errors) => setErrors(errors.errors));
        } else {
          throw Error();
        }
      })
      .catch(() => {
        history.push("/error");
      });
  }

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          {errors && (
            <div className="validation--errors">
              <h3>Your course has not been updated</h3>

              <ul>
                {" "}
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  value={title}
                  onChange={handleChange}
                />

                <p>By {course.courseOwner}</p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={estimatedTime}
                  onChange={handleChange}
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  onChange={handleChange}
                  value={materialsNeeded}
                ></textarea>
              </div>
            </div>
            <button className="button" type="submit">
              Update Course
            </button>
            <a className="button button-secondary" href="/">
              Cancel
            </a>
          </form>
        </div>
      </main>
    );
  }
}
