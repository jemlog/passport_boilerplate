const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
const {isLoggedIn, isNotLoggedIn} = require('../middleware/auth')

//POST /auth/join 회원가입 
router.post('/join', isNotLoggedIn, async (req,res,next) => {

  const {email, nick, password} = req.body; 
  console.log(email)
  try
  {
     const exUser = await User.findOne({where : {email}})
     if(exUser)
     {
      //  return res.redirect('/?error=exist')
      return res.status(404).json({message : '이메일이 중복되었습니다'})
     }
     else
     {
       const hash = await bcrypt.hash(password, 12)
       await User.create({
         email, 
         nick, 
         password : hash
       })
       console.log('회원가입 완료!')
       return res.status(200).json({message : '회원가입 정상 완료'})
     }
  }
  catch(error)
  {
    console.error(error)
    return next(error)
  }
})


router.post('/login', isNotLoggedIn, (req,res,next) => {
  console.log('authenticate 진입')
  passport.authenticate('local', (authError,user,info)=>{
     
    if(authError)
    {
     return res.status(403).json({message : 'authError 로그인 에러'})
    }
    if(!user)
    {
      return res.status(403).json(info)
    }

    return req.logIn(user, (loginError) => {
      if(loginError)
      {
        return res.status(403).json({message : 'logIn 로직 로그인 에러'}) 
      }
      return res.status(200).json({message : 'serialize 생성 완료 login 완료'})
    })
    
  })(req,res,next)
})

router.get('/logout',isLoggedIn, (req,res,next) => {

  req.logOut()
  req.session.destroy()
  return res.status(200).json({message : '로그아웃 완료'})
})







module.exports = router; 