import ReduxThunk from 'redux-thunk'
import { db } from '../firebase'

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

export const setMovieRatings = ratings => ({
  type: 'SET_MOVIE_RATINGS',
  ratings,
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

export const updateRating = (movieName, ratingChange) => {
  return dispatch => {
    //THIS UPDATES RATING FOR MOVIE YOU'VE CLICKED
    //get currentRating 
    var movies = db.collection("movies").doc(`${movieName}`);

    movies.get().then(function (doc) {
      if (doc.exists) {
        const originalMovie = doc.data();
        const updateObject = {
          rating: originalMovie.rating += ratingChange
        }
        return movies.update(updateObject)
          .then(function () {
            console.log("Document successfully updated!");
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });

      } else {
        console.log("No such document!");

      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  };
}

export const getRating = (movieName) => {
  return dispatch => {
    //get currentRating 
    var movies = db.collection("movies").doc(`${movieName}`);
    movies.get().then(function (doc) {
      if (doc.exists) {
        console.log(doc.data())
        dispatch(setMovieRatings(doc.data()))
      } else {
        // doc.data() will be undefined in this case
        return dispatch(console.log('not working'));
        console.log("No such document!");
        db.collection("movies").doc(`${movieName}`).set({ title: movieName, rating: 0 });
        return dispatch(setMovieRatings(doc.data()));
      }
    }).catch(function (error) {
      console.log("Error getting document:");
    });
  };
}