import './cardComponent.css';

function CardComponent({heading,para,img}) {
    return(
        <>
        <div className="cardComponentcontain">
            <img src={img} alt="" srcset="" height={'200px'} width={'100%'} className='myCarImg' />
            <h2>{heading}</h2>

                <p>{para}</p>
        </div> 

        </> 
    )

    
}
export default CardComponent