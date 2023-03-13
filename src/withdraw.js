import React, { useState, useContext } from 'react';
import { useUserContext, UserContext } from './context';
import useUserData from './useUserData';
import { Card, CardHeader } from 'reactstrap';
import axios from 'axios';

function Withdraw() {
  const { userData, setUserData } = useUserData();
  const { user } = useUserContext(UserContext);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { updateBadge } = useContext(UserContext)

  function clearError() {
    setError(false);
  }

  function handleChange(event) {
    const amount = event.target.value;
    if (isNaN(amount) || amount < 0) {
      setError('Positive numerical values only');
    } else {
      clearError();
      setAmount(Number(amount));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newTotal = userData.balance - Number(amount);
    if (newTotal < 0) {
      setError('Insufficient funds');
      return;
    }

    const newTransaction = {
      type: 'withdrawal',
      amount: Number(amount),
      date: new Date(),
    };

    axios
      .put(
        `https://bb-server-8r19.onrender.com/withdraw/${
          userData._id || userData.id
        }`,
        {
          userData: {
            withdrawAmount: amount,
            balance: newTotal,
            transactionHistory: [
              ...userData.transactionHistory,
              newTransaction,
            ],
          },
        }
      )
      .then(async (res) => {
        console.log(res.data);
        setSuccess('Withdrawal successful');
        updateBadge(newTotal);
        return axios.put(
          `https://bb-server-8r19.onrender.com/updateBalance/${
            userData._id || userData.id
          }`,
          {
            userData: {
              balance: newTotal,
            },
          }
        );
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <UserContext.Provider value={{ user }}>
      <Card style={{ width: '15rem', margin: 'auto', marginTop: '2rem', paddingBottom:'1rem' }}>
        <CardHeader style={{ width: '15rem' }}>
          <h2>
            {' '}
            <b> WITHDRAW </b>
          </h2>
          <h6 style={{ textAlign: 'center' }}>
            <i>
              {' '}
              {userData.name}'s <br />
              Current Balance: <b> ${userData.balance}</b>
            </i>
          </h6>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Amount</label>
            <input
              id='amount'
              className='form-control'
              type='number'
              value={amount}
              onChange={handleChange}
            />
            {error && <div className='alert-danger'>{error}</div>}
            {success && <div className='alert alert-warning'>{success}</div>}
          </div>
          <button disabled={!amount} type='submit' className='btn btn-warning' style={{marginTop:'1rem' }}>
            Withdraw
          </button>{' '}
          <br />
        </form>
      </Card>
    </UserContext.Provider>
  );
}

export default Withdraw;
