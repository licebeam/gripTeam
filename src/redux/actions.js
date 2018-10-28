import ReduxThunk from 'redux-thunk'

export const changeText = text => ({
  type: 'CHANGE_TEXT',
  text,
})

export const changeCraig = text => ({
  type: 'CHANGE_CRAIG',
  text,
})

export const setMoviesList = movies => ({
  type: 'SET_MOVIES',
  movies,
})

export const getMovies = (searchTerm) => {
  return dispatch => {
    //DEFAULT SETS PAGE TO BATMAN
    fetch(`https://www.omdbapi.com/?s=${searchTerm ? searchTerm : 'batman'}&page=1&type=movie&apikey=4ee98d70`)
      .then((response) => {
        if (!response.ok) {
          throw Error('could not fetch');
        }
        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(setMoviesList(items.Search)))
      .catch(() => dispatch(console.log('errors')));
  };
}