const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  heardAbout: String,
  city: String,
  state: String,
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const UserListModel = mongoose.model('UserList', userSchema);

module.exports = UserListModel;
