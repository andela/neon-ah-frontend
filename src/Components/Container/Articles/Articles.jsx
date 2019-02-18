import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Label, Button, Segment } from 'semantic-ui-react';
import Modal from '../../View/Modal/Modal';
import LoggedInHeader from '../../View/Header/LoggedInHeader/LoggedInHeader';
import LoggedInHeaderResponsive from '../../View/Header/LoggedInHeaderResponsive/LoggedInHeaderResponsive';
import LandingPageHeader from '../../View/Header/LandingPageHeader/LandingPageHeader';
import MakeHeaderResponsive from '../../View/Header/MakeHeaderResponsive/MakeHeaderResponsive';
import Header from '../../View/Header/Header';
import VerticalArticleCard from '../../View/ArticleCard/VerticalArticleCard/VerticalArticleCard';
import HorizontalArticleCard from '../../View/ArticleCard/HorizontalArticleCard/HorizontalArticleCard';
import getToken from '../../../utils/auth/authentication';

class Articles extends Component {
  state = {
    isAuthenticated: false
  };

  async componentDidMount() {
    if (getToken.getUserToken() !== null) {
      await this.setState({ isAuthenticated: true });
    } else {
      await this.setState({ isAuthenticated: false });
    }
  }

  render() {
    const { isAuthenticated } = this.state;
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
          {isAuthenticated ? (
            <>
              <Grid stackable>
                <Grid.Column width={9}>
                  <Grid stackable columns={2}>
                    <h2>Articles from Culture</h2>
                    <Grid.Row stretched>
                      <Grid.Column className="card-container">
                        <VerticalArticleCard />
                      </Grid.Column>
                      <Grid.Column className="card-container">
                        <VerticalArticleCard />
                      </Grid.Column>
                      <Grid.Column className="card-container">
                        <VerticalArticleCard />
                      </Grid.Column>
                      <Grid.Column className="card-container">
                        <VerticalArticleCard />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>

                <Grid.Column width={7} className="fix-top">
                  <h2>Popular Tags</h2>
                  <Segment>
                    <Label.Group size="huge">
                      <Label>#culture</Label>
                      <Label>#technology</Label>
                      <Label>#cars</Label>
                      <Label>#family</Label>
                      <Label>#fun</Label>
                      <Label>#happy</Label>
                      <Label>#smart</Label>
                      <Label>#witty</Label>
                      <Label>#cars</Label>
                      <Label>#family</Label>
                      <Label>#cars</Label>
                      <Label>#family</Label>
                      <Label>#family</Label>
                      <Label>#cars</Label>
                      <Label>#family</Label>
                      <Label>#family</Label>
                    </Label.Group>
                  </Segment>
                  <h2>Latest Articles</h2>
                  <HorizontalArticleCard />
                  <HorizontalArticleCard />
                  <HorizontalArticleCard />
                </Grid.Column>
              </Grid>
            </>
          ) : (
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
          )}
          <section>
            <Grid stackable columns={2}>
              <Grid.Row stretched>
                <Grid.Column>
                  <VerticalArticleCard />
                </Grid.Column>
                <Grid.Column only="computer tablet">
                  <HorizontalArticleCard />
                  <HorizontalArticleCard />
                  <HorizontalArticleCard />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </section>

          <h2>Latest Articles</h2>
          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <VerticalArticleCard />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <VerticalArticleCard />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <VerticalArticleCard />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <VerticalArticleCard />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <VerticalArticleCard />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <VerticalArticleCard />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <VerticalArticleCard />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <VerticalArticleCard />
            </Grid.Column>
          </Grid>
        </div>
      </>
    );
  }
}

export default Articles;
