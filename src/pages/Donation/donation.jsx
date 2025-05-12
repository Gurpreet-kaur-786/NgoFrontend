import './donation.css';

const Donation = () => {
    return (
      <div className='firstbox'>
        <div className='secbox'>
          <form action="" className='donationform'>
            <h1 id='heading'>Donation Form</h1>
            <div>
              <label htmlFor='student_id'>Student Id</label>
              <input
              type='text'
              id='student_id'
              name='student_id'
              />
              <label htmlFor='donerId'>Doner Id</label>
              <input
              type='number'
              id='donerId'
              name='donerId'
              />
              <label htmlFor='donationAmount'>Donation Amount</label>
              <input
              type='number'
              id='donationAmount'
              name='donationAmount'
              />
              <button id='submit'>Submit</button>
            </div>

          </form>
        </div>

      </div>
    
    );
  };
  
  export default Donation;
  
  
  