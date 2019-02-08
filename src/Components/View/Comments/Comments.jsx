import React from 'react';
import PropTypes from 'prop-types';
import { Button, Comment, Form } from 'semantic-ui-react';
import moment from 'moment';
import Modal from '../Modal/Modal';

const timeFormat = timeCreated => {
  const s = timeCreated;
  return moment(s, 'ddd MMM DD YYYY hh:mm:ss [GMT]ZZ')
    .startOf('day')
    .fromNow();
};

const Comments = ({ comments, isAuthenticated }) => (
  <Comment.Group data-test="comments">
    <div dividing="true" id="commentHeading">
      Comments
    </div>
    {isAuthenticated ? (
      <Form reply>
        <Form.TextArea className="commentInputBox" />
        <Button div="submit" content="Submit" primary />
      </Form>
    ) : (
      <div>
        <Modal type="login" triggerEl={<p className="pointer">Login in to submit comment</p>} />
      </div>
    )}
    {comments &&
      comments.map(comment => (
        <Comment key={comment.id}>
          <Comment.Content id="commentBox">
            <div id="authorDetails">
              <Comment.Avatar src="https://via.placeholder.com/50" className="commentImg" />
              <Comment.Author as="a">{comment.User.fullName}</Comment.Author>
              <Comment.Metadata>
                <div>{timeFormat(comment.createdAt)}</div>
              </Comment.Metadata>
            </div>
            <div id="commentText">
              <Comment.Text>{comment.content}</Comment.Text>
            </div>
          </Comment.Content>
        </Comment>
      ))}
  </Comment.Group>
);

Comments.propTypes = {
  comments: PropTypes.oneOfType([PropTypes.array]),
  isAuthenticated: PropTypes.bool
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
  isAuthenticated: false
};

export default Comments;
