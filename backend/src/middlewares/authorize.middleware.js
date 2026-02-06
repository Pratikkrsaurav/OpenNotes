
const authorize = (...allowedRoles) => {
    return (req, res, next) => {

        if (!allowedRoles.includes(req.user.role)) {
            return res
            .status(403)
            .json({ message: "Access denied: you are not authorized",})
        }
        next();
    }
}

export default authorize;