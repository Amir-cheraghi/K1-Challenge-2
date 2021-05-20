const checkLogin = async (req, res, next) => {
  if (!req.user.login) {
    return res.json({
      status: "error",
      msg: "Please Login to access",
    });
  }
  next();

};
module.exports = checkLogin;
