const express = require('express')
const SignUpRouter = express.Router()
const { UserSignUpModel } = require('../../ModelSchema/AuthSchema/UserSignUp')
const bcrypt = require('bcrypt');

const saltRounds = 10;

SignUpRouter.post('/', async (req, res) => {
    try {
        const { userFullName, userEmail, userName, userPassword } = req.body;

        // Validate input fields
        if (!userFullName || !userEmail || !userName || !userPassword) {
          return res.status(400).send({ message: 'All fields are required', status: false });
        }
  
      // Check if userEmail or userName already exists
      const isUserEmailOrUserNameExist = await UserSignUpModel.findOne({ $or : [ {userEmail} , {userName} ] });
  
      if (isUserEmailOrUserNameExist) {
          return res.status(400).send({ message: 'Email already exists', status: false });
      }

          // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

      // Create new user
      const newUser = new UserSignUpModel({...req.body , userPassword:hashedPassword});
      const data = await newUser.save();

      res.status(201).send({ message: 'Data added successfully', status: true, data});
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error', status: false });
    }
  });

module.exports = {
    SignUpRouter
}