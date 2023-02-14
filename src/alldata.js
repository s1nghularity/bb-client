import { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import axios from 'axios';

function AllData() {
  const [users, setUsers] = useState([{}]);

  useEffect(() => {
    axios.get('https://bb-server-8r19.onrender.com/alldata').then((res) => {
      if (Array.isArray(res.data.data)) {
        setUsers(res.data.data);
      } else {
        console.error("res.data is not an array", res.data);
      }
    });
  }, []);

  const handleDeleteUser = (id) => {
    axios.delete(`https://bb-server-8r19.onrender.com/deleteuser/${id}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="card-container">
      {users.map((user, index) => (
        <Card key={index} className='alldatacard' style={{ width: 'auto' }}>
          <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>X</button>
          <CardHeader style={{ width: 'auto' }}>
            {user.name} <br/> <h6>{user.email}</h6>
          </CardHeader>
          <CardBody className='cardbodydata'>
            <h6><i>Current Balance:<h4>${user.balance}</h4></i></h6>
          </CardBody>
          <CardFooter className='card-footer'>
            Transactions:
            {user.transactionHistory ? (
              user.transactionHistory.map((transaction, id) => (
                <div key={id}>
                  <b>{transaction.type} ${transaction.amount}</b> <i>{transaction.date}</i>
                </div>
              ))
            ) : (
              <div>No transaction history found</div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default AllData;
