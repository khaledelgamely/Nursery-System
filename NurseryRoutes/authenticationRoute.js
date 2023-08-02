const express = require("express");
const Controller = require("./../NurseryController/authenticationcontroller");

const router = express.Router();

router.post("/login", Controller.login);

module.exports = router;
