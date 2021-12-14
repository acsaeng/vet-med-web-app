import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../components/Sidebar';
import AnimalNavbar from '../../components/AnimalNavbar';

// Requires npm install axios --save
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import jwt_decode from "jwt-decode";

function RequestTreatment() {

    const [message, setMessage] = useState();
    const [staffList, setStaffList] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState([]);
    
    const animalID = localStorage.getItem("animalID")
    const requesterID = localStorage.getItem("userID")
    const requesterFirstName = localStorage.getItem("userFirstName")
    const requesterLastName = localStorage.getItem("userLastName")

    let token = localStorage.getItem("token")
    let decoded = jwt_decode(token)
    const [activeUserType, setType] = useState(decoded.sub);
    let allowView=false;
    if (activeUserType === "Animal Care Attendant"){allowView = true}

    let navigate = useNavigate();

    function GetStaffList(){
        useEffect(()=>{
            axios.get('http://localhost:8080/app/user/userType=Animal%20Health%20Technician').then(
                res => {
                    setStaffList(res.data)
                })
        },[])
    }
        
    function getMessage(message){
        setMessage(message.target.value)
    }

    function clickButton(event){
        event.preventDefault();
        document.getElementById("messageInput").value = ""
        // console.log("From Clicking the button: " + selectedStaff + message)
        console.log(selectedStaff.map( (staff) => staff ) + " " + message)
        sendRequest(event)
    }

    function sendRequest(event){

        event.preventDefault();
        var rightNow = new Date();
        var formattedDay = rightNow.getDate() < 10 ? "0" + rightNow.getDate().toString() : rightNow.getDate()
        var formattedMonth = (rightNow.getMonth()+1) < 10 ? "0" + (rightNow.getMonth()+1).toString() : (rightNow.getMonth()+1)
        var requestDate = rightNow.getFullYear() + "-" + formattedMonth +"-" + formattedDay

        // axios.post('http://localhost:8080/app/request/animal/', {
        //     animalID: parseInt(animalID),
        //     requesterID: parseInt(requesterID),
        //     requestDate: requestDate,
        //     message: message,
        //     requesterFirstName: requesterFirstName,
        //     requesterLastName: requesterLastName,
            
        // }).then(
        //   res => {
        //       console.log(res);
        //   }
        // )
        navigate(`/health-records`)
        window.location.reload()
      }

    function handleChange(e){
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedStaff(value);
        console.log(selectedStaff)
    }


  return (
    
    <div className="main-container d-flex flex-column flex-grow-1">
        
        {GetStaffList()}

        { allowView ? 
        <div className="d-flex w-100 h-100">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="placeholder">
                <Sidebar />
            </div>
            <div className= "d-flex flex-column w-100">
                <AnimalNavbar />
                <h1 className="ms-5 mt-5 mb-5">Request Treatment</h1>
                <div className="d-flex align-items-left">
                    <div className="mx-5">
                        <h6>Please select all health technicians to send this request to:</h6>
                        <div className="align-items-left mx-1 mt-3">
                        <select class="form-select" size='5' multiple aria-label="staffSelection" onChange={handleChange}> 
                        {staffList.map(staff =>   
                            <option value = {staff.id} >{staff.firstName} {staff.lastName}</option>
                        )}      
                        </select>  
                        </div> 
                    </div>
                </div>
                <div class="custom-field mt-4 mx-5">
                    <label className="mb-2"> Message: </label> <br/>
                    <textarea className="form-control w-50" id="messageInput" onChange={getMessage} cols='100' rows='5' placeholder="Please enter a message">
                    </textarea>
                </div>
                <div className="mt-4 mx-5 button">
                    <button className="btn btn-secondary" onClick={clickButton}>Submit</button>
                </div>

            </div>
        </div>: <a href="/health-records">Only Animal Care Attendants may request treatments. Click to return to health records.</a>}
    </div>);
}

export default RequestTreatment;

            
            {/* { Authenticated ==="isAuthenticated" ? 
            <div className="d-flex w-100 h-100">
                {(event) => singleRefresh(event)}
                <div className="sidebar">
                    <Sidebar />
                </div>

                <div className="placeholder">
                    <Sidebar />
                </div>
            <div className= "d-flex flex-column">
            <div>
                <AnimalNavbar />
            </div>
            <div className="d-flex mx-3">
              <h1>Request Treatment</h1>
            </div>

            <div className="d-flex mt-3 mx-3">
                <h6> This request will be sent from {requesterFirstName} {requesterLastName}. </h6> 
            </div>
            
            <div className="px-3 py-2">
                <label> Animal Health Technician Requested: </label> <br/>
                    <textarea id="requestForInput" onChange={getRequestFor} cols='100' rows='1' 
                    placeholder="Please enter the animal health technician you would like to send a request to.">
                </textarea>
            </div> 

            <div class="custom-field mt-4 mb-3 mx-3">
                <label> Message: </label> <br/>
                <textarea id="messageInput" onChange={getMessage} cols='100' rows='5' placeholder="Please enter the message for your request.">
                </textarea>
            </div>
            <div class="button mx-3">
                <button onClick={clickButton}>Submit</button>
            </div>
            </div>
            </div>
            : <a href="/">You are not authorized to view this page. Return to Login</a>} */}