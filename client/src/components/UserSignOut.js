import { Redirect } from "react-router";
import { UserContext } from "../Context";
import { useContext, useEffect } from "react";

export default function UserSignOut() {
  const context = useContext(UserContext);

  context[0].actions.signOut();

  // if (context.authenticatedUserToken !== null) return null;

  return <Redirect to="/" />;
}
