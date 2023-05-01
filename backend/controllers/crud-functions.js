const {pool} = require("../db");
const bcrypt = require('bcryptjs');
const pdf = require('html-pdf');

const {pdfTemplate} = require("../helpers/mailhelper.js");
const {sendMail} = require("../helpers/mailhelper.js");
const {generate_id} = require("../helpers/auth-helpers");

const get_id = async (req, res) => {
    const {id_for} = req.params
    var id = generate_id();

    console.log("Inside the get id function", id_for)
    if(id_for == 'department') {
        while(true) {
            let dep_info = await pool.query('select department_id from department');
            let dep_ids = dep_info.rows;
            let found = false;
            dep_ids.every(id_obj => {
                if(id_obj.department_id == id) {
                    found = true
                    return false
                }
            });
            if(!found) {
                return res.status(200).json({id:id})
            }
        }
    } else if(id_for == 'admin') {
        while(true) {
            let admin_info = await pool.query('select admin_id from admin');
            let admin_ids = admin_info.rows;
            let found = false;
            admin_ids.every(id_obj => {
                if(id_obj.admin_id == id) {
                    found = true
                    return false
                }
            });
            if(!found) {
                return res.status(200).json({id:id})
            }
        }
    } else if(id_for == 'teacher') {
        while(true) {
            let teacher_info = await pool.query('select teacher_id from teacher');
            let teacher_ids = teacher_info.rows;
            let found = false;
            teacher_ids.every(id_obj => {
                if(id_obj.teacher_id == id) {
                    found = true
                    return false
                }
            });
            if(!found) {
                return res.status(200).json({id:id})
            }
        }
    } else if(id_for == 'student') {
        while(true) {
            let student_info = await pool.query('select student_id from student');
            let student_ids = student_info.rows;
            let found = false;
            student_ids.every(id_obj => {
                if(id_obj.student_id == id) {
                    found = true
                    return false
                }
            });
            if(!found) {
                return res.status(200).json({id:id})
            }
        }
    } else if(id_for == 'subject') {
        while(true) {
            let subject_info = await pool.query('select subject_id from subject');
            let subject_ids = subject_info.rows;
            let found = false;
            subject_ids.every(id_obj => {
                if(id_obj.subject_id == id) {
                    found = true
                    return false
                }
            });
            if(!found) {
                return res.status(200).json({id:id})
            }
        }
    } else if(id_for == 'classroom') {
        while(true) {
            let classroom_info = await pool.query('select classroom_id from classroom');
            let classroom_ids = classroom_info.rows;
            let found = false;
            classroom_ids.every(id_obj => {
                if(id_obj.classroom_id == id) {
                    found = true
                    return false
                }
            });
            if(!found) {
                return res.status(200).json({id:id})
            }
        }
    } else {
        console.log("invalid", id_for);
        return res.json({status:400, Error:"invalid id_for"})
    }
}

const create_department = async (req, res) => {
    const {name, department_id} = req.body;
    const admin_id = req.user.admin_id;
    if(name, department_id, admin_id) {
        try {
            const department = await pool.query("insert into department(name, department_id, admin_id) values($1, $2, $3) returning *", [name, department_id, admin_id]);
            return res.status(200).json({data:department.rows,status:200})
        } catch(err) {
            console.log(err)
            res.json({"Error": "Something went wrong", status:400})
        }
    } else {
        res.json({"Error": "Not enough parameters", status:400})
    }
}

const add_teacher = async(req, res) => {
    const {name, email, password, is_class_adviser, teacher_id} = req.body
    let department = await pool.query("select department.department_id from department where department.admin_id = $1", [req.user.admin_id]);
    let department_id = department.rows[0].department_id;

    
    try {
        if(name, email, password, is_class_adviser, teacher_id, department_id) {
            const salt = await bcrypt.genSalt(10);
            let hashed_password = await bcrypt.hash(password, salt);
            new_teacher = await pool.query("insert into teacher(name, email, password, is_class_adviser, teacher_id, department_id) values($1, $2, $3, $4, $5, $6) returning *", [name, email, hashed_password, is_class_adviser, teacher_id, department_id])
            if(new_teacher.rows[0]) {
                let department_name = department.rows[0].name;
                let admin_name = req.user.name;
                sendMail({to: email, name, role: 'Teacher', department_name, admin_name, teacher_id, password}).then((res) => console.log(res)).catch((err) => console.log(err));
            }
            return res.status(200).json({data: new_teacher.rows[0], status:200});
        } else {
            return res.json({"Error":"not enough parameters", status:400})
        }
    } catch(err) {
        console.log("error", err)
        return res.json({"Error": "Something Went Wrong", status:400})
    }
}


const add_classroom = async(req, res) => {
    const {name, classroom_id} = req.body;
    const teacher_id = req.user.teacher_id;
    const teacher = await pool.query('select * from teacher where teacher_id=$1', [teacher_id])
    const is_adviser = teacher.rows[0].is_class_adviser
    if(is_adviser) {
        if(name, classroom_id, teacher_id) {
            try {
                new_classroom = await pool.query("insert into classroom(name, classroom_id, teacher_id) values($1, $2, $3) returning *", [name, classroom_id, teacher_id])
                return res.status(200).json({data:new_classroom.rows, status:200})
            } catch(err) {
                return res.json({"Error": err, status: 400})
            }
        } else {
            return res.json({"Error": "not enough parameters", status:400})
        } 
    } else {
        return res.json({"Error":"You do not have adviser priviladge", status:400})
    }
}

const add_subject = async(req, res) => {
    const {name, subject_id, classroom_id, subject_teacher_id} = req.body;
    const teacher_id = req.user.teacher_id;
    const classroom = await pool.query('select * from classroom where classroom_id=$1', [classroom_id]);
    console.log('CLASSROOM ID', classroom_id)
    console.log("CLASSROOM DETAILS", classroom.rows);
    if(classroom.rows[0].teacher_id == teacher_id ? true : false) {
        if(name, subject_id, classroom_id) {
            try {
                new_subject = await pool.query("insert into subject(name, subject_id, classroom_id, subject_teacher_id) values($1, $2, $3, $4) returning *", [name, subject_id, classroom_id, subject_teacher_id]);
                res.status(200).json({data: new_subject.rows, status: 200})
            } catch(err) {
                res.json({"Error": err, status:200})
            }
        } else {
            res.json({"Error":"not enough parameters", status:200})
        }
    } else {
        res.json({"Error": "You can not add subjects to this class since you are not the creator", status:200})
    }
}

const add_student = async(req, res) => {
    const {name, email, student_id, classroom_id, password, usn} = req.body;
    const teacher_id = req.user.teacher_id;
    console.log('CLASSROOM ID', classroom_id)
    const classroom = await pool.query('select * from classroom where classroom_id=$1', [classroom_id]);
    if(classroom.rows[0].teacher_id == teacher_id ? true : false) {
        if(name, email, student_id, classroom_id) {
            try {
                new_student = await pool.query("insert into student(name, email, student_id, classroom_id, password, usn) values($1, $2, $3, $4, $5, $6) returning *", [name, email, student_id, classroom_id, password, usn]);
                res.status(200).json({data: new_student.rows, status: 200})
            } catch(err) {
                res.json({"Error": err, status:400})
            }
        } else { 
            res.json({"Error":"not enough parameters", status:400})
        }
    } else {
        res.json({"Error": "You can not add subjects to this class since you are not the creator", status:400})
    }
}

const get_classrooms = async(req, res) => {
    try {
        const department = await pool.query("select * from department where department_id = (select department_id from teacher where teacher_id = $1)", [req.user.teacher_id]);
        // const classrooms = await pool.query("select * from classroom where classroom.classroom_id in (select classroom.classroom_id from teacher join department on department.department_id = teacher.department_id join classroom on classroom.teacher_id = teacher.teacher_id where department.department_id = (select teacher.department_id from teacher where teacher.teacher_id = $1))", [req.user.teacher_id]);
        const classrooms = await pool.query("select classroom.name, classroom.number_of_students, classroom.classroom_id, classroom.teacher_id, teacher.name as teacher_name from classroom join teacher on teacher.teacher_id = classroom.teacher_id where classroom.classroom_id in (select classroom.classroom_id from teacher join department on department.department_id = teacher.department_id join classroom on classroom.teacher_id = teacher.teacher_id where department.department_id = (select teacher.department_id from teacher where teacher.teacher_id = $1))", [req.user.teacher_id]);
        res.status(200).json({"department":department.rows,"classrooms": classrooms.rows, status:200})
    } catch(err) {
        res.json({"Error": "Something Went Wrong!!", status:400})
    }

}

const get_classrooms_admin = async (req, res) => {
    try {
        const department = await pool.query("select * from department where department.admin_id = $1", [req.user.admin_id])
        console.log("DEPARTMENT", department);
        let classrooms;
        if(department.rows.length != 0) {
            // classrooms = await pool.query("select * from classroom where classroom.classroom_id in (select classroom.classroom_id from teacher join classroom on classroom.teacher_id = teacher.teacher_id join department on department.department_id = teacher.department_id where department.department_id = $1)", [department.rows[0].department_id])  
            classrooms = await pool.query("select classroom.name, classroom.number_of_students, classroom.classroom_id, classroom.teacher_id, teacher.name as teacher_name from classroom join teacher on teacher.teacher_id = classroom.teacher_id where classroom.classroom_id in (select classroom.classroom_id from teacher join classroom on classroom.teacher_id = teacher.teacher_id join department on department.department_id = teacher.department_id where department.department_id = $1)", [department.rows[0].department_id])  
        } else {
            classrooms = {rows:[]}
        }
        res.status(200).json({"department":department.rows, "classrooms": classrooms.rows, status:200})
    } catch(err) {
        res.josn({"Error": "Something went wrong", status:400})
    }
}

const get_teachers = async (req, res) => {
    // const {department_id} = req.params;
    try {
        // let teachers = await pool.query("select * from teacher where teacher.department_id=$1", [department_id]);
        let teachers = await pool.query("select teacher.name, teacher.email, teacher.is_class_adviser from teacher join department on teacher.department_id = department.department_id join admin on admin.admin_id = department.admin_id where admin.admin_id=$1",[req.user.admin_id])
        res.status(200).json({data:teachers.rows, status:200})
    } catch(err) {
        console.log(err)
        res.json({Error:"Something went wrong", status:400})
    }
}

const get_teachers_for_teacher = async (req, res) => {
    try {
        let teachers = await pool.query("select teacher.name, teacher.teacher_id from teacher join department on teacher.department_id = department.department_id where teacher.department_id=(select teacher.department_id from teacher where teacher.teacher_id=$1)",[req.user.teacher_id])
        res.status(200).json({data:teachers.rows, status:200})
    } catch(err) {
        console.log(err)
    }
}

const get_subjects = async(req, res) => {
    const {classroom_id} = req.params;
    console.log('classroom id', classroom_id)
    try {
        subjects = await pool.query("select subject.name, subject.subject_id, subject.classroom_id, teacher.name as teacher_name, teacher.teacher_id from subject join teacher on subject.subject_teacher_id = teacher.teacher_id where classroom_id= $1", [classroom_id]);
        console.log("SUBJECTS DATA", subjects.rows)
        res.status(200).json({data: subjects.rows, status: 200})
    } catch(err) {
        console.log(err)
        res.json({"Error": "Something Went Wrong!!", status:400})
    }
}

const get_students = async(req, res) => {
    const {classroom_id} = req.params;
    try {
        students = await pool.query("select * from student where classroom_id = $1", [classroom_id]);
        
        res.status(200).json({data: students.rows, status: 200})
    } catch(err) {
        console.log(err)
        res.json({"Error": "Something Went Wrong!!", status:400})
    }
}

//teacher can delete the class room if she is the creator of the classroom
const delete_classroom = async(req, res) => {
    const {classroom_id} = req.params;
    try {
        const teacher_id = req.user.teacher_id;
        const classroom = await pool.query("select * from classroom where classroom_id=$1", [parseInt(classroom_id)])
        if(teacher_id == classroom.rows[0].teacher_id ? true : false) {
            let del_classroom = await pool.query("delete from classroom where classroom_id=$1 returning *", [parseInt(classroom_id)])
            res.status(200).json({data: del_classroom.rows[0], status: 200}); 
        } else {
            res.json({"Error":"Access denied", status:400})
        }
    } catch(err) {
        console.log(err);
        res.json({"Error":"Something went wrong!!", status:400})
    }

}

//delete students
const delete_student = async(req, res) => {
    const {student_id} = req.params;
    try {
        const teacher_id = req.user.teacher_id;
        const student = await pool.query("select student.name, student.email, student.student_id from student join classroom on student.classroom_id = classroom.classroom_id join teacher on teacher.teacher_id = classroom.teacher_id where teacher.teacher_id = $1 and student.student_id=$2;", [teacher_id, student_id])
        if(student.rows.length === 1) {
            let del_student = await pool.query("delete from student where student_id=$1 returning *", [student_id])
            res.status(200).json({data: del_student.rows[0], status: 200}); 
        } else {
            res.json({"Error":"Access denied", status:400})
        }
    } catch(err) {
        console.log(err);
        res.json({"Error":"Something went wrong!!", status:400})
    }

}

const create_pdf =  async(req, res) => {
    try {
        pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
    } catch(err) {
        console.log(err)
    }
}
const path = require('path');

const get_pdf = async (req, res) => {
    console.log(path.join(__dirname, '..', 'result.pdf'));
    try {
        res.sendFile(`${path.join(__dirname, '..', 'result.pdf')}`)
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    create_department,
    add_classroom,
    add_teacher,
    get_teachers,
    get_teachers_for_teacher,
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
    get_pdf
}