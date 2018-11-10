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
    },
    userMovies: [],
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
    case 'RESET_RATING_LIST': //empties the rating list
      return Object.assign({}, state, { currentRatings: [] })
    case 'SET_MOVIE_RATINGS':
      return {
        ...state,
        currentRatings: [...state.currentRatings, ...action.ratings]
      }
    // return Object.assign({}, state, { currentRatings: action.ratings })
    case 'SET_CURRENT_USER':
      return Object.assign({}, state, { user: action.userObject })
    case 'SET_CURRENT_USER_RATINGS':
      return Object.assign({}, state, { userMovies: action.userMovies })
    case 'SET_MOVIES_LOADING':
      return Object.assign({}, state, { moviesLoading: action.loading })
    case 'UPDATE_MOVIES':
      return {
        ...state,
        movieList: [...state.movieList, ...action.movies]
      }
    default: return state;
  }
};

export default reduceAction;
