import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '../../utils/axiosSetup';
import { commentActionTypes, CommentAction } from './commentAction';

const mock = new MockAdapter(apiInstance);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.useFakeTimers();

describe('CommentAction Test', () => {
  it('dispatches the CREATE_COMMENT_ERROR action when the comment creation failed', done => {
        mock.onPost('/articles/hello/comments', {}).networkError();
    
        const expectedActions = [
            {
                type: commentActionTypes.CREATE_COMMENT,
                payload: {
                  isLoading: true,
                  hasError: false,
                  commentCreated: false,
                  errorMessage: null
                }
              },
              {
                type: commentActionTypes.CREATE_COMMENT_ERROR,
                payload: {
                  isLoading: false,
                  hasError: true,
                  errorMessage: "An error occured Couldn't create the comment"
                }
              },
              {
                type: commentActionTypes.CLEAR_MESSAGE,
                payload: {
                  isLoading: false,
                  hasError: false,
                  commentCreated: false,
                  errorMessage: null
                }
              }
        ];
    
        const store = mockStore({});
    
        return store.dispatch(CommentAction.createComment()).then(() => {
          jest.runAllTimers();
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
  });
});
