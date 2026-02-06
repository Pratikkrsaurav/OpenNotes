import jwt from "jsonwebtoken";
import User from "../models/user.Model.js";

const protect = async (req, res, next ) => {
    let token;

    // header se token lena 
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // token na mile to error bhejna
    if(!token) {
        return res
        .status(401)
        .json({ message: "Not authorized, token missing"})
    }

    try{
        // token verify karna
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //user database me se lana
        req.user = await User.findById(decoded.userId).select("-password")
        next();
    } catch (error) {
        return res
        .status(401)
        .json({ message: "Not authorized, token invalid or expired"});
    }
};

export default protect;