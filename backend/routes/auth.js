const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwt_secret = "this is a secret";
const fetchUser = require('../middleware/fetchUser')
//Route 1
router.post('/createuser', [
  //creating parameters using express params
  body('password', "Enter a better pdws").isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  // body('name',"enter valid ntame ").isLength({ min: 2 }),
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }
  const salt = await bcrypt.genSalt(10)
  const securePassword = await bcrypt.hash(req.body.password, salt)

  //user creation 
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).json(success,"sorry a user already exits ")
  }
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: securePassword,
  })
  //  
  // .catch(err=>{console.log(err)
  // res.json("plese enter a unique value for the user")
  const data = {
    user: {
      id: user.id,

    }
  }
  const authtoken = jwt.sign(data, jwt_secret)
  success=true;
  res.json({ success,authtoken })
})

//Route 2:Authenticate a user using posr"/ap/auth/login"
router.post('/login', [
  //creating parameters using express params

  body('email', 'Enter a valid email').isEmail(),
  // body('name',"enter valid ntame ").isLength({ min: 2 }),
  body('password', "password cannot be blank").exists(),
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({success,error: "Login credentials didnt match" })
    }
    const passwordComapre = await bcrypt.compare(password, user.password)
    if (!passwordComapre) {
      success=false;
      return res.status(400).json({ success,error: "please try to login with correct credentials " }
      )
    }
    //using jwt   
    const data = {
      user: {
        id: user.id,

      }
    }
    const authtoken = jwt.sign(data, jwt_secret)
    success=true;
    res.json({ success,authtoken })


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal serer error")

  }

})


//Route 3 get loggedIn user details
router.post('/getuser', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal serer error")

  }
})


module.exports = router 