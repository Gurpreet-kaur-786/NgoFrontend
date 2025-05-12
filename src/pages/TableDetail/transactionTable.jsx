import { Paper } from "@mui/material";
import { width } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
   

const columns = [
    {field:'',headerName: 'Donor Name', width:120},
    {field: '', headerName: 'Donate Amount', width:120},
    {field: '', headerName: 'Student Name', width:120}
]
 function TransactionDetail() {
    const [transaction, setTransaction] = useState([])

    const navigate = useNavigate();
    const userDetail = localStorage.getItem("userInfo");
    const authentication = JSON.parse(userDetail);

    useEffect(() => {
        if (authentication == null) {
            navigate('/login');
        }
    }, []);

    const [row, setRow] = useState([]);

    useEffect(() => {
        async function fetchTransaction() {
            try {
                const response = await axios.get('https://ngobackend-j2ap.onrender.com/login');
                const transformedData = response.data.map((d) => ({
                    _id:d._id,
                    name: d.donerId ? d.donerId.name : 'N/A',
                    amount: d.student_id ? d.student_id.amount : 'N/A',
                    student_Name: d.student_id ? d.student_id.student_Name : 'N/A', 





                }));
                setRow(response.data)
                
            } catch (error) {
                console.log(error)
                
            }
            
        }
        fetchTransaction();
    }, []);
    const paginationModel = { page: 0, pageSize: 5};

    return(
        <Paper sx={{ height: 400, width:'100%' }}>
            <DataGrid
            rows={row}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{pagination: { paginationModel}}}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}

            />
        </Paper>
    )

    
 }
 export default TransactionDetail