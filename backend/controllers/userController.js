import ErrorHander from "../utils/errorhander.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import  Jwt  from "jsonwebtoken";




// Register a user
export const registerUser = async (req, res, next) => {

    const {
        firstName,
        lastName,
        email,
        password,
        phone } = req.body;

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phone
    });

    // const token = user.getJWTToken();
    // // console.log(token);

    // res.status(201).json({
    //     success: true,
    //     token,
    // });

    sendToken(user, 201, res);
};


// Login user
export const loginUser = async (req, res, next) => {

    const { email, password } = req.body;

    // checking if user has given password and email both.

    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
        res.json({
            error:'Please Enter Email & Password'
        })
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email or password 5", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password 4", 401));
    }

    // const token = user.getJWTToken();
    // console.log(token);

    // res.status(200).json({
    //     success: true,
    //     token,
    // // }); 
    // res.cookie("token", user)

    // sendToken(user, 200, res);
    const token= Jwt.sign({user}, "USER-SECRET-KEY", {expiresIn:86400})

 res.cookie('token', token.toString(), {
    httpOnly:true,
    maxAge:86400000
 })

 res.status(200).json({
    message:"login success",
    data:token
 })
}


// Logout User
export const logout = async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
}



// get all users 
export const getAllUsers = async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
}

export const myProfile= async (req, res)=>{
    const user= Jwt.verify(req.cookies.token,'USER-SECRET-KEY')
    res.status(200).json({
        success:true,
        data:user
    })
}




