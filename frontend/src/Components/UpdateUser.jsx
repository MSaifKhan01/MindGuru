import React,{useEffect,useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';


const UpdateUser=()=>{
    const token=sessionStorage.getItem('token');
    // const userID=sessionStorage.getItem('userID');
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const params=useParams();
    const navigate=useNavigate();
  
    useEffect(()=>{
      const UserDetails=async()=>{
        try{
          let result=await fetch(`http://localhost:5039/User/${params.id}`,{
            headers:{
              Authorization:`${token}`,
            },
          });
          
          result=await result.json();
          console.log("hfghvh",result)
          setName(result.name);
          setEmail(result.email);
          setPhone(result.phone);
        }catch(error){
          console.error("Error fetching user details:",error);
        }
      };
  
      UserDetails();
    }, [params.id,token]);
  
    const updateUser=async()=>{
      try{
        let result=await fetch(`http://localhost:5039/User/Update/${params.id}`,{
          method:"PUT",
          body:JSON.stringify({
            name,
            email,
            phone,
          }),
          headers:{
            "Content-Type":"application/json",
            Authorization:`${token}`,
          },
        });
  
        result=await result.json();
  
        Swal.fire({
          text:result.msg,
          icon:'success',
          confirmButtonText:'OK',
        });
  
        navigate("/");
      }catch(error) {
        console.error("Error updating user:",error);
  
        Swal.fire({
          text:"Something went wrong",
          icon:'error',
          confirmButtonText:'OK',
        });
      }
    };
  
    return(
      <div className="user">
        <h1>Update User</h1>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={updateUser}>Update User</button>
      </div>
    );
  };
  
  export default UpdateUser;
  