const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    required: true,
          type:String,
  },
  email: {
          required: true,
          type:String,
          trim:true,
          validate:{
                    validator:(value)=>{
                              const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                              return value.match(re);

                    },
                    message : 'Please enter a valid email address'
          }},
          password : {
                    required : true,
                    type : String,
                    validate:{
                              validator:(value)=>{

                                        return value.length > 6;
   
                              },
                              message : 'Please enter al long password'
                    }
          },
         
      
    

});
const userNameSchema = mongoose.Schema({
  userName: {
    required: true,
          type:String,
  },
});

const Users = mongoose.model('UsersQuizz', userSchema);
const UserName = mongoose.model('UserNameQuizz', userNameSchema);
module.exports = {Users, UserName};