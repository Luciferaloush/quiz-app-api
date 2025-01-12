const express = require('express');
const router = express.Router();
const notesController = require('../controller/notes.controller');
router.route('/addNotes')
          .post(notesController.notes);

           
         
module.exports = router;
