import './footer.css';

function Footer() {
    return(
        <>
        <div className='FooterBox'>
            <div className='footbox1'>
                <div className='footh1'>
                <img src={'../../../../public/Images/logo-white.svg'} alt="" srcset="" />

                </div>
                <div className='footbelow'>
                    <p className='footerp'>The secret to happiness lies in helping others. Never underestimate the difference YOU can make in the lives of the poor</p>
                </div>
            </div>
            <div className='footbox2'>
                <div className='footerheading2'>
                    <h3 className='foothead'>Our Services</h3>
                </div>
                <div className='footerbelow2'>
                    <p>Give Donation</p>
                    <p>Education Support</p>
                    <p>Our Campaign</p>

                </div>
            </div>
            <div className='footbox3'>
            <div className='footerheading3'>
                <h3 className='foothead'>Quick Links</h3>
            </div>
            <div className='footerbelow2'>

                    <p>About Us</p>
                    <p>Our News</p>
                    <p>Privacy Policy</p>
                    <p>Contact Us</p>
                    <p>Our Campaign</p>

                </div>
                
            </div>
          
        </div>
          <div className="marque">
                    <marquee behavior="smooth" direction="left">All the right reserved @ 2025</marquee>
                </div>
        </>
    )
    
}
export default Footer 