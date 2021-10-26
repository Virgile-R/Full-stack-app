import { useParams, useHistory } from "react-router";
import { useContext } from "react";
import { Context } from "../Context";
export default function DeleteCourse() {
    const history = useHistory()
    let { id } = useParams();
    const context = useContext(Context)
    const authuser  = context.authenticatedUser
    const request = {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json',
                   'Authorization': `Basic ${authuser.authenticationToken}` 
    }
    }
    fetch('http://localhost:5000/api/courses/' + id, request)
        .then((response) => {
            if (response.status === 204){
               history.push("/")
            }
        })
    return null    
       
}