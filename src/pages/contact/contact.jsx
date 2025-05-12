import './contact.css'
function Contact()
{
    return(
        <>
          <div className="container border border-black p-4 ccn mt-5 rounded-4" >
           <div className="row">
            <h1 className='text-center mb-2'> <span>C</span> <span>O</span><span>N</span><span>T</span><span>A</span><span>C</span><span>T</span> <span> P </span><span>A</span><span>G</span><span>E</span></h1>
            <div className="col-md-6  text-center mt-5" id='con'>
                <input type="text" placeholder='EMAIL' className='inp'/>
                <input type="text" placeholder='PHONE NO' className='inp'/>
            </div>
            <div className="col-md-6  text-center mt-3" id='con'>
                <input type="text" placeholder='CONTACT' className='inp'/>
                <input type="text" placeholder='ADDRESS' className='inp'/>
            </div>

            <div className="row text-center mt-3">
                <input type="text" placeholder='MESSAGE' className='inpp'/>
            </div>
            <button className='bb'>SUBMIT</button>
           </div>
     </div>
          
        </>
    )
}
export default Contact