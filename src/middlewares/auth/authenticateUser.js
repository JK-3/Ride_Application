import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
    try {
        const token = req.cookies.auth_token; // ✅ read from cookie
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
        req.userDetails = decoded; // attach user info to request
        next();
        
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
export default authenticateUser;