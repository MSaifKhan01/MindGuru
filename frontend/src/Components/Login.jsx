import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../CSS/Signup.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post('http://localhost:5039/User/Login', formData);
      console.log(response.data)

      sessionStorage.setItem('userID', response.data.UserPresent._id);
      sessionStorage.setItem('token', response.data.token);
      localStorage.setItem('user', `${response.data.UserPresent.name}`);

      setFormData({
        email: '',
        phoneNumber: '',
        password: '', // Do not store sensitive information in the state
      });

      Swal.fire({
        title: `Hello! ${response.data.UserPresent.name}`,
        text: response.data.msg,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Login failed:', error);
      Swal.fire({
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Phone:
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} pattern="[0-9]+" />
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
