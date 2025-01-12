const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
  notes: {
    required: true,
          type:String,
  },
});

const Notes = mongoose.model('NotesQuizz', notesSchema);
module.exports = {Notes};