import { useNavigate } from "react-router-dom";
import './hero.css';
import { useEffect } from "react";

function Hero() {
    const navigate = useNavigate();

    // Get user details from localStorage
    const userDetail = localStorage.getItem("userInfo");
    const authentication = JSON.parse(userDetail);

    useEffect(() => {
        if (authentication == null) {
            navigate('/login');
        }
    }, [authentication, navigate]);

    // Fallback to "Admin" if the name is not available
    const userName = authentication?.name || 'Admin';

    return (
        <>
            <h1 className="heroh1">Welcome to Admin Panel, {userName}!</h1>
            <div className="herobox">
                <div className="heroimgbox"></div>
                <div className="herotextbox">
                    <h2 className="heroh2">Admin Control Panel</h2>
                    <p className="heroparagraph">
                        Welcome to your admin dashboard. Here, you can manage all the crucial aspects of the system, from user management to content updates. Your actions help shape the user experience.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Hero;
