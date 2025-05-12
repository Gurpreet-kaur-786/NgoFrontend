import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const StudentProfileDetails = () => {
  const [profileData, setProfileData] = useState(null);
  const [isHoveredApprove, setIsHoveredApprove] = useState(false);
  const [isHoveredDisapprove, setIsHoveredDisapprove] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const userDetail = localStorage.getItem("userInfo");
  const authentication = JSON.parse(userDetail);

  useEffect(() => {
    if (authentication == null) {
      navigate('/login');
    }
  }, [authentication, navigate]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`https://ngobackend-j2ap.onrender.com/getValidate/${id}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.put('https://ngobackend-j2ap.onrender.com/update', {
        id,
        status: newStatus,
      });
      setProfileData((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div style={{
      background: "#f4f4f4",
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem',
      minHeight: '100vh',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Two columns layout
        gap: '20px',
        maxWidth: '1200px',
        width: '100%',
      }}>

        {/* Left Column (Student Details) */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{ marginBottom: '1rem', color: "#333" }}>Student Profile</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', fontSize:'12px' }}>
            <p><strong>Student Name:</strong>  {profileData?.student_id.student_Name}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Registration No:</strong> {profileData?.student_id.Registration_no}</p>
            <p><strong>Gmail ID:</strong> {profileData?.student_id.email}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Family Income:</strong> ₹{profileData?.student_id.family_Income}</p>
            <p><strong>Course:</strong> {profileData?.student_id?.course}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Father Name:</strong> {profileData?.student_id?.father_Name}</p>
            <p><strong>Mother Name:</strong> {profileData?.student_id?.mother_Name}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Requirement:</strong> {profileData?.student_id?.need}</p>
            <p><strong>Amount:</strong> {profileData?.student_id?.amount}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Contact No:</strong> {profileData?.student_id?.contact_No}</p>
            <p><strong>Address:</strong> {profileData?.student_id?.address}</p>
            <p><strong>Bank Name:</strong> {profileData?.student_id?.Bank_Name}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Account No:</strong> {profileData?.student_id?.Bank_Acc_No}</p>
            <p><strong>IFSC:</strong> {profileData?.student_id?.Ifsc_num}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Pincode:</strong> {profileData?.student_id?.pincode}</p>
            <p><strong>Paragraph:</strong> {profileData?.student_id?.paragraph}</p>
            <p style={{
              fontSize:'2vw',
            }}><strong>Status:</strong><span style={{
              fontSize:'2vw',
              textDecoration:"underline",
              marginLeft:"20px"
            }}> {profileData?.status} </span></p>
          </div>

          {/* Buttons */}
        {
          profileData?.status === "Pending" &&  (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
            <button
              onClick={() => handleStatusUpdate("Approved")}
              style={{
                padding: '10px 30px',
                borderRadius: '30px',
                background: isHoveredApprove ? 'blue' : '#4CAF50',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={() => setIsHoveredApprove(true)}
              onMouseLeave={() => setIsHoveredApprove(false)}
            >
              Approve
            </button>

            <button
              onClick={() => handleStatusUpdate("Disapproved")}
              style={{
                padding: '10px 30px',
                borderRadius: '30px',
                background: isHoveredDisapprove ? 'blue' : '#f44336',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={() => setIsHoveredDisapprove(true)}
              onMouseLeave={() => setIsHoveredDisapprove(false)}
            >
              Disapprove
            </button>
          </div>
          )
        }

          {/* Go back link */}
          <div style={{ textAlign: 'center' }}>
            <Link to="/validate" style={{ textDecoration: 'none', color: '#1976d2' }}>
              ← Go Back
            </Link>
          </div>
        </div>

        {/* Right Column (Profile photo, Income Certificate, Aadhar card) */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <strong>Upload your photo:</strong><br />
            <img src={profileData?.student_id.image} alt="Student" width={100} height={100}  />
          </div>

          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <strong>Aadhar Card:</strong><br />
            <img src={profileData?.student_id.AdharImage} alt="Aadhar" width={150} height={100} style={{ maxWidth: '300px', borderRadius: '4px' }} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <strong>Income Certificate:</strong><br />
            <img src={profileData?.student_id.IncomeImage} alt="Income Certificate" width={200} height={100} style={{ maxWidth: '300px', borderRadius: '4px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileDetails;
