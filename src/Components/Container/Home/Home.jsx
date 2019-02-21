import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Grid, Label, Button, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Modal from '../../View/Modal/Modal';
import LoggedInHeader from '../../View/Header/LoggedInHeader/LoggedInHeader';
import LoggedInHeaderResponsive from '../../View/Header/LoggedInHeaderResponsive/LoggedInHeaderResponsive';
import LandingPageHeader from '../../View/Header/LandingPageHeader/LandingPageHeader';
import MakeHeaderResponsive from '../../View/Header/MakeHeaderResponsive/MakeHeaderResponsive';
import Header from '../../View/Header/Header';
import VerticalArticleCard from '../../View/ArticleCard/VerticalArticleCard/VerticalArticleCard';
import HorizontalArticleCard from '../../View/ArticleCard/HorizontalArticleCard/HorizontalArticleCard';
import * as homePageActions from '../../../action/homePage/homePageAction';
import * as gettagsActions from '../../../action/tags/tagsAction';
import VerticalArticleCardLoader from '../../View/ArticleCard/VerticalArticleCardLoader/VerticalArticleCardLoader';
import HorizontalArticleCardLoader from '../../View/ArticleCard/HorizontalArticleCardLoader/HorizontalArticleLoader';

export class Home extends Component {
  state = {};

  async componentDidMount() {
    const { getHomePageArticles, getTags } = this.props;
    getHomePageArticles();
    getTags();
  }

  render() {
    const {
      articles,
      auth: { isAuthenticated },
      tags
    } = this.props;
    const randomNumber = Math.floor(Math.random() * tags.length + 1);

    return (
      <>
        <Helmet title="Home - Authors Haven" />
        <Header>
          {isAuthenticated ? (
            <>
              <LoggedInHeader />
              <LoggedInHeaderResponsive />
            </>
          ) : (
            <>
              <LandingPageHeader />
              <MakeHeaderResponsive />
            </>
          )}
        </Header>

        <div className="ui container">
          {!isAuthenticated ? (
            <>
              <section>
                <div className="ui stackable two column grid container welcomePageBg">
                  <div className="column" />
                  <div className="column mainsection--row mainsection--row__width">
                    <h1 className="mainsection--header mainsection--header__nobottom mainsection--header__light">
                      Welcome to
                    </h1>
                    <h1 className="mainsection--header mainsection--header__blue">Authors Haven</h1>
                    <p className="mainsection--body__light">
                      We are a community of like-minded authors that foster inspiration and innovation by leveraging the
                      modern web
                    </p>
                    <Modal
                      type="signup"
                      triggerEl={<Button content="Get Started" style={{ backgroundColor: '#2fb5ee', color: '#fff' }} />}
                    />
                  </div>
                </div>
              </section>
            </>
          ) : null}

          {articles.length === 0 ? (
            <section>
              <Grid stackable columns={2}>
                <Grid.Row stretched>
                  <Grid.Column>
                    <VerticalArticleCardLoader />
                  </Grid.Column>
                  <Grid.Column only="computer tablet">
                    <HorizontalArticleCardLoader />
                    <HorizontalArticleCardLoader />
                    <HorizontalArticleCardLoader />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </section>
          ) : (
            <section>
              <Grid stackable columns={2}>
                <Grid.Row stretched>
                  <Grid.Column>
                    {articles.slice(0, 1).map(article => (
                      <VerticalArticleCard
                        feature
                        key={article.id}
                        title={article.title}
                        content={article.content}
                        slug={article.slug}
                        author={article.author.userName}
                        timeToRead={article.timeToRead}
                        createdAt={article.createdAt}
                        banner={article.banner}
                      />
                    ))}
                  </Grid.Column>
                  <Grid.Column only="computer tablet">
                    {articles.slice(1, 4).map(article => (
                      <HorizontalArticleCard
                        key={article.id}
                        title={article.title}
                        slug={article.slug}
                        content={article.content}
                        author={article.author.userName}
                        createdAt={article.createdAt}
                        timeToRead={article.timeToRead}
                        banner={article.banner}
                      />
                    ))}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </section>
          )}
          {isAuthenticated ? (
            <>
              <Grid stackable>
                <Grid.Column width={9}>
                  <Grid stackable columns={2}>
                    {tags.slice(randomNumber - 1, randomNumber).map(tag => (
                      <h2 key={tag.id}>Articles from {tag.name} </h2>
                    ))}

                    <Grid.Row stretched>
                      {tags.slice(randomNumber - 1, randomNumber).map(tag =>
                        tag.articles.map(article => (
                          <Grid.Column className="card-container" key={article.id}>
                            <VerticalArticleCard
                              key={article.id}
                              title={article.title}
                              content={article.content}
                              slug={article.slug}
                              timeToRead={article.timeToRead}
                              createdAt={article.createdAt}
                              banner={article.banner}
                            />
                          </Grid.Column>
                        ))
                      )}
                    </Grid.Row>
                  </Grid>
                </Grid.Column>

                <Grid.Column width={7} className="fix-top">
                  <h2>Popular Tags</h2>
                  <Segment>
                    <Label.Group size="huge">
                      {tags.slice(0, 20).map(tag => (
                        <Label key={tag.id}>#{tag.name}</Label>
                      ))}
                    </Label.Group>
                  </Segment>
                </Grid.Column>
              </Grid>
            </>
          ) : null}
          <h2>Popular Articles</h2>
          {articles.length === 0 ? (
            <Grid>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <VerticalArticleCardLoader />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <VerticalArticleCardLoader />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <VerticalArticleCardLoader />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <VerticalArticleCardLoader />
              </Grid.Column>
            </Grid>
          ) : (
            <Grid>
              {articles.map(article => (
                <Grid.Column mobile={16} tablet={8} computer={4} key={article.id}>
                  <VerticalArticleCard
                    key={article.id}
                    title={article.title}
                    content={article.content}
                    slug={article.slug}
                    author={article.author.userName}
                    timeToRead={article.timeToRead}
                    banner={article.banner}
                    createdAt={article.createdAt}
                  />
                </Grid.Column>
              ))}
            </Grid>
          )}
        </div>
      </>
    );
  }
}

export const mapStateToProps = state => {
  const {
    homePageArticlesReducer: { articles },
    tagsReducer: { tags },
    auth
  } = state;
  return {
    articles,
    auth,
    tags
  };
};

const mapDispatchToProps = {
  getHomePageArticles: homePageActions.getHomePageArticles,
  getTags: gettagsActions.getTags
};

Home.propTypes = {
  getHomePageArticles: PropTypes.func,
  articles: PropTypes.array,
  auth: PropTypes.object,
  tags: PropTypes.array
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
