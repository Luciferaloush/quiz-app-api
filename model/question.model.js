const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  id: Number,
  question: {
          en: String,
          ar: String,
  },
  option:{
          en: [String],
          ar: [String],    
  },
  answer: Number
});

const Question = mongoose.model('QuestionQuizz', questionSchema);
module.exports = {Question};