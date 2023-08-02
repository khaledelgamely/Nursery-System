const express = require("express");
const { query, param, body } = require("express-validator");
const Controller = require("./../NurseryController/teachercontroller");
const validator = require("./../validations/validator");
const router = express.Router();

router
  .route("/teachers")
  .get(Controller.getTeachers)
  .post(
    [
      body("fullname")
        .isAlpha()
        .isLength({ min: 3, max: 20 })
        .withMessage("teacher name should be string"),
      body("password")
        .isStrongPassword()
        .withMessage("teacher password should be strong"),
      body("email").isEmail().withMessage("teacher email should be valid"),
      body("image").isAlpha().withMessage("teacher  should have img"),
    ],
    validator,
    Controller.postTeacher
  )
  .patch(
    [
      body("fullname")
        .isAlpha()
        .isLength({ min: 3, max: 20 })
        .withMessage("teacher name should be string")
        .optional(),
      body("password")
        .isStrongPassword()
        .withMessage("teacher password should be strong")
        .optional(),
      body("email")
        .isEmail()
        .withMessage("teacher email should be valid")
        .optional(),
      body("image")
        .isAlpha()
        .withMessage("teacher  should have img")
        .optional(),
    ],
    validator,
    Controller.updateTeacher
  )
  .delete(
    [body("id").isMongoId().withMessage("teacher id shoud be objID")],
    Controller.deleteTeacher
  );

router.route("/teachers/supervise").get(Controller.getSupervisor);

router
  .route("/teachers/:id")
  .get(
    [param("id").isMongoId().withMessage("teacher id shoud be objID")],
    Controller.getTeacherByID
  );

module.exports = router;
