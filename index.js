require('dotenv').config();
const express = require('express');
const answerController = require('./controller/user.question.controller');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const connectDB = require('./config/db');
connectDB();
const server = http.createServer(app);
const io = socketIo(server);

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
io.on('connection', (socket) => {
    console.log('A user connected');

    // يمكنك إضافة أحداث هنا
    socket.on('submitAnswer', (data) => {
        // التعامل مع الإجابات الجديدة
        // يمكنك استخدام الدالة submitAnswer هنا
        // مثلاً، يمكنك إرسال البيانات إلى الـ controller
        answerController.submitAnswer(data);
        // ثم يمكنك إبلاغ العملاء الآخرين
        socket.broadcast.emit('newAnswer', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
app.listen(7000, () => {
          log("listening on port: 7000");
});