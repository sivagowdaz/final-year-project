import React from 'react'
import {IoMdSkipBackward} from 'react-icons/io';
import {ipcRenderer} from 'electron';
import "./comeback.css"

function ComeBack() {
    return (
        <div className='comeback_btn' onClick={()=>ipcRenderer.send('come_back', 'come_back')}>
            <IoMdSkipBackward size="50px" color="rgb(107, 107, 253)"/>
        </div>
    )
}

export default ComeBack