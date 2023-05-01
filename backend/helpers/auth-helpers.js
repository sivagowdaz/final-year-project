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
                return res.json({Error: "invalid token", status:400})
            }
            req.user = user
            next()
        })
    } else {
        return res.json({Error:"authentication token is not provided", status:400})
    }
}

const authenticate_user = async(req, res, next) => {
    const {admin_id, password} = req.body
    
    console.log(admin_id, password)

    let user = await pool.query("select * from admin where admin_id = $1", [admin_id])
    console.log(user)
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
        res.json({ status:400, Error: "Invalid password or email" })
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
        res.json({ status:400, Error: "Invalid password or email" })
    }
}

const authenticate_student = async(req, res, next) => {
    const {usn, password} = req.body
    console.log(req.body)
    let user = await pool.query("select * from student where usn = $1", [usn])
    console.log(user?.rows)
    let dbpassword
    let isMatch
    if (user.rows[0]) {
        dbpassword = user.rows[0].password
        if(password == dbpassword) {
            isMatch = true
        }
        console.log("the password", isMatch)
    } 
    if (isMatch) {
        req.user = user.rows[0]
        next()
    } else {
        res.json({ status:400, Error: "Invalid password or email" })
    }
}

function generate_id () {
    var id = 0
    for(let i = 0;i < 10;i++){
        let j = Math.floor(Math.random()* 10);
        id = (id * 10) + j
    }
    return id.toString();
}



module.exports = {
    generate_acess_token,
    verify_token, 
    authenticate_teacher,
    authenticate_user,
    authenticate_student,
    generate_id,
}