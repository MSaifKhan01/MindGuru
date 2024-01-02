import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import "../CSS/Signup.css";

const statesList = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password:"",
    gender: "Male",
    heardAbout: "",
    customCity: "",
    state: "",
  });
  const [selectedState, setSelectedState] = useState("");

  const handleChange02 = (e) => {
    setSelectedState(e.target.value);
  };

  const handleCheckboxChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      heardAbout: prevData.heardAbout.includes(value)
        ? prevData.heardAbout.filter((item) => item !== value)
        : [...prevData.heardAbout, value],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform your form submission or API request here

    try {
      const response = await axios.post(
        "http://localhost:5039/User/Signup",
        formData
      );

      console.log(response.data);

      // Reset the form data after signup
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        password:"password",
        gender: "Male",
        heardAbout: "",
        customCity: "",
        state: "",
      });

      Swal.fire({
        title: "Hello!",
        text: response.data.msg,
        icon: "success",
        confirmButtonText: "OK",
      });

      //   navigate('/'); // Redirect to the desired page after successful signup
    } catch (error) {
      console.error("Error during signup:", error);
    }
    console.log("Form data submitted:", formData);
  };

  return (
    <div>
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            pattern="[A-Za-z ]+"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="[0-9]+"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
           
          />
        </label>
        <label>
          Gender:
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Others"
                checked={formData.gender === "Others"}
                onChange={handleChange}
              />
              Others
            </label>
          </div>
        </label>

        <label>
          How did you hear about this?
          <div>
            <label>
              <input
                type="checkbox"
                name="heardAbout"
                value="LinkedIn"
                checked={formData.heardAbout.includes("LinkedIn")}
                onChange={() => handleCheckboxChange("LinkedIn")}
              />
              LinkedIn
            </label>
            <label>
              <input
                type="checkbox"
                name="heardAbout"
                value="Friends"
                checked={formData.heardAbout.includes("Friends")}
                onChange={() => handleCheckboxChange("Friends")}
              />
              Friends
            </label>
            <label>
              <input
                type="checkbox"
                name="heardAbout"
                value="JobPortal"
                checked={formData.heardAbout.includes("JobPortal")}
                onChange={() => handleCheckboxChange("JobPortal")}
              />
              Job Portal
            </label>
            <label>
              <input
                type="checkbox"
                name="heardAbout"
                value="Others"
                checked={formData.heardAbout.includes("Others")}
                onChange={() => handleCheckboxChange("Others")}
              />
              Others
            </label>
          </div>
        </label>

        <label>
          City:
          <input
            type="text"
            name="customCity"
            value={formData.customCity}
            onChange={handleChange}
          />
        </label>

        <div>
          <label>
            State:
            <select
              name="state"
              value={selectedState}
              onChange={handleChange02}
            >
              <option value="">Select State</option>
              {statesList.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "Male",
    heardAbout: "",
    customCity: "",
    state: "",
  });
  const [selectedState, setSelectedState] = useState("");

  const handleChange02 = (e) => {
    setSelectedState(e.target.value);
  };

  const handleCheckboxChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      heardAbout: prevData.heardAbout.includes(value)
        ? prevData.heardAbout.filter((item) => item !== value)
        : [...prevData.heardAbout, value],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform your form submission or API request here

    try {
      const response = await axios.post(
        "http://localhost:5039/User/Add",
        formData
      );

      console.log(response.data);

      // Reset the form data after signup
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        gender: "Male",
        heardAbout: "",
        customCity: "",
        state: "",
      });

      Swal.fire({
        title: "Hello!",
        text: response.data.msg,
        icon: "success",
        confirmButtonText: "OK",
      });

      //   navigate('/'); // Redirect to the desired page after successful signup
    } catch (error) {
      console.error("Error during signup:", error);
    }
    console.log("Form data submitted:", formData);
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            pattern="[A-Za-z ]+"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="[0-9]+"
          />
        </label>
        <label>
          Gender:
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Others"
                checked={formData.gender === "Others"}
                onChange={handleChange}
              />
              Others
            </label>
          </div>
        </label>

        <label>
          How did you hear about this?
          <div>
            <label>
              <input
                type="checkbox"
                name="heardAbout"
                value="LinkedIn"
                checked={formData.heardAbout.includes("LinkedIn")}
                onChange={() => handleCheckboxChange("LinkedIn")}
              />
              LinkedIn
            </label>
            <label>
              <input
                type="checkbox"
                name="heardAbout"
                value="Friends"
                checked={formData.heardAbout.includes("Friends")}
                onChange={() => handleCheckboxChange("Friends")}
              />
              Friends
            </label>
            <label>
              <input
                type="checkbox"
                name="heardAbout"
                value="JobPortal"
                checked={formData.heardAbout.includes("JobPortal")}
                onChange={() => handleCheckboxChange("JobPortal")}
              />
              Job Portal
            </label>
            <label>
              <input
                type="checkbox"
                name="heardAbout"
                value="Others"
                checked={formData.heardAbout.includes("Others")}
                onChange={() => handleCheckboxChange("Others")}
              />
              Others
            </label>
          </div>
        </label>

        <label>
          City:
          <input
            type="text"
            name="customCity"
            value={formData.customCity}
            onChange={handleChange}
          />
        </label>

        <div>
          <label>
            State:
            <select
              name="state"
              value={selectedState}
              onChange={handleChange02}
            >
              <option value="">Select State</option>
              {statesList.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export { AddUserForm, SignupForm };

//   try {
//     const response = await axios.post('http://localhost:5039/User/Signup', formData);

//     console.log(response.data);

// Reset the form data after signup
//     setFormData({
//       name: '',
//       email: '',
//       phoneNumber: '',
//       password: '',
//     });

//     Swal.fire({
//       title: 'Hello!',
//       text: response.data.msg,
//       icon: 'success',
//       confirmButtonText: 'OK'
//     });

//   //   navigate('/'); // Redirect to the desired page after successful signup
//   } catch (error) {
//     console.error('Error during signup:', error);
//   }
