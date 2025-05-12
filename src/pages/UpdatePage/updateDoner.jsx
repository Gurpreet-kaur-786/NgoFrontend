import { useContext, useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import ProfileContext from '../../context/profileContext';
import Swal from 'sweetalert2';

function UpdateDonerform() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',

    });

    const { id } = useParams()
    const {profile, setProfile, fetchProfileData} = useContext(ProfileContext);


    const [detail, setDetail] = useState({})
    useEffect(() => {
        setDetail(profile)
    }, [id])
    console.log(detail)

    useEffect(() => {
        if (Object.keys(detail).length > 0) {
            setFormData({
                name: detail.name || '',
                email: detail.email || '',
                password: detail.password || '',

            });
        }
    }, [detail]);

    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure for update!',
            icon: 'warning',
            showCancelButton: 'true',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'yes,proceed it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // console.log(formData); //Debug:check from data before submitting
                    const response = await axios.put(`https://ngobackend-j2ap.onrender.com/doner/update/${id}`, formData, {
                        headers: { 'Content-Type': 'application/json' }
                    })
                    console.log(response)
                    
                    setFormData({
                        name: '',
                        email: '',
                        password: '',

                    })
                    await fetchProfileData();
                    toast.success('update successful')
                    setTimeout(() => {
                        navigate('/profile')
                    }, 1000)
                } catch (error) {
                    Swal.fire('Error!', 'not update.', 'error')

                }
            }
        })
    }
    return (
        <>
            <div className='donerContainer'>
                <div className='donerbox'>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='donerhead'>
                            <h1 className='donerh1'>Sign Up</h1>
                        </div>

                        {/* <label className='donerlabel' htmlFor="name">Name</label> */}
                        <input className='donerinput' type="text"
                            id="name"
                            name="name"
                            placeholder='Name'
                            value={formData.name}
                            onChange={handleChange} />
                        {/* <label className='donerlabel' htmlFor="email">Email</label> */}
                        <input className='donerinput' type="text"
                            id="email"
                            name="email"
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange} />
                        {/* <label className='donerlabel' htmlFor="pswd">Password</label> */}
                        <input className='donerinput' type="password"
                            id="paasword"
                            name="password"
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange} />


                        <br />
                        <button className='donerbutton'>Submit</button>
                        <br />
                        <br />

                        <Link className='donorlink' to={"/login"}>Click here for Login</Link>




                    </form>

                </div>
                <ToastContainer
                    position="top-right" // Position: "top-right", "top-center", "top-left", etc.
                    autoClose={2000} // Time (in ms) before auto-closing
                    hideProgressBar={false} // Show/hide progress bar
                    newestOnTop={false} // New toasts stack on top
                    closeOnClick
                    rtl={false} // Right-to-left layout
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

            </div>

        </>
    )

}
export default UpdateDonerform