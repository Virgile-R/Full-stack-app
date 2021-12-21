import { Redirect } from "react-router";
import { Context } from "../Context";
import { useContext, useEffect } from "react";

export default function UserSignOut() {
  const context = useContext(Context);

  useEffect(() => {
    context.actions.signOut();
  }, [context.actions]);

  if (context.authenticatedUserToken !== null) return null;

  return <Redirect to="/" />;
}
