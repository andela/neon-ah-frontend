import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Image, Card, Icon } from 'semantic-ui-react';
import stripTags from 'striptags';
import { Link } from 'react-router-dom';

const VerticalArticleCard = props => {
  const { feature, title, content, author, timeToRead, banner, createdAt, slug } = props;
  function createMarkup() {
    return { __html: content };
  }

  const description = <Card.Description dangerouslySetInnerHTML={createMarkup()} />;
  const articleDescription = `${stripTags(description.props.dangerouslySetInnerHTML.__html).substring(0, 50)}.....`;
  const stripArticleDescription = articleDescription.replace('&nbsp;', ' ');
  const stripTitle = `${stripTags(title).substring(0, 30)}.....`;
  return (
    <Card fluid>
      <div className={feature ? 'card-img feature' : 'card-img'} style={{ backgroundImage: `url(${banner})` }} />
      <Card.Content className="card-bg">
        <Card.Header>
          <Link to={`/articles/read/${slug}`} className="header card-link">
            {stripTitle}
          </Link>
          <Card.Description className="articleDescription">{stripArticleDescription}</Card.Description>
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Link to={`/profile/${author}`} className="card-link">
              {author}
            </Link>
            <p>
              {`${moment(createdAt).format('Do MMM')}.   `}
              <span>{`   ${timeToRead} min`} </span>
            </p>
          </div>
          <div>
            <a href="/" className="card-link">
              <Icon name="bookmark outline" />
            </a>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

VerticalArticleCard.defaultProps = {
  title: '',
  content: '',
  author: '',
  timeToRead: '',
  banner: '',
  createdAt: ''
};

export default VerticalArticleCard;
