const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = () => {
  console.log('localstrategy 진입')
  passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
  },
  async (email, password, done) => {

    // 1. 먼저 email 똑같은게 있는지 체크 
    const exUser = await User.findOne({where : {email}})

    if(exUser)
    {
       const result = await bcrypt.compare(password, exUser.password)
       if(result)
       {
         done(null,exUser)
       } 
       else
       {
         done(null,false,{message : '비밀번호가 다릅니다'})
       }
    }
    else
    {
      done(null,false,{message : '회원가입이 되어있지 않습니다'})
    }
  }
  ))
}