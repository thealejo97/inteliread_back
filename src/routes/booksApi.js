const express = require("express");
const axios = require("axios");
const readingSessionSchema = require("../models/readingSession");

const router = express.Router();

router.post("/booksApi/getBookInfo", (req, res) => {
  try {
    console.log(req.body) 
    const workId = req.body.workId;
    var url = process.env.URL_OPEN_LIBRARY_SEARCH_BY_BOOK_KEY+workId+".json";
    axios.get(url, {
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

router.post("/booksApi/searchBookTitle", (req, res) => {
  try {
    console.log(req.body)
    console.log(process.env.URL_OPEN_LIBRARY_SEARCH_BY_TITLE)
    const title = req.body.title;

    axios.get(process.env.URL_OPEN_LIBRARY_SEARCH_BY_TITLE, {
      params: {
        title: title,
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

router.post("/booksApi/searchBookAuthor", (req, res) => {
  try {
    console.log(req.body)
    console.log(process.env.URL_OPEN_LIBRARY_SEARCH_BY_AUTHOR)
    const author = req.body.author;

    axios.get(process.env.URL_OPEN_LIBRARY_SEARCH_BY_AUTHOR, {
      params: {
        author: author,
        jscmd: "data",
        format: "json"
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      console.log(response.config.url); // Aquí se imprime la URL utilizada
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



router.post("/booksApi/getAllBooks", (req, res) => {
  try {
    console.log(process.env.URL_OPEN_LIBRARY_GET_ALL_BOOKS);

    axios.get(process.env.URL_OPEN_LIBRARY_GET_ALL_BOOKS, {
      params: {
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
