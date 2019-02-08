import React, { Component } from 'react';
import Header from '../Header/Header';
import LandingPageHeader from '../Header/LandingPageHeader/LandingPageHeader';
import Footer from '../Footer/LandingPageFooter';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import leaf from '../../../../public/images/leaf.svg';
import tour from '../../../../public/images/tour.svg';
import post from '../../../../public/images/post.svg';
import MakeHeaderResponsive from '../Header/MakeHeaderResponsive/MakeHeaderResponsive';

const LandingPage = props => {
  const { socialLoginErrors } = props;
  return (
    <div className="page-container">
      <Helmet title="Home - Authors Haven" />
      <Header>
        <LandingPageHeader />
        <MakeHeaderResponsive />
      </Header>
      {socialLoginErrors.length ? (
        <Container>
          <Message size="small" error list={[...socialLoginErrors]} />
        </Container>
      ) : null}
      <section>
        <div className="ui stackable two column grid container landingPageBg">
          <div className="column" />
          <div className="column mainsection--row mainsection--row__width">
            <h1 className="mainsection--header mainsection--header__nobottom mainsection--header__light">Welcome to</h1>
            <h1 className="mainsection--header mainsection--header__blue">Authors Haven</h1>
            <p className="mainsection--body__light">
              We are a community of like-minded authors that foster inspiration and innovation by leveraging the modern
              web
            </p>
            <Button content="Explore" className="btn--primary" />
          </div>
        </div>
      </section>
      <section>
        <div className="ui stackable two column grid container">
          <div className="column mainsection--row">
            <h1 className="mainsection2--header mainsection--header__blue">Enlarge your horizon</h1>
            <div>
              <div className="mainsection--body">
                <img src={leaf} alt="leaf" />
                <p className="mainsection--body--text mainsection--body--text__light ">
                  Get Inspired by the best minds
                </p>
              </div>
              <div className="mainsection--body">
                <img src={leaf} alt="leaf" />
                <p className="mainsection--body--text mainsection--body--text__light">Curate interesting articles</p>
              </div>
              <div className="mainsection--body">
                <img src={leaf} alt="leaf" />
                <p className="mainsection--body--text mainsection--body--text__light">Follow your favourite authors</p>
              </div>
            </div>
          </div>
          <div className="column">
            <img className="ui image mainsection-image" src={tour} alt="tour" />
          </div>
        </div>
      </section>
      <section>
        <div className="ui stackable two column grid container">
          <div className="column">
            <img className="ui image mainsection-image" src={post} alt="wall post" />
          </div>
          <div className="column mainsection--row">
            <h1 className="mainsection2--header mainsection--header__blue">Share your perspectives</h1>
            <div>
              <div className="mainsection--body">
                <img src={leaf} alt="leaf" />
                <p className="mainsection--body--text mainsection--body--text__light">Share brilliant ideas</p>
              </div>
              <div className="mainsection--body">
                <img src={leaf} alt="leaf" />
                <p className="mainsection--body--text mainsection--body--text__light">Inspire your community</p>
              </div>
              <div className="mainsection--body">
                <img src={leaf} alt="leaf" />
                <p className="mainsection--body--text mainsection--body--text__light">
                  Hold conversations with likeminded authors
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="ui container call-to-action">
          <h1>Become a member today!</h1>
          <Modal triggerEl={<Button content="Sign up" className="btn--huge" />} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

LandingPage.propTypes = {
  socialLoginErrors: PropTypes.oneOfType([PropTypes.array])
};

LandingPage.defaultProps = {
  socialLoginErrors: () => {}
};

export const mapStateToProps = state => ({
  socialLoginErrors: state.auth.loginErrors
});

export default connect(mapStateToProps)(LandingPage);
