import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"
import { oauth2client } from "../lib/googleConfig.js";
import axios from "axios";
import fs from "fs";
export const signup = async (req, res) => {
    const { firstName, lastName, company, email, password,role } = req.body;
    try {
        if (!firstName || !lastName || !company || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 character", success: false })
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email is already exist", success: false })

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            company,
            email,
            role,
            password: hashPassword
        })
        // console.log(newUser,"newUser");

        if (newUser) {
            // generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                // _id: newUser._id,
                // firstName: newUser.firstName,
                // lastName: newUser.lastName,
                // company: newUser.company,
                // email: newUser.email,
                message: "Registration successfully",
                success: true
            })

        } else {
            res.status(400).json({ message: "Invalid user data", success: false })
        }

    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log(user,"user");

        if (!user) {
            res.status(400).json({ message: "Invaild Credentials", success: false })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        // console.log(isPasswordCorrect,"isPasswordCorrect");

        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invaild Credentials", success: false })
        }
        const jwtToken = generateToken(user._id,user.role, res);

        res.status(200).json({
            // _id: user._id,
            // firstName: user.firstName,
            // lastName: user.lastName,
            // company: user.company,
            // email: user.email
            message: "Login successfully",
            success: true,
            jwtToken,
            name: user.firstName,
            role: user.role,
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal server error", success: false })

    }
}

export const forgetpassword = async(req, res) => {
    const { email } = req.body;
    try {
        if (email) {
            const isUser = await User.findOne({ email });            
            if (isUser) {
                const jwtToken = jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET, {
                    expiresIn: "5m"
                })

                   const link = `http://localhost:5173/reset-password/${isUser._id}/${jwtToken}`;
                
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                     host: "smtp.gmail.com",
                     port: 465,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASSWORD,
                    }
                })                

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Reset Password",
              html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
 <p><a href="${link}">Reset Password</a></p>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`,
                }

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return res.status(400).json({ message: "Error", success: false })
                    }
                    return res.status(200).json({ message: "Email sent", success: true })
                })

            } else {
                res.status(400).json({ message: "Invalid email ", success: false })
            }
        } else {
            res.status(400).json({ message: "Email is required", success: false })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false })
    }

}

export const resetpassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const { id, token } = req.params;
    
    try {
        if (newPassword && confirmPassword && id && token) {
            if (newPassword === confirmPassword) {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET)                
                if (decodedToken) {
                const user = await User.findById(id)
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(newPassword, salt)
                const isSuccess = await User.findByIdAndUpdate(user._id,{
                    $set:{
                      password:hashPassword
                    }
                })
                if(isSuccess){
                    return res.status(200).json({message:"Password has been changes successfully",success: true })
                }
                }
                else{
                    return res.status(400).send({ message: "Link has been expired" ,success: false });

                }

                } else {
                    res.status(400).json({ message: "Password and confirm password does not matched", success: false })
                }

            } else {
                res.status(400).json({ message: "All fields are required", success: false })
            }

        } catch (error) {
            res.status(500).json({ message: "Internal server error", success: false })
        }

    }


export const logout = (req, res) => {
        try {
            res.cookie("jwt", "", { maxAge: 0 });
            res.status(200).json({ message: "Loggout successfully" })
        } catch (error) {
            console.log("Error in Logout contoller", error.message);
            res.status(500).json({ message: "Internal server error" })

        }
    }

export const checkAuth = (req, res) => {
        try {
            res.status(200).json(req.user)
        } catch (error) {
            console.log("Error in CheckAuth contoller", error.message);
            res.status(500).json({ message: "Internal server error" })

        }
    }

export const googleLogin = async(req,res)=>{
    try {
    const {code} = req.query;
    console.log(code,"code");
    
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens)
    const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)    
    const {email,name} = userRes.data;
    let user = await User.findOne({email});
    if(!user){
        user = await User.create({
            name,
            email
        })
    }
       const {_id} = user;
       const token = jwt.sign({_id,email }, process.env.JWT_SECRET, {
                    expiresIn: "12h"
                })
   return res.status(200).json({message:"Google login successfully",success: true,user,token })

} catch (error) {
    console.log(error,"error");
        res.status(500).json({ message: "Internal server error" })
}
    }


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;    
    const { firstName, lastName, company, password } = req.body;
     if (!firstName || !lastName || !company || !password || !req.file) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

    const user = await User.findById(userId);    

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (company) user.company = company;


    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters", success: false });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (req.file) {  
        console.log(req.file,"img");
              
      if (user.image && fs.existsSync(`uploads/${user.image}`)) {
        fs.unlinkSync(`uploads/${user.image}`);
      }
      user.image = req.file.filename;
    }

    await user.save();

    return res.status(200).json({ message: "Profile updated successfully", success: true });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const viewProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        image: user.image,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};