import {
  ADD_APPLY,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  UPDATE_JOB,
} from "./actionsType";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favJobs: [...state.favJobs, payload],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favJobs: [...state.favJobs].filter((job) => job.id !== payload),
      };

    case ADD_APPLY:
      return {
        ...state,
        applyedJobs: [payload],
      };
    case UPDATE_JOB:
      return {
        ...state,
        editedJob: [payload],
      };

    default:
      return state;
  }
};
export default reducer;
