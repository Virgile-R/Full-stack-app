import { Route, Redirect} from "react-router";
import { useContext } from "react";
import { Context } from "./Context";
export default function PrivateRoute({ children, ...rest }) {
    let context = useContext(Context)
    const authuser = context.authenticatedUser
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