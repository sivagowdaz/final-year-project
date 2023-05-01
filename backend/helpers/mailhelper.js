// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

require('dotenv').config();
const sgMail = require('@sendgrid/mail')

function sendMail (data) {
    return new Promise((resolve, reject) => {
        var template = 
        `<head>

        </head>
        <body>
            <div>
                <div style="align-items: center;padding:100px 10px; text-align: center; background-color: rgb(74, 74, 255);">
                    <p style="font-size:50px; margin:0 auto; margin-bottom:50px; font-weight: bold; color:white;">ATTENDANCE MANAGER</p>
                    <p style="color: white;font-size:30px; margin:0 auto;">Your attendance registry</p>
                </div>
                <div style="align-items: center; text-align: center; background-color: white; padding: 120px 15px">
                    <div>
                        <p style="font-size: 43px; font-weight: bold; margin-bottom: 40px" >Hi <span style="color: rgb(74, 74, 255);">${data.name}</span></p>
                        <p style="font-size: 20px;">You are added as <span style="color:green">${data.role}</span> to <span style="color:green">${data.department_name} department</span> by ${data.admin_name}</p>
                    </div>
                    <div >
                        <p style="font-size: 18px;">Your Login Credentials</p>
                        <p style="font-size: 18px;">Login Id: <span style="color:red;">${data.teacher_id}</span></p>
                        <p style="font-size: 18px;">Password: <span style="color:red;">${data.password}</span></p>
                    </div>
                </div>
            </div>
        </body>`

        sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
        const msg = {
        to: data.to, // Change to your recipient
        from: 'finalyearprojectgroupsjec@gmail.com', // Change to your verified sender
        subject: 'Attendance Manager Login Credentials',
        text: 'and easy to do anywhere, even with Node.js',
        html: template,
        }


        sgMail
        .send(msg)
        .then(() => {
            resolve('Email sent')
        })
        .catch((error) => {
            reject(error)
        })
    })
}

function pdfTemplate ({studentData:{name, email, usn}, studentAttendanceReportData}) {
    const today = new Date();
    return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>PDF Result Template</title>
            <style>
                .student_info {
                    text-align: center;
                    margin-top: 50px;
                }
                td {
                    padding: 4px;
                    font-size: 15px;
                }
                .subjectwise_report {
                    width: 100%;
                }
                table {
                    margin: 10px auto;
                    border: 0.5px solid gray;
                }
            </style>
        </head>
        <body>
            <div class='student_info'>
                <h2>STUDENT ATTENDACE REPORT REPORT</h2>
                <div>
                    <p>Name: ${name}</p>
                    <p>Email: ${email}</p>
                    <p>USN: ${usn}</p>
                </div>
            </div>
            <div class='subjectwise_report'>
                <table>
                    <tr>
                        <th>Subject Id</th>
                        <th>Title</th>
                        <th>Total Classes</th>
                        <th>Attended Classes</th>
                        <th>Skipped Classes</th>
                        <th>Percentage</th>
                        <th>Remark</th>
                    </tr>
                    ${(() => {
                        let tableRows = ""
                        for(let i = 0;i < studentAttendanceReportData.length;i++){
                            tableRows += 
                            `<tr>
                                <td>${studentAttendanceReportData[i].subject_id}</td>
                                <td>${studentAttendanceReportData[i].subject_name}</td>
                                <td>${studentAttendanceReportData[i].total_classes}</td>
                                <td>${studentAttendanceReportData[i].attended_classes}</td>
                                <td>${studentAttendanceReportData[i].bunked_classes}</td>
                                <td>${studentAttendanceReportData[i].percentage}</td>
                                <td>${studentAttendanceReportData[i].percentage<=75?"Shortage":"Enough"}</td>
                            </tr>`
                        }
                        return tableRows
                    })()}
                </table>
            </div>
        </body>
        </html>
        `;
}

module.exports = {sendMail, pdfTemplate}
