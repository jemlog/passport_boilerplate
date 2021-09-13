exports.isLoggedIn = (req,res,next) => {

  if(req.isAuthenticated())
  {
    console.log(req.user)
    next()
  }
  else
  {
    return res.status(404).json({message : 'isLoggedIn에 걸림'})
  }
}

exports.isNotLoggedIn = (req,res,next) => {

  if(!req.isAuthenticated())
  {
    next()
  }
  else
  {
    return res.status(403).json({message : 'isNotLoggedIn에 걸림'})
  }
}