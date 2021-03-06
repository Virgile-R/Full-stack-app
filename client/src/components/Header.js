import { useContext } from "react";
import { Context } from "../Context";
export default function Header() {
  const context = useContext(Context);
  if (context.authenticatedUserToken) {
    const authuser = context.authenticatedUserToken.user;

    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <a href="/">Courses Catalog</a>
          </h1>
          <nav>
            <ul className="header--signedin">
              <li>Welcome, {`${authuser.firstName} ${authuser.lastName}`}</li>
              <li>
                <a href="/sign-out">Sign Out</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <a href="/">Courses</a>
          </h1>
          <nav>
            <ul className="header--signedin">
              <li>
                <a href="/sign-in">Sign in</a>
              </li>
              <li>
                <a href="/sign-up">Sign Up</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
