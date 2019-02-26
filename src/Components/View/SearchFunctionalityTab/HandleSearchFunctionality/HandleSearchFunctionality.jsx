import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchFunctionalityTab from '../SearchFunctionalityTab/SearchFunctionalityTab';
import * as searchFunctionalityActions from '../../../../action/searchFunctionality/searchFunctionalityAction';

class HandleSearchFunctionality extends Component {
  state = {};

  render() {
    const {
      handleFollowButtonSubmit,
      handleIconClick,
      data,
      bookmarks,
      following,
      isAuthenticated,
      slug,
      bookmarkArticle,
      username,
      followAuthor
    } = this.props;
    if (isAuthenticated && slug !== '') {
      bookmarkArticle(slug);
    }

    if (isAuthenticated && username !== '') {
      followAuthor(username);
    }
    return (
      <SearchFunctionalityTab
        data={data}
        handleIconClick={handleIconClick}
        isAuthenticated={isAuthenticated}
        bookmarks={bookmarks}
        following={following}
        handleFollowButtonSubmit={handleFollowButtonSubmit}
      />
    );
  }
}
const mapStateToProps = state => {
  const {
    searchFunctionalityReducer: { slug, username },
    auth
  } = state;
  return {
    slug,
    auth,
    username
  };
};

const mapDispatchToProps = {
  bookmarkArticle: searchFunctionalityActions.bookmarkArticleApiCall,
  followAuthor: searchFunctionalityActions.followAnAuthorApiCall
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HandleSearchFunctionality);
