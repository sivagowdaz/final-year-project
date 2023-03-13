const express = require('express');
const router = express.Router();

const {
    register_admin, login_admin, login_teacher
} = require('../controllers/auth.js');

const {authenticate_user, authenticate_teacher} = require("../helpers/auth-helpers.js");

router.post("/register_admin", register_admin);
router.post("/login_admin", authenticate_user, login_admin);
router.post("/login_teacher", authenticate_teacher, login_teacher);

module.exports = router;