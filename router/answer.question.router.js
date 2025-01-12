const express = require('express');
const router = express.Router();
const answerController = require('../controller/user.question.controller');
router.route('/create')
          .post(answerController.create);
          router.route('/submitAnswer')
          .post(answerController.submitAnswer);
          router.route('/getQuestions')
          .get(answerController.getQuestions);
router.route('/getAnswerQuestion/:questionId')
          .get(answerController.getAnswerQuestion);

            
           

module.exports = router;
