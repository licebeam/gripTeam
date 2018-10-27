const reduceAction = (
  state = {
    text: 'hey whats up',
    list: [],
    highestRated: [
      { title: 'Genre', rating: 100 },
      { title: 'Genre', rating: 100 },
      { title: 'Genre', rating: 100 },
      { title: 'Genre', rating: 100 },
      { title: 'Genre', rating: 100 },
      { title: 'Genre', rating: 100 },
      { title: 'Genre', rating: 100 },
      { title: 'Genre', rating: 100 },
      { title: 'Genre', rating: 100 },
    ]
  },
  action
) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return Object.assign({}, state, { text: action.text })
    default: return state;
  }
};

export default reduceAction;
