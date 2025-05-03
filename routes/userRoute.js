const express = require('express');
const userRouter = express.Router();
const path = require('path');
const {userRegister,userLogin,userVerification,userForgotPassword,userChangePassword,movieShow} = require('../controller/userControl');
userRouter.get("/login", (request, response) => {
  response.sendFile(path.join(__dirname, "../public", "login.html"));
});
userRouter.get("/signUp", (request, response) => {
  response.sendFile(path.join(__dirname, "../public", "signUp.html"));
});
userRouter.get("/home", (request, response) => {
  response.sendFile(path.join(__dirname, "../public", "home.html"));
});
userRouter.get("/verify-email", (request, response) => {
  if(userVerification(request.query.token)){
    response.redirect("/user/login")
  }
});
userRouter.get("/forgot-password", (request, response) => {
  response.sendFile(path.join(__dirname, "../public", "forgot-password.html"));
});
userRouter.get("/change-password", (request, response) => {
  response.sendFile(path.join(__dirname, "../public", "reset-password.html"));

});
userRouter.get("/movies", (request, response) => {
  response.sendFile(path.join(__dirname, "../public", "Movies.html"));
});
userRouter.get("/search", (request, response) => {
  response.sendFile(path.join(__dirname, "../public", "search.html"));
});
userRouter.get("/trailer", (request, response) => {
  let title = request.query.title;
  response.render("trailer.ejs",{title});
});
userRouter.get("/tv-shows", (request, response) => {
  response.sendFile(path.join(__dirname, "../public", "TV.html"));
});
userRouter.get("/movieShow",movieShow);
userRouter.post("/change-password", userChangePassword);
userRouter.post("/ForgotPassword",userForgotPassword);
userRouter.post("/signup", userRegister);
userRouter.post("/login", userLogin);
module.exports = userRouter;