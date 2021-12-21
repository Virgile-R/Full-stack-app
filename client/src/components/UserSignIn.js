import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Context } from "../Context";

export default function UserSignIn() {
  const context = useContext(Context);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const history = useHistory();
  //access the value of input
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
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
    const currentUser = await context.actions.signIn(emailAddress, password);
    if (!currentUser) {
      setErrors("Invalid username or password.");
    } else {
      history.push("/");
    }
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {errors && (
          <div className="validation--errors">
            <h3>{errors}</h3>
          </div>
        )}
        <form onSubmit={handleSubmit}>
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
            Sign In
          </button>
          <a className="button button-secondary" href="/">
            Cancel
          </a>
        </form>
        <p>
          Don't have a user account? Click here to <a href="/signup">sign up</a>
          !
        </p>
      </div>
    </main>
  );
}
