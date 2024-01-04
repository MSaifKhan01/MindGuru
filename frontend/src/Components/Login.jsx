import React,{ useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../CSS/Signup.css';

const LoginForm=()=>{

  const navigate=useNavigate()
  
  const [formData,setFormData]=useState({
    email:'',
   
    password:'',
  });

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prevData)=>({...prevData,[name]:value}));
  };

  const ForLoginFun=async(e)=>{
    e.preventDefault(); 

    try{
      const Res= await axios.post('https://mindgurubackend.onrender.com/User/Login',formData);
      console.log(Res.data)

      sessionStorage.setItem('userID',Res.data.UserPresent._id);
      sessionStorage.setItem('token',Res.data.token);
      localStorage.setItem('user',`${Res.data.UserPresent.name}`);

      setFormData({
        email:'',
        
        password:'', 
      });

      Swal.fire({
        title:`Hello! ${Res.data.UserPresent.name}`,
        text:Res.data.msg,
        icon:'success',
        confirmButtonText:'OK',
      });
      navigate("/")
    }catch(error) {
      console.error('Login failed:',error);
      Swal.fire({
        text:'Something went wrong',
        icon:'error',
        confirmButtonText:'OK',
      });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={ForLoginFun}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
       
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
