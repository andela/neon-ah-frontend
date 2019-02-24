import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Rating, Dimmer, Loader } from 'semantic-ui-react';
import Modal from '../../Modal/Modal';
import * as ratingArticle from '../../../../action/rateArticle/rateArticleAction';

class ArticleRatings extends Component {
  handleRate = (e, { rating }) => {
    const { articleSlug, articleId, rateArticleAction } = this.props;

    rateArticleAction(articleSlug, articleId, rating);
  };

  render() {
    const { response, loading, isAuthenticated, rating } = this.props;
    if (loading) {
      return (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    }
    return (
      <div>
        <Rating
          maxRating={5}
          onRate={this.handleRate}
          defaultRating={rating}
          size="huge"
          className="rating"
          data-test="ArticleRating"
          disabled={!isAuthenticated}
        />
        <pre>
          {!isAuthenticated && (
            <Modal type="login" triggerEl={<p className="pointer">Please login to rate an article</p>} />
          )}
          {response.response && <p className="ui pointing red basic label">{response.response.data.data.message}</p>}
          {response.data && <p className="ui pointing basic label">{response.data.message}</p>}
        </pre>
      </div>
    );
  }
}

ArticleRatings.propTypes = {
  rating: PropTypes.number,
  rateArticleAction: PropTypes.func.isRequired,
  response: PropTypes.oneOfType([PropTypes.object]),
  loading: PropTypes.bool,
  articleSlug: PropTypes.string,
  articleId: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired
};
ArticleRatings.defaultProps = {
  rating: 0,
  response: {},
  loading: false,
  articleSlug: '',
  articleId: ''
};

const mapStateToProps = state => ({
  myRating: state.rateArticleReducer.rating,
  response: state.rateArticleReducer.response,
  loading: state.rateArticleReducer.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  rating: state.readArticleReducer.article.averageRating
});
const mapDispatchToProps = {
  rateArticleAction: ratingArticle.rateArticleAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleRatings);
