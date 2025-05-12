import './slider.css';
import { useEffect,useState } from 'react';

function SliderUser() { 
    const images = [
        "public/slidepics/slide1.jpg",
        "public/slidepics/slide2.jpg",
        "public/slidepics/slide3.jpg",
        "public/slidepics/slide4.jpg",
        "public/slidepics/slide5.jpg",
        "public/slidepics/slide6.jpg",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000); // Change every 2 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [images.length]);



    return (

        <div
            style={{
                height: "100vh",
                width: "100%",
                backgroundImage: `linear-gradient(
    rgba(0, 0, 0, 0.7), 
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.9)
  ), url(${images[currentIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "background-image 1s ease-in-out",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                textAlign: "center",
                overflowX:'hidden'
            }}
        >
            <h1  style={{
                fontSize:"80px",
                marginBottom:"90px",
                fontFamily:"fantasy"
            }}>WELCOME TO <br /> <span  style={{
                WebkitTextStroke:"2px orange",
                color:"transparent",
                            }}>EDU </span> FUND CONNECT</h1>
        </div>
    )
}
export default SliderUser
    
