import { Redirect } from "react-router";
import { Context } from "../Context";
import { useContext } from "react";

export default function UserSignOut(){
    const context = useContext(Context)
    context.actions.signOut()
    return(
        <Redirect to='/'/>
    )
}