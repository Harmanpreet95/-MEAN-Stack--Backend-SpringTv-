
var serialsModule = angular.module('fwrk.serials', []);

serialsModule.service('Serials', function($http) {

    return {
        all: function() {
            return $http.get('/api/serials').then(function(postList) {
                return postList.data;
            });
        },
        add: function(newPost) {
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/serials',
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
                url: '/api/serial/delete',
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
                url: '/api/serial/editparmal',
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
        serialsearchdata: function(newPost) {
            return $http({
                method: 'post',
                url: '/api/serialsearchbydata',
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
        singledata: function(parmal) {

            return $http({
                method: 'post',
                url: '/api/serialbyid',
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
         uploadimage: function(image) {
            
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", image);
            console.log(fd);
            return $http({
                method: 'post',
                url: '/api/serial/uploaduserimage',
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