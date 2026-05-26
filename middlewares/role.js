export function requireRole(...roles) {
  return (req, res, next) => {
    console.log("req.userRole", req.userRole);
    const role = req?.userRole;
    if (!role || !roles.includes(role)) {
      return res.status(403).json({ ok: false, message: "Forbidden" });
    }
    next();
  };
}
