const express = require('express');
const router = express.Router();

const {verify_token} = require("../helpers/auth-helpers.js");

const {create_department,
    add_teacher,
    get_teachers,
    get_teachers_for_teacher,
    add_classroom,
    add_subject,
    add_student,
    get_classrooms,
    get_classrooms_admin,
    get_subjects,
    get_students,
    delete_classroom,
    delete_student,
    get_id,
    create_pdf,
    get_pdf} = require("../controllers/crud-functions.js");

router.post("/create_department", verify_token, create_department);
router.post("/add_teacher", verify_token, add_teacher);
router.post("/add_classroom", verify_token, add_classroom);
router.post("/add_subject", verify_token, add_subject);
router.post("/add_student", verify_token, add_student);
router.get("/get_classrooms", verify_token, get_classrooms);
router.get("/get_classrooms_admin", verify_token, get_classrooms_admin);
router.get("/get_teachers", verify_token, get_teachers);
router.get("/get_teachers_for_teacher", verify_token, get_teachers_for_teacher);
router.get("/get_subjects/:classroom_id", verify_token, get_subjects);
router.get("/get_students/:classroom_id", verify_token, get_students);
router.delete("/delete_classroom/:classroom_id", verify_token, delete_classroom);
router.delete("/delete_student/:student_id", verify_token, delete_student);
router.get("/get_id/:id_for", get_id);
router.post("/create_pdf", verify_token, create_pdf);
router.get("/get_pdf", verify_token, get_pdf);
module.exports = router;