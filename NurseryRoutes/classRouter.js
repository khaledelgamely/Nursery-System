const express = require("express");
const { query, param, body } = require("express-validator");
const Controller = require("./../NurseryController/classcontroller");
const validator = require("./../validations/validator");
const { isAdmin } = require("./../NurseryMiddelware/authenicatedMW");

const router = express.Router();

router
  .route("/class")
  .all(isAdmin)
  .get(Controller.getClasses)
  .post(
    [
      body("id").isInt().withMessage("class id shoud be number"),
      body("name").isAlpha().withMessage("class name should be string"),
      body("supervisor").isMongoId().withMessage("supervisor is must"),
      body("children").isArray().withMessage("ids of children "),
    ],
    validator,
    Controller.postClass
  )
  .patch(
    [
      body("id").isInt().withMessage("class id shoud be number"),
      body("name")
        .optional()
        .isAlpha()
        .withMessage("class name should be string"),
      body("supervisor")
        .optional()
        .isMongoId()
        .withMessage("supervisor is must"),
      body("children").optional().isArray().withMessage("ids of children "),
    ],
    validator,
    Controller.updateClass
  )
  .delete(Controller.deleteClass);

router.route("/class/:id").all(isAdmin).get(
  param("id").isInt().withMessage("class id shoud be number"),
  validator,

  Controller.getClassById
);
router
  .route("/class/:id/child")
  .all(isAdmin)

  .get(
    [param("id").isInt().withMessage("class id shoud be number")],
    validator,
    Controller.getClassInfo
  );
router
  .route("/class/:id/teacher")
  .all(isAdmin)

  .get(
    [param("id").isInt().withMessage("class id shoud be number")],
    validator,
    Controller.getSupervisorInfo
  );

module.exports = router;
