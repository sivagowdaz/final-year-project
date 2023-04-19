const express = require('express');
const router = express.Router();
const {verify_token} = require("../helpers/auth-helpers.js");

const {
    getAttendanceDetail,
    getAttendancePercentage,
    uploadAttendance} = require("../controllers/blockchain.js");

router.get("/attendance_detail", verify_token, getAttendanceDetail);
router.get("/attendace_percentage", verify_token, getAttendancePercentage);
router.post("/upload_attendance", verify_token, uploadAttendance);

module.exports = router;