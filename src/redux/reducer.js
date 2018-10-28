const reduceAction = (
  state = {
    text: 'hey whats up',
    list: [],
    genres: [
      { title: 'Horror' },
      { title: 'Action' },
      { title: 'Comedy' },
      { title: 'Romance' },
      { title: 'Sci-Fi' },
      { title: 'Documentary' },
      { title: 'Genre' },
      { title: 'Genre' },
      { title: 'Genre' },
    ],
    movieList: [
      { title: 'Cool Movie', rating: 100 },
      { title: 'Bad Movie', rating: 100 },
      { title: 'Cool Movie', rating: 100 },
      { title: 'Cool Movie', rating: 100 },
      { title: 'Cool Movie', rating: 100 },
      { title: 'Cool Movie', rating: 100 },
    ],
  },
  action
) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return Object.assign({}, state, { text: action.text })
    case 'CHANGE_CRAIG':
      return Object.assign({}, state, { text: action.text })
    default: return state;
  }
};

export default reduceAction;
