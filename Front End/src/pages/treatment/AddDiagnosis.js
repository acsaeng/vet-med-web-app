import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../components/Sidebar';
import AnimalNavbar from '../../components/AnimalNavbar';

// Requires npm install axios --save
import axios from 'axios';
import React, {useState} from 'react'
import {useLocation} from 'react-router-dom'
// import {useNavigate} from 'react-router-dom'

function AddDiagnosis() {
    const Authenticated = useState(localStorage.getItem("Authenticated"))
    // window.location.reload()
    const [diagnosis, setDiagnosis] = useState(null);
    const [description, setDescription] = useState(null);
    const diagnosisStatus = "Ongoing";

    const animalID = localStorage.getItem("animalID")
    const userID = localStorage.getItem("userID")

    // axios.get('http://localhost:8080/app/animal/'+animalID).then(
    axios.get('http://localhost:8080/app/animal/'+102).then(
        res => {
            localStorage.setItem("animalID", res.data[0].animalID)
            localStorage.setItem("animalName", res.data[0].animalName)
            localStorage.setItem("animalSpecies", res.data[0].animalSpecies)
            localStorage.setItem("animalStatus", res.data[0].animalStatus)
        }
    )

    function getDiagnosis(diagnosis){
        setDiagnosis(diagnosis.target.value)
    }

    function getDescription(diagnosisDescription){
        setDescription(diagnosisDescription.target.value)
    }

    function clickButton(event){
        event.preventDefault();
        document.getElementById("descriptionInput").value = ""
        document.getElementById("diagnosisInput").value = ""
        console.log("From Clicking the button: " + diagnosis + " " + description)
        sendRequest(event)
    }

    function sendRequest(event){

        event.preventDefault();
        var rightNow = new Date();
        var formattedDay = rightNow.getDate() < 10 ? "0" + rightNow.getDate().toString() : rightNow.getDate()
        var formattedMonth = (rightNow.getMonth()+1) < 10 ? "0" + (rightNow.getMonth()+1).toString() : (rightNow.getMonth()+1)
        var diagnosisDate = rightNow.getFullYear() + "-" + formattedMonth +"-" + formattedDay + " 00:00:00"


        axios.post('http://localhost:8080/app/treatment/diagnosis/animalID=' + animalID, {
            diagnosisID: null, //dummy, backend assigns a new diagnosisID
            diagnosisDate: diagnosisDate,
            diagnosis: diagnosis,
            description: description,
            diagnosisStatus: diagnosisStatus,
            animalID: parseInt(animalID),
            userID: parseInt(userID)
        }).then(
          res => {
              console.log(res);
          }
        )
        
        window.location.reload()
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
            <div>
                <AnimalNavbar />
            </div>
            <h1 className="ms-5 mt-5">Add Diagnosis</h1>

            <div class="custom-field mt-4 mb-3 mx-5">
                <label className="mb-2"> Diagnosis: </label> <br/>
                <textarea className="form-control w-25" id="diagnosisInput" onChange={getDiagnosis} cols='100' rows='1' placeholder="Please enter the diagnosis.">
                </textarea>
            </div>

            <div class="custom-field mt-4 mb-3 mx-5">
                <label className="mb-2"> Description: </label> <br/>
                <textarea className="form-control w-50" id="descriptionInput" onChange={getDescription} cols='100' rows='5' placeholder="Please enter the description of the diagnosis.">
                </textarea>
                <button className="mt-4 btn btn-secondary" onClick={clickButton}>Submit</button>
            </div>
            </div>
            </div>
        </div>



            
    


        
    );
}

export default AddDiagnosis;

{/* <div className="main-container d-flex flex-column flex-grow-1">
{ Authenticated ==="isAuthenticated" ? 
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
  <h1>Add Diagnosis</h1>
</div>

<div class="custom-field mt-4 mb-3 mx-5">
    <label> Diagnosis: </label> <br/>
    <textarea id="diagnosisInput" onChange={getDiagnosis} cols='100' rows='1' placeholder="Please enter the diagnosis.">
    </textarea>
</div>

<div class="custom-field mt-4 mb-3 mx-5">
    <label> Description: </label> <br/>
    <textarea id="descriptionInput" onChange={getDescription} cols='100' rows='5' placeholder="Please enter the description of the diagnosis.">
    </textarea>
</div>
<div class="button mx-5">
    <button onClick={clickButton}>Submit</button>
</div>
</div>
</div>
: <a href="/">You are not authorized to view this page. Return to Login</a>}
</div> */}