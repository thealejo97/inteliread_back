const mongoose = require("mongoose");
const UserType = require("./userType");
const ReadingSession = require("./readingSession");
const bcrypt = require("bcryptjs");

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
    minlength: 8,
  },
  phone: {
    type: Number,
  },
  userType: {
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
  
// Antes de guardar el usuario en la base de datos, se encripta su contraseña
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  next();
});

// Método para verificar si una contraseña es válida
userSchema.methods.checkPassword = async function (password) {
  const user = this;
  const match = await bcrypt.compare(password, user.password);
  return match;
};

//Metodo estatico para autenticar 
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    return true;
  }
  const isMatch = await user.checkPassword(password);
  if (!isMatch) {
    return false;
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
