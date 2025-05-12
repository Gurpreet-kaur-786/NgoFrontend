import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './historyCard.css';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function HistoryCard() {
  const userDetail = localStorage.getItem("userInfo");
  const authentication = JSON.parse(userDetail);

  const [trans, setTrans] = useState([]);
  const [filteredTrans, setFilteredTrans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [calendarValue, setCalendarValue] = useState(null);
  const [filterMode, setFilterMode] = useState('date'); // 'date', 'month', 'year'
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication == null) {
      navigate('/login');
    }
  }, [authentication, navigate]);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await axios.get('https://ngobackend-j2ap.onrender.com/userTransaction', {
          headers: {
            Authorization: `Bearer ${authentication.token}`
          }
        });

        setTrans(data.data);

        const today = new Date();
        const threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);

        const recentTransactions = data.data.filter(item => {
          const transactionDate = new Date(item.createdAt);
          return transactionDate >= threeDaysAgo && transactionDate <= today;
        });

        setFilteredTrans(recentTransactions);

      } catch (error) {
        console.log(error);
      }
    }

    fetch();
  }, [authentication?.token]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = trans.filter(item =>
      item.student_id?.student_Name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      item.student_id?.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
      item.donationAmount.toString().includes(e.target.value)
    );
    setFilteredTrans(filtered);
  };

  const handleDateSelect = (date) => {
    setCalendarValue(date);
    if (!date) return;

    const filtered = trans.filter(item => {
      const itemDate = new Date(item.createdAt);
      if (filterMode === 'date') {
        return (
          itemDate.getFullYear() === date.getFullYear() &&
          itemDate.getMonth() === date.getMonth() &&
          itemDate.getDate() === date.getDate()
        );
      } else if (filterMode === 'month') {
        return (
          itemDate.getFullYear() === date.getFullYear() &&
          itemDate.getMonth() === date.getMonth()
        );
      } else if (filterMode === 'year') {
        return itemDate.getFullYear() === date.getFullYear();
      }
      return false;
    });

    setFilteredTrans(filtered);
  };

  const handleLastWeek = () => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const filtered = trans.filter(item => {
      const date = new Date(item.createdAt);
      return date >= lastWeek && date <= today;
    });

    setFilteredTrans(filtered);
  };

  return (
    <div className="historycard">
      <div className="filter-container">
        <div>
          <label>Search</label>
          <input
            type="text"
            className="search-bar"
            placeholder="Search by name, email, or amount..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div>
          <label>Filter Mode</label>
          <select value={filterMode} onChange={(e) => setFilterMode(e.target.value)}>
            <option value="date">By Date</option>
            <option value="month">By Month</option>
            <option value="year">By Year</option>
          </select>
        </div>

        <div>
          <label>Select {filterMode.charAt(0).toUpperCase() + filterMode.slice(1)}</label>
          <DatePicker
            selected={calendarValue}
            onChange={handleDateSelect}
            showMonthYearPicker={filterMode === 'month'}
            showYearPicker={filterMode === 'year'}
            dateFormat={
              filterMode === 'year'
                ? 'yyyy'
                : filterMode === 'month'
                ? 'MMMM yyyy'
                : 'dd/MM/yyyy'
            }
            placeholderText={`Select ${filterMode}`}
            className="date-picker"
          />
        </div>

        <div>
          <label>&nbsp;</label>
          <button onClick={handleLastWeek}>Last Week</button>
        </div>
      </div>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Donor Name</th>
            <th>Student Name</th>
            <th>Gmail ID</th>
            <th>Payment Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrans.length > 0 ? (
            filteredTrans.map((item, index) => (
              <tr key={index}>
                <td>{item.donerId ? item.donerId.name : 'Unknown'}</td>
                <td>{item.student_id ? item.student_id.student_Name : 'Unknown'}</td>
                <td>{item.student_id ? item.student_id.email : 'Unknown'}</td>
                <td>{item.donationAmount}</td>
                <td>{new Date(item.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                })}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No transactions found for the selected filter.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryCard;
