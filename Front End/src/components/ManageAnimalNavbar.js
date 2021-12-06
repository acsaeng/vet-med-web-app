import "../styling/Navbar.css";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const ManageAnimalNavbar = () => {
    return (
        <div className="navbar-no-margin d-flex justify-content-start ps-5 pe-4 pt-4 pb-3">
            <div className="d-flex flex-column justify-content-start mt-3 animal-info">
                <h3 className="mt-4 pb-3">Manage Animal</h3>
                <p className="admin-text pb-4">Search for an animal to view or update information...</p>
            </div>


        </div>
    )
}

export default ManageAnimalNavbar
