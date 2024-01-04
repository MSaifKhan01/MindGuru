import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import "../CSS/Signup.css";

const statesList=[
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

const SignupForm=()=>{
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    phoneNumber:"",
    password:"",
    gender:"Male",
    heardAbout:"",
    customCity:"",
    state:"",
  });
  const [selectedState,setSelectedState]=useState("");

  const StateSelectFun=(e)=>{
    setSelectedState(e.target.value);
  };

  const CheckboxForJobFun=(value)=>{
    setFormData((prevData)=>({
      ...prevData,
      heardAbout:prevData.heardAbout.includes(value)
        ? prevData.heardAbout.filter((item)=>item !==value)
        :[...prevData.heardAbout,value],
    }));
  };

  const ValueTakingFun=(e)=>{
    const {name,value}=e.target;
    setFormData((prevData)=>({...prevData,[name]:value}));
  };

  const SubmitFormDataFun=async(e)=>{
    e.preventDefault();
  

    try{
      const res=await axios.post(
        "https://mindgurubackend.onrender.com/User/Signup",
        formData
      );

      console.log(res.data);


      setFormData({
        name:"",
        email:"",
        phoneNumber:"",
        password:"password",
        gender:"Male",
        heardAbout:"",
        customCity:"",
        state:"",
      });

      Swal.fire({
        title:"Hello!",
        text:res.data.msg,
        icon:"success",
        confirmButtonText:"OK",
      });

        navigate('/Login'); 
    }catch(error){
      console.error("Error during signup:",error);
    }
    console.log("Form data submitted:",formData);
  };

  return (
    <div>
      <h2>SignUp</h2>
      <form onSubmit={SubmitFormDataFun}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={ValueTakingFun}
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
            onChange={ValueTakingFun}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={ValueTakingFun}
            pattern="[0-9]+"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={ValueTakingFun}
           
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
                onChange={ValueTakingFun}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={ValueTakingFun}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Others"
                checked={formData.gender === "Others"}
                onChange={ValueTakingFun}
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
                onChange={() => CheckboxForJobFun("LinkedIn")}
              />
              LinkedIn
            </label>
            <label>
              <input
                type="checkbox"
                name="heardAbout"
                value="Friends"
                checked={formData.heardAbout.includes("Friends")}
                onChange={() => CheckboxForJobFun("Friends")}
              />
              Friends
            </label>
            <label>
              <input
                type="checkbox"
                name="heardAbout"
                value="JobPortal"
                checked={formData.heardAbout.includes("JobPortal")}
                onChange={() => CheckboxForJobFun("JobPortal")}
              />
              Job Portal
            </label>
            <label>
              <input
                type="checkbox"
                name="heardAbout"
                value="Others"
                checked={formData.heardAbout.includes("Others")}
                onChange={() => CheckboxForJobFun("Others")}
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
            onChange={ValueTakingFun}
          />
        </label>

        <div>
          <label>
            State:
            <select
              name="state"
              value={selectedState}
              onChange={StateSelectFun}
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

export default SignupForm;
