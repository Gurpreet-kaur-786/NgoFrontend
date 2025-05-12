
import './LandingPage.css';
// import UserHome from '../userHome/userHome.jsx';
import SliderUser from '../slider/slider.jsx';
import Cards from '../cards/cards.jsx';
import RecentCauses from '../RecentCauses/Recent.jsx';
import Service from '../services/sevice.jsx';
import Footer from '../footer/footer.jsx';
import Counter from '../counter/counter.jsx';

function LandingPage() {
    return (
        <>
            
            <SliderUser/>

            
            {/* <UserHome/> */}
            
            <Cards/>
            <RecentCauses/>
            {/* <Service/> */}
            <Counter/>
            <Footer/>

        </>
    )

}
export default LandingPage