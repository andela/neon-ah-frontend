import React, { Component } from 'react';
import moment from 'moment';
import { Icon, Card, Popup } from 'semantic-ui-react';
import stripTags from 'striptags';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../../Modal/Modal';
import './HorizontalArticleCard.scss';
import * as searchFunctionalityActions from '../../../../action/searchFunctionality/searchFunctionalityAction';

class HorizontalArticleCard extends Component {
  handleClick = slug => {
    const { sendBookmark } = this.props;
    sendBookmark(slug);
  };

  render() {
    const {
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
    } = this.props;

    function createMarkup() {
      return { __html: content };
    }
    const description = <Card.Description dangerouslySetInnerHTML={createMarkup()} />;
    const articleDescription = `${stripTags(description.props.dangerouslySetInnerHTML.__html).substring(0, 40)}.....`;
    const stripTitle = `${stripTags(title).substring(0, 30)}.....`;
    const stripArticleDescription = articleDescription.replace('&nbsp;', ' ');
    return (
      <div className="ui card horizontal">
        <div className="card-img card-img-horizontal" style={{ background: `url(${banner})` }} />
        <div className="content card-bg">
          <Link to={`/articles/read/${slug}`} className="header card-link">
            {stripTitle}
          </Link>
          <div className="description articleDescription">{stripArticleDescription}</div>
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
                  <Popup
                    trigger={
                      <i
                        ref={i => (this.bookmarkIcon = i)}
                        className={`${iconName} icon article-icon`}
                        onClick={() => handleIconClick(slug)}
                      />
                    }
                    content="Bookmark this article"
                    hideOnScroll
                    position="top center"
                  />
                ) : (
                  <Modal type="login" triggerEl={<Icon name={iconName} onClick={() => this.handleClick(slug)} />} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  sendBookmark: searchFunctionalityActions.sendBookmarkSlug
};

HorizontalArticleCard.defaultProps = {
  title: '',
  content: '',
  author: '',
  timeToRead: '',
  banner: '',
  createdAt: ''
};

export default connect(
  null,
  mapDispatchToProps
)(HorizontalArticleCard);
