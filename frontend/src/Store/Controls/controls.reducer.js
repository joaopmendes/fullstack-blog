import { ControlsActionTypes } from './controls.types';
import { initialState } from './controls.initialState';
export const ControlsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ControlsActionTypes.ADD_LOADER:
      const loaderIndex = state.loaders.findIndex(
        (loader) => loader.id === action.payload,
      );
      const alreadyCreated = loaderIndex !== -1;
      const newState = JSON.parse(JSON.stringify(state));
      if (alreadyCreated) {
        newState.loaders[loaderIndex].active = true;
      } else {
        newState.loaders.push({
          id: action.payload,
          active: true,
        });
      }
      console.log('ControlsReducer -> newState', newState);
      return newState;
    case ControlsActionTypes.REMOVE_LOADER:
      return {
        ...state,
        loaders: state.loaders.map((loader) => {
          if (loader.id === action.payload) {
            loader.active = false;
          }

          return loader;
        }),
      };
    default:
      return state;
  }
};
