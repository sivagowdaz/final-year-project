const express = require('express');
const router = express.Router();

const {
    register_admin, login_admin, login_teacher, login_student
} = require('../controllers/auth.js');

const {authenticate_user, authenticate_teacher, authenticate_student} = require("../helpers/auth-helpers.js");

router.post("/register_admin", register_admin);
router.post("/login_admin", authenticate_user, login_admin);
router.post("/login_teacher", authenticate_teacher, login_teacher);
router.post("/login_student", authenticate_student, login_student);

module.exports = router;