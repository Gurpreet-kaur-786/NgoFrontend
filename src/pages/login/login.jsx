import "./login.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/authContext";
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  });

  const [message, setMessage] = useState('');
  const { auth, setAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData); //Debug:check from data before submitting
      const response = await axios.post('http://localhost:2001/l', formData, {
        headers: { 'Content-Type': 'application/json' }
      })
      console.log(response)

      const obj = {
        token: response.data.token,
        authType: response.data.authType
      }
      setAuth(obj.authType)
      const stringfieldobj = JSON.stringify(obj)

      localStorage.setItem(
        "userInfo",
        stringfieldobj
      )


      toast.success('Login successful');
      setFormData({
        email: '',
        password: '',
      })

      setTimeout(() => {
        if (response.data.authType === "ngoOwner") {
          navigate("/admin")
        } else if (response.data.authType === "Doner") {
          navigate("/donatecard")
        }
        else {
          navigate("/profile")
        }
      }, 3000)


    } catch (error) {
      setMessage('Error during login:' + (error.response?.data || error.message))
      toast.error(error.response?.data)
    }
  }
  return (
    <div className='box'>
        <div className='box1'>
            <form action=""  onSubmit={handleSubmit}>
              <div className="headlogin">
                <h1 className="headLoginh1" >Login</h1>
                </div>
                <div className="loginbelowbox">
                {/* <label htmlFor="email">Email</label> */}
                <input type="text"
                 id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange} />
                {/* <label htmlFor="pswd">Password</label> */}
                <input type="password"
                 id="paasword"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required/>
                <br/>
                <button className="loginbtn">Submit</button>
                <br/>
                <br />
                <Link className="loginlink" to={'/sign'}>Click Here For Sign up..</Link>
                </div>

            </form>

        </div>
        <ToastContainer
        postion="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />

    </div>
    
        
          
       
  )
}
export default Login