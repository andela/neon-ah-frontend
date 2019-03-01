import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import HorizontalArticleCard from '../../View/ArticleCard/HorizontalArticleCard/HorizontalArticleCard';
import * as ReadingStats from '../../../action/readStats/readStatsAction';

class ReadStats extends Component {
  state = {};

  async componentDidMount() {
    const { getReadStats } = this.props;
    getReadStats();
  }

  render() {
    const { readStats } = this.props;

    return (
      <>
        <Grid stackable columns={2}>
          {readStats.map(readStat => {
            return (
              <Grid.Column>
                <HorizontalArticleCard
                  key={readStat.id}
                  slug={readStat.Article.slug}
                  title={readStat.Article.title}
                  banner={readStat.Article.banner}
                  createdAt={readStat.Article.createdAt}
                  timeToRead={readStat.Article.timeToRead}
                  content={readStat.Article.content}
                />
              </Grid.Column>
            );
          })}
        </Grid>
      </>
    );
  }
}
const mapStateToProps = state => {
  const {
    readStatsReducer: { readStats }
  } = state;

  return {
    readStats
  };
};

const mapDispatchToProps = {
  getReadStats: ReadingStats.getReadStats
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadStats);
