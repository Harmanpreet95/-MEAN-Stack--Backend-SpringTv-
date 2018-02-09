
var videosModule = angular.module('fwrk.videos', []);

videosModule.service('Videos', function($http) {

    return {
        all: function() {
            return $http.get('/api/videos').then(function(postList) {
                return postList.data;
            });
        },
        sort: function(newMovie) {
            console.log(newMovie);
            return $http({
                method: 'post',
                url: '/api/latestmovies',
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
        latestsearchdata: function(newMovie) {
            console.log(newMovie);
            return $http({
                method: 'post',
                url: '/api/latestsearchbydata',
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
        add: function(newPost) {
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/addvideos',
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
        remove: function(newPost) {
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
                url: '/api/editmovie',
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
            console.log("here i am Module");
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
        singledata: function(parmal) {

            return $http({
                method: 'post',
                url: '/api/videos/moviebyid',
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
        searchdata: function(newPost) {
            return $http({
                method: 'post',
                url: '/api/searchbydata',
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
        moviesearchdata: function(newPost) {
            return $http({
                method: 'post',
                url: '/api/moviesearchbydata',
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
        getparamel: function() {
            console.log('bn')
            return $http.get('/api/updatepermalinks').then(function(List) {
                return List.data;
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