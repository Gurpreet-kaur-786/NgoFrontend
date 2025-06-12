import './Navbar.css';
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../../context/authContext";



function Navbar() {
    const {auth, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate("/login");
    }
    
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div class="container-fluid">
                <img src='/Images/logo-white.svg' alt='' />
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse d-xl-flex flex-xl-row-reverse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link to={"/admin"} class="nav-link active" aria-current="page" href="#">Home</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Students Detail
                                </a>
                                <ul class="dropdown-menu">
                                    <li><Link to={"/studentDescription"} class="dropdown-item" href="#">Show Students</Link></li>
                                    <li><Link to={"/validate"} class="dropdown-item" href="#">Approve/Disapprove Students</Link></li>

                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Transaction
                                </a>
                                <ul class="dropdown-menu">
                                    <li><Link to={"/historyCard"} class="dropdown-item" href="#">Transaction History</Link></li>
                                    {/* <li><Link to={"/transaction"} class="dropdown-item" href="#">Transaction History</Link></li> */}

                                </ul>
                            </li>
                            {
                                auth ? (
                                <li>
                                    <button className="btn btn-outline-light mx-2"><Link class="nav-link active" aria-current="page" onClick={handleLogout} >Logout</Link></button>
                                    
                                </li>):""
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Navbar part end  */}

           
        </>
    )
}
export default Navbar
