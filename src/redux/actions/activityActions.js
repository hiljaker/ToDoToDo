import { actionTypes } from './../constants/action-types';

//! MEMORY
export const setActivities = (activities) => {
  return {
    type: actionTypes.activity.SET_ACTIVITIES,
    payload: activities,
  };
};
export const pushActivity = (activity) => {
  return {
    type: actionTypes.activity.PUSH_ACTIVITY,
    payload: activity,
  };
};

//! DATABASE
//? CREATE
export const addActivity = (image, dataField) => {
  return async (dispatch, getState, api) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('data', JSON.stringify(dataField));

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await api.post('/activities', formData, config);
    console.log(data);

    dispatch(pushActivity({ id: data.insertId, ...dataField }));
  };
};
//? READ
export const getActivities = () => {
  return async (dispatch, getState, api) => {
    const { data } = await api.get('/activities');
    dispatch(setActivities(data.results));
  };
};
//? UPDATE

//? DELETE
