import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../components/Sidebar';
import AnimalNavbar from '../../components/AnimalNavbar';

import axios from 'axios';
import '../../styling/Comments.css';
import CommentsList from '../../components/CommentsList'
import React, {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import ConditionsList from '../../components/ConditionsList';
import TreatmentsList from '../../components/TreatmentsList';

function HealthRecords() {

    let navigate = useNavigate();

    const animalID = localStorage.getItem("animalID")
    const authorID = localStorage.getItem("userID")
    const firstName = localStorage.getItem("userFirstName")
    const lastName = localStorage.getItem("userLastName")
    const activeUserType = localStorage.getItem("userType")

    let listConditions = []
    let listTreatments = []
    
    function getConditions(event){
        event.preventDefault();
        // axios.get('http://localhost:8080/app/conditions/animal/'+animalID).then(
        //     res => {
        //         console.log(res);
        //         listConditions = res.data
        //     })
            
        // window.location.reload()
        }

    function getTreatments(event){
        event.preventDefault();
    //     axios.get('http://localhost:8080/app/treatements/animal/'+animalID).then(
    //         res => {
    //           console.log(res);
    //           listConditions = res.data
    //       })

    //   window.location.reload()
      }



return (
    <div className="main-container d-flex flex-column flex-grow-1">
        <div className="d-flex w-100 h-100">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="placeholder">
                <Sidebar />
            </div>
            <div className= "d-flex flex-column w-100">
                <AnimalNavbar />
                <h1 className="d-flex mt-5 mb-4 ms-5">Health Records</h1>
                <div className="d-flex mx-3">  
                    <div className= "d-flex flex-column w-80 mx-5">
                        {/* LEFT HAND SIDE */}
                        <h2>Conditions</h2>
                        <div className="d-flex justify-content-end mb-3">
                            <button className="p-2 ms-5 btn btn-secondary" onClick={() => {navigate(`/add-diagnosis`)}}>Add Diagnosis</button>
                             
                        </div>  
                        <div class="ex1">
                            <ConditionsList animalID={animalID}/>
                        </div> 
                    </div>
                    <div className= "d-flex flex-column mx-5">
                        {/* RIGHT HAND SIDE */}
                        <h2>Treatments</h2>
                        <div className="d-flex flex-row justify-content-end mb-3">      
                            <button className="me-3  btn btn-secondary" onClick={() => {navigate(`/add-treatment`)}}>Add Treatment</button>
                            <button className="p-2 btn btn-secondary" onClick={() => {navigate(`/request-treatment`)}}>Request Treatment</button>

                            
                            {/* <div className="d-flex justify-content-end">
                            
                            </div> */}
                            
                            {/* <div className = "d-flex justify-content-end">
                                <button > Add Treatment</button>
                                <button > Request Treatement</button>
                            </div> */}
                        </div>  
                        <div class="ex1">
                            <TreatmentsList animalID={animalID}/>
                        </div> 
                    </div>
                    


                </div>
            </div> 
        </div>
    </div>
)
}
export default HealthRecords;