const express = require('express');
const { UserSignUpModel } = require('../../ModelSchema/AuthSchema/UserSignUp');
const bcrypt = require('bcrypt');

const LoginRouter = express.Router();

LoginRouter.post('/', async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    
    // Check if fields are missing
    if (!userEmail || !userPassword) {
      return res.status(400).send({ message: "Please fill in all required fields", status: false });
    }

    // Find user by email or username
    const userCredential = await UserSignUpModel.findOne({
      $or: [{ userEmail }, { userName: userEmail }]
    });

    if (!userCredential) {
      // Generic message for invalid credentials
      return res.status(400).send({ message: "Invalid login credentials", status: false });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(userPassword, userCredential.userPassword);

    if (!passwordMatch) {
      return res.status(400).send({ message: "Invalid login credentials", status: false });
    }

    // Successful login
    return res.status(200).send({ message: 'Login successful', status: true });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error', status: false });
  }
});

module.exports = {
  LoginRouter
};
