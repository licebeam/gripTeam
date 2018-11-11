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
export const setUserRatings = userMovies => ({
  type: 'SET_CURRENT_USER_RATINGS',
  userMovies,
})

export const getMovies = (searchTerm, page = 1, loading) => {
  return dispatch => {
    dispatch(setMoviesLoading(true));
    //DEFAULT SETS PAGE TO BATMAN
    fetch(`https://www.omdbapi.com/?s=${searchTerm ? searchTerm : 'godzilla'}&page=${page}&type=movie&apikey=4ee98d70`)
      .then((response) => {
        if (!response.ok) {
          throw Error('could not fetch');
        }
        return response;
      })
      .then((response) => response.json())
      .then((items) => {
        if (page === 1) {
          console.log(items)
          const clear = []
          dispatch(setMoviesList(clear));
          dispatch(setMoviesList(items.Search));
          dispatch(getRating(items.Search));
          console.log('items', items.Search)
        } else {
          console.log('items', items.Search)
          dispatch(updateMoviesList(items.Search));
          dispatch(getRating(items.Search));
        }
      })
      .catch((err) => { console.log('errors', err); dispatch(setMoviesLoading(false)); });
  };
}


export const getTopRated = () => {
  return dispatch => {
    console.log('fetching top rated')
    const clear = []
    dispatch(setMoviesList(clear));
    dispatch(setMoviesLoading(true));
    var allMovies = db.collection("movies").orderBy("rating").where("rating", ">=", 1).limit(20);
    allMovies.get().then(function (doc) {
      let movies = [];
      doc.docs.forEach((doc) => {
        return movies.push(doc.data());
      });
      return movies;
    }).then((movies) => {
      console.log(movies)
      dispatch(setMoviesList(movies));
      dispatch(getRating(movies));
      dispatch(setMoviesLoading(false))
    })
  };
}

export const getRating = movieList => {
  return dispatch => {
    dispatch(setMoviesLoading(true));
    //get currentRating
    let movieListToSend = [];
    const movieMap = movieList.map(movie => {
      const adjustedTitle = movie.title || movie.Title + ' ' + movie.Year;
      let movieTitle = adjustedTitle.replace(/\//g, '');
      var movies = db.collection("movies").doc(`${movieTitle}`);
      movies.get().then(function (doc) {
        if (doc.exists) {
          return movieListToSend.push(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          db.collection("movies").doc(`${movieTitle}`).set({ title: adjustedTitle, rating: 0, poster: movie.Poster });
          return movieListToSend.push({ title: adjustedTitle, rating: 0 });
        }
      }).then(() => {
        if (movieListToSend.length === movieList.length) {
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
    var batch = db.batch();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        db.collection('users').doc(user.email)
          .update({
            userEmail: user.email,
          })
        db.collection('users').doc(user.email)
          .update({
            movies: firebase.firestore.FieldValue.arrayUnion({ title: 'test' })
          })
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
        var movies = db.collection("users").doc(`${user.email}`);
        movies.get().then(function (doc) { //gets user rated movies
          return dispatch(
            setUserRatings(doc.data().movies),
          );
        })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
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

export const updateRating = (movieName, ratingChange, user, type) => {
  return dispatch => {
    dispatch(setMoviesLoading(true));
    console.log(movieName, ratingChange)
    //THIS UPDATES RATING FOR MOVIE YOU'VE CLICKED
    //get currentRating  
    let movieReg = movieName.replace(/\//g, '');
    var movies = db.collection("movies").doc(`${movieReg}`);

    movies.get().then(function (doc) {
      if (doc.exists) {
        const originalMovie = doc.data();
        const updateObject = {
          rating: originalMovie.rating += ratingChange
        }
        return movies.update(updateObject)
          .then(function () {
            console.log("Document successfully updated!");
            dispatch(updateUserRating(user, movieReg, type));
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

export const updateUserRating = (user, movieTitle, type) => {
  return dispatch => {
    if (user) {
      const adjustedTitle = movieTitle;
      // User is signed in.
      let movieReg = { title: adjustedTitle.replace(/\//g, ''), rating: type };
      var movies = db.collection('users').doc(user.email);
      movies.get().then((doc) => {
        let filter = doc.data().movies.filter(movie => movie.title !== movieReg.title)
        console.log(filter)
        console.log(movieReg);
        db.collection('users').doc(user.email)
          .set({
            movies: filter,
          })
          .then(() => {
            db.collection('users').doc(user.email)
              .update({
                movies: firebase.firestore.FieldValue.arrayUnion(movieReg)
              })
            console.log('updating user rating', user)
            var movies = db.collection("users").doc(`${user.email}`);
            movies.get().then(function (doc) {
              console.log('dispatching', doc.data())
              return dispatch(
                setUserRatings(doc.data().movies),
                dispatch(setMoviesLoading(false))
              );
            })
              .catch(function (error) {
                console.log("Error getting document:", error);
                dispatch(setMoviesLoading(false))
              });
          })
          .catch((error) => {
            console.log('error, user does not exist')
            dispatch(setMoviesLoading(false))
          })
        console.log('updatedUser')
      })

    } else {
      // User is signed out.
    }
  }
}
