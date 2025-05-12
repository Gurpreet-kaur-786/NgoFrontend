import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { PiNotePencilBold } from "react-icons/pi";
import { FaTrash } from "react-icons/fa";  // Import Trash icon
import Swal from 'sweetalert2';  // Import SweetAlert2
import { useNavigate } from 'react-router-dom';

// Utility function to capitalize the first letter of each word
const capitalizeFirstLetter = (str) => {
  if (str && typeof str === 'string') {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};

function Validation() {
  const [student, setStudent] = useState([]);
  const navigate = useNavigate();
  const userDetail = localStorage.getItem("userInfo");
  const authentication = JSON.parse(userDetail);

  useEffect(() => {
    if (authentication == null) {
      navigate('/login');
    }
  }, [authentication, navigate]);

  const [row, setRow] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get('http://localhost:2001/getValidate');
        const transformedData = response.data.map((d) => ({
          _id: d._id,
          student_id: d.student_id ? d.student_id._id : 'N/A',
          Registration_no: d.student_id ? d.student_id.Registration_no : 'N/A',
          student_Name: capitalizeFirstLetter(d.student_id ? d.student_id.student_Name : 'N/A'),
          email: d.student_id ? d.student_id.email : 'N/A', // Capitalize first letter of email
          family_Income: d.student_id ? d.student_id.family_Income : 'N/A',
          need: capitalizeFirstLetter(d.student_id ? d.student_id.need : 'N/A'),
          amount: d.student_id ? d.student_id.amount : 'N/A',
          status: d.status,

        }));
        setRow(transformedData);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudent();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:2001/validationdelete/${id}`);
          console.log(response.data);
          setRow((prev) => prev.filter((item) => item._id !== id));
          Swal.fire('Deleted!', 'The student has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting student:', error);
          Swal.fire('Error!', 'There was an issue deleting the student.', 'error');
        }
      }
    });
  };

  const columns = [
    {
      field: 'student_id',
      headerName: 'Student ID',
      width: 340,
    },
    // {
    //   field: 'Registration_no',
    //   headerName: 'Registration No.',
    //   width: 140,
    // },
    // {
    //   field: 'student_Name',
    //   headerName: 'Student Name',
    //   width: 140,
    // },
    // {
    //   field: 'family_Income',
    //   headerName: 'Family Income',
    //   width: 120,
    // },
    // {
    //   field: 'need',
    //   headerName: 'Requirement',
    //   width: 120,
    // },
    // {
    //   field: 'amount',
    //   headerName: 'Amount',
    //   width: 100,
    // },
    {
      field: 'email', // You can change this to display another field instead of email, like student_Name
      headerName: 'Email ID',
      width: 180,
    },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   width: 120,
    // },
    {
      field: 'action',
      headerName: 'Actions',
      width: 300,
      sortable: false,
      renderCell: (params) => (
        <div>
          {/* <PiNotePencilBold
            onClick={() => navigate(`/StudentProfileDetails/${params.row._id}`)}  // Navigate to the profile page
            fontSize={"1.5em"}
            style={{
              margin: "10px",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          /> */}
          <button
            onClick={() => navigate(`/StudentProfileDetails/${params.row._id}`)}
            style={{
              
              padding: "2px 3px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s",
              marginBottom:"60px",
              marginLeft:"50px"
              
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#115293")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1976d2")}
          >
            Show Details
          </button>

          <FaTrash
            onClick={() => handleDelete(params.row._id)} // Call handleDelete on click
            fontSize={"1.5em"}
            style={{
              margin: "10px",
              cursor: "pointer",
              transition: "transform 0.2s",
              color: "red",
              marginLeft: "20px",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

        </div>
      ),
    },

  ];

  const paginationModel = { page : 0, pageSize: 10};

  return (
    <Paper sx={{ height: 500, width: '100%', padding: 2 }}>
      <DataGrid
        rows={row}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default Validation;
