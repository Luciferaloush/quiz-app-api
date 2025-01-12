const mongoose = require('mongoose');

const userQuestionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'UsersQuizz'
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  answer: {
    type: String, 
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserQuestion = mongoose.model('UserQuestion', userQuestionSchema);
module.exports = { UserQuestion };