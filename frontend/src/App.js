
import './App.css';
import LoginForm from './Components/Login';
import Navbar from './Components/Navbar';
import {SignupForm,AddUserForm} from './Components/SignUp';
import UserList from './Components/UserList';

function App() {
  return (
    <div className="App">

      <Navbar />
      <h1>Hello</h1>

      <SignupForm />

      <AddUserForm />

      <LoginForm />

      <UserList />
     
    </div>
  );
}

export default App;
