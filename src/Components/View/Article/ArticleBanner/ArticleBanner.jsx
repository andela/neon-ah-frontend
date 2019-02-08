import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

const ArticleBanner = ({ src, title }) => {
  return (
    <div className="pageTopBanner" data-test="pageTopBanner">
      <div className="articleTitle">
        <h1 className="title">{title}</h1>
      </div>
      <Image src={src} fluid className="topImage" alt={title} />
    </div>
  );
};

ArticleBanner.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string
};

ArticleBanner.defaultProps = {
  src: 'https://via.placeholder.com/700/400',
  title: null
};

export default ArticleBanner;
