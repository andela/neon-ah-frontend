import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isArray } from 'util';
import * as homePageActions from '../../../../action/homePage/homePageAction';
import HorizontalArticleCard from '../../ArticleCard/HorizontalArticleCard/HorizontalArticleCard';

class RelatedArticles extends Component {
  componentDidMount() {
    const { getHomePageArticles } = this.props;
    getHomePageArticles();
  }

  render() {
    const { tagArticles } = this.props;
    const randomNumber = Math.floor(Math.random() * 10);
    return (
      <Grid stackable data-test="relatedArticles">
        <Grid.Column width={16}>
          <Grid stackable columns={2}>
            <h2>Related Articles</h2>

            <Grid.Row stretched>
              {tagArticles &&
                tagArticles.slice(2, randomNumber).map(thearticle => (
                  <Grid.Column className="card-container" key={thearticle.id}>
                    <HorizontalArticleCard
                      key={thearticle.id}
                      title={thearticle.title}
                      content={thearticle.content}
                      slug={thearticle.slug}
                      timeToRead={thearticle.timeToRead}
                      createdAt={thearticle.createdAt}
                      banner={thearticle.banner}
                    />
                  </Grid.Column>
                ))}
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
      //   );
      // };
    );
  }
}
RelatedArticles.propTypes = {
  tagArticles: PropTypes.oneOfType(isArray).isRequired,
  getHomePageArticles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tagArticles: state.homePageArticlesReducer ? state.homePageArticlesReducer.articles : null
});

const mapDispatchToProps = {
  getHomePageArticles: homePageActions.getHomePageArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelatedArticles);
