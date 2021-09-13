const express = require('express')
const router = express.Router()
const {isLoggedIn} = require('../middleware/auth')

router.use((req,res,next) => {

  // 공통으로 쓸수 있는 변수들을 넣어주는 부분 
  res.locals.user = req.user; // 인증을 위한 부분 로그인을 성공하고 나서 부터는 req.user를 가지고 모든 작업을 하면 된다. 
  next()

})

router.get('/', isLoggedIn, (req,res,next) => {

  // res.render('main', {title : 'jemin login server'})   
  res.status(200).json({message : '로그인 된 상태라서 접속 잘 됩니다! '})
})








module.exports = router; 