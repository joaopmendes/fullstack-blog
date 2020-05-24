import { ControlsActionTypes } from './controls.types';

export const addLoader = (id) => ({
  type: ControlsActionTypes.ADD_LOADER,
  payload: id,
});

export const removeLoader = (id) => ({
  type: ControlsActionTypes.REMOVE_LOADER,
  payload: id,
});
