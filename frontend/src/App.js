
import './App.css';



import { Routes, Route } from "react-router-dom";

import SignUpPage from './Pages/SignUpPage';

import LoginPage from './Pages/LoginPage';

import AddUserPage from './Pages/AddUserPage';


import UserDataPage from './Pages/UserDataPage';

import UserDetailPage from './Pages/UserDetailPage';


import UserUpadatePage from './Pages/UserUpadtePage';



function App() {
  return (
    <div className="App">

<Routes>
      
      <Route path="/" element={<UserDataPage />} />
      

      <Route path="/Login" element={<LoginPage />} />
      <Route path="/SignUp" element={<SignUpPage />} />
      <Route path="/update/:id" element={<UserUpadatePage />} />
      <Route path="/user/:id" element={<UserDetailPage />} />

      <Route path="/user/add" element={<AddUserPage />} />
     
    </Routes>

    </div>
  );
}

export default App;















// import UserListPage from "../Pages/UserListPage";
// import LoginPage from "../Pages/LoginPage";
// import UpdateUserPage from "../Pages/UpdateUserPage";
// import UserDetailsPage from "../Pages/UserDetailsPage";
// import AddUserPage from "../Pages/AddUserPage";
// import TeamPage from "../Pages/TeamPage";


// function Path() {
//   return (
//     <Routes>
      
//       <Route path="/" element={<UserDataPage />} />
      

//       <Route path="/Login" element={<LoginPage />} />
//       <Route path="/SignUp" element={<SignUpPage />} />
//       <Route path="/update/:id" element={<UserUpadatePage />} />
//       <Route path="/user/:id" element={<UserDetailPage />} />

//       <Route path="/user/add" element={<AddUserPage />} />
     
//     </Routes>
//   );
// }