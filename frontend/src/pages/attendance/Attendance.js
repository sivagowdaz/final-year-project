import React from 'react'
import Topbar from '../../components/topbar/Topbar';
import {ipcRenderer} from 'electron';
import WindowPanel from '../../components/window_panel/WindowPanel';
import { useState, useEffect, useRef } from 'react';
import {io} from "socket.io-client";
import "./attendance.css";
import Modal from '../../components/modal/Modal';
import Spinner from '../../components/spinner/Spinner';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import ComeBack from '../../components/comeback/ComeBack';

function Attendance () {
  const [windowData, setWindowData] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  const [studentsData, setStudentsData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);

  const [statusMessage, setStatusMessage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const socket = useRef();

  ipcRenderer.on('attendanceData', (event, data) => {
    ipcRenderer.send('handshake:attendance', 'recieved')
    console.log('DATA', data);
    setSubjectData(data.subjectData);
    setStudentsData(data.studentsData)
  })

  useEffect(() => {
      ipcRenderer.on('window_data_chanel', (event, winData) => {
      console.log("renderer win", winData);
        setWindowData(winData)
    })
  }, [])

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.on('attendance_id', (response) => {
      console.log('RESPONSE IS', response);
      if(response.status == 200) {
        let newStudentsData = studentsData.filter((student) => student.usn != response.data.student_id);
        setStudentsData(newStudentsData);
        let tmp = response.data;
        let is_exists=false;
        for(let i = 0; i<attendanceData.length;i++){
          if(attendanceData[i].student_id == tmp.student_id) {
            is_exists = true;
            break;
          }
        }
        !is_exists && setAttendanceData([...attendanceData, {...tmp, subject_id: subjectData.subject_id}]);
      }
    })

  })

  const handleUploadAttendace = (e) => {
    e.preventDefault();
    console.log(attendanceData);

    if(attendanceData.length == 0) {
      setStatusMessage({msg:"No record to upload!!", color: 'red'})
      setShowModal(true);
      return 
    }
    setShowSpinner(true);
    let uploadingRecord = attendanceData.map((record) => {delete record.name; return record});
    studentsData.map((student) => {
      let now = new Date();
      let date = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`
      let timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      let record = {subject_id: subjectData.subject_id, student_id: student.usn, status: false, remark: 'absent', date:date, timestamp:timestamp};
      uploadingRecord.push(record)
    })

    console.log(uploadingRecord);
    fetch("http://localhost:5000/api/blockchain/upload_attendance", {
      method: "post",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': window.localStorage.getItem('user')
      },
      body: JSON.stringify(uploadingRecord)
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
      if(data.status == 200) {
        setStatusMessage({msg:"Attendance record uploaded succesfully", color: 'green'})
        setShowModal(true)
        setShowSpinner(false)
        setTimeout(() => ipcRenderer.send('come_back', 'come_back'), 500);
      } else {
        setStatusMessage({msg:"Upload Failed!! Try again", color: 'red'})
        setShowModal(true);
        setShowSpinner(false)
      }
    })
    .catch((err) => console.log(err));
  }

   const present_columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        {field: 'student_id', headerName: 'USN', width: 100},
        {field: 'status', headerName: 'Status', width: 75},
        {field: 'remark', headerName: 'Remark', width: 150},
        {field: 'date', headerName: 'Date', width: 100},
        {field: 'timestamp', headerName: 'Timestamp', width: 100},
    ]

    const absent_column = [
        { field: 'student_id', headerName: 'Id', width: 75 },
        { field: 'usn', headerName: 'USN', width: 100 },
        {field: 'name', headerName: 'Name', width: 150},
        {field: 'email', headerName: 'Email', width: 150},
    ]
  console.log("SET SHOW SPINNER", showSpinner)
  return (
    <div className='attendance'>
      <Topbar />
      {!showSpinner ?
        <div>
          <div className='attendance_container'>
            <div className='present_list'>
              <h3>Present List</h3>
              {
                attendanceData.length > 0 ? 
                  <div style={{ height: '400px', width: 'content-fit' }}>
                    <DataGrid
                      rows={attendanceData}
                      columns={present_columns}
                      initialState={{
                      pagination: {
                          paginationModel: {
                          pageSize: 5,
                          },
                      },
                      }}
                      getRowId={(r) => r.student_id}
                      pageSizeOptions={[5]}
                      disableRowSelectionOnClick
                    />
                  </div>
                  :
                  <div className='present_list no_attendace_put'>No student put attendance</div>
                  
                }
              </div>
            <div className='absent_list'>
              <h3>Absent List</h3>
              {
                studentsData && 
                <div style={{ height: '400px', width: 'content-fit' }}>
                  <DataGrid
                    rows={studentsData}
                    columns={absent_column}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
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
          </div>
          <div className='upload_btn'>
            <button onClick={(e) => handleUploadAttendace(e)}>Upload Attendance</button>
          </div>
        </div> :
        <div>
          <Spinner height='50px' width='50px' text="uploading..."/>
        </div>}
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
      <Attendance />
  </React.StrictMode>
);
