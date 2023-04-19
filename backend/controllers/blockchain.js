const {getStudentAttendanceDetail,
    getStudentAttendancePercentage,
    uploadStudentAttendance} = require("../helpers/blockchain-helper.js");

const getAttendanceDetail = async (req, res) => {
    const {subject_id, student_id} = req.query;
    console.log("SUBJECT ID AND STUDENT ID",subject_id, student_id)
    try {
        let record = await getStudentAttendanceDetail(subject_id, student_id)
        console.log(record);
        let total_classes = record.total_classes.toString();
        let attended_classes = record.classes_attended.toString()
        let percentage = (attended_classes / total_classes) * 100;
        if(!percentage) {
            percentage = 0;
        }
        let attendance_record = record.student_attendance_data.map((sr)=>{return {class_number: sr.record_id.toString(), date:sr.date, timestamp:sr.timestamp, status:sr.status, remark:sr.remark}})
        console.log(percentage, attendance_record);
        res.status(200).json({total_classes, attended_classes, percentage, attendance_record});
    } catch(err) {
        console.log(err)
        res.json({Error: "error"});
    }
}

const getAttendancePercentage = async (req, res) => {
    const {subject_id, student_id} = req.query;
    try {
        // let percentage = await getStudentAttendancePercentage(subject_id, student_id); need to fix contract getPercentage function as it is not working well
        let record = await getStudentAttendanceDetail(subject_id, student_id);
        let per = (record.classes_attended.toString() / record.total_classes.toString()) * 100;
        // console.log(percentage.toString(),record.classes_attended.toString(), record.total_classes.toString());
        res.status(200).json(per);
    } catch(err) {
        console.log(err)
        res.json({Error: "error"});
    }
}

const uploadAttendance = async (req, res) => {
    let attendance_data = req.body;
    console.log("DATA IS", attendance_data);
    try {
        let response = await uploadStudentAttendance(attendance_data)
        console.log('RESPONSE', response);
        if(response.status == 200) {
            res.status(200).json({status:200});
        } else {
            res.json({status:400})
        }
    } catch(err) {
        console.log(err)
        res.json({status: 400});
    }
}


module.exports = {
    getAttendanceDetail,
    getAttendancePercentage,
    uploadAttendance
}