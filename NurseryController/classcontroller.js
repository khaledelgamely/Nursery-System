const mongoose = require("mongoose");
const Teacher = mongoose.model("teachers");
const Child = mongoose.model("children");
const Class = mongoose.model("class");

exports.getClasses = (request, response, next) => {
  Class.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((erorr) => next(erorr));
};
////

exports.postClass = (request, response, next) => {
  let object = new Class({
    _id: request.body.id,
    name: request.body.name,
    supervisor: request.body.supervisor,
    children: request.body.children,
  });
  object
    .save()
    .then((data) => {
      response.status(201).json(data);
    })
    .catch((error) => next(error));
};
////

exports.updateClass = (request, response, next) => {
  Class.updateOne(
    {
      _id: request.body.id,
    },
    {
      _id: request.body.id,
      name: request.body.fullname,
      supervisor: request.body.supervisor,
      children: request.body.children,
    }
  )
    .then((result) => {
      response.status(201).json(request.body);
    })
    .catch((error) => next(error));
};
////

exports.deleteClass = (request, response, next) => {
  Class.deleteOne({ _id: request.body.id })
    .then((object) => {
      response.status(201).json(object);
    })
    .catch((erorr) => next(erorr));
};
////

exports.getClassById = (request, response, next) => {
  Class.findOne({ _id: request.params.id })
    .then((object) => {
      if (object == null) {
        throw new Error("class is not found");
      }
      response.status(200).json(object);
    })
    .catch((erorr) => next(erorr));
};
/////
exports.getClassInfo = (request, response, next) => {
  Class.findOne({ _id: request.params.id })
    .then((data) => {
      return Child.find({ _id: { $in: data.children } });
    })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
////
exports.getSupervisorInfo = (request, response, next) => {
  Class.findOne({ _id: request.params.id })
    .then((data) => {
      console.log(data);
      return Teacher.findById(data.supervisor);
    })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
