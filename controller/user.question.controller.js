const { UserAnswer } = require("../model/answer.question.model");
const { UserQuestion } = require("../model/user.question.model");

const create = async (req, res) => {
          try{
                    const { userId, question, options } = req.body;

    if (!userId || !question || !options || options.length === 0) {
      return res.status(400).send({
        message: "Please provide userId, question, and options."
      });
    }

    const newQuestion = new UserQuestion({ userId, question, options });
    await newQuestion.save();

    res.status(201).send({
      message: "Question created successfully",
      question: newQuestion
    });
          }catch(e){
                    res.status(500).send({
                              message: "error creating question" + e.message
                    })
          }
}

const submitAnswer = async (req, res) => {
          try{
                    const { userId, questionId, answer } = req.body;
                    if (!userId || !questionId || !answer) {
                              return res.status(400).send({
                                message: "Please provide userId, questionId, and answer."
                              });
                            }
                            const question = await UserQuestion.findById(questionId);
                            if (!question) {
                              return res.status(404).send({
                                message: "Question not found"
                              });
                            }
                            const existingAnswer = await UserAnswer.findOne({userId, questionId});
                            if (existingAnswer) {
                              existingAnswer.answer = answer;
                              await existingAnswer.save();
                              return res.status(200).send({
                                message: "Answer updated successfully",
                                answer: existingAnswer
                              });
                            }
                            const userAnswer = new UserAnswer({ userId, questionId, answer });
    await userAnswer.save();

    res.status(200).send({
      message: "Answer submitted successfully",
      answer: userAnswer
    });
          }catch(e){
                    res.status(500).send({
                              message: "error creating answer" + e.message
                    })
          }
}
const getQuestions = async (req, res) => {
          try {
            const questions = await UserQuestion.find({})
              .populate('userId', 'name') 
              .exec();
        
            res.status(200).send({
              questions
            });
          } catch (e) {
            res.status(500).send({
              message: "Error: " + e.message
            });
          }
        };
       
        const getAnswerQuestion = async (req, res) => {
          try{
                    const questionId = req.params.questionId;
                    if(!questionId){
                              return res.status(400).send({
                                        message: "Question not found"
                              })
                    }
                    const answers = await UserAnswer.find({questionId})
                    .populate("userId", "name")
                    .exec();gitignore
                    res.status(200).send({
                              answers
                            });
          }catch(e){
                    res.status(500).send({
                              message: "Error: " + e.message
                    })
          }
        }
module.exports = {
          create,
          submitAnswer ,
          getQuestions ,
          getAnswerQuestion

        };