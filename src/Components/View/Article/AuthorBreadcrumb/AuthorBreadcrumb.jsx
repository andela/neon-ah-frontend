import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';
import moment from 'moment';
import PropTypes from 'prop-types';

const AuthorBreadCrumb = ({ src, authorName, userName, date, timeToRead, isAuthenticated }) => {
  const s = date;
  const momentTime = moment(s, 'ddd MMM DD YYYY hh:mm:ss [GMT]ZZ').format('ll');
  return (
    <div className="ui column grid" data-test="authorBreadcrumb">
      <div className="column">
        <div className="ui three column grid">
          <div className="column">
            <div>
              <Link to={`/profile/${userName}`}>
                <Image
                  src={src || 'https://via.placeholder.com/50'}
                  avatar
                  style={{ marginLeft: '5px', marginRight: '5px' }}
                  size="tiny"
                />
              </Link>
            </div>
          </div>
          <div className="eight wide column" id="articleDetails">
            <p>{authorName}</p>
            {momentTime}
            &nbsp; &middot; &nbsp;
            {timeToRead}
            &nbsp;
            {timeToRead > 1 ? 'mins' : 'min'}
          </div>
          <div className="two wide column">
            {isAuthenticated ? <Button className="tiny ui primary basic button">Follow</Button> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

AuthorBreadCrumb.propTypes = {
  src: PropTypes.string,
  authorName: PropTypes.string,
  userName: PropTypes.string,
  date: PropTypes.string,
  timeToRead: PropTypes.number,
  isAuthenticated: PropTypes.bool
};

AuthorBreadCrumb.defaultProps = {
  src: 'https://via.placeholder.com/50',
  authorName: null,
  date: null,
  userName: '',
  timeToRead: 1,
  isAuthenticated: false
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.readArticleReducer.userName
});

export default connect(mapStateToProps)(AuthorBreadCrumb);
