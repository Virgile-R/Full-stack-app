import { Route, Redirect } from "react-router";
import { useContext } from "react";
import { UserContext } from "./Context";
export default function PrivateRoute({ children, ...rest }) {
  let context = useContext(UserContext);
  const authuser = context.authenticatedUserToken;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authuser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
            }}
          />
        )
      }
    />
  );
}
