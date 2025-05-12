import { useNavigate, useParams } from 'react-router-dom';
import './payment.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../../context/authContext';
import Swal from 'sweetalert2';

function Payment() {
  const [detail, setDetail] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const response = await axios.get(`http://localhost:2001/singleData/${id}`);
        setDetail(response.data);
      } catch (error) {
        Swal.fire('Error', 'Failed to load payment details.', 'error');
      }
    }
    fetchDetail();
  }, [id]);

  const [formData, setFormData] = useState({
    student_id: id,
    donationAmount: '',
    cardNumber: '',
    cvv: '',
    expire: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donation = parseFloat(formData.donationAmount);
    const neededAmount = parseFloat(detail.amount);

    if (!/^\d{16}$/.test(formData.cardNumber)) {
      return Swal.fire('Invalid Input', 'Card number must be exactly 16 digits.', 'error');
    }

    if (!/^\d{3}$/.test(formData.cvv)) {
      return Swal.fire('Invalid Input', 'CVV must be exactly 3 digits.', 'error');
    }

    if (!formData.expire) {
      return Swal.fire('Invalid Input', 'Please select an expiration date.', 'error');
    }

    if (!formData.donationAmount || donation <= 0 || donation > neededAmount) {
      return Swal.fire('Invalid Amount', `Donation must be between ₹1 and ₹${neededAmount}.`, 'error');
    }

    try {
      const response = await axios.post('http://localhost:2001/d', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await Swal.fire('Success', response.data, 'success');

      setFormData({
        student_id: id,
        donationAmount: '',
        cardNumber: '',
        cvv: '',
        expire: '',
      });

      navigate('/donatecard');
    } catch (error) {
      Swal.fire('Error', error.response?.data || "Something went wrong.", 'error');
    }
  };

  return (
    <div className='paymentContainer'>
      {/* <div className='paymenthead'>
        <h1 className='pay'>Payment Information</h1>
      </div> */}

      <div className='paymentform'>
        <div className='paymentinfoForm'>
          {/* <label className='paymentRow'>Name: {detail.student_Name}</label> */}
          <label className='paymentRow'>paragraph: {detail.paragraph}</label>
          
        </div>

        <div className="paymentbox">
          <form onSubmit={handleSubmit}>
            <div className='paymentfirstbox'>
              <label className='paymentRow' htmlFor="amount">Amount</label>
              <input
                className='inputboxcard'
                id='amount'
                type='number'
                name="donationAmount"
                value={formData.donationAmount}
                onChange={handleChange}
                min="1"
                max={detail.amount}
              />

              <label className='paymentRow' htmlFor="cardNumber">Card Number</label>
              <input
                className='inputboxcard'
                id='cardNumber'
                type='text'
                name='cardNumber'
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength={16}
                placeholder="16-digit card number"
              />
            </div>

            <div className='lastpaymentbox'>
              <div id='ex'>
                <label className='paymentRow1' htmlFor="expire">Expired Date</label>
                <input
                  className='inputboxcarddate'
                  id='expire'
                  type='month'
                  name='expire'
                  value={formData.expire}
                  onChange={handleChange}
                />
              </div>

              <div className='paymentsecurity'>
                <label className='paymentRow2' htmlFor="cvv">CVV</label>
                <input
                  className='inputboxcardcvv'
                  id='cvv'
                  type='password'
                  name='cvv'
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength={3}
                  placeholder="3-digit CVV"
                />
              </div>
            </div>

            <div className='paymentfirstbox'>
              <button className='proceedbtn' type="submit"> Proceed </button>
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
