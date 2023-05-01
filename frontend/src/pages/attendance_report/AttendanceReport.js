import React from 'react'
import "./attendance_report.css"
import {ipcRenderer} from 'electron';
import {useState, useEffect} from 'react';
import Spinner from '../../components/spinner/Spinner';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,} from 'chart.js';
import {Bar} from 'react-chartjs-2';

import { saveAs } from 'file-saver';
import ComeBack from '../../components/comeback/ComeBack';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function MyDocument ({report, studentData}) {
    const [labels, setLabels] = useState([]);
    const [colors, setColors] = useState([]);
    const [barChartData, setBarChartData] = useState([]);
    const [borders, setBorders] = useState([]);
    const [barChartSetup, setBarChartSetup] = useState(null)

    useEffect(() => {
        var tmpData = []
      
        report.map((rep) => {
            tmpData.push({label: rep.subject_name, data:[rep.percentage], backgroundColor: rep.percentage >= 75 ? "rgba(75, 192, 192, 0.8)" : "rgba(255, 99, 132, 0.8)"})
    
        });
        setBarChartSetup(tmpData)
        console.log("Temp", tmpData)

    }, [])

    const data = {
        labels: ['attendance record'],
        datasets: barChartSetup
    };

    const options = {
        responsive: false,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Attendance Percentage Bar Chart',
            },
        },
    };

    const subject_columns = [
        {field: 'subject_id', headerName: 'ID', width: 130},
        { field: 'subject_name', headerName: 'Subject', width: 180 },
        { field: 'total_classes', headerName: 'Total Classes', width: 110 },
        { field: 'attended_classes', headerName: 'Attended Classes', width: 110 },
        { field: 'bunked_classes', headerName: 'Bunked Classes', width: 100 },
        {   
            field: "percentage",
            headerName: 'Percentage',
            width: 110,
            renderCell: ({row}) => {
                return (
                    <p style={{color:row.percentage>=75?"green":"red" }}>{row.percentage}</p>
                )
            }
        },
        {
            headerName: 'Remark',
            width: 150,
            renderCell: ({row}) => {
                return (
                    <>
                        <p style={{color:row.percentage>=75?"green":"red" }}>{row.percentage>=75?"Sufficient":"Poor"}</p>
                    </>
                )
            }
        }
    ]

    const displayGraph = () => {
        console.log('chart data', data)
        return (barChartSetup && <Bar width={900} height={500} data={data} options={options} />)
    }
    
    console.log("data is", barChartSetup)
    return (
        <div className='report_container'>
            <div className='student_info'>
                <h2>ATTENDANCE REPORT</h2>
                <div className='info_container'>
                    <p>NAME:{studentData.name}</p>
                    <p>USN: {studentData.usn}</p>
                    <p>EMAIL: {studentData.email}</p>
                </div>
            </div>
            <div>
                <div style={{ height: '400px', width: '900px' }}>
                        <DataGrid
                        rows={report}
                        columns={subject_columns}
                        initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 5,
                            },
                        },
                        }}
                        getRowId={(r) => r.subject_id}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                        />
                    </div> 
            </div>
            {/* <Bar data={data} width={500} height={500} options={{ maintainAspectRatio: false }}/> */}
            {barChartSetup && displayGraph()}
        </div>
    )
}

function AttendanceReport () {
    const [subjectData, setSubjectData] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const [studentAttendanceReportData, setStudentAttendanceReportData] = useState(null);
    
    ipcRenderer.on('attendanceReportData', (event, data) => {
        console.log('DATA', data);
        setSubjectData(data.subjectsData);
        console.log("Subject data", data.subjectsData);
        console.log("Studetn data", data.studentData);
        setStudentData(data.studentData);
        // ipcRenderer.send('handshake:attendance_report', 'recieved');
    })

    useEffect(() => {
        subjectData && studentData && getReportData();
    }, [subjectData, studentData]);

    const getReportData = async () => {
        console.log("inside getReportData function", subjectData, studentData);
        var usn = studentData.usn;

        var record = [];
        await Promise.all(subjectData.map(async(subject) => {
            let response = await fetch(`http://localhost:5000/api/blockchain/attendance_detail?subject_id=${subject.subject_id}&student_id=${usn}`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.getItem('user')
                },
            });
            console.log("response", response)
            let data = await response.json();
            record.push({subject_id: subject.subject_id, subject_name: subject.name, total_classes: data.total_classes, attended_classes: data.attended_classes, bunked_classes: (data.total_classes - data.attended_classes), percentage: data.percentage})
            console.log("insde map ", data, record);
        }))
        console.log("reccc", record)
        setStudentAttendanceReportData(record)
    }

    const hadleDownloadReport = async () => {
        await fetch("http://localhost:5000/api/crud/create_pdf", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': window.localStorage.getItem('user')
            },
            body: JSON.stringify({studentData, studentAttendanceReportData})
        })

        let response = await fetch("http://localhost:5000/api/crud/get_pdf", {
            method: "get",
            headers: {
                'Accept':  "*/*",
                'Content-Type': 'application/json',
                'authorization': window.localStorage.getItem('user')
            },
        })
        let resdata = await response.blob()

        console.log('RESPONSE DATA', resdata, response)
        const pdfBlob = new Blob([resdata], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
    }

    
    return (
        <div>
            <Topbar/>
            {
                !studentAttendanceReportData ? 
                    <Spinner height='50px' width='50px' text="generating record..."/>
                    :
                    <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                        <MyDocument report={studentAttendanceReportData} studentData={studentData} />
                    </div>
            }
            {
                studentData && studentAttendanceReportData &&  <button className='download_report' onClick={(e)=>{hadleDownloadReport(e)}}>Download Report</button>
            }
            <ComeBack/>
        </div>
    )
}

import { createRoot } from "react-dom/client";
import Topbar from '../../components/topbar/Topbar';
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <AttendanceReport />
  </React.StrictMode>
);