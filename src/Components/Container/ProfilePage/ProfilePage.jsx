import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Placeholder } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Header from '../../View/Header/Header';
import LandingPageHeader from '../../View/Header/LandingPageHeader/LandingPageHeader';
import LoggedInHeader from '../../View/Header/LoggedInHeader/LoggedInHeader';
import UserProfileSection from '../../View/UserProfileSection/UserProfileSection';
import Tabs from '../../View/Tabs/Tabs';
import Notfound from '../../View/NotFound/NotFound';
import MakeHeaderResponsive from '../../View/Header/MakeHeaderResponsive/MakeHeaderResponsive';
import * as profileAction from '../../../action/profileActions/profileActions';
import getToken from '../../../utils/auth/authentication';
import LoggedInHeaderResponsive from '../../View/Header/LoggedInHeaderResponsive/LoggedInHeaderResponsive';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true
    };
  }

  async componentDidMount() {
    const { getUserData, match, history } = this.props;
    await getUserData(match.params.username, history);
    if (getToken.getUserToken() !== null) {
      await this.setState({ isAuthenticated: true });
    } else {
      await this.setState({ isAuthenticated: false });
    }
  }

  render() {
    const { data, isLoading, isSelf, error, history, match, loggedInUserData } = this.props;
    const { isAuthenticated } = this.state;

    console.log('loggedInUserData', loggedInUserData);

    return (
      <div>
        {isAuthenticated ? (
          <Header>
            <LoggedInHeader />
            <LoggedInHeaderResponsive />
          </Header>
        ) : (
          <Header>
            <LandingPageHeader />
            <MakeHeaderResponsive />
          </Header>
        )}
        {error ? (
          <div>
            <Notfound />
          </div>
        ) : (
          <div>
            <div className="ui container">
              <Grid>
                <Grid.Row stackable columns={2}>
                  {isLoading ? (
                    <Grid.Column>
                      <Placeholder>
                        <Placeholder.Header image>
                          <Placeholder.Line />
                          <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                        </Placeholder.Paragraph>
                      </Placeholder>
                    </Grid.Column>
                  ) : (
                    <UserProfileSection
                      userInfo={loggedInUserData.userName === match.params.username ? loggedInUserData : data}
                      self={isSelf}
                    />
                  )}
                </Grid.Row>
              </Grid>
              {isLoading ? null : (
                <Tabs
                  userInfo={loggedInUserData.userName !== match.params.username ? data : loggedInUserData}
                  self={loggedInUserData.userName === match.params.username}
                  history={history}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

ProfilePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loggedInUserData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.array]).isRequired,
  getUserData: PropTypes.func.isRequired,
  isSelf: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const {
    profileReducer: { isLoading, data, error, isSelf, loggedInUserData }
  } = state;
  return {
    loggedInUserData,
    isLoading,
    data,
    error,
    isSelf
  };
};

const mapDispatchToProps = {
  getUserData: profileAction.fetchUserProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
