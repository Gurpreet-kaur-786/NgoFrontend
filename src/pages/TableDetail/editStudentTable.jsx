import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcApprove } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";
import './editStudentTable.css'
function EditStudentTable() {
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
                const Response = await axios.get('https://ngobackend-j2ap.onrender.com/getValidate');
                console.log(Response.data)
                setStudent(Response.data);
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };
        fetchStudent();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const response = await axios.put('https://ngobackend-j2ap.onrender.com/update', {
                id,
                status: newStatus,
            });
            console.log(response.data);
            // Update the student list locally for better UX
            setStudent((prev) =>
                prev.map((item) =>
                    item._id === id ? { ...item, status: newStatus } : item
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>F-Income</th>
                        <th>Need</th>
                        <th>Amount</th>
                        <th>Email Id</th>
                        <th>Status</th>
                        
                        {/* <th>Image</th> */}
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((d) => (
                    d.student_id !== null ?
                        <tr key={d._id}>
                            <td>{d.student_id?.student_Name}</td>
                            <td>{d.student_id?.family_Income}</td>
                            <td>{d.student_id?.need}</td>
                            <td>{d.student_id?.amount}</td>
                            <td>{d.student_id?.email}</td>
                            <td>{d?.status}</td>
                           
                            <td>
                                <FcApprove
                                    className="myIcon"
                                    fontSize={"35px"}
                                    onClick={() => handleStatusUpdate(d._id, "Approved")}
                                />
                                <FcDisapprove
                                    className="myIcon"
                                    fontSize={"35px"}
                                    onClick={() => handleStatusUpdate(d._id, "Disapproved")}
                                />
                            </td>
                            </tr>
                            : null 
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default EditStudentTable;
