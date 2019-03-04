import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Dimmer, Loader, Image, Message } from 'semantic-ui-react';
import * as searchFunctionalityActions from '../../../action/searchFunctionality/searchFunctionalityAction';
import AuthorCard from '../AuthorCard/AuthorCard';
import findInArray from '../../../utils/findInArray/findInArray';
// import searchFunctionalityReducer from '../../../reducer/searchFunctionality/searchFunctionalityReducer';

class Following extends Component {
  state = {
    isLoading: true
  };

  async componentDidMount() {
    const { isSelf, loggedInUserData, data, getfollowingAuthorApiCall } = this.props;

    if (isSelf) {
      await getfollowingAuthorApiCall(loggedInUserData.userName);
      await this.setState({ isLoading: false });
    } else {
      await getfollowingAuthorApiCall(data.userName);
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
    const { following } = this.props;
    const { isLoading } = this.state;

    return (
      <>
        {isLoading && following.length <= 0 ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="massive">Getting Following</Loader>
            </Dimmer>

            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null}
        {following.length < 1 && !isLoading && (
          <Message info>
            <p>No following</p>
          </Message>
        )}
        <Grid>
          <Grid.Row stretched>
            {following &&
              following.map(followingUser => {
                return (
                  <Grid.Column mobile={8} tablet={4} computer={3} key={followingUser.id}>
                    <AuthorCard
                      userName={followingUser.userName}
                      image={followingUser.img}
                      fullName={followingUser.userName}
                      isAuthenticated
                      isFollowing={findInArray(following, 'id', followingUser.id) ? 'following' : 'follow'}
                      handleFollowButtonSubmit={() => this.handleFollowButtonSubmit(followingUser.userName)}
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
const mapStateToProps = ({ searchFunctionalityReducer, profileReducer, auth }) => {
  const { isLoading, username } = searchFunctionalityReducer;
  const { isAuthenticated } = auth;

  const { data, loggedInUserData, isSelf } = profileReducer;

  return {
    isAuthenticated,
    data,
    following: searchFunctionalityReducer.following,
    isLoading,
    loggedInUserData,
    isSelf,
    username,
    searchFunctionalityReducer
  };
};

const mapDispatchToProps = {
  getfollowingAuthorApiCall: searchFunctionalityActions.getfollowingAuthorApiCall,

  followAnAuthorApiCall: searchFunctionalityActions.followAnAuthorApiCall
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Following);
