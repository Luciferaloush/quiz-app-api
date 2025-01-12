const mongoose = require('mongoose');

const userAnswerSchema = mongoose.Schema({
  userId: {
     type: mongoose.Schema.Types.ObjectId,
     required: true,
     ref: 'UsersQuizz'
   },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'UserQuestion'
  },
  answer: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);
module.exports = { UserAnswer };