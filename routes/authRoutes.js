const express =  require('express');
const User = require('../models/User');
const passport = require('passport')

const router = express.Router();

router.get('/register' , (req,res)=>{
    res.render('auth/signup');
})

router.post('/register' ,async (req,res)=>{
    let {username , email , password , age , address} = req.body;

    let newuser = new User({username , email , password , age , address});
    let nayabanda = await User.register(newuser , password)
    // console.log(nayabanda)
    res.redirect("/login")
})

router.get('/login' , (req,res)=>{
    res.render('auth/login')
})

router.post('/login', 
  passport.authenticate('local', 
  { 
    
    failureRedirect: '/login' 
  }),
  function(req, res) {
    // console.log(req.user , "new")
    let username = req.user.username;
    res.redirect('/cars');
  }
);

router.get('/logout',(req,res)=>{
    
  req.logout(()=>{
      req.flash('success' , 'goodbye friend');
      res.redirect('/login');
  });
      
});

module.exports = router;
