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
            token = generate_acess_token({admin_id, password})
            return res.status(200).json({"token": token});
        } catch(err) {
            console.log(err)
            return res.json({"Error": err})
        }
    } else {
        res.json({"message":"not enough parameters"})
    }
}

const login_admin = async(req, res) => {
    try {
        user = req.user
        token = generate_acess_token({ admin_id: req.user.admin_id, password: req.user.password })
        res.json({ "token": { token }})
    } catch (error) {
        console.log(error.message)
        res.json({"Error": "login failed"})
    }
}

const login_teacher = (req, res) => {
    try {
        user = req.user
        token = generate_acess_token({ teacher_id: req.user.teacher_id, password: req.user.password })
        res.json({ "token": { token }})
    } catch (error) {
        console.log(error.message)
        res.json({"Error": "login failed"})
    }
}




module.exports = {
    register_admin,
    login_admin,
    login_teacher,
}