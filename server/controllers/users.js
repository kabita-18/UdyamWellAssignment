import express from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/user.js';
import crypto from 'crypto';
import ResetPassword from '../models/resetPasswords.js';
import newPassword from '../mailers/password_mailer.js'

const router = express.Router();
const secret = 'test';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });
        

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;
    
    
    
    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ firstName, lastName, email, password: hashedPassword, phoneNo:phone });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "10h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User doesn't exist" });
        const token = crypto.randomBytes(20).toString('hex');
        const result = await ResetPassword.create({user: user._id, email, token});

    await newPassword({email, name: user.firstName, link: "https://flipkart-iota.vercel.app/reset-password/"+token});
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Error resetting password' });
  }
};


export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    
    try {
      const passwordDb = await ResetPassword.findOne({ token: token});
      if(!passwordDb){
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
      const user = await User.findById(passwordDb.user);
      
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      await user.save();
      await ResetPassword.deleteOne({ _id: passwordDb._id});
      
      res.json({ message: 'Password reset successfully' });
    } catch (err) {
      console.error('Error resetting password:', err);
      res.status(500).json({ message: 'Error resetting password' });
    }
  }
export default router;