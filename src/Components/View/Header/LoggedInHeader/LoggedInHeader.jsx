import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Image } from 'semantic-ui-react';

const LoggedInHeader = () => {
  return (
    <div className="landingPage__mobile">
      <Link to="/search" style={{ marginRight: '10px' }}>
        <Icon link name="search" />
      </Link>
      <Link to="/article/new">
        <Button content="Write an article" style={{ backgroundColor: '#2fb5ee', color: '#fff', marginRight: '10px' }} />
      </Link>

      <Icon name="bell outline" style={{ marginLeft: '10px' }} />
      <Image src="http://placekitten.com/g/30/30" avatar style={{ marginLeft: '10px', marginRight: '10px' }} />
    </div>
  );
};

export default LoggedInHeader;
