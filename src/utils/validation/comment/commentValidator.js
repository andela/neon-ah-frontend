/**
 * @description a function to validate the comment content
 * @param {String} content
 * @returns {Object} an objects containing the error messages
 */
const validateCommentContent = ({ content }) => {
  const errors = {};
  if (!content) {
    errors.content = 'Comment content cannot be empty';
    return Object.values(errors);
  }
  if (content && content.trim() === '') {
    errors.content = 'Comment content is empty';
    return Object.values(errors);
  }
  if (content && content.length < 2) {
    errors.content = 'Comment is too short';
  }
  return Object.values(errors);
};

export default validateCommentContent;
