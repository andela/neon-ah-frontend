import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';
import moment from 'moment';
import PropTypes from 'prop-types';

const AuthorBreadCrumb = ({ src, authorName, date, timeToRead }) => {
  const s = date;
  const momentTime = moment(s, 'ddd MMM DD YYYY hh:mm:ss [GMT]ZZ').format('ll');
  return (
    <div className="ui column grid" data-test="authorBreadcrumb">
      <div className="column">
        <div className="ui three column grid">
          <div className="column">
            <div>
              <Link to="/user/:username">
                <Image src={src} avatar style={{ marginLeft: '5px', marginRight: '5px' }} size="tiny" />
              </Link>
            </div>
          </div>
          <div className="eight wide column" id="articleDetails">
            <p>{authorName}</p>
            {/* {moment(date).fromNow()} */}
            {momentTime}
            &nbsp; &middot; &nbsp;
            {timeToRead}
            &nbsp;
            {timeToRead > 1 ? 'mins' : 'min'}
          </div>
          <div className="two wide column">
            <Button className="tiny ui primary basic button">Follow</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthorBreadCrumb.propTypes = {
  src: PropTypes.string,
  authorName: PropTypes.string,
  date: PropTypes.string,
  timeToRead: PropTypes.number
};

AuthorBreadCrumb.defaultProps = {
  src: 'https://via.placeholder.com/50',
  authorName: null,
  date: null,
  timeToRead: 1
};
export default AuthorBreadCrumb;
