import { validationResult } from 'express-validator/check';
import bcrypt from 'bcrypt';
import regeneratorRuntime from 'regenerator-runtime';
import { User } from '../models/User';
import generateToken from '../helpers/generateToken';

const users = {
  async register(req, res) {
    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: 'An error has occurred',
          errors: errors.array()
        });
      }

      // Check if another user already exists
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({
          success: false,
          message: 'The email address you have entered is already associated with another account.',
        });
      } else {
        const newUser = new User({
          fullname: req.body.fullname,
          email: req.body.email,
          password: req.body.password
        });

        const savedUser = await newUser.save();

        const token = await generateToken({ id: savedUser._id });
        return res.status(201).json({
          success: true,
          message: 'User successful created',
          token: `${token}`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error has occurred',
        error: `${error}`,
      });
    }
  },

  async login(req, res) {
    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: 'An error has occurred',
          errors: errors.array()
        });
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const signature = {
          id: user._id,
        };

        // if user is found and password is right create a token
        const token = await generateToken(signature);

        res.status(200).json({
          success: true,
          message: `${user.fullname}, You have successfully logged in.`,
          token: `${token}`,
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Please enter your correct login credentials.'
        });
      }
      // await user.comparePassword(req.body.password);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Authentication failed.',
        error: `${error}`,
      });
    }
  },
};

export default users;
