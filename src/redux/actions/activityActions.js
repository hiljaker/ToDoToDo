import { actionTypes } from './../constants/action-types';

export const setActivities = (activities) => {
  return (dispatch, getState, extraArgument) => {
    // console.log(getState())
    // console.log(extraArgument)
    dispatch({
      type: actionTypes.SET_ACTIVITIES,
      payload: activities,
    });
  };
};
