import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Search, Grid, Laoder } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as searchAction from '../../../../action/searchFunctionality/searchFunctionalityAction';

export class LoggedInHeaderSearch extends Component {
  state = {
    isLoading: false,
    value: '',
    results: []
  };

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => this.setState({ value: result.title });

  handleSearchChange = async (e, { value }) => {
    const { searchOption, sendSearchInputValue } = this.props;
    this.setState({ isLoading: true, value });
    sendSearchInputValue(value);
    await searchOption(value);
    this.setState({
      isLoading: false
    });
  };

  render() {
    const { isLoading, value } = this.state;
    let source = {};
    const { articleTagOrAuthorDatas } = this.props;
    if (articleTagOrAuthorDatas.articles || articleTagOrAuthorDatas.tags || articleTagOrAuthorDatas.authors) {
      const articles = articleTagOrAuthorDatas.articles.rows.slice(0, 2).map(article => {
        return {
          title: <Link to={`/articles/read/${article.slug}`}>{article.title}</Link>,
          image: article.banner,
          key: article.id
        };
      });
      const tags = articleTagOrAuthorDatas.tags.rows.slice(0, 2).map(tag => {
        return {
          title: (
            <Link to={`/tags/${tag.name}`}>
              <i className="tags icon" />
              {tag.name}
            </Link>
          ),
          key: tag.id
        };
      });
      const authors = articleTagOrAuthorDatas.authors.rows.slice(0, 2).map(author => {
        return {
          title: <Link to={`/profile/${author.userName}`}>{author.fullName}</Link>,
          image: author.img,
          key: author.id
        };
      });

      source = {
        authors: {
          name: 'Authors',
          results: authors.length > 0 ? authors : [{ title: <div>No Authors found</div> }]
        },
        articles: {
          name: 'Articles',
          results: articles.length > 0 ? articles : [{ title: <div>No Articles found</div> }]
        },
        tags: {
          name: 'Tags',
          results: tags.length > 0 ? tags : [{ title: <div>No Tags found</div> }]
        },
        more: {
          name: <Link to="/search">More</Link>,
          results: []
        }
      };
    }

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            className="search"
            showNoResults={false}
            icon={null}
            size="mini"
            category
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={source}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

LoggedInHeaderSearch.propTypes = {
  articleTagOrAuthorDatas: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export const mapStateToProps = state => {
  const {
    searchFunctionalityReducer: { articleTagOrAuthorDatas }
  } = state;

  return {
    articleTagOrAuthorDatas
  };
};

const mapDispatchToProps = {
  searchOption: searchAction.searchByOptionApiCall,
  sendSearchInputValue: searchAction.getSearchInputValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInHeaderSearch);
