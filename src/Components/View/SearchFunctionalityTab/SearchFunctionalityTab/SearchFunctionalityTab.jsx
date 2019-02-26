import React from 'react';
import { Tab, Grid } from 'semantic-ui-react';
import HorizontalArticleCard from '../../ArticleCard/HorizontalArticleCard/HorizontalArticleCard';
import findInArray from '../../../../utils/findInArray/findInArray';
import AuthorCard from '../../AuthorCard/AuthorCard';
import TagCard from '../../TagCard/TagCard';

const SearchFunctionalityTab = ({
  data,
  handleIconClick,
  isAuthenticated,
  bookmarks,
  following,
  handleFollowButtonSubmit
}) => {
  console.log(data);
  const panes = [
    {
      menuItem: 'Articles',
      render: () => (
        <Tab.Pane>
          {data.articles.rows.length > 0 ? (
            <Grid stackable columns={2}>
              {data.articles.rows.map(article => {
                return (
                  <Grid.Column>
                    <HorizontalArticleCard
                      key={article.id}
                      slug={article.slug}
                      title={article.title}
                      banner={article.banner}
                      author={article.author.userName}
                      createdAt={article.createdAt}
                      timeToRead={article.timeToRead}
                      content={article.content}
                      handleIconClick={handleIconClick}
                      iconName={findInArray(bookmarks, 'articleId', article.id) ? 'bookmark' : 'bookmark outline'}
                      isAuthenticated={isAuthenticated}
                    />
                  </Grid.Column>
                );
              })}
            </Grid>
          ) : (
            <h3 style={{ textAlign: 'center' }}>We couldn’t find any Articles.</h3>
          )}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Authors',
      render: () => (
        <Tab.Pane>
          {data.authors.rows.length > 0 ? (
            <Grid columns="equal">
              <Grid.Row stretched>
                {data.authors.rows.map(author => {
                  return (
                    <Grid.Column mobile={8} tablet={4} computer={3}>
                      <AuthorCard
                        userName={author.userName}
                        isFollowing={findInArray(following, 'id', author.id) ? 'following' : 'follow'}
                        key={author.id}
                        image={author.img}
                        fullName={author.fullName}
                        handleFollowButtonSubmit={handleFollowButtonSubmit}
                        isAuthenticated={isAuthenticated}
                      />
                    </Grid.Column>
                  );
                })}
              </Grid.Row>
            </Grid>
          ) : (
            <h3 style={{ textAlign: 'center' }}>We couldn’t find any Authors.</h3>
          )}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Tags',
      render: () => (
        <Tab.Pane>
          {data.tags.rows.length > 0 ? (
            <Grid>
              <Grid.Row stretched>
                {data.tags.rows.map(tag => {
                  return (
                    <Grid.Column mobile={8} tablet={4} computer={3}>
                      <TagCard key={tag.id} label={tag.name} />
                    </Grid.Column>
                  );
                })}
              </Grid.Row>
            </Grid>
          ) : (
            <h3 style={{ textAlign: 'center' }}>We couldn’t find any Tags.</h3>
          )}
        </Tab.Pane>
      )
    }
  ];
  return (
    <>
      <Tab panes={panes} />
    </>
  );
};

export default SearchFunctionalityTab;
