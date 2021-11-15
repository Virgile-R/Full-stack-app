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
      this.setState(() => {
        return {
          authenticatedUserToken: user.userToken,
        };
      });
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

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 *
 * Code snippet from the TeamTreeHouse Workshop on React Auth
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
