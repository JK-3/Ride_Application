const RideAuthentication = (req, res, next) => {
    try {
        // Read the user_info cookie
        const userInfoCookie = req.cookies.user_info;
        if (!userInfoCookie) {
            return res.status(401).json({ error: "Unauthorized: No user info found" });
        }

        // Parse the JSON string from cookie
        const user = JSON.parse(userInfoCookie);

        // Check if role is Rider
        if (user.role !== "rider") {
            return res.status(403).json({ error: "Access denied: Only Riders allowed" });
        }

        // Attach user info to request
        req.userDetails = user;

        next(); // proceed to next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Invalid user info" });
    }
};

export default RideAuthentication;
