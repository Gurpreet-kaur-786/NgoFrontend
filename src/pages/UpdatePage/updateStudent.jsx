import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import ProfileContext from "../../context/profileContext";
import './updateStudent.css'

const UpdateStudent = () => {
  const [formData, setFormData] = useState({
    student_Name: '',
    course: '',
    father_Name: '',
    mother_Name: '',
    family_Income: '',
    need: '',
    amount: '',
    email: '',
    password: '',
    contact_No: '',
    address: '',
    Bank_Name: '',
    Bank_Acc_No: '',
    Ifsc_num: '',
    StudentImgShow: 'Yes'
  });

  const { id } = useParams();
  const { profile, fetchProfileData } = useContext(ProfileContext);
  const [detail, setDetail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setDetail(profile);
  }, [id, profile]);

  useEffect(() => {
    if (Object.keys(detail).length > 0) {
      setFormData({
        student_Name: detail.student_Name || '',
        course: detail.course || '',
        father_Name: detail.father_Name || '',
        mother_Name: detail.mother_Name || '',
        family_Income: detail.family_Income || '',
        need: detail.need || '',
        amount: detail.amount || '',
        email: detail.email || '',
        password: detail.password || '',
        contact_No: String(detail.contact_No || ''),
        address: detail.address || '',
        Bank_Name: detail.Bank_Name || '',
        Bank_Acc_No: detail.Bank_Acc_No || '',
        Ifsc_num: detail.Ifsc_num || '',
        StudentImgShow: detail.StudentImgShow || 'Yes'
      });
    }
  }, [detail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to update?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(`https://ngobackend-j2ap.onrender.com/update/${id}`, formData, {
            headers: { 'Content-Type': 'application/json' }
          });
          toast.success('Update successful');
          setFormData({
            student_Name: '',
            course: '',
            father_Name: '',
            mother_Name: '',
            family_Income: '',
            need: '',
            amount: '',
            email: '',
            password: '',
            contact_No: '',
            address: '',
            Bank_Name: '',
            Bank_Acc_No: '',
            Ifsc_num: '',
            StudentImgShow: 'Yes'
          });
          await fetchProfileData();
          setTimeout(() => {
            navigate('/profile');
          }, 1000);
        } catch (error) {
          Swal.fire('Error!', 'Failed to update the student. Please try again.', 'error');
        }
      }
    });
  };

  return (
    <div className="container">
      <div className="signupForm">
        <div className="tophead">
          <h1 className="signhead">Update Student Details</h1>
        </div>
        <div className="bigbox">
          <form className="signform" onSubmit={handleSubmit}>
            <div className="signupIsideInputBox">
              <label className="signlabel" htmlFor="student_Name">Student Name:</label>
              <input className="signupInput" type="text" id="student_Name" name="student_Name" value={formData.student_Name} onChange={handleChange} />
              <label className="signlabel" htmlFor="course">Course:</label>
              <input className="signupInput" type="text" id="course" name="course" value={formData.course} onChange={handleChange} />
            </div>

            <div className="signupIsideInputBox">
              <label className="signlabel" htmlFor="father_Name">Father Name:</label>
              <input className="signupInput" type="text" id="father_Name" name="father_Name" value={formData.father_Name} onChange={handleChange} />
              <label className="signlabel" htmlFor="mother_Name">Mother Name:</label>
              <input className="signupInput" type="text" id="mother_Name" name="mother_Name" value={formData.mother_Name} onChange={handleChange} />
            </div>

            <div className="signupIsideInputBox">
              <label className="signlabel" htmlFor="family_Income">Family Income:</label>
              <input className="signupInput" type="text" id="family_Income" name="family_Income" value={formData.family_Income} onChange={handleChange} />
              <label className="signlabel" htmlFor="need">Requirement:</label>
              <input className="signupInput" type="text" id="need" name="need" value={formData.need} onChange={handleChange} />
            </div>

            <div className="signupIsideInputBox">
              <label className="signlabel" htmlFor="amount">Amount Needed:</label>
              <input type="text" id="amount" name="amount" value={formData.amount} onChange={handleChange} />
              <label className="signlabel" htmlFor="email">Gmail ID:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="signupIsideInputBox">
              <label className="signlabel" htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
              <label className="signlabel" htmlFor="contact_No">Contact No:</label>
              <PhoneInput
                country={"us"}
                value={formData.contact_No}
                onChange={(value) => setFormData({ ...formData, contact_No: value })}
                inputProps={{
                  name: "contact_No",
                  required: true
                }}
              />
            </div>

            <div className="signupIsideInputBox">
              <label className="signlabel" htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
              <label className="signlabel" htmlFor="Bank_Name">Bank Name:</label>
              <input type="text" id="Bank_Name" name="Bank_Name" value={formData.Bank_Name} onChange={handleChange} />
            </div>

            <div className="signupIsideInputBox">
              <label className="signlabel" htmlFor="Bank_Acc_No">Account No.:</label>
              <input type="text" id="Bank_Acc_No" name="Bank_Acc_No" value={formData.Bank_Acc_No} onChange={handleChange} />
              <label className="signlabel" htmlFor="Ifsc_num">IFSC:</label>
              <input type="text" id="Ifsc_num" name="Ifsc_num" value={formData.Ifsc_num} onChange={handleChange} />
            </div>

            <div className="signupIsideInputBox">
              <label className="signlabel" htmlFor="StudentImgShow">Show Student Image?</label>
              <select
                id="StudentImgShow"
                name="StudentImgShow"
                value={formData.StudentImgShow}
                onChange={handleChange}
              >
                <option value="">Please Choose Option...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="signupIsideInputBox7">
              <button className="signupbtn" type="submit">Submit</button>
              <Link to={"/login"}>Click Here For Login..</Link>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
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
  );
};

export default UpdateStudent;
