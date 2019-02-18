import React from 'react';
import moment from 'moment';
import { Icon, Image, Card } from 'semantic-ui-react';
import stripTags from 'striptags';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from '../../Modal/Modal';

const HorizontalArticleCard = ({
  banner,
  title,
  content,
  author,
  createdAt,
  timeToRead,
  handleIconClick,
  iconName,
  slug,
  isAuthenticated
}) => {
  function createMarkup() {
    return { __html: content };
  }
  const description = <Card.Description dangerouslySetInnerHTML={createMarkup()} />;
  const articleDescription = `${stripTags(description.props.dangerouslySetInnerHTML.__html).substring(0, 40)}`;
  return (
    <div className="ui card horizontal">
      <div className="card-img card-img-horizontal" style={{ backgroundImage: `url(${banner})` }} />
      <div className="content card-bg">
        <Link to={`/articles/read/${slug}`} className="header card-link">
          {title}
        </Link>
        <div className="description">{articleDescription}</div>
        <div className="meta">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Link to={`/profile/${author}`} className="card-link">
                {author}
              </Link>
              <p>
                {`${moment(createdAt).format('Do MMM')}.   `}
                <span>{`   ${timeToRead} min`}</span>
              </p>
            </div>
            <div>
              {isAuthenticated ? (
                <Icon name={iconName} className="article-icon" onClick={() => handleIconClick(slug)} />
              ) : (
                <Modal type="login" triggerEl={<Icon name={iconName} />} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalArticleCard;
