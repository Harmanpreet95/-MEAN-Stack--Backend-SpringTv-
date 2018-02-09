
var newsModule = angular.module('fwrk.news', []);

newsModule.service('News', function($http) {

    return {
        all: function() {
            return $http.get('/api/news').then(function(postList) {
                return postList.data;
            });
        },
        alll:  function(act) {
            console.log(act);
            return $http({
                method: 'post',
                url: '/api/news',
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
        add: function(newMovie) {
            console.log(newMovie);
            return $http({
                method: 'post',
                url: '/api/addnews',
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
        remove: function(usr) {
            console.log(usr);
            return $http({
                method: 'post',
                url: '/api/deletenews',
                data: usr
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
                url: '/api/editnewsID',
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
                url: '/api/adminfetchnewsdata',
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
        singledata: function(id) {
            console.log(id);
            return $http({
                method: 'post',
                url: '/api/adminfetchnewsdata',
                data: id
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        uploadimage: function(image) {
            
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", image);
            console.log(fd);
            return $http({
                method: 'post',
                url: '/api/uploadnewsimage',
                data: fd,
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
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