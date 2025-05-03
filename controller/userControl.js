const jwt = require('jsonwebtoken');
const userModel = require("../model/userModel");
const sendMail = require("../services/sendMail");
const path = require("path");
const JWT_secret =  process.env.JWT_SECRET;
const userRegister = async(request, response)=>{
  const {firstName,lastName,email,password,type}= request.body;
      try {
      const exist = await userModel.findOne({ email: email });
      if (exist) {
        response.status(400).json({ message: "User already exists" });
      } else {
        const newUser = await new userModel({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          isActive: false,
        });
  
        await newUser.save();
        const token =  jwt.sign({email}, JWT_secret, {expiresIn:"10m"});
        const verificationLink = `http://localhost:3000/user/verify-email?token=${token}`;
        sendMail.sendMailer(email, verificationLink, firstName);

        console.log("Registration Success, please verify your email to login");
        response.status(200).json({ message: "Registration Success, please verify your email to login" });
      }
    } catch (error) {
      console.log("issue in newuser", error);
    }
}
const userLogin =async(request, response)=>{
    const {email,password}= request.body;
    const exist = await userModel.findOne({ email: email });
    if(exist){
        if(exist.password===password && exist.isActive){
            response.sendFile(path.join(__dirname, "../public", "home.html"));
        }else if(exist.password===password && !exist.isActive){
            console.log("Please verify your email to login");
        }else if(exist.password!==password){
            console.log("Invalid Password");
        }
    }
    else{
      console.log("User does not exist");
    }
    
}
const userLogout = (request, response)=>{
}
const userVerification = async (token) => {
  try {
    if (!token) {
      return console.log("Invalid or expired token");
    }

    const decodedToken = jwt.verify(token, JWT_secret);
    const userEmail = decodedToken.email;

    console.log("Verification Success", userEmail);

    const updatedUser = await userModel.findOneAndUpdate(
      { email: userEmail },
      { isActive: true },
      { new: true }
    );

    if (!updatedUser) {
      return console.log("User not found or already verified");
    }

    console.log("User verified successfully:", updatedUser);
    return true;

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("The token is expired");
    } else {
      console.log("Some error occurred", error);
    }
  }
};
const userForgotPassword = async (request, response) => {
  const { email } = request.body;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return response.status(400).json({ message: "User not found" });
  }
  if (user) {
    const name = user.firstName;
    const token = jwt.sign({ email: email }, JWT_secret, { expiresIn: "5m" });
    const resetLink = `http://localhost:3000/user/change-password?token=${token}`;
    sendMail.sendMailer(email, resetLink, name);
    console.log("Password reset link sent to your email");
    response.redirect("/user/login");
  } else {
    console.log("User not found");
  }
};
const userChangePassword = async (request, response) => {
  const {new_password,conform_password,token } = request.body;
  if(new_password!==conform_password){
    return response.status(400).json({ message: "Password does not match" });
  }
  try {
    if (!token) {
      return console.log("Invalid or expired token");
    }

    const decodedToken = jwt.verify(token, JWT_secret);
    const userEmail = decodedToken.email;

    const updatedUser = await userModel.findOneAndUpdate(
      { email: userEmail },
      { password: new_password },
      { new: true }
    );

    if (!updatedUser) {
      return console.log("User not found or already verified");
    }

    response.redirect("/user/login");

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("The token is expired");
    } else {
      console.log("Some error occurred", error);
    }
  }
};
const movieShow = async (req, res) => {
  const title = req.query.title;
  const apiKey = 'e672a5da20da266f2e2c153bcd39886b';
    

  try {
    const movieRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`);
    const movieData = await movieRes.json();
    // console.log("Movie data:", movieData);
    const movie = movieData.results[0];
    // console.log("Movie data:", movie);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }

    const trailerRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`);
    const trailerData = await trailerRes.json();
    // console.log("Trailer data:", trailerData);

    const trailer = trailerData.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');

    res.render('MovieShow', {
      title: movie.title,
      description: movie.overview,
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      poster: 'https://image.tmdb.org/t/p/w780' + movie.backdrop_path,
      // trailerKey: trailer ? trailer.key : null
    });
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).send('Error fetching movie data');
  }
};


module.exports = {userRegister,userLogin,userVerification,userForgotPassword,userChangePassword,movieShow};