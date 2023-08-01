import ErrorHander from "../utils/errorhander.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";




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
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    sendToken(user, 201, res);
};


// Login user
export const loginUser = async (req, res, next) => {

    const { email, password } = req.body;

    // checking if user has given password and email both.

    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
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
    // }); 
    res.cookie("token", res.token)

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    sendToken(user, 200, res);
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





