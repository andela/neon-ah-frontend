/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';

const AuthorCard = ({ image, fullName, isFollowing, userName, handleFollowButtonSubmit, isAuthenticated }) => {
  return (
    <>
      <Card id="author-card">
        <Card.Content>
          <Image src={image} circular id="image-size" />
          <Card.Description>
            <Link to={`/profile/${userName}`}>
              <span className="text-align-center">{fullName}</span>
            </Link>
          </Card.Description>
          {isAuthenticated ? (
            <button
              type="submit"
              className={isFollowing === 'follow' ? 'upload-btn' : 'following'}
              onClick={() => handleFollowButtonSubmit(userName)}
            >
              {isFollowing}
            </button>
          ) : (
            <Modal
              type="login"
              triggerEl={
                <button type="submit" className="upload-btn">
                  Follow
                </button>
              }
            />
          )}
        </Card.Content>
      </Card>
    </>
  );
};

AuthorCard.propTypes = {
  image: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  handleFollowButtonSubmit: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default AuthorCard;
