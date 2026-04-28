const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied.Admins Only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
};
export default isAdmin;