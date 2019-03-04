import React from 'react';

import { Grid, Message } from 'semantic-ui-react';
import HorizontalArticleCard from '../ArticleCard/HorizontalArticleCard/HorizontalArticleCard';

const MyArticles = ({ articles }) => {
  if (!articles.length) {
    return (
      <Message info>
        <p>You have not authored any article.</p>
      </Message>
    );
  }
  return (
    <Grid stackable columns={2}>
      {articles.map(article => {
        return (
          <Grid.Column>
            <HorizontalArticleCard {...article} />
          </Grid.Column>
        );
      })}
    </Grid>
  );
};

export default MyArticles;
