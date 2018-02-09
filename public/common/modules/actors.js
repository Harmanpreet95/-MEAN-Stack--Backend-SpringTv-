
var actorsModule = angular.module('fwrk.actors', []);

actorsModule.service('Actors', function($http) {

    return {
        allList: function() {
            return $http.get('/api/actor/actors').then(function(postList) {
                return postList.data;
            });
        },
        all:  function(act) {
            console.log(act);
            return $http({
                method: 'post',
                url: '/api/actors',
                data: act
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the Actor!');
                console.error(err);
                return err;
            });
        },
         sort: function() {
            return $http.get('/api/latestactors').then(function(movieList) {
                return movieList.data;
            });
        },
        addactor: function(newMovie) {
            console.log(newMovie);
            return $http({
                method: 'post',
                url: '/api/addactor',
                data: newMovie
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the Movie!');
                console.error(err);
                return err;
            });
        },
        actorsearchdata: function(newMovie) {
            console.log(newMovie);
            return $http({
                method: 'post',
                url: '/api/actorsearchbydata',
                data: newMovie
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the Movie!');
                console.error(err);
                return err;
            });
        },
        add: function(newMovie) {
            console.log(newMovie);
            return $http({
                method: 'post',
                url: '/api/actors',
                data: newMovie
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the Movie!');
                console.error(err);
                return err;
            });
        },
        remove: function(movie) {
            return $http({
                method: 'post',
                url: '/api/delete',
                data: newPost
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        update: function(newPost) {


            return $http({
                method: 'post',
                url: '/api/editparmal',
                data: newPost
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        pagination: function(pagination_attr) {
            console.log(pagination_attr);
                        return $http({
                            method: 'get',
                            url: '/api/pagination_posts',
                            params: pagination_attr
                        }).then(function(res) {
                            // return the new post
                            return res.data;
                        }).catch(function(err) {
                            console.error('Something went wrong adding the post!');
                            console.error(err);
                            return err;
                        });
                    },
        sigledata: function(parmal) {
            console.log(parmal);

            return $http({
                method: 'post',
                url: '/api/moviebyid',
                data: parmal
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        getparamel: function() {
            console.log('bn')
            return $http.get('/api/updatepermalinks').then(function(List) {
                return List.data;
            });
        },
            moviesbyactor: function(newPost) {
                console.log("movie by actor")
            return $http({
                method: 'post',
                url: '/api/Movielist_actor',
                data: newPost
            }).then(function(res) {
                 console.log("movie by actor res")
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        // update_paramel: function(parmal) {
        //                 return $http({
        //                     method: 'post',
        //                     url: '/api/updatepermalinks',
        //                     data: parmal
        //                 }).then(function(res) {
        //                     // return the new post
        //                     return res.data;
        //                 }).catch(function(err) {
        //                     console.error('Something went wrong adding the post!');
        //                     console.error(err);
        //                     return err;
        //                 });
        //             }
    };
});