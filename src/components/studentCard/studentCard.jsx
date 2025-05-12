import './studentCard.css';
function StudentCard({name,need,amount ,img}) {
    return(
        <>
        <div className="studentCardContainer">
            
             <div className="studentCardimg" style={{
                 backgroundImage:img? `url(${img})`: "url('Images/icon2.jpg')",
                 backgroundSize: '100% 100%'
             }}></div>
             <h5>{name}</h5>
             <h4>Need : {need}</h4>
             <h4>Amount : {amount}</h4>
             <button className='stdcardbtn'>Donate</button>
        </div>
            </>

    )
            
            
    
} 
export default StudentCard