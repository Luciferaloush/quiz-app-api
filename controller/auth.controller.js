const { Users, UserName } = require("../model/user.model");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
var salt = bcrypt.genSaltSync(10);
const register = async (req, res) => {
          try{
                    const {name, email, password} = req.body;

                    if(!name || !email || !password){
                              return res.status(404).send({
                                    message: "please enter email or password"
                              })
                    }
                    const existing = await Users.findOne({email: email});

          if(existing){
                    return  res.status(404).json({msg: 'Email already exists'});
            }
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const user = new Users({
                name,
                email,
                password:hashedPassword,
            });
            await user.save();
            const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '7d'
            });
            user.token = token;

          res.json({status: "SUCCESS",  info:{
                user,
                token,
          }});
          }catch(e){
                    res.status(500).send({
                              message: "Invalid App register",
                              error: e.message
                    })
          }
}
const username = async (req, res) => {
        try{
                  const {userName} = req.body;

                  if(!userName){
                            return res.status(404).send({
                                  message: "please enter userName"
                            })
                  }
                  const existing = await UserName.findOne({userName:userName});

        if(existing){
                  return  res.status(404).json({msg: 'userName already exists'});
          }          
          const user = new UserName({
              userName,
          });
          await user.save();
        res.json({status: "SUCCESS",  
              user,
        });
        }catch(e){
                  res.status(500).send({
                            message: "Invalid App userName",
                            error: e.message
                  })
        }
}

module.exports = {
        register,
        username
}
