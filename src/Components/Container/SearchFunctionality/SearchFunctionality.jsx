import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../View/Header/Header';
import LoggedInHeader from '../../View/Header/LoggedInHeader/LoggedInHeader';
import LoggedInHeaderResponsive from '../../View/Header/LoggedInHeaderResponsive/LoggedInHeaderResponsive';
import IsSearchResultFound from '../../View/IsSearchResultFound./IsSearchResultFound';
import * as searchFunctionalityActions from '../../../action/searchFunctionality/searchFunctionalityAction';
import HorizontalArticleCard from '../../View/ArticleCard/HorizontalArticleCard/HorizontalArticleCard';
import AuthorCard from '../../View/AuthorCard/AuthorCard';
import LandingPageHeader from '../../View/Header/LandingPageHeader/LandingPageHeader';
import MakeHeaderResponsive from '../../View/Header/MakeHeaderResponsive/MakeHeaderResponsive';
import findInArray from '../../../utils/findInArray/findInArray';

class SearchFunctionality extends Component {
  state = {
    searching: false,
    query: 'title',
    isAuthenticated: true
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

  handleSelectChange = async event => {
    const { searchByOptionApiCall } = this.props;
    await this.setState({ query: event.target.value });
    await searchByOptionApiCall(event.target.value, this.searchParameter.value);
  };

  handleInputChange = async () => {
    const { searchByOptionApiCall } = this.props;
    const { query } = this.state;
    await this.setState({ searching: true });
    await searchByOptionApiCall(query, this.searchParameter.value);
  };

  render() {
    const isDataFound = true;
    const { searching, query } = this.state;
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
        <div className="ui container margin-top">
          <div id="search-article-form">
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column mobile={16} tablet={12} computer={13}>
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

                <Grid.Column mobile={16} tablet={4} computer={2} fluid="true">
                  <div>
                    <select
                      defaultValue="title"
                      id="dropdown"
                      className="ui search dropdown"
                      onChange={this.handleSelectChange}
                    >
                      <option defaultValue="title" value="title">
                        Articles
                      </option>
                      <option value="tag">Tags</option>
                      <option value="author">Author</option>
                    </select>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          <>
            {searching ? (
              <>
                {statusCode === 404 ? (
                  <>
                    <IsSearchResultFound isDataFound={false} />
                  </>
                ) : null}
              </>
            ) : (
              <>
                <IsSearchResultFound isDataFound={isDataFound} />
              </>
            )}
          </>
          <>
            {query === 'title' && searching && articleTagOrAuthorDatas.articles && statusCode === 200 ? (
              <>
                <Grid stackable columns={2}>
                  {articleTagOrAuthorDatas.articles.rows.map(article => {
                    return (
                      <Grid.Column>
                        <HorizontalArticleCard
                          key={article.id}
                          slug={article.slug}
                          title={article.title}
                          banner={article.banner}
                          author={article.author.userName}
                          createdAt={article.createdAt}
                          timeToRead={article.timeToRead}
                          content={article.content}
                          handleIconClick={this.handleIconClick}
                          iconName={findInArray(bookmarks, 'articleId', article.id) ? 'bookmark' : 'bookmark outline'}
                          isAuthenticated={isAuthenticated}
                        />
                      </Grid.Column>
                    );
                  })}
                </Grid>
              </>
            ) : (
              <>
                {query === 'author' && searching && articleTagOrAuthorDatas.authors && statusCode === 200 ? (
                  <>
                    <div>
                      <Grid>
                        <Grid.Row stretched>
                          {articleTagOrAuthorDatas.authors.rows.map(author => {
                            return (
                              <Grid.Column mobile={8} tablet={4} computer={3}>
                                <AuthorCard
                                  userName={author.userName}
                                  isFollowing={findInArray(following, 'id', author.id) ? 'following' : 'follow'}
                                  key={author.id}
                                  image={author.img}
                                  fullName={author.fullName}
                                  handleFollowButtonSubmit={this.handleFollowButtonSubmit}
                                  isAuthenticated={isAuthenticated}
                                />
                              </Grid.Column>
                            );
                          })}
                        </Grid.Row>
                      </Grid>
                    </div>
                  </>
                ) : null}
              </>
            )}
          </>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFunctionality);
