import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

const TagCard = ({ label, name }) => {
  return (
    <>
      <Button id="tag-card-button">
        <Link className="tags" activeStyle={{ color: 'red' }} to={`/tag/${label}`}>
          {`#${label}`}
        </Link>
      </Button>
    </>
  );
};

export default TagCard;
