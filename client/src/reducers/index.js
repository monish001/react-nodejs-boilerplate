const initialState = {
};

function reducer(state = initialState, action) {
  console.log('New action: ', action);
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
