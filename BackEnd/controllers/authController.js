const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { z } = require('zod');
const { userSignupSchema, userSigninSchema } = require('../schemas/authSchemas');

// Signup logic
const signup = async (req, res) => {
    try {
      const validatedData = userSignupSchema.parse(req.body);
      const { name, email, password } = validatedData;
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User created' });
    } catch (error) {
      console.error('Signup error:', error);  // Log the error details
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ error: 'User creation failed', details: error.message });
    }
  };
  

// Signin logic
const signin = async (req, res) => {
    try {
      const validatedData = userSigninSchema.parse(req.body);
      const { email, password } = validatedData;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('Signin error:', error);  // Log the error details
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ error: 'Signin failed', details: error.message });
    }
  };
  

module.exports = { signup, signin };
