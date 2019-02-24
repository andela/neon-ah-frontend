import React, { Component } from 'react';
import { Grid, Placeholder, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HorizontalArticleCard from '../../View/ArticleCard/HorizontalArticleCard/HorizontalArticleCard';
import * as UserBookmarkActions from '../../../action/getUserBookmarksActions/getUserBookmarksActions';

class Bookmarks extends Component {
  async componentDidMount() {
    const { getUserBookmarkActions } = this.props;
    getUserBookmarkActions();
  }

  render() {
    const { bookmarks, isLoading } = this.props;

    return (
      <>
        <div>
          {isLoading && (
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          )}
          {bookmarks.length < 1 && !isLoading && (
            <Message info>
              <p>You have no bookmarked articles</p>
            </Message>
          )}

          <Grid stackable columns={2}>
            {bookmarks.map(bookmark => {
              return (
                <Grid.Column>
                  <HorizontalArticleCard
                    key={bookmark.id}
                    slug={bookmark.Article.slug}
                    title={bookmark.Article.title}
                    banner={bookmark.Article.banner}
                    createdAt={bookmark.Article.createdAt}
                    timeToRead={bookmark.Article.timeToRead}
                    content={bookmark.Article.content}
                  />
                </Grid.Column>
              );
            })}
          </Grid>
        </div>
      </>
    );
  }
}

Bookmarks.propTypes = {
  bookmarks: PropTypes.oneOfType([PropTypes.object]),
  getUserBookmarkActions: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

Bookmarks.defaultProps = {
  bookmarks: {},
  isLoading: false
};

const mapStateToProps = state => ({
  bookmarks: state.getUserBookmarks.bookmarks,
  isLoading: state.getUserBookmarks.isLoading
});

const mapDispatchToProps = {
  getUserBookmarkActions: UserBookmarkActions.getUserBookmarkActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookmarks);
