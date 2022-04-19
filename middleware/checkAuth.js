const checkAuth = (req, res, next) => {
  console.log("Desde checkAuth");
  next();
};
export default checkAuth;
