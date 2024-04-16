import { useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar.js';
import Home from './Home.js';
import { BrowserRouter as Router,Route ,Switch } from 'react-router-dom/cjs/react-router-dom.min.js';
import LogIn from './Components/Auth/LogIn.js';
import SignUp from './Components/Auth/SignUp.js';
import NewBook from './Components/Admin/AddBook.js';
import ProtectedRoute from './Components/Routes/ProtectedRoute.js';
import BooksDetails from './Components/BooksDetails.js';
import { loadUser} from './Action/UserActions.js';
import store from './store.js';
import Profile from './Components/User/Profile.js';
import UpdateProfile from './Components/User/UpdateProfile.js';
import UpdatePassword from './Components/User/UpdatePassword.js';
import ABookList from './Components/Admin/ABooksList.js';
import OverDueUser from './Components/Admin/OverDueUser.js';
import ReturnBooks from './Components/Admin/ReturnBooks.js';
import LandingPage from './Pages/LandingPages/LandingPage.js';
import AllUsers from './Components/Admin/AllUsers.js';
import IssueBook from './Components/Admin/IssueBooks.js';
import AddUser from './Components/Admin/AddUser.js';
import Stats from './Components/Admin/Stats.js';
import { ResultPage } from './Components/Searchbar/SearchResultsList.js';
import IssueBookTo from './Components/Admin/IssueBookTo.js';

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <h1 className="content">
          <Switch>
            <Route exact path ='/'>
              <LandingPage/>
            </Route>
            <Route exact path ='/Books'>
              <Home/>
            </Route>
            <Route path ='/Result/:res'>
              <ResultPage/>
            </Route>
            <Route path = '/LogIn'>
              <LogIn/>
            </Route>
            <Route path = '/SignUp'>
              <SignUp/>
            </Route>
            <ProtectedRoute exact path = '/me' component={Profile} />
            <ProtectedRoute path ='/Books/:id' component={BooksDetails}/>
            <ProtectedRoute path ='/me/update' component={UpdateProfile}/>
            <ProtectedRoute path ='/password/update' component={UpdatePassword}/>
            <ProtectedRoute exact path ='/admin/Books' isAdmin={true} component={ABookList}/>
            <ProtectedRoute path ='/admin/Books/New' isAdmin={true} component={NewBook}/>
            <ProtectedRoute exact path ='/admin/issue' isAdmin={true} component={IssueBook}/>
            <ProtectedRoute exact path ='/admin/IssueBookTo/:id' isAdmin={true} component={IssueBookTo}/>
            <ProtectedRoute path ='/admin/Users/New' isAdmin={true} component={AddUser}/>
            <ProtectedRoute path ='/admin/overdue' isAdmin={true} component={OverDueUser}/>
            <ProtectedRoute path ='/admin/returnbooks' isAdmin={true} component={ReturnBooks}/>
            <ProtectedRoute path ='/admin/AllUsers' isAdmin={true} component={AllUsers}/>
            <ProtectedRoute path ='/admin/stats' isAdmin={true} component={Stats}/>
          </Switch>
        </h1>

      </div>
    </Router>
  );
}

export default App;
