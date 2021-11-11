import { actionTypes } from './../constants/action-types';

export const setActivities = (activities) => {
  return async (dispatch, getState, api) => {
    // console.log(getState());
    // await api.get('/')
    dispatch({
      type: actionTypes.SET_ACTIVITIES,
      payload: activities,
    });
  };
};
