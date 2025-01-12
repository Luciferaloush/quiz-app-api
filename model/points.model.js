const mongoose = require('mongoose');

const pointsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'UsersQuizz'
  },
  points: {
    type: Number,
    default: 0
  }
});

const Points = mongoose.model('Points', pointsSchema);
module.exports = { Points };