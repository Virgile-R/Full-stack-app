
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './styles/global.css';
//components import
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
        <Route exact path='/courses/:id/update'>
          <UpdateCourse />
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
        
      </Switch>
    </BrowserRouter>
     
    
  )
}

export default App;
