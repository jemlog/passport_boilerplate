const passport = require('passport')
const Local = require('./localStrategy')
const User = require('../models/user')

module.exports = () => {


// serialize와 deserialize를 구현하고 전략들을 여기서 호출한다. 

// 1. serialize
passport.serializeUser((user,done)=>{
  done(null,user.id)
})

// 2. deserialize
passport.deserializeUser((id, done)=> {
  console.log('deserialize를 통한 검증')
  User.findOne({where : {id}}).then(user=> done(null,user))
  .catch(error=> done(error))
  
})
console.log('index 진입')
Local()
}