const {pool} = require("../db");

const closeConnection = async (req, res) => {
    conn.disconnect(true);
    return;
}

const getRegisterId = async (req, res) => {
    console.log(req)
    console.log(req.query)
    const {id} = req.query;
    try {
        console.log("SUCCESS", id);
        console.log("socket id", conn.id);
        conn.emit('register_id', {id});
        return;
    } catch(err) {
        console.log(err)
        return;
    }
}

const getAttendanceId = async (req, res) => {
    const {sid, stat} = req.query;
    console.log("sid is", sid)
    try {
        console.log("SUCCESS", sid);
        let student_detail = await pool.query(`select * from student where student.student_id=${sid}`);
        console.log("STUDENT RECORD IS", student_detail.rows);
        if(student_detail.rows.length > 0) {
            let now = new Date();
            let date = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`
            let timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
            let stu_tmp = student_detail.rows[0];
            let attendance_record = {name:stu_tmp.name, student_id:stu_tmp.usn, status:true, remark:'present', date, timestamp }
            conn.emit('attendance_id', {data:attendance_record, status:200});
        } else {
            conn.emit('attendance_id', {status:400})
        }
        return;
    } catch(err) {
        console.log(err)
        return;
    }
}

module.exports = {
    getRegisterId,
    getAttendanceId,
    closeConnection
}