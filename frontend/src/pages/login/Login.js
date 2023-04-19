import electron from 'electron'
const {ipcRenderer} = electron;
import Modal from "../../components/modal/Modal";

import "./login.css";

import React from 'react';
import { createRoot } from "react-dom/client";
import {useState, useRef} from 'react';

function Login () {
    const [adminCred, setAdminCred] = useState({})
    const [TeacherCred, setTeacherCred] = useState({})
    const [adminRegisterCred, setAdminRegisterCred] = useState({})

    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [showTeacherLogin, setShowTeacherLogin] = useState(false);
    const [showAdminRegister, setShowAdminRegister] = useState(false);
    const [showLoginButtons, setShowLoginButtons] = useState(true);
    const [showHomeButton, setShowHomeButton] = useState(false);

    const [statusMessage, setStatusMessage] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [adminId, setAdminId] = useState();

    const adminIdRef = useRef();
    
    const handleAdminFormChange = (e) => {
        e.preventDefault()
        setAdminCred({...adminCred, [e.target.name]:e.target.value})
    }

    const handleTeacherFormChange = (e) => {
        e.preventDefault()
        setTeacherCred({...TeacherCred, [e.target.name]:e.target.value})
    }

    const handleAdminRegisterFormChange = (e) => {
        e.preventDefault();
        setAdminRegisterCred({...adminRegisterCred, [e.target.name]:e.target.value})
    }

    const getAdminId = async (e) => {
        e.preventDefault()
        fetch("http://localhost:5000/api/crud/get_id/admin", {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("data is", data)
                setAdminId(data.id);
                adminIdRef.current.value = data.id;
            })
            .catch((err) => console.log(err));
    }

    const handleAdminLogin = async (e) => {
        e.preventDefault()
        fetch("http://localhost:5000/api/auth/login_admin", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify(adminCred)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.status == 200) {
                    setStatusMessage({msg:"Login successfull", color: 'green'})
                    setShowModal(true)
                    window.localStorage.setItem("user", data.token.token);
                    window.localStorage.setItem("login_user", "admin")
                    ipcRenderer.send('open_home_window', {action:"login", from: "admin"});
                } else {
                    console.log(data.Error)
                    setStatusMessage({msg:data.Error, color: 'red'})
                    setShowModal(true)
                }
            })
            .catch((err) => console.log(err));
    }

    const handleTeacherLogin = async (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/api/auth/login_teacher", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //make sure to serialize your JSON body
                body: JSON.stringify(TeacherCred)
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("THEACHER TOKEN", data)
                if(data.status == 200) {
                    console.log("inside successs")
                    setStatusMessage({msg:"Login successfull", color: 'green'})
                    setShowModal(true)
                    window.localStorage.setItem("user", data.token.token);
                    window.localStorage.setItem("login_user", "teacher")
                    ipcRenderer.send('open_home_window', {action:"login", from:"teacher"});
                } else {
                    console.log(data.Error)
                    setStatusMessage({msg:data.Error, color: 'red'})
                    setShowModal(true)
                }
            })
            .catch((err) => console.log(err));
    }
    
    const validatePassword = () => {
        let adminInfo = adminRegisterCred;
        if(adminInfo.password === adminInfo.confirm_password) {
            delete adminInfo["confirm_password"]
            setAdminRegisterCred(adminInfo)
            return true
        }
        return false
    }

    const handleAdminRegister = async (e) => {
        e.preventDefault();
        console.log('admin cred', adminRegisterCred)
        if(validatePassword()) {
            fetch("http://localhost:5000/api/auth/register_admin", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //make sure to serialize your JSON body
                body: JSON.stringify({...adminRegisterCred, admin_id:adminId})
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.status == 200) {
                    setStatusMessage({msg:"Registration successfull", color: 'green'})
                    setShowModal(true)
                    window.localStorage.setItem("user", data.token);
                    window.localStorage.setItem("login_user", "admin");
                    ipcRenderer.send('open_home_window', {action:"register", from:"admin"});
                } else {
                    console.log(data.Error)
                    setStatusMessage({msg:data.Error, color: 'red'})
                    setShowModal(true)
                }
            })
            .catch((err) => console.log(err));
        } else {
            setStatusMessage({msg:"Confirm password did not match", color: 'red'})
            setShowModal(true)
        }
    }
        
    const setHomePage = (e) => {
        e.preventDefault();
        setShowAdminLogin(false);
        setShowTeacherLogin(false);
        setShowAdminRegister(false);
        setShowLoginButtons(true);
        setShowHomeButton(false);
    }

  return (
      <div className='login'>  
          <div className='login_buttons' style={{"display": showLoginButtons ? "flex" : "none"}}>
              <p className="login_buttons_title">Welcome To Attendance Manager</p>
              <button onClick={() => {setShowAdminLogin(true); setShowLoginButtons(false); setShowHomeButton(true)}}>Admin Login</button>
              <button onClick={() => {setShowTeacherLogin(true); setShowLoginButtons(false); setShowHomeButton(true)}}>Teacher Login</button>
          </div>
          <div className='auths'>
            <div className='home_btn' style={{"display":showHomeButton?"block":"none"}}>
                <button onClick={(e)=> setHomePage(e)}>Go To Home</button>
            </div>
              <div className='auth_forms' style={{"display": showAdminRegister ? "flex" : "none"}}>
                <p className='login_heading'>Admin Register</p>
                <input type="text" placeholder='username' name="name" onChange={(e)=>handleAdminRegisterFormChange(e)}/>
                <input type="email" placeholder='email' name='email' onChange={(e)=>handleAdminRegisterFormChange(e)} />
                  {/* <input type="text" placeholder='admin id' name='admin_id' onChange={(e)=>handleAdminRegisterFormChange(e)} /> */}
                <div className='id_container'>
                    <input readOnly ref={adminIdRef} type="text" placeholder='admin id' name='admin_id' onChange={(e) => handleAdminRegisterFormChange(e)} />
                    <p className='generate_id' onClick={(e)=>getAdminId(e)}>Generate Id</p>
                </div>
                <input type="password" placeholder='password' name='password' onChange={(e)=>handleAdminRegisterFormChange(e)} />
                <input type="password" placeholder='confirm password' name='confirm_password' onChange={(e)=>handleAdminRegisterFormChange(e)} />
                <button disabled={!adminId && 'disabled'} style={{opacity:!adminId?0.5:1}} className='register_btn' onClick={(e) =>handleAdminRegister(e)}>Register</button>
            </div>
              <div className='auth_forms' style={{"display": showAdminLogin ? "flex" : "none"}}>
                <p className='login_heading'>Admin Login</p>
                <input type="text" name="admin_id" placeholder='admin_id' onChange={(e)=>handleAdminFormChange(e)} />
                <input type="password" name="password" placeholder='password' onChange={(e)=>handleAdminFormChange(e)} />
                <button onClick={(e) => handleAdminLogin(e)}>Login</button>
                <p>Don't have a account?<span className='register_tag' onClick={() => {setShowAdminRegister(true); setShowAdminLogin(false)}}>register</span></p>
            </div>
              <div className='auth_forms' style={{"display": showTeacherLogin ? "flex" : "none"}}>
                <p className='login_heading'>Teacher Login</p>
                <input type='text' placeholder='teacher_id' name="teacher_id" onChange={(e)=>handleTeacherFormChange(e)} />
                <input type='password' placeholder='password' name="password" onChange={(e)=>handleTeacherFormChange(e)} />
                <button onClick={(e) => handleTeacherLogin(e)}>Login</button>
            </div>
          </div>
            {
              showModal && <Modal statusMessage={statusMessage} time={3000} setShowModal={setShowModal} />
            }
      </div>
  )
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
      <Login />
  </React.StrictMode>
);