const express = require("express");
const { query, param, body } = require("express-validator");
const Controller = require("./../NurseryController/childcontroller");
const validator = require("./../validations/validator");
const { isAdmin } = require("./../NurseryMiddelware/authenicatedMW");

const router = express.Router();

router
  .route("/child")
  .all(isAdmin)
  .get(Controller.getChildren)
  // .post
  // ([
  //     body("id").isInt().withMessage("child id shoud be number"),
  //     body("fullname").isAlpha().withMessage("child name should be string"),
  //     body("age").isInt().withMessage("age is must"),
  //     body("level").isIn(["PreKG", "KG1", "KG2"]).withMessage("level is must"),
  //     body("address").isObject().withMessage("child  should have address"),
  //     body("address.city").isAlpha().withMessage("city  should be string"),
  //     body("address.street").isInt().withMessage("street  should be number"),
  //     body("address.building")
  //       .isInt()
  //       .withMessage("building  should be number"),
  //   ],
  //   validator,
  //   Controller.postChild
  // )
  .patch(
    [
      body("id").isInt().withMessage("child id shoud be number"),
      body("fullname")
        .optional()
        .isAlpha()
        .withMessage("child name should be string"),
      body("age").isInt().optional().withMessage("age is must"),
      body("level")
        .optional()
        .isIn(["PreKG", "KG1", "KG2"])
        .withMessage("level is must"),
      body("address")
        .optional()
        .isObject()
        .withMessage("child  should have address"),
      body("address.city")
        .optional()
        .isAlpha()
        .withMessage("city  should be string"),
      body("address.street")
        .optional()
        .isInt()
        .withMessage("street  should be number"),
      body("address.building")
        .optional()
        .isInt()
        .withMessage("building  should be number"),
    ],
    validator,
    Controller.updateChild
  )
  .delete(
    [body("id").isInt().withMessage("child id shoud be number")],
    validator,
    Controller.deleteChild
  );

router
  .route("/child/:id/class")
  .all(isAdmin)

  .get(
    [param("id").isInt().withMessage("Child id must be Number")],
    validator,
    Controller.getClassByChild
  );

router
  .route("/child/:id")
  .all(isAdmin)

  .get(
    [param("id").isInt().withMessage("Child id must be Number")],
    validator,
    Controller.getChildByID
  );

module.exports = router;
