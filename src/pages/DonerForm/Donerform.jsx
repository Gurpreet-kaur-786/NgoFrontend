import { useState } from 'react';
import './Donerform.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function Donerform() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
       
    });

    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const capitalizedFormData = {
                ...formData,
                name: formData.name.charAt(0).toUpperCase() + formData.name.slice(1).toLowerCase()
            };
    
            const response = await axios.post('https://ngobackend-j2ap.onrender.com/addDoner', capitalizedFormData, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            console.log(response);
            toast.success('Registration successful');
            setFormData({
                name: '',
                email: '',
                password: '',
            });
    
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            toast.error(error.response?.data);
        }
    };
    
    return (
        <>
            <div className='donerContainer'>
                <div className='donerbox'>
                    <form action="" className='donor-form' onSubmit={handleSubmit}>
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
                        
                        <Link  className='donorlink' to={"/login"}>Click here for Login</Link>




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
export default Donerform