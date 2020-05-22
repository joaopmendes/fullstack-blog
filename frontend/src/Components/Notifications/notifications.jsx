import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBNotification } from 'mdbreact';
import { removeNotification } from '../../Store/Notifications/notifications.actions';
import Clicable from '../MacroControllers/Clicable';

const Notifications = () => {
  const notifications = useSelector((store) => store.notifications);
  const dispatch = useDispatch();
  return notifications.map((notification) => (
    <Clicable
      onClick={() => {
        dispatch(removeNotification(notification.id));
      }}
    >
      <MDBNotification
        show
        fade
        iconClassName={`text-${notification.type}`}
        title={`${notification.title}`}
        message={`${notification.message}`}
        style={{
          position: 'fixed',
          top: '100px',
          right: '350px',
          width: '200px',
          zIndex: 9999,
        }}
      />
    </Clicable>
  ));
};

export default Notifications;
