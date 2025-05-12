import './Recent.css'

function RecentScholarships() {
    return (
        <div className='recent-container'>
            <h1 className='recent-title'>Recent Scholarship Opportunities</h1>
            <p className='recent-subtitle'>Invest in your future today. Education is the key to a brighter tomorrow!</p>

            <div className='recent-cards'>
                <div className='recent-card'>
                    <div className='recent-card-img img1'>
                        <img src='/Images/c1.jpg' alt='Scholarship Opportunity 1' height={"200px"} />
                    </div>
                    <div className='recent-card-content'>
                        <h3>Summer Scholarship for STEM Students</h3>
                        <p>Apply today for a chance to study in top STEM programs and build your career in science and technology.</p>
                    </div>
                </div>

                <div className='recent-card'>
                    <div className='recent-card-img img2'>
                        <img src='/Images/c2.jpg' alt='Scholarship Opportunity 2' height={"200px"} />
                    </div>
                    <div className='recent-card-content'>
                        <h3>International Scholarship for Underserved Students</h3>
                        <p>This scholarship aims to support students from low-income backgrounds pursuing higher education abroad.</p>
                    </div>
                </div>

                <div className='recent-card'>
                    <div className='recent-card-img img3'>
                        <img src='/Images/c4.jpg' alt='Scholarship Opportunity 3' height={"200px"} />
                    </div>
                    <div className='recent-card-content'>
                        <h3>Full Scholarship for Arts and Humanities Majors</h3>
                        <p>For students passionate about the arts and humanities, this scholarship offers full tuition coverage for selected applicants.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentScholarships
