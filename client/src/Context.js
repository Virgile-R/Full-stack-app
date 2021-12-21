import React, { Component } from "react";
import DataFetching from "./DataFetching";
import Cookies from "js-cookie";

//Create a Context instance
export const Context = React.createContext();

//Create the Provider class for the context

export class Provider extends Component {
  constructor() {
    super();
    //new instance of DataFetching
    this.data = new DataFetching();
    this.cookie = Cookies.get("authenticatedUserToken");
    this.state = {
      //if a cookie is present, the state is set to its content
      authenticatedUserToken: this.cookie ? JSON.parse(this.cookie) : null,
    };
  }

  render() {
    const { authenticatedUserToken } = this.state;
    const value = {
      authenticatedUserToken,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    //the Provider sits at the top of the component tree and passes its props to his children
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  //helper methods for sign-in and out

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

export const Consumer = Context.Consumer;
