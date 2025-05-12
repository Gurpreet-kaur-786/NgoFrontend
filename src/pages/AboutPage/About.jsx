import './About.css';
import {Link} from 'react-router-dom'

function About() {
    return (
        <>
            {/* <div className='AboutContainer'>
                <div className='AboutPhotoBox'></div>
                <div className='AboutTextBox'>
                    <div className='AboutHead'><h1 className='H1Head'>About Us</h1></div>
                    <div className='aboutInfo'>
                        <p className='a-p'>We believe that every student deserves the opportunity to succeed,
                             regardless of their financial situation.Our platform aims to break down financial barriers to education by connecting students in need with generous donors.
                             Through our platform,
                             students can request financial assistance for essential resources like books,
                             tuition fees, college fees and laptops.  

Each request is carefully reviewed by a dedicated committee, ensuring that only 
eligible students receive support.  This process maintains the privacy of student information and fosters a sense of trust within the community.  Once a request is approved, it's made available to donors, who can choose to contribute based on their preferences. 
 The platform automatically removes fulfilled requests, so donors can see only the current needs.  

By creating a space for students and donors to connect, we hope to build a more equitable and supportive educational landscape.  We believe that by working together, we can empower students to achieve their educational goals and unlock their full potential.
</p>
                        <Link className='Linkaboutbtn' to={'/'}><button className='AboutBttn'>LEARN MORE</button></Link>
                    </div>
                </div>
            </div> */}

<div className="container px-5 ">
                <div class="row featurette my-5">
                    <div class="col-md-7">
                        <h3 class="featurette-heading fw-normal lh-1">Every Child Deserves a Chance <span class="text  text-danger">Help Bridge the Education Gap </span></h3>
                        <p class="lead">Millions of talented students are held back by financial hardships. Your donation can provide them with the books, tuition, and resources they need to thrive. Let's unlock their potential — one student at a time.
                        </p>
                    </div>
                    <div class="col-md-5">
                        <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"  height="500" xmlns="http://www.w3.org/2000/svg" src="slidepics/slide6.jpg" alt="" />
                    </div>
                </div>
                <div class="row featurette my-2">
                    <div class="col-md-7 order-md-1">
                        <h2 class="featurette-heading fw-normal lh-1">Small Help, Big Impact <span class="text text-danger">Your Support Can Change a Life.</span></h2>
                        <p class="lead">Even a small contribution can make a huge difference. Whether it's a school uniform or exam fees, your kindness ensures no student is left behind due to lack of funds. Be the reason someone stays in school.

                        </p>
                    </div>
                    <div class="col-md-5">
                        <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"  height="700" width="400" xmlns="http://www.w3.org/2000/svg" src="public/Images/about1.jpg" alt="" />
                    </div>
                </div>
                <div class="row featurette">
                    <div class="col-md-7 my-5 ">
                        <h2 class="featurette-heading fw-normal lh-1">Invest in the Future <span class="text text-danger">Sponsor a Dream Today.</span></h2>
                        <p class="lead">When you donate, you’re not just giving money — you’re investing in dreams, careers, and future leaders. Stand with us to empower students who need it the most. Education is the key, and you hold it.

                        </p>
                    </div>
                    <div class="col-md-5">
                        <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" height="500" xmlns="http://www.w3.org/2000/svg" src="slidepics/slide3.jpg" alt="" />
                    </div>
                </div>
            </div>
            <footer class="container my-5">
    <p class="float-end"><a href="#">Back to top</a></p>
    <p>© Edu Fund Connect, India. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
  </footer>
        </>
    )

}
export default About