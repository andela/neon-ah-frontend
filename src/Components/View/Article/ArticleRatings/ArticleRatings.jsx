import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Rating, Dimmer, Loader, Icon } from 'semantic-ui-react';
import Modal from '../../Modal/Modal';
import * as ratingArticle from '../../../../action/rateArticle/rateArticleAction';

class ArticleRatings extends Component {
  handleRate = (e, { rating }) => {
    const { articleSlug, articleId, rateArticleAction } = this.props;

    rateArticleAction(articleSlug, articleId, rating);
  };

  render() {
    const { response, loading, isAuthenticated, rated, myRating } = this.props;
    if (loading) {
      return (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    }
    return (
      <div>
        {isAuthenticated ? (
          <Rating
            name="theRating"
            maxRating={5}
            onRate={this.handleRate}
            defaultRating={myRating || rated}
            size="huge"
            className="rating"
            data-test="ArticleRating"
          />
        ) : (
          <Modal
            type="login"
            triggerEl={(
              <Rating
                maxRating={5}
                defaultRating={rated}
                size="huge"
                className="rating"
                data-test="ArticleRating"
                disabled
/>
)}
          />
        )}
        <pre>
          {response.response && <p className="ui pointing red basic label">{response.response.data.data.message}</p>}
          {response.data && <p className="ui pointing basic label">{response.data.message}</p>}
        </pre>
      </div>
    );
  }
}

ArticleRatings.propTypes = {
  myRating: PropTypes.number,
  rated: PropTypes.number,
  rateArticleAction: PropTypes.func.isRequired,
  response: PropTypes.oneOfType([PropTypes.object]),
  loading: PropTypes.bool,
  articleSlug: PropTypes.string,
  articleId: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired
};
ArticleRatings.defaultProps = {
  myRating: 0,
  rated: 0,
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
  rated: state.readArticleReducer.article.averageRating
});
const mapDispatchToProps = {
  rateArticleAction: ratingArticle.rateArticleAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleRatings);
