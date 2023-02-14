import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserData = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      const result = await axios.post('https://bb-server-8r19.onrender.com/userData', {
        token: window.localStorage.getItem('token'),
      });
      setUserData(result.data.data);
      setLoading(false);
      
    };

    fetchUserData();
  }, [setUserData]);

  const logOut = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  };

  return { userData, logOut, loading };
};

export default useUserData;
