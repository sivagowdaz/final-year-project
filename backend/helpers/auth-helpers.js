const {pool} = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generate_acess_token = (user) => {
    token = jwt.sign(user, process.env.SECRET, { expiresIn: '100m' })
    console.log(token)
    return token
}

const verify_token = (req, res, next) => {
    const authToken = req.headers.authorization
    if (authToken) {
        jwt.verify(authToken, process.env.SECRET, (err, user) => {
            if(err) {
                console.log(err);
                return res.json({status:"invalid token"})
            }
            console.log("user is", user)
            req.user = user
            next()
        })
    } else {
        return res.json({"status":"authentication token is not provided"})
    }
}

const authenticate_user = async(req, res, next) => {
    const { admin_id, password } = req.body

    let user = await pool.query("select * from admin where admin_id = $1", [admin_id])
    let dbpassword
    let isMatch
    if (user.rows[0]) {
        dbpassword = user.rows[0].password
        isMatch = await bcrypt.compare(password, dbpassword)
        console.log("the password", isMatch)
    } 
    if (isMatch) {
        req.user = user.rows[0]
        next()
    } else {
        res.json({ status: "Invalid password or email" })
    }
}

const authenticate_teacher = async(req, res, next) => {
    const { teacher_id, password } = req.body

    let user = await pool.query("select * from teacher where teacher_id = $1", [teacher_id])
    let dbpassword
    let isMatch
    if (user.rows[0]) {
        dbpassword = user.rows[0].password
        isMatch = await bcrypt.compare(password, dbpassword)
        console.log("the password", isMatch)
    } 
    if (isMatch) {
        req.user = user.rows[0]
        next()
    } else {
        res.json({ status: "Invalid password or email" })
    }
}

module.exports = {
    generate_acess_token,
    verify_token, 
    authenticate_teacher,
    authenticate_user
}