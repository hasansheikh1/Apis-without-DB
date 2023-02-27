import React from 'react'
import "./popup.css"
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";


export const Popup = (props) => {

    const [isOpenP, setOpenP] = useState(true);

  const togglePopupP = () => {
    setOpenP(!isOpenP);
  };


  return (
    <div className="popup-box">
      <div className="box">
        {/* <span className="close-icon" onClick={props.handleClose}>x</span> */}
           
        <Alert className="success" onClose={() => {togglePopupP()}}>
          This is a success alert — check it out!
        </Alert>
       
        {props.content}
      </div>
    </div>
  )
}
