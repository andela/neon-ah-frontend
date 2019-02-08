/* eslint-disable react/no-danger */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import * as singleArticleAction from '../../../action/readArticle/readArticleActions';
import Header from '../../View/Header/Header';
import Footer from '../../View/Footer/LandingPageFooter';
import LoggedInHeader from '../../View/Header/LoggedInHeader/LoggedInHeader';
import LandingPageHeader from '../../View/Header/LandingPageHeader/LandingPageHeader';
import ArticleBanner from '../../View/Article/ArticleBanner/ArticleBanner';
import AuthorBreadcrumb from '../../View/Article/AuthorBreadcrumb/AuthorBreadcrumb';
import ArticleRatings from '../../View/Article/ArticleRatings/ArticleRatings';
import SocialIcons from '../../View/Article/SocialIcon/SocialIcons';
import Comments from '../../View/Comments/Comments';

class SingleArticle extends Component {
  componentDidMount() {
    const { readArticleAction, match } = this.props;
    const { slug } = match.params;
    readArticleAction(slug);
  }

  render() {
    const { article, response, loading, isAuthenticated } = this.props;
    const createMarkup = () => ({ __html: article.content });

    return (
      <div data-test="singleArticle">
        {/* {response.response && <Redirect to="/articles/NotFound" />} */}
        <Header>{isAuthenticated ? <LoggedInHeader /> : <LandingPageHeader />}</Header>

        {loading ? (
          <div className="ui segment">
            <p />
            <div className="ui active dimmer">
              <div className="ui loader" />
            </div>
          </div>
        ) : (
          <div>
            <ArticleBanner src={article.banner} title={article.title} />
            <section>
              <div className="ui stackable two column grid container">
                <AuthorBreadcrumb
                  authorName={article.author && article.author.fullName}
                  date={article.createdAt}
                  timeToRead={article.timeToRead}
                />
              </div>
            </section>

            <section>
              <div className="ui grid container" id="articleContent">
                <div className="column" dangerouslySetInnerHTML={createMarkup()} />
              </div>
            </section>

            <section>
              <div className="ui stackable two column grid container" id="tags">
                {article.tags &&
                  article.tags.map((tag, index) => <Button key={tag + { index }} compact content={tag} />)}
              </div>
            </section>
            <section>
              <div className="ui stackable two column grid container row">
                <div className="eight wide column">
                  <ArticleRatings rating={article.averageRating} />
                </div>
                <div className="eight wide column" id="socialIcons">
                  <SocialIcons />
                </div>
              </div>
            </section>
            <section>
              <div className="ui stackable two column grid container row">
                <div className="three wide column" />
                <div className="ten wide column">
                  <Comments comments={article.comments} isAuthenticated={isAuthenticated} />
                </div>
              </div>
            </section>
            <Footer />
          </div>
        )}
      </div>
    );
  }
}
SingleArticle.propTypes = {
  article: PropTypes.oneOfType([PropTypes.object]).isRequired,
  readArticleAction: PropTypes.func.isRequired,
  response: PropTypes.oneOfType([PropTypes.object]).isRequired,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  match: PropTypes.oneOfType([PropTypes.object]).isRequired
};

const mapStateToProps = state => ({
  article: state.readArticleReducer.article,
  response: state.readArticleReducer.response,
  loading: state.readArticleReducer.isLoading,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  readArticleAction: singleArticleAction.readArticleAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleArticle);
