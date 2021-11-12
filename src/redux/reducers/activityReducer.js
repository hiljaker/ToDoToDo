import { actionTypes } from './../constants/action-types';

const initialState = {
  activities: [],
};

export const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.activity.SET_ACTIVITIES:
      return { ...state, activities: action.payload };
    case actionTypes.activity.PUSH_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    default:
      return state;
  }
};
