import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

function TransactionTable() {

    const [transaction, setTransaction] = useState([])

    const navigate = useNavigate()

    const transactionDetail = localStorage.getItem("userInfo")
    // console.log(transactionDetail,"transactionDetail")
    const authentication = JSON.parse(transactionDetail)
    // console.log(authentication)
    useEffect(()=>{
        if(authentication == null){
            navigate('/login')
            
        }
    },[])

    useEffect(()=>{
        const fetchTransaction = async () => {
            try {
                const Response = await axios.get('https://ngobackend-j2ap.onrender.com/login')
                console.log(Response)
                setTransaction(Response.data)
                
            } catch (error) {
                console.log('Error fatching transaction detail',error)
                
            }
            
        }
        fetchTransaction()
    },[])

    return (
        <>
        {/* <Navbar/> */}
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Doner Name</th>
                        <th scope="col"> Donate Amount</th>
                        <th scope="col">Student Name</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        transaction.map((t)=>(
                            <tr>
                                <td>{t?.donerId?.name}</td> 
                                
                                <td>{t?.donationAmount}</td>
                                <td>{t?.student_id?.student_Name}</td>
                            </tr>
                        ))
                    } 
                </tbody>
            </table>
        </>
    )

}
export default TransactionTable