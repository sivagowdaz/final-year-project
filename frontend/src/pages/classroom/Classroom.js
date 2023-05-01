import {ipcRenderer} from 'electron';
import "./classroom.css";
import jwt from 'jwt-decode'
import { io } from "socket.io-client";
import Topbar from '../../components/topbar/Topbar';
import Modal from '../../components/modal/Modal';
import WindowPanel from '../../components/window_panel/WindowPanel';
import ComeBack from '../../components/comeback/ComeBack';

import { DataGrid} from '@mui/x-data-grid';

import React from 'react';
import {useState, useEffect, useRef} from 'react';

function Classroom () {
    const [classroomData, setClassroomData] = useState(null);
    const [subjectsData, setSubjectsData] = useState(null);
    const [studentsData, setStudentsData] = useState(null);
    const [teachersData, setTeachersData] = useState(null);

    const [addSubjectCred, setAddSubjectCred] = useState({})
    const [addStudentCred, setAddStudentCred] = useState({})
    const [userPrev, setUserPrev] = useState(null)

    const [addSubjectClick, setAddSubjectClick] = useState(false)
    const [addStudentClick, setAddStudentClick] = useState(false)

    const [windowData, setWindowData] = useState(null);
    const [studentSid, setStudentSid] = useState(null);

    const [statusMessage, setStatusMessage] = useState({});
    const [showModal, setShowModal] = useState(false);

    const socket = useRef();
    const sid = useRef();

    useEffect(() => {
        ipcRenderer.on('window_data_chanel', (event, winData) => {
        console.log("renderer win", winData);
            setWindowData(winData)
        })
    }, [])

    ipcRenderer.on('classroomData', (event, classroom) => {
        ipcRenderer.send('handshake:classroom', 'recieved')
        setClassroomData(classroom);
    })
    
    const getSubjectsData = () => {
        fetch(`http://localhost:5000/api/crud/get_subjects/${classroomData.classroom_id}`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.getItem('user')
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("DATA ISSSS", data)
                setSubjectsData(data.data)
            })
            .catch((err) => console.log(err));
    }

    const getStudentsData = () => {
        fetch(`http://localhost:5000/api/crud/get_students/${classroomData.classroom_id}`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.getItem('user')
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("DATA ISSSS", data)
                setStudentsData(data.data)
            })
            .catch((err) => console.log(err));
    }


    async function getTeachersData () {
        fetch(`http://localhost:5000/api/crud/get_teachers_for_teacher`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.getItem('user')
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("DATA teachers ISSSSSS", data)
                if(data.status == 200) {
                    console.log(data.data)
                    setTeachersData(data.data)
                } else {
                    console.log("TEACHERS DATA",data.Error)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        let token = window.localStorage.getItem('user');
        let user = jwt(token);
        setUserPrev(user);
    }, [])

    useEffect(() => {
        console.log('CLASSROOM DATA IS', classroomData)
        classroomData && getStudentsData();
        classroomData && getSubjectsData();
        classroomData && getTeachersData();
    },[classroomData])


    const handleAddSubjectFormChange = (e) => {
        e.preventDefault();
        setAddSubjectCred({...addSubjectCred, [e.target.name]: e.target.value});
    }

    const handleAddSubject = (e) => {
        e.preventDefault();
        console.log('SUBJECT CRED', addSubjectCred)
        fetch("http://localhost:5000/api/crud/add_subject", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.getItem('user')
                },
                body: JSON.stringify({...addSubjectCred, classroom_id:classroomData.classroom_id})
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.status == 200) {
                    setStatusMessage({msg:"Subject added successfully", color: 'green'})
                    setShowModal(true)
                    getSubjectsData();
                } else {
                    setStatusMessage({msg:data.Error, color: 'red'})
                    setShowModal(true)
                }
            })
            .catch((err) => {setStatusMessage("Something Went Wrong"); console.log(err)});
    }

    const handleAddStudentFormChange = (e) => {
        e.preventDefault();
        setAddStudentCred({...addStudentCred, [e.target.name]: e.target.value});
    }

    const handleAddStudent = (e) => {
        e.preventDefault();
        addStudentCred.student_id = studentSid;
        console.log("inside add student", addStudentCred)
        fetch("http://localhost:5000/api/crud/add_student", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.getItem('user')
                },
                body: JSON.stringify({...addStudentCred, classroom_id: classroomData.classroom_id })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.status == 200) {
                    setStudentSid(null)
                    sid.current.value=''
                    setStatusMessage({msg:"Student added successfully", color: 'green'})
                    setShowModal(true)
                    getStudentsData();
                } else {
                    setStatusMessage({msg:data.Error, color: 'red'})
                    setShowModal(true)
                }
            })
            .catch((err) => console.log(err));
    }

    const establishSocketConnection = () => {
        socket.current = io("http://localhost:5000");
        socket.current.on('register_id', (data) => {
            console.log("Recieved register id is", data);
            if(data.id) {
                let id = data.id.replace(/'/g, '', "")
                setStudentSid(id)
                sid.current.value = id;
            }
        })
    }

    const subject_columns = [
        {field: 'subject_id', headerName: 'ID', width: 150},
        { field: 'name', headerName: 'Title', width: 170 },
        {field: 'teacher_name', headerName: 'Assigned To', width: 170},
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: ({row}) => {
                return (
                    <>  
                        {
                            userPrev && !userPrev.is_admin && row.teacher_id == userPrev.teacher_id ?
                                <button className='take_attendance_btn' onClick={() => ipcRenderer.send('open_attendance_window', {subjectData: row, studentsData})}>Take Attendance</button>
                                :<button className='take_attendance_btn' style={{opacity:0.5}}>Take Attendance</button>
                        }
                        
                    </>
                )
            }
        }
    ]

    const student_columns = [
        {field: 'student_id', headerName: 'ID', width: 60},
        { field: 'name', headerName: 'Name', width: 160 },
        { field: 'email', headerName: 'Email', width: 160 },
        {
            field: 'action',
            headerName: 'View Record',
            width: 150,
            renderCell: ({row}) => {
                return (
                    <>
                        <button className='attendance_record_btn' onClick={()=>ipcRenderer.send('open_attendance_rocord_window', {subjectsData, studentData:row})}>Attendance Record</button>
                    </>
                )
            }
        },
        {
            field: 'Report',
            headerName: 'Report',
            width: 100,
            renderCell: ({row}) => {
                return (
                    <>
                        <button className='attendance_record_btn' onClick={()=>ipcRenderer.send('open_attendance_report_window', {subjectsData, studentData:row})}>Report</button>
                    </>
                )
            }
        }
    ]


    return (
        <div className='classroom'>
            <Topbar />
        <div className='classroom_container'>
            {
                classroomData && (
                    <div className='classroom_info'>
                        <p>{classroomData.name}</p>
                    </div>
                )
            }
            <div className='substuc_container'>
                <div>
                    {
                        subjectsData && subjectsData.length > 0 ?
                            (
                                <div>
                                    <h3>Subjects</h3>
                                    {
                                        <div style={{ height: '530px', width: 'content-fit' }}>
                                            <DataGrid
                                            rows={subjectsData}
                                            columns={subject_columns}
                                            initialState={{
                                            pagination: {
                                                paginationModel: {
                                                pageSize: 8,
                                                },
                                            },
                                            }}
                                            getRowId={(r) => r.subject_id}
                                            pageSizeOptions={[5]}
                                            disableRowSelectionOnClick
                                            />
                                        </div>   
                                    }
                                </div>
                            )
                            :
                            (   
                                <div>
                                    <h3>Subjects</h3>
                                    <div className='no_subjects'>
                                        <p>No subjects are added in this classroom</p>
                                    </div>
                                </div>
                            )
                    }
                    {   userPrev && !userPrev.is_admin && classroomData && userPrev.teacher_id == classroomData.teacher_id &&
                            <div>
                                <button className='add_subject_btn' style={{display:!addSubjectClick?"flex":"none"}} onClick={()=>setAddSubjectClick(true)}>Add Subject</button>
                                <div className='add_subject' style={{display:addSubjectClick?"flex":"none"}}>
                                    <input type='text' placeholder='title' name='name' onChange={(e)=>handleAddSubjectFormChange(e)}/>
                                    <input type='text' placeholder='subject id' name='subject_id' onChange={(e) => handleAddSubjectFormChange(e)} />
                                    {/* <input type='text' placeholder='teacher id' name='subject_teacher_id' onChange={(e) => handleAddSubjectFormChange(e)} /> */}
                                    <select placeholder='teacher id' name='subject_teacher_id' onChange={(e) => handleAddSubjectFormChange(e)}>
                                        {
                                            teachersData && teachersData.map((teacher) =>
                                            <option value={teacher.teacher_id} >{teacher.name}</option>
                                            )
                                        }
                                    </select>
                                    <button onClick={(e) => {setAddSubjectClick(false); handleAddSubject(e)}}>Add Subject</button>
                                </div>
                            </div>
                    }
                </div>

                <div>
                    {
                        studentsData && studentsData.length > 0 ?
                            (
                                <div>
                                    <h3>Students</h3>
                                    {
                                        <div style={{ height: '530px', width: 'content-fit' }}>
                                            <DataGrid
                                                rows={studentsData}
                                                columns={student_columns}
                                                initialState={{
                                                pagination: {
                                                    paginationModel: {
                                                    pageSize: 8,
                                                    },
                                                },
                                                }}
                                                getRowId={(r) => r.student_id}
                                                pageSizeOptions={[5]}
                                                disableRowSelectionOnClick
                                            />
                                        </div> 
                                    }
                                </div>
                            )
                            :
                            (   
                                <div>
                                    <h3>Students</h3>
                                    <div className='no_students'>
                                        <p>No students are added in this classroom</p>
                                    </div>
                                </div>

                            )
                    }
                    {
                    userPrev && !userPrev.is_admin && classroomData && userPrev.teacher_id == classroomData.teacher_id && 
                        <div>
                            <button className='add_student_btn' style={{display: !addStudentClick ? "flex" : "none"}} onClick={() => {setAddStudentClick(true); establishSocketConnection();}}>Add Student</button>
                            <div className='add_student' style={{display: addStudentClick ? "block" : "none"}}>
                                <div>
                                    {
                                        studentSid ?
                                            <div className='sid_box'>
                                                <p>Student Sid <span className='sid_val'>{studentSid}</span>. Enter this id sid input box</p>
                                            </div> :
                                            <div className='sid_box'>
                                                <p>Please punch on the scanner to get the student sid</p>
                                            </div>
                                    }
                                </div>
                                <div className='add_student_inputs'>
                                    <input type='text' placeholder='name' name='name' onChange={(e)=>handleAddStudentFormChange(e)}/>
                                    <input type='email' placeholder='email' name='email' onChange={(e) => handleAddStudentFormChange(e)} />
                                    <input type='text' placeholder='student id' name='student_id' readOnly ref={sid} onChange={(e) => handleAddStudentFormChange(e)} />
                                    <input type='text' placeholder='usn' name='usn' onChange={(e) => handleAddStudentFormChange(e)} />
                                    <input type='text' placeholder='password' name='password' onChange={(e) => handleAddStudentFormChange(e)} />
                                    <button disabled={!studentSid && 'disabled'} style={{opacity:!studentSid && '0.5'}} onClick={(e) => {setAddStudentClick(false); handleAddStudent(e)}}>Add Studenttt</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            </div>
            {
              showModal && <Modal statusMessage={statusMessage} time={3000} setShowModal={setShowModal} />
            }
            <ComeBack/>
            </div>
    )
}

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
      <Classroom />
  </React.StrictMode>
);
