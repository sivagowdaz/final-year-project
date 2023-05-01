import React from 'react'
import "./attendance_record.css";
import { ipcRenderer } from 'electron';
import Topbar from '../../components/topbar/Topbar';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {HiOutlineX} from 'react-icons/hi'
import {MdDone} from 'react-icons/md';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {useState, useEffect} from 'react';
import ComeBack from '../../components/comeback/ComeBack';

ChartJS.register(ArcElement, Tooltip, Legend);

function AttendanceRecord () {
    const [windowData, setWindowData] = useState(null);
    const [subjectData, setSubjectData] = useState(null);
    const [studentData, setStudentsData] = useState(null);

    const [subjectId, setSubjectId] = useState(null);

    const [studentAttendanceRecord, setStudentAttendanceRecord] = useState(null);
    
    ipcRenderer.on('attendanceRecordData', (event, data) => {
        ipcRenderer.send('handshake:attendance_record', 'recieved');
        console.log('DATA', data);
        setSubjectData(data.subjectsData);
        setStudentsData(data.studentData);
        setSubjectId(data.subjectsData[0].subject_id);
    })

    useEffect(() => {
        ipcRenderer.on('window_data_chanel', (event, winData) => {
        console.log("renderer win", winData);
            setWindowData(winData)
        })
    }, [])

    const handleGetAttendanceData = (e) => {
        e.preventDefault();
        console.log("SUBJECT ID", subjectId, studentData.usn);

        fetch(`http://localhost:5000/api/blockchain/attendance_detail?subject_id=${subjectId}&student_id=${studentData.usn}`, {
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
                setStudentAttendanceRecord(data)
            })
            .catch((err) => console.log(err));
    }

    const attendance_record_column = [
        {field: 'class_number', headerName: 'Class Number', width: 200},
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'timestamp', headerName: 'Timestamp', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            renderCell: ({row}) => {
                return (
                    <div>
                        {
                            row.status?<MdDone color='green' size='20px'/>:<p><HiOutlineX color='red' size='20px'/></p>
                        }
                    </div>
                )
            }
        },
        { field: 'remark', headerName: 'Remark', width: 200},
    ]

    const data = {
        labels: ['Classes Attended', 'Classes Missed'],
        datasets: [
            {
            label: 'No of Classes',
            data: [],
            backgroundColor: [
                'rgba(0, 128, 0, 0.5)',
                'rgba(139, 0, 0, 0.5)',
            ],
            borderColor: [
                'rgba(0, 128, 0)',
                'rgba(139, 0, 0)',
            ],
            borderWidth: 1,
            },
        ],
    };

    studentAttendanceRecord && (data.datasets[0].data = [parseInt(studentAttendanceRecord.attended_classes), parseInt(studentAttendanceRecord.total_classes) - parseInt(studentAttendanceRecord.attended_classes)])

    return (
            <>
                <Topbar />
                <div className='attendance_record'>
                    <div className='subject_id_fill_form'>
                        <div className='get_subject_id'>
                            <label for="subject_id">Choose a subject</label>
                            <select className='subject_id' onChange={(e) => {console.log(e.target.value); setSubjectId(e.target.value)}}>
                                {
                                    subjectData && subjectData.map((subject) =>
                                    <option value={subject.subject_id} >{subject.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <button className='get_record_btn' onClick={(e)=>{handleGetAttendanceData(e)}}>Get Attendance Data</button>
                    </div> 
                    {
                        studentAttendanceRecord &&
                    <div className='record_display'>
                            <div className='record_stat'>
                                <div>
                                    {   
                                        studentAttendanceRecord.attendance_record.length > 0 && <Pie data={data} width={300} height={300} options={{ maintainAspectRatio: false }}/>
                                    }
                                </div>
                                {
                                    studentAttendanceRecord.attendance_record.length > 0 &&
                                    <div>
                                        <p>Total Classes: {studentAttendanceRecord.total_classes}</p>
                                        <p>Attended Classes: {studentAttendanceRecord.attended_classes}</p>
                                        <p>Attendance Percentage: <span className={{color: studentAttendanceRecord.percentage>75?'green':'red'}}>{studentAttendanceRecord.percentage}</span></p>
                                    </div>    
                                }
                                {
                                    studentAttendanceRecord.attendance_record.length==0 && <p className='no_records'>No Records Found</p>
                                }
                            </div>
                            <div className='record_table' style={{height: '400px', width: 'content-fit'}}>
                                {
                                    studentAttendanceRecord.attendance_record.length > 0 &&
                                    <DataGrid
                                    rows={studentAttendanceRecord.attendance_record}
                                    columns={attendance_record_column}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    getRowId={(r) => r.timestamp}
                                    pageSizeOptions={[5]}
                                    disableRowSelectionOnClick
                                    />
                                }
                            </div>
                        </div> 
                }
                <ComeBack/>
            </div>
            </>
    )
}

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <AttendanceRecord />
  </React.StrictMode>
);