import React, { useContext, useEffect } from 'react';
import { UserContext } from './context';
import useUserData from './useUserData';
import { Button } from 'reactstrap';

export default function UserBadge() {
  const { userData, logOut } = useUserData();
  const { user, setUser } = useContext(UserContext);
  
  const updateBadge = () => {
    if (user) {
      setUser([{
        ...user,
        balance: userData.balance
      }]);
    }
  }

  useEffect(() => {
    updateBadge();
  }, [userData]);

  return (
    <div className='user-badge'>
      <p className='welcome-message'>
        Welcome, <strong>{userData.name}</strong>
      </p>
      <p className='balance'>
        Balance: $<strong>{userData.balance}</strong>
      </p>
      <Button size = "sm" className='btn btn-danger logout-btn' onClick={logOut}>
        Log Out
      </Button>
    </div>
  );
}
