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
      { title: 'Fantasy' },
      { title: 'Family' },
      { title: 'Children' },
    ],
    moviesLoading: false,
    movieList: [],
    currentRatings: [],
    user: {
      email: null,
      profilePhoto: null,
      displayName: null,
    }
  },
  action
) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return Object.assign({}, state, { text: action.text })
    case 'CHANGE_CRAIG':
      return Object.assign({}, state, { text: action.text })
    case 'SET_MOVIES':
      return Object.assign({}, state, { movieList: action.movies })
    case 'SET_MOVIE_RATINGS':
      return Object.assign({}, state, { currentRatings: action.ratings })
    case 'SET_CURRENT_USER':
      return Object.assign({}, state, { user: action.userObject })
    case 'SET_MOVIES_LOADING':
      return Object.assign({}, state, { moviesLoading: action.loading })
    default: return state;
  }
};

export default reduceAction;
