require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
connectDB();

const log = console.log;
app.use(express.json()); // Handle JSON body
app.use((req, res, next) => {
          console.log(req.body); // Log the request body
          next();
      });
app.use('/quizz/v1/api/auth',require('./router/auth.router'))
app.use('/quizz/v1/api/notes',require('./router/notes.router'))
app.use('/quizz/v1/api/question',require('./router/question.router'))
app.use('/quizz/v1/api/points',require('./router/points.router'))
app.use('/quizz/v1/api/userQuestion',require('./router/answer.question.router'))

app.listen(7000, () => {
          log("listening on port: 7000");
});