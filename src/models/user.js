const mongoose = require("mongoose");
const UserType = require("./userType");
const ReadingSession = require("./readingSession");

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
  },
  userType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserType",
    required: true,
  },
  readingSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserType",
    required: true,
  },
  book_list: [
    {
      type: String,
      ref: "Book",
    },
  ],
  created_at: { 
    type: Date,
    default: Date.now
 },
});

module.exports = mongoose.model("User", userSchema);
