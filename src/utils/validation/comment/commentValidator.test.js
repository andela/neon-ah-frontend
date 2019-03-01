import validateCommentContent from './commentValidator';

const undefinedInput = {};

const emptyInput = {
  content: '   '
};

const shortInput = {
  content: 'a'
};

describe('Comment content Validation Test', () => {
  it('should give error for empty string input', () => {
    expect(validateCommentContent(emptyInput).length).toEqual(1);
  });

  it('should give error for short string input', () => {
    expect(validateCommentContent(shortInput).length).toEqual(1);
  });

  it('should give error for undefined string input', () => {
    expect(validateCommentContent(undefinedInput).length).toEqual(1);
  });
});
