import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Placeholder, Message, Segment, Dimmer, Loader, Image } from 'semantic-ui-react';
import * as searchFunctionalityActions from '../../../action/searchFunctionality/searchFunctionalityAction';
import AuthorCard from '../AuthorCard/AuthorCard';
import findInArray from '../../../utils/findInArray/findInArray';
import searchFunctionalityReducer from '../../../reducer/searchFunctionality/searchFunctionalityReducer';

class Followers extends Component {
  state = {
    isLoading: true
  };

  async componentDidMount() {
    const { match } = this.props;
    const { getFollowersAuthorApiCall, data, loggedInUserData } = this.props;
    if (data.userName) {
      await getFollowersAuthorApiCall(data.userName);
      await this.setState({ isLoading: false });
    }
    if (loggedInUserData.userName) {
      await getFollowersAuthorApiCall(loggedInUserData.userName);
      await this.setState({ isLoading: false });
    }
  }

  handleFollowButtonSubmit = async userName => {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      const { followAnAuthorApiCall } = this.props;
      await followAnAuthorApiCall(userName);
    }
  };

  render() {
    const { followers, following } = this.props;
    const { isLoading } = this.state;
    return (
      <>
        {isLoading && followers.length <= 0 ? (
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        ) : null}

        {followers.length < 1 && !isLoading && (
          <Message info>
            <p>No Followers</p>
          </Message>
        )}
        <Grid>
          <Grid.Row stretched>
            {followers &&
              followers.map(follower => {
                return (
                  <Grid.Column mobile={8} tablet={4} computer={3} key={follower.id}>
                    <AuthorCard
                      userName={follower.userName}
                      image={follower.img}
                      fullName={follower.userName}
                      isAuthenticated
                      isFollowing={following && findInArray(following, 'id', follower.id) ? 'following' : 'follow'}
                      handleFollowButtonSubmit={() => this.handleFollowButtonSubmit(follower.userName)}
                    />
                  </Grid.Column>
                );
              })}
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
const mapStateToProps = state => {
  const {
    auth: { isAuthenticated },
    searchFunctionalityReducer: { followers, following },
    profileReducer: { data, loggedInUserData }
  } = state;

  return {
    isAuthenticated,
    data,
    followers,
    following,
    loggedInUserData
  };
};

const mapDispatchToProps = {
  getFollowersAuthorApiCall: searchFunctionalityActions.getFollowersAuthorApiCall,

  followAnAuthorApiCall: searchFunctionalityActions.followAnAuthorApiCall
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Followers);
