import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ErrorHander from "../utils/errorHander.js";



export const isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHander("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
}


