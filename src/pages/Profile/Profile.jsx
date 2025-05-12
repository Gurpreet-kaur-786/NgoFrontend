import { useContext, useEffect, useState } from 'react';
import ProfileContext from '../../context/profileContext';
import { Link } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

function Profile() {
    const profile = useContext(ProfileContext);  
    const isDoner = profile?.profile.authType === "Doner"; // Check if the user is a donor
    const user = profile?.profile;  
    const [valid, setValid] = useState({});

    const [donationHistory, setDonationHistory] = useState([]); 
    const [totalDonated, setTotalDonated] = useState(0); 

    const [startDate, setStartDate] = useState('');

    const userDetail = localStorage.getItem("userInfo");
    const authentication = JSON.parse(userDetail);  

    useEffect(() => {
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - 3); // 3 days ago

        setStartDate(pastDate.toISOString().split('T')[0]); // Set start date as 3 days ago
    }, []);

    useEffect(() => {
        const fetchDonationHistory = async () => {
            try {
                if (!isDoner) return; // If the user is not a donor, skip the donation history fetch

                const donationResponse = await axios.get('https://ngobackend-j2ap.onrender.com/userSpecificTransaction', {
                    headers: {
                        Authorization: `Bearer ${authentication.token}` 
                    }
                });

                let donorTransactions = donationResponse.data.filter(
                    item => item.donerId._id === user._id && item.donationAmount > 0
                );

                // Apply date filter if startDate is set
                if (startDate) {
                    donorTransactions = donorTransactions.filter(item => {
                        const transactionDate = new Date(item.createdAt);
                        return transactionDate >= new Date(startDate);
                    });
                }

                setDonationHistory(donorTransactions);

                const total = donorTransactions.reduce((acc, item) => acc + item.donationAmount, 0);
                setTotalDonated(total);
            } catch (error) {
                console.error("Error fetching donation history:", error);
            }
        };
    
        fetchDonationHistory();
    }, [authentication.token, user._id, startDate, isDoner]); // Added isDoner to dependency array

    useEffect(() => {
        async function fetchData() {
            try {
                const respone = await axios.get(`https://ngobackend-j2ap.onrender.com/studentDetail/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${authentication.token}` 
                    }
                });
                setValid(respone.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [authentication.token, user._id]);
    
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    return (
        <div className="profile-container">
            <div className="profile-left">
                <div className="profile-box">
                    <h2>Profile</h2>
                    <p>Here are your profile details</p>
                    <div className="profile-info">
                        {isDoner ? (
                            <>
                                <div><strong>Name:</strong> {user.name}</div>
                                <div><strong>Email:</strong> {user.email || "No additional information"}</div>
                                <div><strong>Total Amount Donated:</strong> {totalDonated}</div>
                                <Link to={`/UpdateDoner/${user._id}`}>
                                    <button className="login-btn">Edit Profile</button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <div><strong>Student Name:</strong> {user.student_Name}</div>
                                <div><strong>Email:</strong> {user.email}</div>
                                <div><strong>Father's Name:</strong> {user.father_Name}</div>
                                <div><strong>Mother's Name:</strong> {user.mother_Name}</div>
                                <div><strong>Requirement:</strong> {user.need}</div>
                                <div><strong>Pending Amount:</strong> {user.amount === 0 ? <span style={{color:"green",fontWeight:"bold"}}>Your Profile is Completed</span>:user.amount}</div>
                                <div><strong>Address:</strong> {user.address}</div>
                                <div><strong>Contact No:</strong> {user.contact_No}</div>
                                <div><strong>Status:</strong> {valid.status}</div>
                                <Link to={`/UpdateStudent/${user._id}`}>
                                    <button className="login-btn">Edit Profile</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Show Donation History Only for Donors */}
            {isDoner && (
                <div className="profile-right">
                    <div className="donation-history-box">
                        <h3>Donation History</h3>
                        
                        {/* Single Date Filter Input */}
                        <div className="date-filter">
                            <input 
                                type="date" 
                                value={startDate} 
                                onChange={handleStartDateChange} 
                                placeholder="Start Date"
                            />
                        </div>

                        <table className="donation-history-table" style={{
                            overflow:'scroll'
                        }}>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Donation Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donationHistory.length > 0 ? (
                                    donationHistory.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.student_id ? item.student_id.student_Name : 'Unknown'}</td>
                                            <td>{item.donationAmount}</td>
                                            <td>{new Date(item.createdAt).toLocaleString("en-GB", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true
                                            })}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No donation history available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
