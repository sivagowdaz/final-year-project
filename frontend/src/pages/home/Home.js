import {BsFillPeopleFill} from 'react-icons/bs';
import {GrAdd} from 'react-icons/gr';
import {MdDelete} from 'react-icons/md';
import {MdDone} from 'react-icons/md';
import {GrFormAdd} from 'react-icons/gr';
import {HiOutlineX} from 'react-icons/hi'
import {ipcRenderer} from 'electron';
import Topbar from '../../components/topbar/Topbar';
import Modal from '../../components/modal/Modal';
import jwt from 'jwt-decode'

// import {DataGrid} from '@mui/x-data-grid';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import './home.css';

import React from 'react'
import { useState, useEffect } from 'react';

function Home () {
    const [user, setUser] = useState(window.localStorage.getItem('login_user'))
    const [classroomData, setClassroomData] = useState();
    const [teacherData, setTeacherData] = useState();
    const [depCred, setDepCred] = useState({});
    const [classroomCred, setClassroomCred] = useState({});
    const [createDepClick, setCreateDepClick] = useState(false);
    const [addTeacherClick, setAddTeacherClick] = useState(false);
    const [addClassroomClick, setAddClassroomClick] = useState(false);
    const [addTeacherCred, setAddTeacherCred] = useState({})
    
    const [userPrev, setUserPrev] = useState(null)

    const [statusMessage, setStatusMessage] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [windowData, setWindowData] = useState(null);

    useEffect(() => {
        let token = window.localStorage.getItem('user');
        let user = jwt(token);
        setUserPrev(user);
        console.log('USER PREV', user)
     }, [])
    
    useEffect(() => {
        ipcRenderer.on('window_data_chanel', (event, winData) => {
        console.log("renderer win", winData);
            setWindowData(winData)
        })
    }, [])

    useEffect(() => {
        let login_user = window.localStorage.getItem('login_user');
        if(login_user == "admin") {
            getClassroomsAdmin();
        }
        if(user == 'teacher') {
            console.log("TEACHER")
            getClassroomsTeacher();
        }
    }, [createDepClick]);

    useEffect(() => {
        let login_user = window.localStorage.getItem('login_user');
        if(login_user == "admin") {
            getTeachersData();
        }
    }, []);

    async function getClassroomsAdmin () {
        fetch("http://localhost:5000/api/crud/get_classrooms_admin", {
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
                if(data.status == 200) {
                    setClassroomData(data)
                } else {
                    console.log(data.Error)
                    setStatusMessage({msg:data.Error, color: 'red'})
                    setShowModal(true)
                }
            })
            .catch((err) => console.log(err));
    }
    
    async function getClassroomsTeacher () {
        fetch("http://localhost:5000/api/crud/get_classrooms", {
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
                if(data.status == 200) {
                    setClassroomData(data)
                } else {
                    console.log(data.Error)
                    setStatusMessage({msg:data.Error, color: 'red'})
                    setShowModal(true)
                }
            })
            .catch((err) => console.log(err));
    }

    async function getTeachersData () {
        fetch(`http://localhost:5000/api/crud/get_teachers`, {
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
                    setTeacherData(data.data)
                } else {
                    console.log(data.Error)
                    setStatusMessage({msg:data.Error, color: 'red'})
                    setShowModal(true)
                }
            })
            .catch((err) => {
                console.log(err);
                setStatusMessage({msg: data.Error, color: 'red'})
                setShowModal(true)
            });
    }

    const handleDepFormChange = (e) => {
        e.preventDefault();
        setDepCred({...depCred, [e.target.name]:e.target.value})
    }
    
    const handleCreateDepartment = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/api/crud/create_department", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.getItem('user')
                },
                body: JSON.stringify(depCred)
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.status == 200) {
                    setStatusMessage({msg:"Department created successfully", color: 'green'})
                    setShowModal(true)
                    getClassroomsAdmin();
                } else {
                    console.log(data.Error)
                    setStatusMessage({msg:data.Error, color: 'red'})
                    setShowModal(true)
                }
            })
            .catch((err) => console.log(err));
    }

    const handleAddTeacherFormChange = (e) => {
        e.preventDefault();
        setAddTeacherCred({...addTeacherCred, [e.target.name]:e.target.value})
    }
    
    const handleAddTeacher = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/api/crud/add_teacher", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.getItem('user')
                },
                body: JSON.stringify(addTeacherCred)
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("The data is new teacher", data)
                if(data.status == 200) {
                    setStatusMessage({msg:"Teacher is added successfully", color: 'green'})
                    setShowModal(true)
                    getTeachersData(); 
                } else {
                   setStatusMessage({msg:data.Error, color: 'red'})
                   setShowModal(true)
                }
            })
            .catch((err) => console.log(err));
    }
    
    const handleAddClassroomFormChange = (e) => {
        e.preventDefault();
        setClassroomCred({...classroomCred, [e.target.name]:e.target.value})
    }

    const handleAddClassroom = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/api/crud/add_classroom", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.getItem('user')
                },
                body: JSON.stringify(classroomCred)
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("The data is new teacher", data)
                if(data.status == 200) {
                    setStatusMessage({msg:"classroom added successfully", color: 'green'})
                    setShowModal(true)
                    getClassroomsTeacher();
                } else {
                    setStatusMessage({msg:data.Error, color: 'red'})
                    setShowModal(true)
                }
            })
            .catch((err) => console.log(err));

    }

    const openClassroomWindow = (classroom) => {
        ipcRenderer.send('open_classroom_window', classroom);
    }
    
    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        {field: 'email', headerName: 'Email', width: 250},
        {
            field: 'is_class_adviser',
            headerName: 'Adviser',
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        {
                            params.row.is_class_adviser?<MdDone color='green' size='20px'/>:<p><HiOutlineX color='red' size='20px'/></p>
                        }
                    </div>
                )
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <MdDelete color='red' size='20px'/>
                    </>
                )
            }
        }
    ]


    return (
        <div>
            <Topbar />
        <div className='home'>
            {user=="admin" && classroomData && classroomData.department.length == 0 ?
                <div>
                    <button className='create_department_btn' onClick={() => setCreateDepClick(true)} style={{display:!createDepClick?'block':'none'}}>Create Department</button>
                    {createDepClick && (
                        <div className="department_form">
                            <input type='text' name='name' placeholder='dep name' onChange={(e)=>handleDepFormChange(e)} />
                            <input type='text' name='department_id' placeholder='dep id' onChange={(e)=>handleDepFormChange(e)} />
                            <button onClick={(e)=>handleCreateDepartment(e)}>Create Department</button>
                        </div>
                    )}
                </div>
                :
                <div>
                    <p className='department_name'>{classroomData && classroomData.department[0].name}</p>
                </div>
            }
            <div className='classroom_info_container'>
            {   
                classroomData && classroomData.classrooms.length == 0 ?
                    <div className='no_classrooms'>
                        <h3>Classrooms</h3>
                        <p>No classrooms are registered under this department</p>
                    </div>
                    :
                    <div >
                        <h3>Classrooms</h3>
                        {
                            classroomData && classroomData.classrooms.map((classroom) =>
                            <div className='classroom_info' onClick={() => openClassroomWindow(classroom)}>
                                <div>
                                    <p>{classroom.name}</p>
                                    <p>{classroom.teacher_name}</p>
                                </div>
                                <p className='number_of_students'><BsFillPeopleFill size='50px' color="rgb(107, 107, 253)"/>{classroom.number_of_students}</p>
                            </div>)
                        }
                    </div>
            }
            </div>
            {   
                user=="admin" && (teacherData && teacherData.length == 0 ? 
                    <div className='no_teachers'>
                        <h3>Teachers</h3>
                        <p>No teachers are registered under this classroom</p>
                    </div>
                    :
                    <div>
                        <h3>Teachers</h3>
                            {
                                teacherData && teacherData.length > 0 && 
                                <div style={{ height: '400px', width: 'content-fit' }}>
                                    <DataGrid
                                    rows={teacherData}
                                    columns={columns}
                                    initialState={{
                                    pagination: {
                                        paginationModel: {
                                        pageSize: 5,
                                        },
                                    },
                                    }}
                                    getRowId={(r) => r.email}
                                    pageSizeOptions={[5]}
                                    disableRowSelectionOnClick
                                    />
                                </div>
                            }
                    </div>)
                
            }
            {
                user=="admin" && classroomData && classroomData.department.length >0 &&
                    <div className='add_teacher'>
                        <div className='add_teacher_btn' style={{display: !addTeacherClick?"flex":"none"}} onClick={()=>setAddTeacherClick(true)}><GrFormAdd color='#6b6bfd' size='30px'/>Add Teacher</div>
                        {
                            addTeacherClick && (
                                <div className="add_teacher_form">
                                    <div className='add_teacher_form_inputs'>
                                        <input type='text' placeholder='name' name='name' onChange={(e)=>handleAddTeacherFormChange(e)} />
                                        <input type='email' name='email' placeholder='email' onChange={(e)=>handleAddTeacherFormChange(e)}/>
                                        <input type='password' name='password' placeholder='password' onChange={(e)=>handleAddTeacherFormChange(e)} />
                                        <input type='text' name='teacher_id' placeholder='teacher id' onChange={(e)=>handleAddTeacherFormChange(e)}/>   
                                    </div>
                                    <div className='add_teacher_form_radio'>
                                        <p>Class adviser?</p>
                                        <div>
                                            <input type='radio' id='admin' name='is_class_adviser' value={true} onChange={(e)=>handleAddTeacherFormChange(e)} />
                                            <label for='admin'>Yes</label>
                                            <input type='radio' id='not_admin' name='is_class_adviser' value={false} onChange={(e)=>handleAddTeacherFormChange(e)} />
                                            <label for='not_admin'>No</label>
                                        </div>
                                    </div>
                                    <button onClick={(e) => {setAddTeacherClick(false); handleAddTeacher(e)}}>Add Teacher</button>
                                </div>
                            )
                        }
                    </div>
            }

            {
                user=="teacher" && userPrev && userPrev.is_adviser && classroomData && classroomData.department.length >0 &&
                    <div id='add_classroom'>
                        <div className="add_classroom_btn" style={{display: !addClassroomClick?"flex":"none"}} onClick={()=>setAddClassroomClick(true)}><GrAdd size='50px' color="red"/></div>
                        {
                            addClassroomClick && (
                                <div className="add_classroom_form">
                                    <input type='text' placeholder='name' name='name' onChange={(e)=>handleAddClassroomFormChange(e)} />
                                    <input type='text' name='classroom_id' placeholder='classroom id' onChange={(e)=>handleAddClassroomFormChange(e)}/>
                                    <button onClick={(e) => {setAddClassroomClick(false); handleAddClassroom(e)}}>Add</button>
                                </div>
                            )
                        }
                    </div>
            }
            {
              showModal && <Modal statusMessage={statusMessage} time={3000} setShowModal={setShowModal} />
            }
            </div>
            
        </div>
    )
}

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
      <Home />
  </React.StrictMode>
);