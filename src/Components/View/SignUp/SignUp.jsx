/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */

import React from 'react';
import { connect } from 'react-redux';
import { Modal as SemannticModal, Button, Form, Image, Divider, Grid, Icon, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { validateSignUpInput } from '../../../utils/validation/signUp';
import { SignUpAction } from '../../../action/signUp/signUpAction';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasValidationError: false,
      errors: [],
      inputFieldsData: {
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
    this.baseState = this.state;
    this.onModalClose = this.onModalClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  onModalClose() {
    this.setState(this.baseState);
  }

  handleFieldChange(evt) {
    evt.preventDefault();
    const { inputFieldsData } = this.state;
    inputFieldsData[evt.target.id] = evt.target.value.trim();
    this.setState({
      inputFieldsData,
      hasValidationError: false
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { signUpUser } = this.props;
    const { inputFieldsData } = this.state;
    const errors = validateSignUpInput(inputFieldsData);

    if (errors.length >= 1) {
      this.setState({
        hasValidationError: true,
        errors
      });
      return;
    }
    signUpUser(inputFieldsData);
  }

  render() {
    const { hasValidationError, errors } = this.state;
    const { triggerEl, message, isLoading, signUpCompleted, hasSignUpError, signUpError } = this.props;

    return (
      <SemannticModal size="large" trigger={triggerEl} onClose={this.onModalClose} closeIcon centered={false}>
        <div className="site-modal">
          <div className="site-modal__image signup-modal-bg-image" />

          <div className="site-modal__details">
            <Image centered src="https://res.cloudinary.com/jesseinit/image/upload/v1549611110/neon-ah/Logo.svg" />
            <h2 className="site-modal__header">Signup to Authors Haven</h2>
            <p className="site-modal__subheader">Fill the form to create an account and get started</p>
            {signUpCompleted && !signUpError && (
              <Message onDismiss={() => location.reload()} success>
                {message}
              </Message>
            )}
            {(hasValidationError || hasSignUpError) && (
              <Message error list={errors}>
                {typeof signUpError === 'string' ? signUpError : null}
              </Message>
            )}

            <Form id="signup-form" onSubmit={this.handleSubmit}>
              <Form.Field>
                <input type="text" id="fullName" placeholder="Name" onChange={this.handleFieldChange} />
              </Form.Field>
              <Form.Field>
                <input type="text" id="userName" placeholder="Username" onChange={this.handleFieldChange} />
              </Form.Field>
              <Form.Field>
                <input type="email" id="email" placeholder="Email" onChange={this.handleFieldChange} />
              </Form.Field>
              <Form.Field>
                <input type="password" id="password" placeholder="Password" onChange={this.handleFieldChange} />
              </Form.Field>
              <Form.Field>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={this.handleFieldChange}
                />
              </Form.Field>
              <Button loading={isLoading} disabled={hasValidationError} primary fluid content="Sign Up" />
            </Form>

            <Divider horizontal>Or</Divider>

            <p style={{ textAlign: 'center', marginTop: '-8px' }}>Connect with your social accounts.</p>
            <Grid columns="2">
              <Grid.Row>
                <Grid.Column>
                  <Button
                    fluid
                    as="a"
                    href="https://neon-ah-staging.herokuapp.com/api/v1/auth/google"
                    color="google plus"
                  >
                    <Icon name="google" />
                    Google
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Button
                    fluid
                    as="a"
                    href="https://neon-ah-staging.herokuapp.com/api/v1/auth/facebook"
                    color="facebook"
                  >
                    <Icon name="facebook" />
                    Facebook
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button fluid as="a" href="https://neon-ah-staging.herokuapp.com/api/v1/auth/twitter" color="twitter">
                    <Icon name="twitter" />
                    Twitter
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Button
                    fluid
                    as="a"
                    href="https://neon-ah-staging.herokuapp.com/api/v1/auth/linkedin"
                    color="linkedin"
                  >
                    <Icon name="linkedin" />
                    LinkedIn
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Already have an account? Login
              <a style={{ paddingLeft: '4px' }} href="/">
                here
              </a>
            </p>
          </div>
        </div>
      </SemannticModal>
    );
  }
}

SignUp.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  triggerEl: PropTypes.element.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  hasSignUpError: PropTypes.bool,
  signUpError: PropTypes.string,
  signUpCompleted: PropTypes.bool
};

SignUp.defaultProps = {
  isLoading: false,
  message: null,
  hasSignUpError: false,
  signUpError: null,
  signUpCompleted: false
};

const mapStateToProps = state => ({
  isLoading: state.signUpReducer.isLoading,
  hasSignUpError: state.signUpReducer.hasSignUpError,
  signUpError: state.signUpReducer.signUpError,
  signUpCompleted: state.signUpReducer.signUpCompleted,
  message: state.signUpReducer.message
});

const mapDispatchToProps = {
  signUpUser: SignUpAction.signUpUser
};

const SignUpComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

export default SignUpComponent;
