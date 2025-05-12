import { useEffect, useState } from 'react';
import '../../components/Navbar/NavBar';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { fontSize, textTransform, width } from '@mui/system';
import { capitalize } from '@mui/material';

const columns = [
  { field: '_id', headerName: 'ID', width: 140 },
  { field: 'Registration_no', headerName: 'Registration No.', width: 140 },

  { field: 'student_Name', headerName: 'Student Name', width: 140},
  { field: 'course', headerName: 'Course', width: 120 },
  { field: 'father_Name', headerName: 'Father Name', width: 140 },
  { field: 'mother_Name', headerName: 'Mother Name', width: 100 },
  { field: 'family_Income', headerName: 'Family Income', width: 100 },
  { field: 'need', headerName: 'Requirement', width: 100 },
  { field: 'amount', headerName: 'Amount', width: 80 },
  { field: 'email', headerName: 'Email Id', width: 160 },
  { field: 'contact_No', headerName: 'Contact No', width: 130 },
  { field: 'address', headerName: 'Address', width: 100 },
  { field: 'Bank_Name', headerName: 'Bank Name', width:170},
  { field: 'Bank_Acc_No', headerName: 'Account No.', width:150},
  { field: 'Ifsc_num', headerName: 'IFSC', width:120},



];

function StudentDescription() {

  const [student, setStudent] = useState([]);
    const navigate = useNavigate();
    const userDetail = localStorage.getItem("userInfo");
    const authentication = JSON.parse(userDetail);

    useEffect(() => {
        if (authentication == null) {
            navigate('/login');
        }
    }, [authentication,navigate]);


  const [row, setRow] = useState([]);

  useEffect(() => {
    async function fetchStudentDescription() {
      try {
        const response = await axios.get('http://localhost:2001/g');
        setRow(response.data); 
      } catch (err) {
        console.log(err)
      }
    }
    fetchStudentDescription();
  }, []);

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={row} // Updated prop 'rows' instead of 'row'
        columns={columns}
        getRowId={(row) => row._id} // Use '_id' as the unique identifier
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default StudentDescription;
