module.exports.signout = (req, res) => {
  const { token } = req.cookies;

  res.cookie('token', token, { maxAge: 0 }).end();
};
