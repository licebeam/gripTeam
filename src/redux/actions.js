import ReduxThunk from 'redux-thunk'
import { db } from '../firebase'
import * as firebase from 'firebase';

export const changeText = text => ({
  type: 'CHANGE_TEXT',
  text,
})

export const changeCraig = text => ({
  type: 'CHANGE_CRAIG',
  text,
})

//THIS ACTION SETS OUR MOVIE LIST
export const setMoviesList = movies => ({
  type: 'SET_MOVIES',
  movies,
})
//THIS ACTION UPDATES OUR MOVIE LIST WITH THE NEXT PAGE
export const updateMoviesList = movies => ({
  type: 'UPDATE_MOVIES',
  movies,
})

export const setMovieRatings = ratings => ({
  type: 'SET_MOVIE_RATINGS',
  ratings,
})

export const setMoviesLoading = loading => ({
  type: 'SET_MOVIES_LOADING',
  loading
})

export const resetMovieRatingList = () => ({
  type: 'RESET_RATING_LIST',
})

//USER LOGIN ACTIONS - THESE SET THE USER'S INFO FOR OUR REDUCER STATE
export const setCurrentUser = userObject => ({
  type: 'SET_CURRENT_USER',
  userObject,
})

export const getMovies = (searchTerm, page = 1) => {
  return dispatch => {
    dispatch(setMoviesLoading(true));
    //DEFAULT SETS PAGE TO BATMAN
    fetch(`https://www.omdbapi.com/?s=${searchTerm ? searchTerm : 'batman'}&page=${page}&type=movie&apikey=4ee98d70`)
      .then((response) => {
        if (!response.ok) {
          throw Error('could not fetch');
        }
        return response;
      })
      .then((response) => response.json())
      .then((items) => {
        if (page === 1) {
          dispatch(setMoviesList(items.Search));
          dispatch(getRating(items.Search));
          console.log('items', items.Search)
        } else {
          console.log('items', items.Search)
          dispatch(updateMoviesList(items.Search));
          dispatch(getRating(items.Search));
        }
      })
      .catch((err) => console.log('errors', err));
  };
}

export const updateRating = (movieName, ratingChange) => {
  return dispatch => {
    console.log(movieName, ratingChange)
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

export const getRating = movieList => {
  return dispatch => {
    dispatch(setMoviesLoading(true));
    console.log('getting ratings', movieList)
    //get currentRating
    let movieListToSend = [];
    const movieMap = movieList.map(movie => {
      let movieTitle = movie.Title.replace(/\//g, '');
      var movies = db.collection("movies").doc(`${movieTitle}`);
      movies.get().then(function (doc) {
        if (doc.exists) {
          console.log('dispatching')
          return movieListToSend.push(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          db.collection("movies").doc(`${movieTitle}`).set({ title: movie.Title, rating: 0 });
          return movieListToSend.push({ title: movie.Title, rating: 0 });
        }
      }).then(() => {
        if (movieListToSend.length === movieList.length) {
          console.log('sending')
          return dispatch(setMovieRatings(movieListToSend))
        }
        dispatch(setMoviesLoading(false))
      })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    })
  };
}

//USER LOGS IN 
export const logInSet = () => {
  return dispatch => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        db.collection('users').doc(user.email)
          .update({ userEmail: user.email })
          .then(() => {
            console.log('updating user')
          })
          .catch((error) => {
            console.log('error, user does not exist')
            db.collection('users').doc(user.email)
              .set({
                userEmail: user.email,
              })
              .then(() => {
                console.log('added user to db and updating')
              })
              .catch((error) => {
                console.log('error adding user')
              })
          })
        console.log('user is signed in')
        dispatch(
          setCurrentUser({
            email: user.email,
            profilePhoto: user.photoURL,
            displayName: user.displayName,
          }
          ),
        );
      } else {
        // User is signed out.
      }
    });
  }
}