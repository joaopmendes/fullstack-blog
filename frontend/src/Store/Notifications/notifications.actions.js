import { NotificationsActionTypes } from './notifications.types';
import uuid from "uuid/v1";
export const addNotification = ({type, title, message}) => async (dispatch) => {
  const notification = {
    id: uuid(),
      title,
      message,
      type
};

  dispatch({
    type: NotificationsActionTypes.ADD_NOTIFICATION,
    payload: notification
  });

  // setTimeout(() => {
  //   dispatch({
  //     type: NotificationsActionTypes.REMOVE_NOTIFICATION,
  //     payload: notification.id
  //   });
  // },5000)
};
