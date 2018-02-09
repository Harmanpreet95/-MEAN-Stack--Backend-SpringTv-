
var paymentstatusModule = angular.module('fwrk.paymentstatus', []);

paymentstatusModule.service('Paymentstatus', function($http) {

    return {
//        all: function() {
//            return $http.get('/api/payment/paymentlist').then(function(postList) {
//                return postList.data;
//            });
//        },
//        add: function(newPost) {
//            console.log(newPost);
//            return $http({
//                method: 'post',
//                url: '/api/payment/paymentgateway',
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
         check: function(newPost) {
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/paymentstatus',
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