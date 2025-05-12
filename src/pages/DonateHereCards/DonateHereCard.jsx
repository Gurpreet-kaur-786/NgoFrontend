import { useEffect, useState } from "react";
import StudentCard from "../../components/studentCard/studentCard";
import './DonateHereCard.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function DonateCards() {
    const [DonateCard, setDonateCard] = useState([]);
    const navigate = useNavigate();
    const DonateCardDetail = localStorage.getItem("userInfo");
    const authentication = JSON.parse(DonateCardDetail);

    useEffect(() => {
        if (authentication == null) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const fetchDonateCard = async () => {
            try {
                const Response = await axios.get('http://localhost:2001/onlyValid');
                setDonateCard(Response.data);
                console.log(Response)

            } catch (error) {
                console.log('Error fetching student detail:', error);

            }
        };
        fetchDonateCard();
    }, [])



    return (
        <>
            <div className="Donatecardcontainer">
                {
                    DonateCard.map((d) => (
                        // <div className="cardBox">
                        d.student_id != null ?
                            <Link to={`/payment/${d.student_id._id}`} style={{ textDecoration: "none", color: "black" }}>
                                <StudentCard
                                    img={d.student_id.StudentImgShow === "Yes" ? d.student_id.image : null}
                                    need={d.student_id.need}
                                    name={d.student_id.StudentImgShow === "Yes" ? d.student_id.student_Name : d.student_id._id}
                                    amount={d.student_id.amount}
                                />
                            </Link>


                            : null

                        // </div>

                    ))

                }




            </div>
        </>
    )

}
export default DonateCards