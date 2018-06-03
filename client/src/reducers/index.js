const initialState = {
  notificationsList: [], // array of notification message, each with timestamp
};

function reducer(state = initialState, action) {
  console.log('New action: ', action);
  let newState;
  let nElementsToRemove;
  let removeIndex;
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      newState = JSON.parse(JSON.stringify(state));
      newState.notificationsList.push({
        message: action.notificationMessage,
        createdAt: new Date().toISOString(),
      });
      console.log(state, newState);
      return newState;
    case 'REMOVE_NOTIFICATION':
      newState = JSON.parse(JSON.stringify(state));
      nElementsToRemove = 1;
      removeIndex = newState.notificationsList.findIndex(n => n.createdAt === action.createdAt);
      newState.notificationsList.splice(removeIndex, nElementsToRemove);
      console.log(state, newState);
      return newState;
    default:
      return state;
  }
}

export default reducer;
