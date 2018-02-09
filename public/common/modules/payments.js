
var paymentsModule = angular.module('fwrk.payments', []);

paymentsModule.service('Payments', function($http) {

    return {
        all: function() {
            return $http.get('/api/payment/paymentlist').then(function(postList) {
                return postList.data;
            });
        },
        add: function(newPost) {
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/payment/paymentgateway',
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
        check: function(newPost) {
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/payment/paymentgateway',
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
         plandata: function(newPost) {
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/payment/plandata',
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
         updatestatus: function(newPost) {
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/payment/update',
                data: newPost
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        }
    };
});