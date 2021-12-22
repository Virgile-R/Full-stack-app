import React, { Component } from "react";
import DataFetching from "./DataFetching";
import Cookies from "js-cookie";

//Create a Context instance
export const UserContext = React.createContext();

//Create the Provider class for the context

class Provider extends Component {
  constructor() {
    console.log("Rebuilding...");
    super();
    //new instance of DataFetching
    this.data = DataFetching;
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    //if a user is found, sets the returned user token as the authenticated user's token and sets a cookie with his infos
    if (user !== null) {
      this.setState({ authenticatedUserToken: user });
      Cookies.set("authenticatedUserToken", JSON.stringify(user), {
        expires: 1,
      });
    }
    return user;
  };

  signOut = () => {
    this.setState({ authenticatedUserToken: null });
    Cookies.remove("authenticatedUserToken");
  };
}

export default new Provider();
