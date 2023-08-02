const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();

const saltRounds = 5;
let hash = bcrypt.hashSync("12345", saltRounds);

exports.login = (request, response, next) => {
  let token;
  if ( request.body.userName == "admin" && bcrypt.compareSync(request.body.password, hash)) {
    token = jwt.sign({
        userName: request.body.userName,
        id: 1,
        role: "admin",
      },
      process.env.secretKey
    );

    response.status(200).json({ data: "ok", token });
  } else {
    let error = new Error("not authenicated");
    error.status = 401;
    next(error);
  }
};
