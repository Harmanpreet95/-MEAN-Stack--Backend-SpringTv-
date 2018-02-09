
var ordersModule = angular.module('fwrk.orders', []);

ordersModule.service('Orders', function($http) {

    return {
        all: function() {
            return $http.get('/api/orderslist').then(function(postList) {
                return postList.data;
            });
        },
        add: function(newPost) {
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/orderpaymentgateway',
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
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/deleteorder',
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
        singledata: function(newPost) {
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/fetchorderdetail',
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
        mine: function(newPost) {
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/fetchmyorder',
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
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/updateorder',
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
        ship: function(newPost) {
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/updateordershipping',
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
//         plandata: function(newPost) {
//            console.log(newPost);
//            return $http({
//                method: 'post',
//                url: '/api/payment/plandata',
//                data: newPost
//            }).then(function(res) {
//                // return the new post
//                return res.data;
//            }).catch(function(err) {
//                console.error('Something went wrong adding the post!');
//                console.error(err);
//                return err;
//            });
//        },
//         updatestatus: function(newPost) {
//            console.log(newPost);
//            return $http({
//                method: 'post',
//                url: '/api/payment/update',
//                data: newPost
//            }).then(function(res) {
//                // return the new post
//                return res.data;
//            }).catch(function(err) {
//                console.error('Something went wrong adding the post!');
//                console.error(err);
//                return err;
//            });
//        }
    };
});