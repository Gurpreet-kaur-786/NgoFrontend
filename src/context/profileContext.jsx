import {createContext, useEffect, useState } from "react";
import axios from 'axios';


const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({});
    const userDetail = localStorage.getItem("userInfo");
    const authentication = JSON?.parse(userDetail);
    const token = authentication?.token;
  
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:2001/getSpecificData', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (token) fetchProfileData();
    }, [token]);
  
    return (
      <ProfileContext.Provider value={{ profile, setProfile, fetchProfileData }}>
        {children}
      </ProfileContext.Provider>
    );
  };
  
export default ProfileContext
