import React,{useState,useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const UserDetail=()=>{
  const [user,setUser]=useState(null);
  const [error,setError]=useState(null);

  const params=useParams();

  useEffect(()=>{
    const fetchUser=async()=>{
      try {
        const token=sessionStorage.getItem('token');
        const Res=await axios.get(`http://localhost:5039/User/${params.id}`,{
          headers:{
            Authorization:`${token}`,
          },
        });

       
        console.log("User Data :",Res.data);
        setUser(Res.data);
      } catch (error) {
        console.error("Error fetching user:",error);
        setError("User not found");
      }
    };

    fetchUser();
  },[params.id]);

  return(
    <div>
      {error?(
        <p>{error}</p>
      ):user?(
        <div>
          <h1>User Details</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Phone: {user.phone}</p>
          <p>City: {user.city}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetail;
