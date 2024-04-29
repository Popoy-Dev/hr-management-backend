const bcrypt = require('bcryptjs');

const User = require('../models/user')

const createUser = async (req, res) => {

  const hashPassword = await bcrypt.hash(req.body.password, 8)

  const data = {
    name: req.body.name,
    username: req.body.username,
    password: hashPassword

  }

  try {
    const newUser = await User.create(data)
    res.status(201).json(newUser)

  } catch (err) {
    res.status(500).json({ msg: err })
  }
}

const loginUser = async (req, res) => {

  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)

    if (!isMatch) {
      res.status(401).json({ msg: 'Invalid credentials' });

    }
    req.session.isAuth = true

    res.status(200).json({ login: true, username: req.session.username });

  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
}

const getUserDetails = async (req, res) => {
  console.log('Session username:', req.session); // Access the username saved in the session
  if (req.session.username) {
    res.status(200).json({ valid: true, username: req.session.username });
  } else {
    res.status(401).json({ valid: false });
  }
}


module.exports = { createUser, loginUser, getUserDetails }