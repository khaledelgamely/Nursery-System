const jwt = require("jsonwebtoken");


module.exports = (request, response, next) => {
  //check if the request ahs token
  let token;

  try {
    token = request.get("authorization").split(" ")[1];
    let decodetdToken = jwt.verify(token, process.env.secretKey);

    request.decodedObject = decodetdToken;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports.isAdmin = (request, repsone, next) => {
  if (request.decodedObject.role == "admin") next();
  else {
    let error = new Error("not Authorized");
    error.status = 403;
    next(error);
  }
};
