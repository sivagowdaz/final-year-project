const express = require('express');
const router = express.Router();

const {verify_token} = require("../helpers/auth-helpers.js");

const {getRegisterId, getAttendanceId, closeConnection} = require("../controllers/scanner.js");

router.get('/student_register', getRegisterId);
router.get('/student_attendance', getAttendanceId);


router.get('/close_connection', verify_token, closeConnection);

module.exports = router;
