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

export const getActivities = () => {
  return async (dispatch, getState, api) => {
    // api.get('/');
    const activities = [
      { activity_name: 'ngoding' },
      { activity_name: 'belajar' },
      { activity_name: 'blablabla' },
    ];
    dispatch({
      type: actionTypes.SET_ACTIVITIES,
      payload: activities,
    });
  };
};
