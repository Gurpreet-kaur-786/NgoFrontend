import CardComponent from '../../../components/cardComponent/cardComponent';
import './service.css';

function Service() {
    return(
        <>
        <div className='ServiceBox'>
            
            <div className='ServiceBox2'>
            <CardComponent img={'public/Images/card4.jpg'} heading={'Our History'} para={'The secret to happiness lies in helping others. Never underestimate the difference YOU can make in the lives of the poor.'}/>

            <CardComponent img={'public/Images/card5.jpg'} heading={'Our Mission'} para={'The secret to happiness lies in helping others. Never underestimate the difference YOU can make in the lives of the poor.'}/>
            </div>


        </div> 
        </>
    )
    
}
export default Service