const path = require("path"); //
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//////////////
require("./NurseryModel/teachermodel");
require("./NurseryModel/childmodel");
require("./NurseryModel/classmodel");
//////////////
// const teacherRouter = require("./NurseryRoutes/teacherRouter.js");
const teacherRouter = require(path.join(
  __dirname,
  "NurseryRoutes",
  "teacherRouter"
));
const childRouter = require(path.join(
  __dirname,
  "NurseryRoutes",
  "childRouter"
));
const classRouter = require(path.join(
  __dirname,
  "NurseryRoutes",
  "classRouter"
));
const authenicationRouter = require(path.join(
  __dirname,
  "NurseryRoutes",
  "authenticationRoute"
));
const authMW = require(path.join(
  __dirname,
  "NurseryMiddelware",
  "authenicatedMW"
));

// const authMW = require("./NurseryMiddelware/authenicatedMW.js");
//////////////

dotenv.config();

// first open server using express
const app = express();
let port = process.env.PORT || 8080;

///
mongoose
  .connect("mongodb://127.0.0.1:27017/Nurserydb")
  .then(() => {
    console.log("db connected");
    app.listen(port, () => {
      console.log("server is listening");
    });
  })
  .catch((error) => {
    console.log("db problem" + error);
  });
//first mw logging
app.use((request, response, next) => {
  console.log(request.url, request.method);
  next();
});

// settings
app.use(express.json());
// morgan middleware
app.use(morgan("dev"));

// routes

// app.use(authenicationRouter);
// app.use(authMW);

app.use(teacherRouter);
app.use(childRouter);
app.use(classRouter);

// not found middleware

app.use((request, response, next) => {
  response.status(404).json({ message: "nottttt found" });
});

// error middleware

app.use((error, request, response, next) => {
  response.status(500).json({ message: error + "" });
});
