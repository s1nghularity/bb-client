import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserData = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await axios.post('https://bb-server-8r19.onrender.com/userData', {
        token: window.localStorage.getItem('token'), data: {}
      });
      setUserData(result.data.data);
      
    };

    fetchUserData();
  }, []);

  const logOut = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  };

  return { userData, logOut };
};

export default useUserData;
