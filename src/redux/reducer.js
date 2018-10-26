

/**
* @param {Object} state - Default application state
* @param {Object} action - Action from action creator
* @returns {Object} New state
*/
const reduceAction = (
  state = {
    text: 'hey whats up',
    list: []
  }, action) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return Object.assign({}, state, { text: action.text })
    default: return state;
  }
};

export default reduceAction;
