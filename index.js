const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDb = require('./Database/db');
const studentRoute = require('./Routes/Students');
const PORT = process.env.PORT || 2500;
const app = express();

//Middleware
app.use(express.json());
app.use(
  cors({
    origin:
      'https://65bb184a75c389267cf47d6e--coruscating-bubblegum-623995.netlify.app',
  })
);

//Port Listens
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDb();
});

// Routes

app.use('/api', studentRoute);

//Home Api
app.get('/', async (req, res) => {
  res.send(`Welcome to the Application`);
});
