import React from 'react'
import ComeBack from '../comeback/ComeBack';
import {ipcRenderer} from 'electron';
import "./topbar.css";

function Topbar () {
    const handleLogout = () => {
        console.log("logout button is clicked")
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('login_user')
        ipcRenderer.send('open_login_window', 'data');
    }
    return (
        <>
            <div className="topbar">
                <p className='topbar_title'>ATTENDANCE MANAGER</p>
                <p className='logout' onClick={handleLogout}>Logout</p>
            </div>
            {/* <ComeBack/> */}
        </>
   
  )
}

export default Topbar