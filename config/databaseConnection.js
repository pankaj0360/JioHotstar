const mongoose = require("mongoose");
const dbCon=()=>{
  mongoose
  .connect("mongodb+srv://PankajSingh:Psingh339944@project1.kp6kp.mongodb.net/?retryWrites=true&w=majority&appName=Project1")
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.log(`Some error occured ${err}`);
  });
};
module.exports = dbCon;