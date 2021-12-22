import { useParams, useHistory } from "react-router";
import { useContext } from "react";
import { UserContext } from "../Context";
export default function DeleteCourse() {
  const history = useHistory();
  let { id } = useParams();
  const context = useContext(UserContext);
  const authUserToken = context.authenticatedUserToken.user.userToken;
  const request = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authUserToken}`,
    },
  };
  fetch("http://localhost:5000/api/courses/" + id, request).then((response) => {
    if (response.status === 204) {
      history.push("/");
    }
  });
  return null;
}
