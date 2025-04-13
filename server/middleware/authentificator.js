const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        console.log("YES", req.session.user);
      next();
    } else {
        console.log("NOT", req.session.user);
      res.status(401).json({ message: "You are prohibited from viewing this content" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin === 1) {
      next();
    } else {
      res.status(403).json({ message: "You are prohibited from viewing this content" });
    }
};

module.exports = {
    isAuthenticated,
    isAdmin
};
