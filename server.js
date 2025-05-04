const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const path = require("path");
const dbCon = require("./config/databaseConnection");
dbCon();
const encoder = require("express").urlencoded({extended:false});
app.use(encoder);
app.use("/assets",express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.listen(process.env.PORT,()=>{
  console.log("server is running on port 3000");
});
const appRouter = require("./routes/appRoute");
const userRouter = require("./routes/userRoute");

app.use("/api", appRouter);
app.use("/user",userRouter);

// esxd ruur igfe zjji
