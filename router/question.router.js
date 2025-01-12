const express = require('express');
const router = express.Router();
const questionController = require('../controller/question.controller');
router.route('/addSport')
          .post(questionController.addQuestionSport);
          router.route('/getQuestion')
          .get(questionController.getQuestion);
          router.route('/deleteQuestion/:id')
          .delete(questionController.deleteQuestion);

              
           

module.exports = router;
