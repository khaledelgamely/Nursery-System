const mongoose = require("mongoose");
const Child = mongoose.model("children");
const Class = mongoose.model("class");

exports.getChildren = (request, response, next) => {
  Child.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((erorr) => next(erorr));
};

exports.postChild = (request, response, next) => {
  let object = new Child({
    _id: request.body.id,
    fullName: request.body.fullname,
    age: request.body.age,
    level: request.body.level,
    address: request.body.address,
  });
  object
    .save()
    .then((data) => {
      response.status(201).json(data);
    })
    .catch((error) => next(error));
};
exports.updateChild = (request, response, next) => {
  Child.updateOne(
    {
      _id: request.body.id,
    },
    {
      fullName: request.body.fullName,
      age: request.body.age,
      level: request.body.level,
      address: request.body.address,
    }
  )
    .then((result) => {
      if (result.matchedCount) {
        response.status(201).json(result);
      } else {
        throw new Error("No child with this id!!");
      }
    })
    .catch((error) => next(error));
};

exports.deleteChild = (request, response, next) => {
  Child.deleteOne({ _id: request.body.id })
    .then((object) => {
      return Class.updateOne(
        { children: request.body.id },
        { $pull: { children: request.body.id } }
      );
    })
    .then((object) => {
      response.status(201).json(object);
    })
    .catch((erorr) => next(erorr));
};
// ??
exports.getClassByChild = (request, response, next) => {
  Class.findOne({ children: request.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.getChildByID = (request, response, next) => {
  Child.findOne({ _id: request.params.id })
    .then((object) => {
      if (object == null) {
        throw new Error("child is not found");
      }
      response.status(200).json(object);
    })
    .catch((erorr) => next(erorr));
};
