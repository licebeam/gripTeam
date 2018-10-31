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

export const setMoviesList = movies => ({
  type: 'SET_MOVIES',
  movies,
})

export const setMovieRatings = ratings => ({
  type: 'SET_MOVIE_RATINGS',
  ratings,
})

//USER LOGIN ACTIONS - THESE SET THE USER'S INFO FOR OUR REDUCER STATE
export const setCurrentUser = userObject => ({
  type: 'SET_CURRENT_USER',
  userObject,
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
      .then((items) => { dispatch(setMoviesList(items.Search)); dispatch(getRating(items.Search)) })
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

export const getRating = (movieList) => {
  return dispatch => {
    //get currentRating
    let movieListToSend = [];
    const movieMap = movieList.map(movie => {
      var movies = db.collection("movies").doc(`${movie.Title}`);
      movies.get().then(function (doc) {
        if (doc.exists) {
          console.log('dispatching')
          return movieListToSend.push(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          db.collection("movies").doc(`${movie.Title}`).set({ title: movie.Title, rating: 0 });
          return undefined;
        }
      }).then(() => {
        console.log(movieListToSend);
        if (movieListToSend.length === movieList.length) {
          console.log('sending')
          return dispatch(setMovieRatings(movieListToSend))
        }
      })
        .catch(function (error) {
          console.log("Error getting document:");
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
        console.log(user)
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