export default (state = null, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return {
        user: action.payload,
      };
    case "LOG_OUT":
      return null;
    default:
      return state;
  }
};
