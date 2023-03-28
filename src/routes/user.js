const express = require("express");
const userSchema = require("../models/user");
const jwt = require('jsonwebtoken');

const router = express.Router();

// create user
router.post("/users", (req, res) => {
  console.log("Guardando usuario")
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error saving the user into the database" });
    });
});
// list user
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});
// get a user
router.get("/users/:id", (req, res) => {
  userSchema
    .find({_id: req.params.id})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});
// update user
router.put("/users/:id", (req, res) => {
  userSchema
    .updateOne({ _id: req.params.id }, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});
// delete user
router.delete("/users/:id", (req, res) => {
  userSchema
    .deleteOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

// login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userSchema.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "invalid user" });
    }

    const isMatch = await userSchema.authenticate(username,password);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({ error: "invalid password" });
    }
    
    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
   
    res.json({ token, id: user._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
});


module.exports = router;
