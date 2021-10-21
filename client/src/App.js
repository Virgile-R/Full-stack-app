
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './styles/global.css';
import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetails from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UpdateCourse from './components/UpdateCourse';

function App() {
  
  

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Courses />
        </Route>
        <Route  path='/courses/:id'>
          <CourseDetails />
        </Route>
        <Route path='/signin'>
          <UserSignIn/>
        </Route>
        <Route path='/signup'>
          <UserSignUp />
        </Route>
        <Route exact path='/update/:id'>
          <UpdateCourse />
        </Route>
      </Switch>
    </BrowserRouter>
     
    
  )
}

export default App;
