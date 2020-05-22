import { initialState } from './notifications.initialState';
import {  } from './notifications.actions';
import {NotificationsActionTypes} from "./notifications.types";

export const NotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NotificationsActionTypes.ADD_NOTIFICATION:
      return state.concat(action.payload);
    case NotificationsActionTypes.REMOVE_NOTIFICATION:
      return state.filter(not => not.id !== action.payload);
    default:
      return state;
  }
};
