
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './styles/global.css';
//Higher order components import
import PrivateRoute from './PrivateRoute';
//components import
import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetails from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import DeleteCourse from './components/DeleteCourse';
import UnhandledErrors from './components/UnhandledError';
import Forbidden from './components/Forbidden';
function App() {
  
  

  return (
    <BrowserRouter>
      <Header />
   
      <Switch>
        <Route exact path='/'>
         
          <Courses />
        </Route>
        <PrivateRoute path="/courses/create">
          <CreateCourse />
        </PrivateRoute> 
        <PrivateRoute exact path='/courses/:id/update'>
          <UpdateCourse />
        </PrivateRoute>
        <PrivateRoute exact path='/courses/:id/delete'>
          <DeleteCourse />
        </PrivateRoute>
        <Route  path='/courses/:id'>
          <CourseDetails />
        </Route>
        <Route path='/sign-in' render={(props) =>  <UserSignIn {...props}/> } />
         
      
        <Route path='/sign-up'>
          <UserSignUp />
        </Route>
        <Route path='/sign-out'>
          <UserSignOut />
        </Route>
        <Route path='/error'>
          <UnhandledErrors />
        </Route>
        <Route path='/forbidden'>
          <Forbidden />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
     
    
  )
}

export default App;
