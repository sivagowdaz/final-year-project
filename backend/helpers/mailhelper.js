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

// sendMail({to: 'shivaprasadshivaprasade@gmail.com', name: "Shivaprasad", role: 'Teacher', department_name: "Computer Science", admin_name: "Sridevi Saralaya", teacher_id: "teach45632", password: "password"})
module.exports = {sendMail}
