const driverAuth = (req, res, next) => {
  try {
    const userInfoCookie = req.cookies.user_info;
    if (!userInfoCookie) {
      return res.status(401).json({ error: "Unauthorized: No user info found" });
    }

    const user = JSON.parse(userInfoCookie);

    if (user.role !== "driver") {
      return res
        .status(403)
        .json({ error: "Access denied: Only Drivers allowed" });
    }

    req.userDetails = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Invalid user info" });
  }
};

export default driverAuth;
