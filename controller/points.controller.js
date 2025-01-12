const { Points } = require("../model/points.model");
const { Users } = require("../model/user.model");

const addPoints = async (req, res) => {
          try{
                    const userId = req.params.userId; 
                    const answeredQuestionsCount = req.body.answeredQuestionsCount; 

                    let pointsToAdd = 0;
                    if(answeredQuestionsCount == 10){
                              pointsToAdd = 20;
                    }
                    else if (answeredQuestionsCount > 6 && answeredQuestionsCount < 10) {
                              pointsToAdd = 10;
                            }
                            else {
                              pointsToAdd = 5;
                            }
                            if(pointsToAdd > 0){
                              let userPoints = await Points.findOne({ userId });
                              if(userPoints){
                                        userPoints.points += pointsToAdd;
                                        await userPoints.save();
                              }else{
                                        userPoints = new Points({ userId, points: pointsToAdd });
        await userPoints.save();
                              }
                              return res.status(200).send({
                                        message: "Points added successfully",
                                        points: userPoints.points
                                      });
                            } else {
                              return res.status(400).send({
                                message: "No points to add"
                              });
                            }

          }catch(e){
                    res.status(500).send({
                              message: "error Api addPoints" + e.message
                    })
          }
}
const getUserPoints = async (req, res) => {
       try{
          const userId = req.params.userId;
          const user = await Users.findById(userId);
          if(!user) {
                    return res.status(404).send({
                              message: 'User not found'
                    })
          }
          const userPoints = await Points.findOne({userId});
          const points = userPoints ? userPoints.points : 0;
          res.status(200).send({
                    name: user.name,
                    points
                  });
       }catch(e){
          res.status(500).send({
                    message: "error Api getUserPoints" + e.message
          });
       } 
}

const getTopUsers = async (req, res) => {
          try{
                    const topUsers = await Points.find({})
                    .populate('userId', 'name')
                    .sort({points:-1})
                    .limit(10);
                    if (topUsers.length === 0) {
                              return res.status(404).send({
                                message: "No users found"
                              });
                            }
                            const result = topUsers.map(user => ({
                              userName: user.userId.name,
                              points: user.points
                            }));
                        
                            res.status(200).send({
                              topUsers: result
                            });
          }catch(e){
                    res.status(500).send({
                              message: "error Api getTopUsers" + e.message
                    })
          }
}
module.exports = {addPoints, getUserPoints, getTopUsers}