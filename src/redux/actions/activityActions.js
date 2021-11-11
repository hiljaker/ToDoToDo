import { actionTypes } from './../constants/action-types';

export const setActivities = (activities) => {
  return {
    type: actionTypes.SET_ACTIVITIES,
    payload: activities,
  };
};
