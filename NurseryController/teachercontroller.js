const mongoose = require("mongoose");
const Teacher = mongoose.model("teachers");
const Class = mongoose.model("class");

////
exports.getTeachers = (request, response, next) => {
  Teacher.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((erorr) => next(erorr));
};

////
exports.postTeacher = (request, response, next) => {
  let object = new Teacher({
    // _id: request.body.id,
    fullName: request.body.fullname,
    password: request.body.password,
    email: request.body.email,
    image: request.body.image,
  });
  object
    .save()
    .then((data) => {
      response.status(201).json(data);
    })
    .catch((error) => next(error));
};

////

exports.updateTeacher = (request, response, next) => {
  Teacher.updateOne(
    {
      _id: request.body.id,
    },
    {
      _id: request.body.id,
      fullName: request.body.fullname,
      password: request.body.password,
      email: request.body.email,
      image: request.body.image,
    }
  )
    .then((result) => {
      if (result.matchedCount) {
        response.status(201).json(result);
      } else {
        throw new Error("No teacher with this id!!");
      }
    })
    .catch((error) => next(error));
};

exports.deleteTeacher = (request, response, next) => {
  Teacher.deleteOne({ _id: request.body.id })
    .then((object) => {
      return Class.updateOne(
        { supervisor: request.body.id },
        { $unset: { supervisor: "" } }
      );
    })
    .then((object) => {
      response.status(201).json(object);
    })
    .catch((erorr) => next(erorr));
};

////
exports.getSupervisor = (request, response, next) => {
  Class.find({ supervisor: request.params.id })
    .then((data) => {
      if (data) {
        throw new Error("not a supervisor");
      } else {
        response.status(200).json(data);
      }
    })
    .catch((error) => next(error));
};

////
exports.getTeacherByID = (request, response, next) => {
  Teacher.findOne({ _id: request.params.id })
    .then((object) => {
      if (object == null) {
        throw new Error("teacher is not found");
      }
      response.status(200).json(object);
    })
    .catch((erorr) => next(erorr));
  // response.status(200).json(request.body);
};
