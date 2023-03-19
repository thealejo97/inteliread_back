const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

// create user
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
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

module.exports = router;
