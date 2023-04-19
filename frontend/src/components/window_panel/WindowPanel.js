import React from 'react';
import {useState, useEffect} from 'react';
import './window_panel.css';
import {ipcRenderer} from 'electron';

function WindowPanel ({windowData}) {
    console.log('WINDOW DATA IS', windowData);
    const [windowDatas, setWindowDatas] = useState(null)

    useEffect(() => {
        setWindowDatas(windowData)
    }, [windowData])

    return (
        <div className='window_panel'>
            {
                windowDatas && windowDatas.map((window) =>
                    <div className='window_pan' onClick={()=>{ipcRenderer.send('window_changed_chanel', window.windowNum)}}>
                        {window.windowName}
                    </div>
                )
            }
        </div>
    )
}

export default WindowPanel