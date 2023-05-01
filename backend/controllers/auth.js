const {pool} = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {generate_acess_token} = require("../helpers/auth-helpers.js");

const register_admin = async (req, res) => {
    const {name, email, admin_id, password} = req.body;
    if(name && email && admin_id && password) {
        try {
            const salt = await bcrypt.genSalt(10);
            let hashed_password = await bcrypt.hash(password, salt);
            let new_admin = await pool.query("insert into admin(name, email, admin_id, password) values($1, $2, $3, $4) returning *", [name, email, admin_id, hashed_password]);
            token = generate_acess_token({admin_id, password, is_admin:true})
            return res.status(200).json({"token": token, status:200});
        } catch(err) {
            console.log(err)
            return res.json({"Error": "something went wrong", status:400})
        }
    } else {
        res.json({"message":"not enough parameters", status:400})
    }
}

const login_admin = async(req, res) => {
    try {
        user = req.user
        token = generate_acess_token({ admin_id: req.user.admin_id, password: req.user.password, is_admin:true })
        res.json({"token": {token}, status:200})
    } catch (error) {
        console.log(error.message)
        res.json({"Error": "login failed", status:400})
    }
}

const login_teacher = async(req, res) => {
    console.log("REQUEST OBJECT IS", req.get('origin'));
    try {
        let is_adviser_rec = await pool.query('select teacher.is_class_adviser from teacher where teacher.teacher_id=$1', [req.user.teacher_id]);
        let is_adviser = is_adviser_rec.rows[0].is_class_adviser;
        console.log("IS ADVISER", is_adviser);
        user = req.user
        token = generate_acess_token({ teacher_id: req.user.teacher_id, password: req.user.password, is_admin:false, is_adviser})
        res.json({ "token": { token }, "status":200})
    } catch (error) {
        console.log(error.message)
        res.json({"Error": "login failed", "status":400})
    }
}

const login_student = async (req, res) => {
    console.log("inside the  login student")
    try {
        user = req.user
        token = generate_acess_token({ student_id: req.user.usn, password: req.user.password, classroom_id: req.user.classroom_id})
        res.json({ "token": { token }, "status":200})
    } catch (error) {
        console.log(error.message)
        res.json({"Error": "login failed", "status":400})
    }
}


module.exports = {
    register_admin,
    login_admin,
    login_teacher,
    login_student
}