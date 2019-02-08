import React from 'react';
import PropTypes from 'prop-types';
import { Rating } from 'semantic-ui-react';

const ArticleRatings = ({ rating }) => (
  <Rating icon="star" defaultRating={rating} maxRating={5} size="huge" className="rating" data-test="ArticleRating" />
);

ArticleRatings.propTypes = {
  rating: PropTypes.number
};
ArticleRatings.defaultProps = {
  rating: 0
};

export default ArticleRatings;
