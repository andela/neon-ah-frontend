import reducer from "./commentReducer";
import { commentActionTypes } from '../../action/commentActions/commentAction';


const INITIAL_STATE = {
    isLoading: false,
    commentCreated: false,
    hasError: false,
    errorMessage: null
  };;
  
  describe('Comment Reducer Test', () => {
    it('returns the initial state', () => {
      expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });
  
    it('update state for CREATE_COMMENT', () => {
      const payload = {
        isLoading: true,
        hasError: false,
        commentCreated: false,
        errorMessage: null
      }
  
      expect(reducer(INITIAL_STATE, { type: commentActionTypes.CREATE_COMMENT, payload })).toEqual({
        ...INITIAL_STATE,
        ...payload
      });
    });

    it('update state for CREATE_COMMENT_SUCCESS', () => {
      const payload = {
        isLoading: false,
        hasError: false,
        commentCreated: true,
        errorMessage: null
      }
  
      expect(reducer(INITIAL_STATE, { type: commentActionTypes.CREATE_COMMENT_SUCCESS, payload })).toEqual({
        ...INITIAL_STATE,
        ...payload
    });
  });
  
    it('update state for CREATE_COMMENT_ERROR', () => {
      const payload = {
        isLoading: false,
        hasError: true,
        errorMessage: "An error occured Couldn't create the comment"
      }
  
      expect(reducer(INITIAL_STATE, { type: commentActionTypes.CREATE_COMMENT_ERROR, payload  })).toEqual({
        ...INITIAL_STATE,
        ...payload
      });
    });
  
    it('update state for CLEAR_MESSAGE', () => {
        const payload = {
            isLoading: false,
            hasError: false,
            commentCreated: false,
            errorMessage: null
          }
    
        expect(reducer(INITIAL_STATE, { type: commentActionTypes.CLEAR_MESSAGE, payload  })).toEqual({
          ...INITIAL_STATE,
          ...payload
        });
      });
  });
  