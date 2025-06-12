import { Link, useNavigate } from 'react-router-dom';
import './userNav.css';
import { useContext } from 'react';
import AuthContext from '../../../context/authContext';

function UserNav() {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>

            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">

                            <img src='/Images/logo-white.svg' alt='' />
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse mx-5" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link to={"/"} class="nav-link active" aria-current="page" href="#">HOME</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to={"/about"} class="nav-link active" aria-current="page" href="#">ABOUT</Link>
                                </li>
                                <li className="nav-item dropdown userClass">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        APPLY
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="/sign" className="dropdown-item">Scholarship</Link>
                                        </li>
                                    </ul>
                                </li>
                                {auth === "Doner" && (
                                    <>
                                        <Link to="/historyCard" className="nav-link userClass">HISTORY</Link>
                                        <Link to="/donatecard" className="nav-link userClass">DONATE</Link>
                                        
                                    </>
                                )}

                                {auth && (
                                    <>
                                    <Link to="/profile" className="nav-link userClass">PROFILE</Link>
                                    </>
                                     )}
                                <li>
                                    <Link to={"/contact"} class="nav-link active" aria-current="page" href="#">CONTACT US</Link>

                                </li>
                            </ul>
                            {
                                auth ? (
                                    <button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>

                                ) : (
                                    <>
                                        <button className="btn btn-outline-light navbtn"><Link className='signbtnlink' to={'/donerregister'}> Donor Register</Link></button>
                                        <button className="btn btn-outline-light navbtn  mx-2"><Link className='loginbtnlink' to={'/login'}>Login</Link></button>


                                    </>
                                )
                            }


                        </div>
                    </div>
                </nav>

            </div>
        </>
    );
}

export default UserNav;
