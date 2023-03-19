const express = require("express");
const readingSessionSchema = require("../models/readingSession");

const router = express.Router();

// create readingSession
router.post("/readingSession", (req, res) => {
 
  readingSessionSchema
  .find({user: req.body.user})
  .sort({ created_at: -1 })
  .limit(1)
  .then((data) => {
    var previousPage = 0;
    var previousprogress = 0;
    
    console.log(data);

    if (data.length > 0){
        previousPage = data[0].end_page;
        previousprogress = data[0].progress_user_end;
        
        if (previousPage >  req.body.end_page){
          return res.json({ message: "you inserted an invalid page, youre currently in page "+ previousPage});
        }
        if (req.body.end_page >  req.body.total_pages){
            return res.json({ message: "you inserted an invalid page, the total page of the book is " + req.body.total_pages });
        }
    }
    req.body.start_page = previousPage;
    req.body.progress_user_start = previousprogress;
    req.body.progress_user_end = Math.round((req.body.end_page * 100) / req.body.total_pages);

    const readingSession = readingSessionSchema(req.body);
    readingSession
      .save()
      .then((data) => {return res.json(data)})
      .catch((err) => {return res.json({ message: err })});


  });
});
// list readingSession
router.get("/readingSession", (req, res) => {
  readingSessionSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});
// get a readingSession
router.get("/readingSession/:id", (req, res) => {
  readingSessionSchema
    .find({_id: req.params.id})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

// update readingSession
router.put("/readingSession/:id", (req, res) => {
  readingSessionSchema
    .updateOne({ _id: req.params.id }, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});
// delete readingSession
router.delete("/readingSession/:id", (req, res) => {
  readingSessionSchema
    .deleteOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

/* ############# PERSONALIZED API FOR READING SESSIONS  ################# */ 

router.get("/readingSession/getReadingSessionByUser/:id", (req, res) => {
  //Obtener sesiones por usuario
  readingSessionSchema
  .find({user: req.params.id})
  .then((data) => res.json(data))
  .catch((err) => res.json({ message: err }));
});

router.get("/readingSession/getLastReadingSession/:id", (req, res) => {
  //Trae la utlima sesion de un usuario
  readingSessionSchema
  .find({user: req.params.id})
  .sort({ created_at: -1 })
  .limit(1)
  .then((data) => res.json(data))
  .catch((err) => res.json({ message: err }));
});

module.exports = router;
