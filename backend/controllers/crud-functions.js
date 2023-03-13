const {pool} = require("../db");
const bcrypt = require('bcryptjs');



const create_department = async (req, res) => {
    const {name, department_id} = req.body;
    const admin_id = req.user.admin_id;
    if(name, department_id, admin_id) {
        try {
            const department = await pool.query("insert into department(name, department_id, admin_id) values($1, $2, $3) returning *", [name, department_id, admin_id]);
            return res.status(200).json(department.rows)
        } catch(err) {
            console.log(err)
            res.json({"Error": err})
        }
    } else {
        res.json({"Error": " not enough parameters"})
    }
}

const add_teacher = async(req, res) => {
    const {name, email, password, is_class_adviser, teacher_id, department_id} = req.body
    if(name, email, password, is_class_adviser, teacher_id, department_id) {
        const salt = await bcrypt.genSalt(10);
        let hashed_password = await bcrypt.hash(password, salt);
        new_teacher = await pool.query("insert into teacher(name, email, password, is_class_adviser, teacher_id, department_id) values($1, $2, $3, $4, $5, $6) returning *", [name, email, hashed_password, is_class_adviser, teacher_id, department_id])
        return res.status(200).json(new_teacher.rows[0]);
    } else {
        res.json({"Error":"not enough parameters"})
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
                return res.status(200).json(new_classroom.rows)
            } catch(err) {
                return res.json({"Error": err})
            }
        } else {
            return res.json({"Error": "not enough parameters"})
        } 
    } else {
        return res.json({"Error":"You do not have adviser priviladge"})
    }
}

const add_subject = async(req, res) => {
    const {name, subject_id, classroom_id} = req.body;
    const teacher_id = req.user.teacher_id;
    const classroom = await pool.query('select * from classroom where classroom_id=$1', [classroom_id]);

    if(classroom.rows[0].teacher_id == teacher_id ? true : false) {
        if(name, subject_id, classroom_id) {
            try {
                new_subject = await pool.query("insert into subject(name, subject_id, classroom_id) values($1, $2, $3) returning *", [name, subject_id, classroom_id]);
                res.status(200).json(new_subject.rows)
            } catch(err) {
                res.josn({"Error": err})
            }
        } else {
            res.json({"Error":"not enough parameters"})
        }
    } else {
        res.json({"Error": "You can not add subjects to this class since you are not the creator"})
    }
}

const add_student = async(req, res) => {
    const {name, email, student_id, classroom_id} = req.body;
    const teacher_id = req.user.teacher_id;
    const classroom = await pool.query('select * from classroom where classroom_id=$1', [classroom_id]);

    if(classroom.rows[0].teacher_id == teacher_id ? true : false) {
        if(name, email, student_id, classroom_id) {
            try {
                new_student = await pool.query("insert into student(name, email, student_id, classroom_id) values($1, $2, $3, $4) returning *", [name, email, student_id, classroom_id]);
                res.status(200).json(new_student.rows)
            } catch(err) {
                res.josn({"Error": err})
            }
        } else {
            res.json({"Error":"not enough parameters"})
        }
    } else {
        res.json({"Error": "You can not add subjects to this class since you are not the creator"})
    }
}

const get_classrooms = async(req, res) => {
    try {
        const classrooms = await pool.query("select * from classroom where classroom.classroom_id in (select classroom.classroom_id from teacher join department on department.department_id = teacher.department_id join classroom on classroom.teacher_id = teacher.teacher_id where department.department_id = (select teacher.department_id from teacher where teacher.teacher_id = $1))", [req.user.teacher_id]);
        res.status(200).json(classrooms.rows)
    } catch(err) {
        res.json({"Error": "Something Went Wrong!!"})
    }

}

const get_subjects = async(req, res) => {
    const {classroom_id} = req.params;
    console.log(classroom_id, typeof(classroom_id))
    try {
        subjects = await pool.query("select * from subject where classroom_id = $1", [parseInt(classroom_id)]);
        
        res.status(200).json(subjects.rows)
    } catch(err) {
        console.log(err)
        res.json({"Error": "Something Went Wrong!!"})
    }
}

const get_students = async(req, res) => {
    const {classroom_id} = req.params;
    try {
        students = await pool.query("select * from student where classroom_id = $1", [parseInt(classroom_id)]);
        
        res.status(200).json(students.rows)
    } catch(err) {
        console.log(err)
        res.json({"Error": "Something Went Wrong!!"})
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
            res.status(200).json(del_classroom.rows[0]); 
        } else {
            res.json({"Error":"Access denied"})
        }
    } catch(err) {
        console.log(err);
        res.json({"Error":"Something went wrong!!"})
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
            res.status(200).json(del_student.rows[0]); 
        } else {
            res.json({"Error":"Access denied"})
        }
    } catch(err) {
        console.log(err);
        res.json({"Error":"Something went wrong!!"})
    }

}

module.exports = {
    create_department,
    add_classroom,
    add_teacher,
    add_subject,
    add_student,
    get_classrooms,
    get_subjects,
    get_students,
    delete_classroom,
    delete_student
}