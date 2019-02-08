import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import Modal from '../../Modal/Modal';
import './LandingPageHeader.scss';

const LandingPageHeader = () => {
  return (
    <div className="landingPage__mobile">
      <Link to="/search" style={{ marginRight: '10px' }}>
        <Icon link name="search" />
      </Link>
      <Modal
        type="login"
        triggerEl={<Button content="Login" style={{ backgroundColor: '#2fb5ee', color: '#fff' }} />}
      />
      <Button basic content="Sign Up" style={{ boxShadow: 'none' }} />
    </div>
  );
};

export default LandingPageHeader;
