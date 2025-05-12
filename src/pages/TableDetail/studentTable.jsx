import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentTable() {
    const [student, setStudent] = useState([]);
    const navigate = useNavigate();
    const userDetail = localStorage.getItem("userInfo");
    const authentication = JSON.parse(userDetail);

    useEffect(() => { 
        if (authentication == null) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const Response = await axios.get('http://localhost:2001/g');
                setStudent(Response.data);
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };
        fetchStudent();
    }, []);

  

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Course</th>
                        <th>Father Name</th>
                        <th>Mother Name</th>
                        <th>F-Income</th>
                        <th>Need</th>
                        <th>Amount</th>
                        <th>Email Id</th>
                        <th>Contact No.</th>
                        <th>Address</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {student.map((d) => (
                        
                        <tr key={d._id}>
                            <td>{d.student_Name}</td>
                            <td>{d.course}</td>
                            <td>{d.father_Name}</td>
                            <td>{d.mother_Name}</td>
                            <td>{d.family_Income}</td>
                            <td>{d.need}</td>
                            <td>{d.amount}</td>
                            <td>{d.email}</td>
                            <td>{d.contact_No}</td>
                            <td>{d.address}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default StudentTable;
