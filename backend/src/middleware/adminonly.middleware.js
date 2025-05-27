 // user is admin, allow access (only admin can add multiples users )
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: only Admins can add users ", success: false });
  }
};