const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user')
const userTypeRoutes = require('./routes/userType')
const readingSessionRoutes = require('./routes/readingSession')
const booksApiRoutes = require('./routes/booksApi')

const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use('/api',userRoutes);
app.use('/api',userTypeRoutes);
app.use('/api',readingSessionRoutes);
app.use('/api',booksApiRoutes);


// routes
app.get('/', (req,res) =>{
    res.send('welcome to my API');
});

// mongodb connection
mongoose
 .connect(process.env.MONGODB_URI)
 .then(()=> console.log("Connected to db"))
 .catch((error) => console.error(error))

app.listen(port, () => console.log("server listening on port," , port))