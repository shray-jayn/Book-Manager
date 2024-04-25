const express = require("express");
const authRouter = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");
const { validateRegisterInput, validateLoginInput } = require("../middleware/validationMiddleware");

authRouter.post("/register", validateRegisterInput, registerUser);
authRouter.post("/login", validateLoginInput, loginUser);

module.exports = authRouter;
