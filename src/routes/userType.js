const express = require("express");
const userTypeSchema = require("../models/userType");

const router = express.Router();

// create userType
router.post("/userTypes", (req, res) => {
  const userType = userTypeSchema(req.body);
  userType
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});
// list userType
router.get("/userTypes", (req, res) => {
  userTypeSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});
// get a userType
router.get("/userTypes/:id", (req, res) => {
  userTypeSchema
    .find({_id: req.params.id})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});
// update userType
router.put("/userTypes/:id", (req, res) => {
  userTypeSchema
    .updateOne({ _id: req.params.id }, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});
// delete userType
router.delete("/userTypes/:id", (req, res) => {
  userTypeSchema
    .deleteOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
