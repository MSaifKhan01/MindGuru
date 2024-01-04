import React from "react";

import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate=useNavigate()

  const logout = () => {
   
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userID");
    navigate("/")
  
  };

  return (
    <nav>
      <div id="logo">
        <img
          src="https://img.freepik.com/free-vector/three-translucent-letters_1025-765.jpg?w=740&t=st=1701018283~exp=1701018883~hmac=9689d28f2725af3d65ca7db091328ee58d739a2349625ed45a696df1ee374313"
          alt=""
        />
      </div>
      {auth ? (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user/add">Add A User</Link>
          </li>
          <li>
            <Link to="/">All Users Added By you</Link>
          </li>
          <li>
            <Link onClick={logout} to="/">
              Logout ({auth})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <Link to="/user/add">Add A User</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/SignUp">SignUp</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
