const electron = require("electron")
const path = require("path")

const {app, BrowserWindow, ipcMain} = electron;
const {WindowsList} = require("./tabs.js")

app.disableHardwareAcceleration();

let homeWindow;
let classroomWindow;
let loginWindow;
let attendanceWindow;
let attendanceRecordWindow;
let attendanceReportWindow;

let winList;

// function sendWindowInfo (window) {
//     setTimeout(() => {
//         window.webContents.send("window_data_chanel", winList.printData());
//     }, 500)
// }

app.on('ready', () => {
    winList = new WindowsList();
    createLoginWindow();
})

function createLoginWindow () {
    loginWindow = new BrowserWindow({
        title: 'Student Attendance System',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            backgroundTrottling: false,
        }
    })
    loginWindow.maximize()
    
    loginWindow.loadURL(`file://${__dirname}/public/login.html`);
    loginWindow.on('closed', () => loginWindow = null);
    winList.destroyAllWindows();
}

function createHomeWindow () {
    homeWindow = new BrowserWindow({
        title: 'Add New Todo',
        webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                backgroundTrottling: false,
            }
    });
    homeWindow.maximize()
    homeWindow.loadURL(`file://${__dirname}/public/home.html`);
    
    if(winList.currentWindow) {
        winList.currentWindow.hide();
    }

    winList.insertEnd(homeWindow, 'home');
    // sendWindowInfo(homeWindow);
    // homeWindow.on('show', () => {console.log("inside from the homewinow show"); sendWindowInfo(homeWindow)})
    // console.log(winList.printData());

    homeWindow.on('closed', () => homeWindow = null);
}

let classroomInterval;
function createClassroomWindow (classroom) {
    console.log("inside openClassroomWindow")
    classroomWindow = new BrowserWindow({
        title: 'Classroom Window',
        webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                backgroundTrottling: false,
            }
    });
    classroomWindow.maximize()
    classroomWindow.loadURL(`file://${__dirname}/public/classroom.html`);
    
    // winList.getTopWindow().window.hide();

    winList.currentWindow.hide();
    winList.insertEnd(classroomWindow, `classroom:${classroom.name}`);
    // sendWindowInfo(classroomWindow);
    // classroomWindow.on('show', () => {console.log("inside from the classroom show");sendWindowInfo(classroomWindow)})
    // console.log(winList.printData());

    classroomInterval = setInterval(() => {
        classroomWindow.webContents.send('classroomData', classroom)
    });
    classroomWindow.on('closed', () => classroomWindow = null);
}

let attendanceInterval;
function createAttendanceWindow (data) {
    attendanceWindow = new BrowserWindow({
        title: 'Student Attendance System',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            backgroundTrottling: false,
        }
    })
    attendanceWindow.maximize()

    attendanceWindow.loadURL(`file://${__dirname}/public/attendance.html`);
    
    // winList.getTopWindow().window.hide();
    winList.currentWindow.hide();
    winList.insertEnd(attendanceWindow, `attendance:${data.subjectData.name}`);
    // sendWindowInfo(attendanceWindow);
    // attendanceWindow.on('show', () => {console.log("inside from the attendance show", winList.printData()); sendWindowInfo(attendanceWindow)})

    attendanceWindow.on('closed', () => attendanceWindow = null);

    attendanceInterval = setInterval(() => {
        attendanceWindow.webContents.send('attendanceData', data)
    });
}

let attendanceRecordInterval;

function createAttendanceRecordWindow (data) {
    attendanceRecordWindow = new BrowserWindow({
        title: 'Student Attendance System',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            backgroundTrottling: false,
        }
    })
    attendanceRecordWindow.maximize()

    attendanceRecordWindow.loadURL(`file://${__dirname}/public/attendance_record.html`);
    
    // winList.getTopWindow().window.hide();
    winList.currentWindow.hide();
    winList.insertEnd(attendanceRecordWindow, `record:${data.studentData.name}`);
    // sendWindowInfo(attendanceRecordWindow);
    // attendanceRecordWindow.on('show', () => {console.log("inside from the attendance record show"); sendWindowInfo(attendanceRecordWindow)});
    // console.log(winList.printData());

    attendanceRecordWindow.on('closed', () => attendanceRecordWindow = null);

    attendanceRecordInterval = setInterval(() => {
        attendanceRecordWindow.webContents.send('attendanceRecordData', data)
    });
}

let attendanceReportInterval;
function createAttendanceReportWindow (data) {
    console.log("inside report window")
    attendanceReportWindow = new BrowserWindow({
        title: 'Student Attendance System',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            backgroundTrottling: false,
        }
    })
    attendanceReportWindow.maximize()

    attendanceReportWindow.loadURL(`file://${__dirname}/public/attendance_report.html`);
    
    // winList.getTopWindow().window.hide();
    winList.currentWindow.hide();
    winList.insertEnd(attendanceReportWindow, `record:${data.studentData.name}`);
    // sendWindowInfo(attendanceRecordWindow);
    // attendanceRecordWindow.on('show', () => {console.log("inside from the attendance record show"); sendWindowInfo(attendanceRecordWindow)});
    // console.log(winList.printData());

    attendanceReportWindow.on('closed', () => attendanceReportWindow = null);

    attendanceReportInterval = setTimeout(() => {
        attendanceReportWindow.webContents.send('attendanceReportData', data)
    }, 600);
}

ipcMain.on('handshake:classroom', (event, data) => {
    if(data == 'recieved') {
        clearInterval(classroomInterval);
        classroomWindow.webContents.removeListener('classroomData', ()=>{});
    }
})

ipcMain.on('handshake:attendance', (event, data) => {
    if(data == 'recieved') {
        clearInterval(attendanceInterval);
        attendanceWindow.webContents.removeListener('attendanceData', ()=>{});

    }
})

ipcMain.on('handshake:attendance_record', (event, data) => {
    if(data == 'recieved') {
        clearInterval(attendanceRecordInterval);
        attendanceRecordWindow.webContents.removeListener('attendanceRecordData', ()=>{}); 
    }
})

// ipcMain.on('handshake:attendance_report', (event, data) => {
//     if(data == 'recieved') {
//         console.log("inside the clear interval")
//         clearInterval(attendanceReportInterval);
//         attendanceReportWindow.webContents.removeListener('attendanceReportData', ()=>{}); 
//     }
// })

ipcMain.on('open_home_window', (event, page) => {
    loginWindow.close()
    createHomeWindow();
});

ipcMain.on('open_classroom_window', (event, classroom) => {
    // homeWindow.close();
    createClassroomWindow(classroom);
})

ipcMain.on('open_login_window', (event, data) => {
    // classroomWindow.close();
    createLoginWindow();
})

ipcMain.on('open_attendance_window', (event, data) => {
    // classroomWindow.close();
    createAttendanceWindow(data);
})

ipcMain.on('open_attendance_rocord_window', (event, data) => {
    // classroomWindow.close();
    createAttendanceRecordWindow(data);
})

ipcMain.on('open_attendance_report_window', (event, data) => {
    console.log("inside ipc report ")
    createAttendanceReportWindow(data);
})

ipcMain.on("come_back", (event, data) => {
    if(data == 'come_back') {
        winList.comeBack();
    }
})