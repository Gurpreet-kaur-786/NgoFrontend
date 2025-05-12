import './cards.css';

function Cards() {
    return (
        <div className='cardbox'>
            <div className='cardbox1'>
                <div className='cardboxA card-card'>
                    <img className='imgBox' src="/Images/boxA.png" alt="Donate for Scholarships" height="100px" width="100px" />
                    <h1 className='miniboxheading'>Support a Student</h1>
                    <p className='cardparabox'>
                        Your small donation can help a financially struggling student access the education they deserve.
                    </p>
                </div>
                <div className='cardboxB card-card'>
                    <img className='imgBox' src="/Images/boxB.png" alt="Fundraising for Education" height="100px" width="100px" />
                    <h1 className='miniboxheading'>Start a Fundraiser</h1>
                    <p className='cardparabox'>
                        Launch a campaign to raise funds for students who dream big but lack financial means.
                    </p>
                </div>
                <div className='cardboxC card-card'>
                    <img className='imgBox' src="/Images/boxC.png" alt="Volunteer for Education" height="100px" width="100px" />
                    <h1 className='miniboxheading'>Become a Mentor</h1>
                    <p className='cardparabox'>
                        Volunteer your time or skills to guide underprivileged students toward a brighter future.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Cards;
