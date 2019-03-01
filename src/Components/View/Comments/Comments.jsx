import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Comment, Form, Message, Image, List, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import { CommentAction } from '../../../action/commentActions/commentAction';
import validateCommentContent from '../../../utils/validation/comment/commentValidator';

export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasValidationError: false,
      errors: [],
      inputFieldsData: {
        content: ''
      }
    };
  }

  handleChange = evt => {
    evt.preventDefault();
    const { inputFieldsData } = this.state;
    inputFieldsData[evt.target.id] = evt.target.value.trim();
    this.setState({
      inputFieldsData,
      hasValidationError: false
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const {
      addComment,
      location: { pathname }
    } = this.props;
    const articleSlug = pathname.split('/')[3];
    const { inputFieldsData } = this.state;
    const errors = validateCommentContent(inputFieldsData);

    if (errors.length >= 1) {
      this.setState({
        hasValidationError: true,
        errors
      });
      return;
    }
    addComment(inputFieldsData, articleSlug);
  };

  render() {
    const { hasValidationError, errors } = this.state;
    const { comments, isAuthenticated, isLoading, hasError, commentCreated, errorMessage } = this.props;
    return (
      <Comment.Group data-test="comments">
        <div dividing="true" id="commentHeading">
          Comments
        </div>
        {isAuthenticated ? (
          <>
            {hasValidationError && <Message error list={errors} />}
            {hasError && !commentCreated && (
              <Message error>
                <p>{errorMessage}</p>
              </Message>
            )}
            {!hasError && commentCreated && (
              <Message success>
                <p>Comment was created successfully</p>
              </Message>
            )}
            <Form id="comment-form" onSubmit={this.handleSubmit} reply>
              <Form.TextArea onChange={this.handleChange} id="content" className="commentInputBox" />
              <Button
                loading={isLoading}
                disabled={hasValidationError || hasError}
                div="submit"
                content="Submit"
                primary
              />
            </Form>
          </>
        ) : (
          <div>
            <Modal type="login" triggerEl={<p className="pointer">Login in to submit comment</p>} />
          </div>
        )}
        {comments &&
          comments.map(comment => (
            <Comment key={comment.id}>
              <Comment.Content id="commentBox">
                <div
                  style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between' }}
                >
                  <List verticalAlign="middle">
                    <List.Item>
                      <Image size="tiny" avatar src={comment.User.img} circular />
                      <List.Content>
                        <List.Header>{comment.User.fullName}</List.Header>
                      </List.Content>
                    </List.Item>
                  </List>
                  <div id="timestamp">
                    {moment(comment.createdAt)
                      .startOf()
                      .fromNow()}
                  </div>
                </div>
                <div className="rule-div" />
                <div id="commentText">
                  <Comment.Text>{comment.content}</Comment.Text>
                </div>
                <div id="like">
                  <span>
                    <Icon color="blue" name="thumbs up" size="large" />
                    <b>78</b>
                  </span>
                </div>
              </Comment.Content>
            </Comment>
          ))}
      </Comment.Group>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.oneOfType([PropTypes.array]),
  isAuthenticated: PropTypes.bool,
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
  addComment: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  commentCreated: PropTypes.bool,
  errorMessage: PropTypes.string
};

Comments.defaultProps = {
  comments: [
    {
      id: null,
      User: { fullName: undefined },
      createdAt: null,
      content: null
    }
  ],
  isAuthenticated: false,
  isLoading: false,
  hasError: false,
  commentCreated: false,
  errorMessage: null
};

const mapStateToProps = state => ({
  isLoading: state.comment.isLoading,
  hasError: state.comment.hasError,
  commentCreated: state.comment.commentCreated,
  errorMessage: state.comment.errorMessage
});

const mapDispatchToProps = {
  addComment: CommentAction.createComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Comments));
