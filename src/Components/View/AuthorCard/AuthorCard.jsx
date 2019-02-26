/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import * as searchFunctionalityActions from '../../../action/searchFunctionality/searchFunctionalityAction';

class AuthorCard extends Component {
  state = {};

  handleButtonClick = userName => {
    const { sendUserName } = this.props;
    sendUserName(userName);
  };

  render() {
    const { image, fullName, isFollowing, userName, handleFollowButtonSubmit, isAuthenticated } = this.props;
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
                ref={button => (this.followButton = button)}
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
                  <button type="submit" className="upload-btn" onClick={() => this.handleButtonClick(userName)}>
                    Follow
                  </button>
                }
              />
            )}
          </Card.Content>
        </Card>
      </>
    );
  }
}

AuthorCard.propTypes = {
  image: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  handleFollowButtonSubmit: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapDispatchToProps = {
  sendUserName: searchFunctionalityActions.sendUserName
};

export default connect(
  null,
  mapDispatchToProps
)(AuthorCard);
