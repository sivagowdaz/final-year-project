import React from 'react'
import './modal.css'
import {useEffect} from 'react';

function Modal ({statusMessage, time, setShowModal, color}) {
    console.log(setShowModal);
    useEffect(() => {
        setTimeout(() => {
            setShowModal(false)
        }, time)
    }, []);

    return (
        <div class='modal_container' >
            <p style={{color:statusMessage.color}} className='modal_message'>{statusMessage.msg}</p>
        </div>
    )
}

export default Modal