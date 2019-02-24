import reducer from "./notificationReducer";
import { notificationActionTypes } from '../../action/notificationActions/notificationActions';


const INITIAL_STATE = {
  isLoading: false,
  notificationList: [],
  hasError: false,
  errorMessage: null
};
  
  describe('Notification Reducer', () => {
    it('returns the initial state', () => {
      expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });
  
    it('update state for FETCH_NOTIFICATIONS', () => {
      const payload = {
        isLoading: true,
      };
  
      expect(reducer(INITIAL_STATE, { type: notificationActionTypes.FETCH_NOTIFICATIONS, payload })).toEqual({
        ...INITIAL_STATE,
        isLoading: true,
        hasError: false,
        errorMessage: null
      });
    });

    it('update state for UPDATE_NOTIFICATION', () => {
      const payload = {
          notificationList: []
        };
  
      expect(reducer(INITIAL_STATE, { type: notificationActionTypes.UPDATE_NOTIFICATION, payload })).toEqual({
        ...INITIAL_STATE,
        ...payload
    });
  });
  
    it('update state for FETCH_NOTIFICATIONS_SUCCESS', () => {
      const payload = {
        isLoading: false,
        hasError: false,
        errorMessage: null,
        notificationList: []
      };
  
      expect(reducer(INITIAL_STATE, { type: notificationActionTypes.FETCH_NOTIFICATIONS_SUCCESS, payload  })).toEqual({
        ...INITIAL_STATE,
        ...payload
      });
    });
  
    it('update state for FETCH_NOTIFICATIONS_ERROR', () => {
        const payload = {
          isLoading: false,
          hasError: true,
          errorMessage: 'Error',
          notificationList: []
          };
    
        expect(reducer(INITIAL_STATE, { type: notificationActionTypes.FETCH_NOTIFICATIONS_ERROR, payload  })).toEqual({
          ...INITIAL_STATE,
          ...payload
        });
      });
  });
  