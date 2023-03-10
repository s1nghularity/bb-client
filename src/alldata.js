import { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import axios from 'axios';
import {TiDelete} from 'react-icons/ti';
import 'animate.css'

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
    const cardIndex = users.findIndex((user) => user._id === id);
    const cardElement = document.getElementsByClassName('alldatacard')[cardIndex];
  
    axios.delete(`https://bb-server-8r19.onrender.com/deleteuser/${id}`)
      .then(() => {
        const newUsers = users.filter(user => user._id !== id);
        setUsers(newUsers);
  
        cardElement.classList.add('animate__zoomOutDown', 'fade-out')
        cardElement.addEventListener('animationend', () => {
          cardElement.remove();
        });
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="card-container">
      {users.map((user, index) => (

        <Card key={index} className='alldatacard' style={{ width: 'auto' }}>

          <CardHeader style={{ width: 'auto' }}>
            {user.name} <br/> <h6>{user.email}</h6>

            <div className="delete-button" 
              onClick={() => handleDeleteUser(user._id)}> 
            <TiDelete size={45}/>
            </div>
          
          </CardHeader>
          <CardBody className='cardbodydata'>
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
          </CardBody>
          <CardFooter className='card-footer'>
          <h6><i>Current Balance: <b>${user.balance}</b></i></h6>
          </CardFooter>
        </Card>
      ))}

    </div>
  );
}

export default AllData;
