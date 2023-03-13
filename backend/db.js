const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'asub',
    password: 'shiva@123',
})


module.exports = {pool}



//select * from classroom where classroom.classroom_id in (select classroom.classroom_id from teacher join department on department.department_id = teacher.department_id join classroom on classroom.teacher_id = teacher.teacher_id where department.department_id = '5444444444');