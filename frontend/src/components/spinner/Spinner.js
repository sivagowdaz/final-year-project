import React from 'react';
import './spinner.css';

function Spinner({width, height, text}) {
  return (
    <div class='at-container'>
        <div style={{width, height}} class='at-item'></div>
        <p>{text}</p>
    </div>
  )
}

export default Spinner