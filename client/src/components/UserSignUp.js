import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../Context";

export default function UserSignUp() {
  const context = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const history = useHistory();

  //access the value of input
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "emailAddress":
        setEmailAddress(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  //handles the logic on submit
  async function handleSubmit(e) {
    e.preventDefault();
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, emailAddress, password }),
    };

    fetch("http://localhost:5000/api/users", request)
      .then(async (response) => {
        if (response.status === 201) {
          await context[0].actions.signIn(emailAddress, password);
          history.goBack();
        } else if (response.status === 400) {
          response.json().then((errors) => setErrors(errors.errors));
        } else {
          throw Error();
        }
      })
      .catch(() => history.push("/error"));
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        {errors && (
          <div className="validation--errors">
            <h3>
              Please enter the following information(s) to create an account:
            </h3>

            <ul>
              {" "}
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={handleChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={handleChange}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailAddress}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <a className="button button-secondary" href="/">
            Cancel
          </a>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <a href="/signin">sign in</a>!
        </p>
      </div>
    </main>
  );
}
