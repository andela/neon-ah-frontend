import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../View/Header/Header';
import LoggedInHeader from '../../View/Header/LoggedInHeader/LoggedInHeader';
import LoggedInHeaderResponsive from '../../View/Header/LoggedInHeaderResponsive/LoggedInHeaderResponsive';
import IsSearchResultFound from '../../View/IsSearchResultFound./IsSearchResultFound';
import * as searchFunctionalityActions from '../../../action/searchFunctionality/searchFunctionalityAction';
import LandingPageHeader from '../../View/Header/LandingPageHeader/LandingPageHeader';
import MakeHeaderResponsive from '../../View/Header/MakeHeaderResponsive/MakeHeaderResponsive';
import HandleSearchFunctionality from '../../View/SearchFunctionalityTab/HandleSearchFunctionality/HandleSearchFunctionality';

class SearchFunctionality extends Component {
  state = {
    searching: false,
    query: 'title',
    isAuthenticated: true
  };

  handleGoBack = () => {
    this.props.history.goBack();
  };

  handleIconClick = async slug => {
    const { isAuthenticated } = this.state;
    if (isAuthenticated) {
      const { bookmarkArticle } = this.props;
      await bookmarkArticle(slug);
    }
  };

  handleFollowButtonSubmit = async userName => {
    const { isAuthenticated } = this.state;
    if (isAuthenticated) {
      const { followAnAuthor } = this.props;
      await followAnAuthor(userName);
    }
  };

  handleInputChange = async () => {
    const { searchByOptionApiCall } = this.props;
    const { query } = this.state;
    await this.setState({ searching: true });
    await searchByOptionApiCall(query, this.searchParameter.value);
  };

  render() {
    const isDataFound = true;
    const { searching } = this.state;
    const {
      statusCode,
      articleTagOrAuthorDatas,
      bookmarks,
      following,
      auth: { isAuthenticated }
    } = this.props;
    return (
      <>
        <Helmet title=" Search - Authors Haven" />
        <Header>
          <>
            {isAuthenticated ? (
              <>
                <LoggedInHeader />
                <LoggedInHeaderResponsive />
              </>
            ) : (
              <>
                <LandingPageHeader />
                <MakeHeaderResponsive />
              </>
            )}
          </>
        </Header>
        <div className="ui container">
          <button className="back-button" onClick={this.handleGoBack}>
            Go back
          </button>
        </div>

        <div className="ui container margin-top">
          <div id="search-article-form">
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                  <div className="input">
                    <input
                      ref={input => (this.searchParameter = input)}
                      id="input"
                      type="text"
                      placeholder="Search Author's Haven"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          <>
            {searching ? null : (
              <>
                <IsSearchResultFound isDataFound={isDataFound} />
              </>
            )}
            <>
              {searching && articleTagOrAuthorDatas && statusCode === 200 ? (
                <>
                  <HandleSearchFunctionality
                    data={articleTagOrAuthorDatas}
                    handleIconClick={this.handleIconClick}
                    isAuthenticated={isAuthenticated}
                    bookmarks={bookmarks}
                    following={following}
                    handleFollowButtonSubmit={this.handleFollowButtonSubmit}
                  />
                </>
              ) : null}
            </>
          </>
          <></>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const {
    searchFunctionalityReducer: { statusCode, articleTagOrAuthorDatas, bookmarks, isBookmark, following },
    auth
  } = state;
  return {
    statusCode,
    articleTagOrAuthorDatas,
    bookmarks,
    isBookmark,
    following,
    auth
  };
};

const mapDispatchToProps = {
  searchByOptionApiCall: searchFunctionalityActions.searchByOptionApiCall,
  bookmarkArticle: searchFunctionalityActions.bookmarkArticleApiCall,
  followAnAuthor: searchFunctionalityActions.followAnAuthorApiCall
};

SearchFunctionality.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.shape(PropTypes.string.isRequired)).isRequired,
  following: PropTypes.arrayOf(PropTypes.shape(PropTypes.string.isRequired)).isRequired,
  articleTagOrAuthorDatas: PropTypes.arrayOf(PropTypes.shape(PropTypes.string.isRequired)).isRequired,
  statusCode: PropTypes.number.isRequired,
  searchByOptionApiCall: PropTypes.func.isRequired,
  bookmarkArticle: PropTypes.func.isRequired,
  followAnAuthor: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchFunctionality)
);
