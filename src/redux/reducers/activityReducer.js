import { actionTypes } from './../constants/action-types';

const initialState = {
  activities: [],
};

export const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVITIES:
      return { ...state, activities: action.payload };
    default:
      return state;
  }
};
