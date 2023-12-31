const express = require("express");
require("dotenv").config();

const cors = require("cors");
const { connecting } = require("./Config/db");
const { userRouter } = require("./Routes/user");


const app = express();
app.use(express.json());
app.use(cors());

app.use("/User",userRouter)



app.listen(5039, async () => {
  try {
    await connecting;
    console.log("Connected to Database Succesfully");
  } catch (error) {
    console.log(error);
    console.log("error Occured while connectng to db");
  }
  console.log("server is connected to port number 5039");
});



// const states = [
//   'Andhra Pradesh',
//   'Arunachal Pradesh',
//   'Assam',
//   'Bihar',
//   'Chhattisgarh',
//   'Goa',
//   'Gujarat',
//   'Haryana',
//   'Himachal Pradesh',
//   'Jharkhand',
//   'Karnataka',
//   'Kerala',
//   'Madhya Pradesh',
//   'Maharashtra',
//   'Manipur',
//   'Meghalaya',
//   'Mizoram',
//   'Nagaland',
//   'Odisha',
//   'Punjab',
//   'Rajasthan',
//   'Sikkim',
//   'Tamil Nadu',
//   'Telangana',
//   'Tripura',
//   'Uttar Pradesh',
//   'Uttarakhand',
//   'West Bengal',
//   'Andaman and Nicobar Islands',
//   'Chandigarh',
//   'Dadra and Nagar Haveli and Daman and Diu',
//   'Delhi',
//   'Lakshadweep',
//   'Puducherry',
// ];