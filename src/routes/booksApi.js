const express = require("express");
const axios = require("axios");
const readingSessionSchema = require("../models/readingSession");

const router = express.Router();

router.post("/booksApi/getBookInfo", (req, res) => {
  try {
    //console.log(req.body) 
    const workId = req.body.workId;
    var url = process.env.URL_OPEN_LIBRARY_SEARCH_BY_BOOK_KEY+workId+".json";
    axios.get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      //console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      //console.error(error);
      res.status(500).send("error in the request to openlibrary api");
    });
  } catch (error) {
    //console.error(error);
    res.status(500).send("error in the request to openlibrary api");
  }
});

router.post("/booksApi/searchBookTitle", (req, res) => {
  try {
    //console.log(req.body)
    //console.log(process.env.URL_OPEN_LIBRARY_SEARCH_BY_TITLE)
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
      //console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      //console.error(error);
      res.status(500).send("error in the request to openlibrary api");
    });
  } catch (error) {
    //console.error(error);
    res.status(500).send("error in the request to openlibrary api");
  }
});

router.post("/booksApi/searchBookAuthor", (req, res) => {
  try {
    //console.log(req.body)
    //console.log(process.env.URL_OPEN_LIBRARY_SEARCH_BY_AUTHOR)
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
      //console.log(response.config.url); // Aquí se imprime la URL utilizada
      //console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      //console.error(error);
      res.status(500).send("error in the request to openlibrary api");
    });
  } catch (error) {
    //console.error(error);
    res.status(500).send("error in the request to openlibrary api");
  }
});

router.post("/booksApi/getAllBooks", (req, res) => {
  try {
    const random_search = [
      "sombra",
      "sueño",
      "luz",
      "viento",
      "trueno",
      "fuego",
      "ciudad",
      "amor",
      "odio",
      "venganza",
      "paz",
      "guerra",
      "muerte",
      "vida",
      "sangre",
      "furia",
      "mar",
      "tierra",
      "aire",
      "nube",
      "humo",
      "hielo",
      "infierno",
      "paraíso",
      "calle",
      "luna",
      "sol",
      "corazón",
      "alma",
      "carne",
      "hueso",
      "mente",
      "palabra",
      "pensamiento",
      "mundo",
      "universo",
      "futuro",
      "pasado",
      "presente",
      "sabiduría",
      "conocimiento",
      "poder",
      "misterio",
      "fantasma",
      "leyenda",
      "aventura",
      "pasión",
      "tragedia",
      "comedia",
      "drama"
    ];
    const limit = req.body.limit;
    const q = random_search[Math.floor(Math.random() * 51)];
    
    const url = process.env.URL_OPEN_LIBRARY_GET_ALL_BOOKS.replace('${q}', q).replace('${limit}', limit);
    axios.get(url, {
      params: {
        jscmd: "data",
        format: "json"
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      //console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      //console.error(error);
      res.status(500).send("error in the request to openlibrary api");
    });
  } catch (error) {
    //console.error(error);
    res.status(500).send("error in the request to openlibrary api");
  }
});




module.exports = router;
