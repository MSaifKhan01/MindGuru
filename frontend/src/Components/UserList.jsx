import React,{useState,useEffect} from "react";
import axios from "axios";

import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import "../CSS/UserList.css";

const UserList=()=>{
  let token =sessionStorage.getItem('token');



  const [users,setUsers]=useState([]);
  const [searchQuery,setSearchQuery]=useState("");
  const [page,setPage]=useState(1);
  const [totalPages,setTotalPages]=useState(1);
  const [filters,setFilters]=useState({
    name:"",
    email:"",
    phone:"",
  });

  const [sortOrder,setSortOrder]=useState("asc");
  const [sortField,setSortField]=useState("name"); 

  const DeleteUserFun=async(userId)=>{
    try{
      const Res=await axios.delete(
        `https://mindgurubackend.onrender.com/User/Delete/${userId}`,{
          headers:{
            Authorization:`${sessionStorage.getItem('token')}`,
          }
        }
      );
      
      console.log("User deleted:",Res.data);
      Swal.fire({
        text:Res.data.msg,
        icon:"success",
        confirmButtonText:"OK",
      });

      fetchUsers();
    }catch(error){
      console.error("Error deleting user:",error);
      Swal.fire({
        text:"Something went wrong",
        icon:"error",
        confirmButtonText:"OK",
      });
    }
  };

  const fetchUsers=async()=>{
    console.log(token)
    try {
      const Res=await axios.get(
        `https://mindgurubackend.onrender.com/User/All-Users?page=${page}&search=${searchQuery}&sort=${sortOrder}&sortField=${sortField}`,
        {
          params: filters,
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setUsers(Res.data.users);
      setTotalPages(Res.data.totalPage);
      console.log("gdcgc",Res.data)
    } catch (error) {
      console.error("Error fetching users:",error);
    }
  };

  const ForFilterFun=(filter,value)=>{
    setFilters({...filters,[filter]:value});
  };

  const ForPaginationFun=(newPage)=>{
    setPage(newPage);
  };

  const SortOrderNameToggleFun=()=>{
    setSortOrder(sortOrder==="asc"?"desc":"asc");
  };

  const SortingBaseFieledFun=(field)=>{
    setSortField(field);
  };

  useEffect(() => {
    fetchUsers();
  },[searchQuery,page,filters,sortOrder,sortField]);

  return(
    <div className="mainBox">
      <div className="filterBoxes">
        <div>
          <label>Search by any field Name</label>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={filters.name}
            onChange={(e) => ForFilterFun("name", e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="text"
            value={filters.email}
            onChange={(e) => ForFilterFun("email", e.target.value)}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={filters.phone}
            onChange={(e) => ForFilterFun("phone", e.target.value)}
          />
        </div>
      </div>
      <div className="sortButtons">
        <button onClick={SortOrderNameToggleFun}>
          Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </button>
        <label>
          Sort By:
          <select
            value={sortField}
            onChange={(e) => SortingBaseFieledFun(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </label>
      </div>
      {token ? (
      users.length > 0 ? (
        <div className="user-list">
          {users.map((user) => (
            <div key={user._id} className="user-card Lnk">
              <Link className="Lnk" to={"/user/" + user._id}>
                <div>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Gender: {user.gender}</p>
                  <p>Phone: {user.phone}</p>
                  <p>City: {user.city}</p>
                </div>
              </Link>

              <button onClick={() => DeleteUserFun(user._id)}>Delete</button>
              <button className="Lnk">
                <Link to={`/update/${user._id}`}>Update User</Link>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <img src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127829.jpg?w=740&t=st=1704368125~exp=1704368725~hmac=147e9490ec3256b2385a731a4b719e5fb44b85a79dd497ae9fb84d9c8aa0e18d" alt="Data Not Found" />
      )
    ) : (
      <div className="user-not-logged-in">
      <p>User not Logged in</p>
    </div>
    )}

     {token && users.length > 0 ? (
        <div className="btnsContainer">
          {Array(totalPages)
            .fill()
            .map((_, index) => (
              <button key={index + 1} onClick={() => ForPaginationFun(index + 1)}>
                {index + 1}
              </button>
            ))}
        </div>
      ) :null}
    
  </div>
);
}

export default UserList;
