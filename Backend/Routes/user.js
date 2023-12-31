const express = require("express");

const jwt = require("jsonwebtoken");
const UserModel = require("../Models/SignUpIn");
const UserListModel = require("../Models/user");
const { Auth } = require("../Middleware/auth");
const bcrypt=require("bcrypt")

const userRouter = express.Router();
require("dotenv").config()

userRouter.post("/Signup", async (req, res) => {
  const { email, phoneNumber, name, password } = req.body;
  try {
    if (!email && !phoneNumber) {
      return res
        .status(400)
        .send("You need to provide at least email or phoneNumber, or both");
    }
    const userFind = await UserModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (userFind) {
      return res
        .status(409)
        .send("User already exists. Please login directly.");
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const NewUser = new UserModel({
      email,
      phoneNumber,
      name,
      password: hashedPassword,
    });

    await NewUser.save();

    res.status(201).send("you Are Registered Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRouter.post("/Login", async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  try {
    if (!(email || phoneNumber)) {
      return res
        .status(400)
        .send("You need to provide at least email or phoneNumber,");
    }

    if (!password) {
      return res.status(400).send("You need to provide password");
    }

    let query = {};
    if (email) {
      query.email = email;
    } else {
      query.phoneNumber = phoneNumber;
    }

    const UserPresent = await UserModel.findOne(query);
    // UserModel.findOne({ $or: [{ email }, { phoneNumber }] });
    if (UserPresent) {
      bcrypt.compare(password, UserPresent.password, (err, result) => {
        if (result) {
          const Token = jwt.sign(
            { userID: UserPresent._id },
            process.env.JWT_Secret,
            { expiresIn: "3h" }
          );

          return res
            .status(201)
            .send({
              msg: "login succesfully",
              name: UserPresent.name,
              UserPresent,
              token: Token,
            });
        } else {
          return res.status(400).send("password not matched");
        }
      });
    } else {
      return res.status(404).send("You need to SignUp First");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Getting all users
userRouter.get("/users", async (req, res) => {
  try {
    const query = {};

  

    if (req.query.name) {
      query.name = req.query.name;
    }

    if (req.query.email) {
      query.email = req.query.email;
    }

    if (req.query.phone) {
      query.phone = req.query.phone;
    }

    const page = Number(req.query.page);
    const limit = 20;
    let usersDataLength = await UserListModel.find().count();
    totalPage = Math.ceil(usersDataLength / 20);
    // console.log("totalPages",totalPage)

    // searching functionality
    if (req.query.search) {
      // regular expression for case-insensitive search
      query.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
      
        { email: { $regex: req.query.search, $options: "i" } },
      
        { phone: { $regex: req.query.search, $options: "i" } },
      ];
    }

     // Sorting functionality
     let sortDirection = 1; // Default: A to Z

     if (req.query.sort && req.query.sort.toLowerCase() === 'desc') {
       sortDirection = -1; // Z to A
     }
 
     let sortField = 'name'; 
 
     if (req.query.sortField) {
       sortField = req.query.sortField;
     }

    let users;

    if (page) {
      // If page is provided, apply pagination
      users = await UserListModel
        .find(query)
        .sort({ [sortField]: sortDirection })
        .skip((page - 1) * limit)
        .limit(limit).populate('userID'); 
    } else {
      // If page is not provided, return all users
      users = await UserListModel.find(query).sort({ [sortField]: sortDirection }).populate('userID'); 
    }

    res.status(200).send({ users, totalPage });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Getting user by id
userRouter.get("/users/:id",Auth, async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserListModel.findById(userId);

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Updating the user by id
userRouter.put("/users/:id",Auth, async (req, res) => {
  try {
    const userId = req.params.id;

    const existingUser = await UserListModel.findById(userId);

    if (!existingUser) {
      return res.status(404).send({ msg: "User not found" });
    }

    const updatedUser = await UserListModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.status(200).send({ msg: "User Updated", updatedUser });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Deleting the user by id
userRouter.delete("/users/:id",Auth, async (req, res) => {
  try {
    const userId = req.params.id;

    const userToDelete = await UserListModel.findById(userId);

    if (!userToDelete) {
      return res.status(404).send({ msg: "User not found" });
    }

    await UserListModel.findByIdAndDelete(userId);

    res.status(200).send({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//   for adding a user 



userRouter.post("/Add-User",Auth,  async (req, res) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_Secret);
  
     const {name,email,phone,gender,heardAbout,city,state}=req.body
  
      const existingUser = await UserListModel.findOne({
        userID: decoded.userID,
        email,
      });
  
      if (!existingUser) {
        const newTeam = new UserListModel({
          userID: decoded.userID,
          name,
          email,
          phone,
          gender,
          heardAbout,
          city,
          state
         
        });
  
        await newTeam.save();
  
        res.status(201).send({ data: newTeam, msg: "Member Added successfully" });
      } else {
        res.status(200).send({ msg: "Member already exists in the team" });
      }
    } catch (error) {
     
      res.status(500).send({ error: error.message || "Internal Server Error" });
    }
  });

module.exports = { userRouter };
