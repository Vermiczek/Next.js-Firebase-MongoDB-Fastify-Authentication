const mongoose1 = require('mongoose')

// const userSchema = new mongoose1.Schema({
//     name: String,
//     email:{
//       type:String,
//       required: true
//     },
//     createdAt: Date,
//     updatedAt: Date,
//     password: String
//   })

const userSchema = new mongoose1.Schema({
    name: String,
    password: String
  })
  
  
module.exports = mongoose1.model("User", userSchema);