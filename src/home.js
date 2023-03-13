import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
} from 'reactstrap';
import React, { useState } from 'react';
import bank from './bank.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Home(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Card
        style={{
          backgroundColor: 'orange',
          color: 'whitesmoke',
          width: '18rem',
        }}
        className='home-card'
      >
        <img alt='Bank Company Logo' src={bank} />
        <CardBody>
          <CardTitle tag='h5'>The Bad Bank</CardTitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
           <b> Welcome to A Terrible Bank</b>
          </CardSubtitle>
          <CardText>
            Where none of your financial goals will be met!
          </CardText>
        </CardBody>
      </Card>

      <Button
        color='warning'
        size='sm'
        onClick={toggle}
        style={{ marginLeft: '20px' }}
      >
        Learn More
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Capstone Project</ModalHeader>
        <ModalBody>
          This is a capstone project for a MIT's MERN bootcamp. It uses React,
          Node.js, Express, and MongoDB. As a mock bank website, it allows users
          to create an account, login, deposit, and withdraw money. An
          unprotected admin page allows anyone to view all users and their
          balances. Feel free to create your own account and play around with
          the site!
        </ModalBody>
        <ModalFooter>
          <Button
            tag={Link}
            to='/createaccount'
            color='primary'
            onClick={toggle}
          >
            Create Account
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
