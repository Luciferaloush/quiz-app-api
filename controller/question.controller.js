const { Question } = require("../model/question.model");

const addQuestionSport = async (req, res) => {
          try{
    const { id, question, option, answer } = req.body;
    const newQuestion = new Question({ id, question, option, answer });
    await newQuestion.save();
    res.status(200).send({
          message: 'Question saved successfully',
          newQuestion
    });
          }catch(e){
                    res.status(500).send({
                              message: "Invalid Api addQuestion",
                              error: e.message
                    })
          }
}
const getQuestion = async (req, res) => {
      try {
          const { lang } = req.query; 
          const allQuestion = await Question.aggregate([{ $sample: { size: 10 } }]);
  
          if (allQuestion.length === 0) {
              return res.status(404).send({
                  message: "No questions found"
              });
          }
  
          const questionsInSelectedLanguage = allQuestion.map(q => ({
              _id: q._id,
              id: q.id,
              question: lang === 'ar' ? q.question.ar : q.question.en,
              option: {
                  [lang]: lang === 'ar' ? q.option.ar : q.option.en,
              },
              answer: q.answer 
          }));
  
          res.status(200).send({
              questions: questionsInSelectedLanguage
          });
      } catch (e) {
          res.status(500).send({
              message: "Error: " + e.message
          });
      }
  };
  
const deleteQuestion = async (req, res) => {
          try{
                    const id = req.params.id;
                    const deleteQuestions = await Question.findByIdAndDelete(id);
                    if(!deleteQuestions){
                              return res.status(404).send({
                                        message: "Question not found"
                              })
                    }
                    res.status(200).send(
                              "Success Delete"
                    )
          }catch(e){
                    res.status(500).send({
                              message: "Error: " + e.message
                    })
          }
}
module.exports = {
          addQuestionSport,
          getQuestion,
          deleteQuestion
}