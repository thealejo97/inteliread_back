const express = require("express");
const axios = require("axios");
const readingSessionSchema = require("../models/readingSession");

const router = express.Router();

router.post("/booksApi/getBookInfo", (req, res) => {
  try {
    console.log(req.body)
    const keyBook = req.body.key;
    axios.get("https://openlibrary.org/api/books", {
      params: {
        bibkeys: keyBook,
        jscmd: "data",
        format: "json"
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("error in the request to openlibrary api");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("error in the request to openlibrary api");
  }
});

module.exports = router;
