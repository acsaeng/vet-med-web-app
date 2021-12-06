import { useState } from 'react';
import '../../styling/main.css';
import Sidebar from '../../components/Sidebar';
import ManageAnimalNavbar from '../../components/ManageAnimalNavbar';
import Search_AvailableAnimals from '../../components/SearchAvailableAnimals';
import {useLocation, useNavigate} from 'react-router-dom'

function ManageAnimal() {
    const urlParams = new URLSearchParams(useLocation().search)
    let navigate = useNavigate();

    let urlQuery = ""
    try {
        urlQuery = urlParams.get("query")
    }catch(error){
        console.log("--first visit to page will have no search param")
    }
    const [searchQuery, setSearchQuery] = useState(urlQuery);
    const [Authenticated, setAuth] = useState(localStorage.getItem("Authenticated"))
    const [userType, setType] = useState(localStorage.getItem("userType"))

    function reloadSearches(e){
        e.preventDefault();
        console.log("searchQuery = "+searchQuery)
        navigate(`/manage-animal?query=`+searchQuery)
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

                <div class="d-flex flex-column align-items-center mt-5">

                    <div>
                        <ManageAnimalNavbar />
                    </div>
                
                    <form class="d-flex flex-row" onSubmit={(e) => reloadSearches(e)}>
                        <input type="text" className="form-control me-2" size="100" placeholder="Search an animal..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                        <button className="btn btn-secondary" type="submit">Search</button>
                    </form> 
                    <div class="ex1 mt-3 mx-3">
                        {searchQuery === ""?
                            null:<Search_AvailableAnimals query={searchQuery}/>   
                        }
                    </div>
                </div>
            </div> 
        </div>  

                
            

            
        );
    }

export default ManageAnimal;

// { Authenticated ==="isAuthenticated" ? 
// <div className="d-flex w-100 h-100">    
//     <Sidebar />
//     {/* <AnimalNavbar /> */}
//     {userType ==="Teaching Technician"?
//     <div class="d-flex flex-column align-items-center mt-5">
    
//         <form class="d-flex flex-row" onSubmit={(e) => reloadSearches(e)}>
//             <input type="text" className="form-control me-2" size="100" placeholder="Search an animal..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
//             <button className="btn btn-secondary" type="submit">Search</button>
//         </form> 
//         <div class="ex1 mt-3 mx-3">
//             {searchQuery === ""?
//                 null:<Search_AvailableAnimals query={searchQuery}/>   
//             }
//         </div>
//     </div>:<p>Only Teaching Technicians can request animals</p>}
// </div>  : <a href="/">You are not authorized to view this page. Return to Login</a>}         