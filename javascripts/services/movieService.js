'use strict';

app.service("MovieService", function($q, $http, FIREBASE_CONFIG){
const getRatedMovies = (userUid) => {
    let movies = [];
    return $q((resolve, reject) => {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/movies.json?orderBy="uid"&equalTo="${userUid}"`).then((results) =>{
            let fbMovies = results.data;
            Object.keys(fbMovies).forEach((key) =>{
                fbMovies[key].id = key; 
                if(fbMovies[key].isWatched){
                    movies.push(fbMovies[key]);
                } 
                resolve(movies);
            });
            }).catch((err) =>{
            reject(err);
          });
        });
    };
    const getWishlistMovies = (userUid) => {
        let movies = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/movies.json?orderBy="uid"&equalTo="${userUid}"`).then((results) =>{
                let fbMovies = results.data;
                Object.keys(fbMovies).forEach((key) =>{
                    fbMovies[key].id = key; 
                    if(!fbMovies[key].isWatched){
                        movies.push(fbMovies[key]);
                    } 
                    resolve(movies);
                });
                }).catch((err) =>{
                reject(err);
              });
            });
        };
    return{getRatedMovies, getWishlistMovies};
});






