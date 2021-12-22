import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import Cookies from "js-cookie";
import "./styles/global.css";
//Higher order components import
import PrivateRoute from "./PrivateRoute";
import Provider, { UserContext } from "./Context";
//components import
import Courses from "./components/Courses";
import Header from "./components/Header";
import CourseDetails from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UpdateCourse from "./components/UpdateCourse";
import CreateCourse from "./components/CreateCourse";
import UserSignOut from "./components/UserSignOut";
import NotFound from "./components/NotFound";
import DeleteCourse from "./components/DeleteCourse";
import UnhandledErrors from "./components/UnhandledError";
import Forbidden from "./components/Forbidden";

function App() {
  const provider = Provider;
  const actions = {
    signIn: provider.signIn,
    signOut: provider.signOut,
  };

  const cookie = Cookies.get("authenticatedUserToken");
  const parsedCookie = cookie ? JSON.parse(cookie) : null;
  const [authuser, setAuthUser] = useState(parsedCookie);
  const value = {
    authuser,
    actions,
  };

  const [context, setContext] = useState(value);
  return (
    <BrowserRouter>
      <UserContext.Provider value={[context, setContext]}>
        <Header />

        <Switch>
          <Route exact path="/">
            <Courses />
          </Route>
          <PrivateRoute path="/courses/create">
            <CreateCourse />
          </PrivateRoute>
          <PrivateRoute exact path="/courses/:id/update">
            <UpdateCourse />
          </PrivateRoute>
          <PrivateRoute exact path="/courses/:id/delete">
            <DeleteCourse />
          </PrivateRoute>
          <Route path="/courses/:id">
            <CourseDetails />
          </Route>
          <Route
            path="/sign-in"
            render={(props) => <UserSignIn {...props} />}
          />

          <Route path="/sign-up">
            <UserSignUp />
          </Route>
          <Route path="/sign-out">
            <UserSignOut />
          </Route>
          <Route path="/error">
            <UnhandledErrors />
          </Route>
          <Route path="/forbidden">
            <Forbidden />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
