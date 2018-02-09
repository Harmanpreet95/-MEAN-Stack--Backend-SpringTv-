
var app = angular.module('fwrk.home', [
    'ui.router',
    'fwrk.plans',
    'fwrk.payments',
    'fwrk.orders',
    'fwrk.paymentstatus',
    'fwrk.pages',
    'fwrk.news',
    'fwrk.teams',
    'fwrk.rates',
    'fwrk.users',
    'fwrk.videos',
    'fwrk.actors',
    'fwrk.categories',
    'fwrk.subcategories',
    'fwrk.serials',
    'fwrk.seasons',
    'fwrk.episodes'
])
        .factory('Page', function() { //now this is not working 
            var title = 'default';
            return {
                title: function() {
                    return title;
                },
                setTitle: function(newTitle) {
                    title = newTitle
                }
            };
        })
        .controller('TitleCtrl', function($scope, Page) {
            $scope.Page = Page;
        })

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "/home/templates/index.html",
                controller: 'MainCtrl'
            })
            .state('forgotpassword', {
                url: "/forgotpassword",
                templateUrl: "/home/templates/forgotpassword.html",
                controller: 'ForgotCtrl'
            })
            .state('resetpassword', {
                url: "/resetpassword",
                templateUrl: "/home/templates/resetpassword.html",
                controller: 'ForgotCtrl'
            })

            .state('registerUser', {
                url: "/registerUser",
                templateUrl: "/home/templates/index.html",
                controller: 'UserCtrl'
            })

            .state('loginUser', {
                url: "/loginUser",
                templateUrl: "/home/templates/login.html",
                controller: 'UserCtrl'
            })
            .state('myaccount', {
                url: "/myaccount",
                templateUrl: "/home/templates/myaccount.html",
                controller: 'MyaccountCtrl'
            })
            .state('editprofile', {
                url: "/editprofile",
                templateUrl: "/home/templates/editprofile.html",
                controller: 'EditprofileCtrl'
            })
            .state('changepassword', {
                url: "/changepassword",
                templateUrl: "/home/templates/changepassword.html",
                controller: 'changePasswordCtrl'
            })
            .state('actor', {
                url: "/actor",
                templateUrl: "/home/templates/actor.html",
                controller: 'ActorCtrl'
            })
            .state('actor_detail', {
                url: "/actor_detail/:params",
                templateUrl: "/home/templates/actor_detail.html",
                controller: 'ActordetailCtrl'
            })
            .state('movie', {
                url: "/movie/:id",
                templateUrl: "/home/templates/movie.html",
                controller: 'VideoCatCtrl'
            })
            .state('latest', {
                url: "/latest",
                templateUrl: "/home/templates/latest.html",
                controller: 'LatestVideoCtrl'
            })
            .state('order', {
                url: "/order",
                templateUrl: "/home/templates/order.html",
                controller: 'OrderCtrl'
            })
            .state('tvseries', {
                url: "/tvseries",
                templateUrl: "/home/templates/tvserial.html",
                controller: 'SerialCtrl'
            })
            .state('movie_detail', {
                url: "/movie_detail/*",
                templateUrl: "/home/templates/movie_detail.html",
                controller: 'VideodetailCtrl'
            })
              .state('fullmovie', {
                url: "/fullmovie/*",
                templateUrl: "/home/templates/fullmovie.html",
                controller: 'VideodetailCtrl'
            })
            .state('episode', {
                url: "/episode/:id",
                templateUrl: "/home/templates/episode.html",
                controller: 'EpisodeCtrl'
            })
            .state('episode_detail', {
                url: "/episode_detail/*",
                templateUrl: "/home/templates/episode_detail.html",
                controller: 'EpisodedetailCtrl'
            })
              .state('fullepisode', {
                url: "/fullepisode/*",
                templateUrl: "/home/templates/fullepisode.html",
                controller: 'EpisodedetailCtrl'
            })
            .state('forgetpassword', {
                url: "/forgetpassword",
                templateUrl: "/home/templates/forgetpassword.html",
                controller: 'ForgetCtrl'
            })
             .state('team', {
                url: "/team",
                templateUrl: "/home/templates/team.html",
                controller: 'TeamCtrl'
            })
             .state('news', {
                url: "/news",
                templateUrl: "/home/templates/news.html",
                controller: 'NewsCtrl'
            })
            .state('news_detail', {
                url: "/news_detail/*",
                templateUrl: "/home/templates/news_detail.html",
                controller: 'NewsdetailCtrl'
            })
            .state('privacyandpolicy', {
                url: "/privacyandpolicy",
                templateUrl: "/home/templates/privacyandpolicy.html",
                controller: 'PrivacyCtrl'
            })
            .state('termsandconditions', {
                url: "/termsandconditions",
                templateUrl: "/home/templates/termsandconditions.html",
                controller: 'TermCtrl'
            })
            .state('aboutus', {
                url: "/aboutus",
                templateUrl: "/home/templates/aboutus.html",
                controller: 'AboutCtrl'
            })
            .state('selectplan', {
                url: "/selectplan",
                templateUrl: "/home/templates/selectplan.html",
                controller: 'PlanCtrl'
            })
            .state('payment', {
                url: "/payment/*",
                templateUrl: "/home/templates/payment.html",
                controller: 'PaymentCtrl'
            })
            .state('payment_1', {
                url: "/payment_1/*",
                templateUrl: "/home/templates/payment_1.html",
                controller: 'PaymentCtrl'
            })
            .state('payment_bitcoin', {
                url: "/payment_bitcoin/*",
                templateUrl: "/home/templates/payment_bitcoin.html",
                controller: 'paystatus_bitcoinCtrl'
            })
             .state('paystatus', {
                url: "/paystatus",
                templateUrl: "/home/templates/paystatus.html",
                controller: 'PayStatusCtrl'
            })
             .state('paystatus_card', {
                url: "/paystatus_card",
                templateUrl: "/home/templates/paystatus_card.html",
                controller: 'paystatus_cardCtrl'
            })
             .state('paystatus_bitcoin', {
                url: "/paystatus_bitcoin",
                templateUrl: "/home/templates/paystatus_bitcoin.html",
                controller: 'paystatus_bitcoinCtrl'
            })
             .state('billstatus', {
                url: "/billstatus",
                templateUrl: "/home/templates/billstatus.html",
                controller: 'BillingStatusCtrl'
            })
             .state('billstatus_card', {
                url: "/billstatus_card",
                templateUrl: "/home/templates/billstatus_card.html",
                controller: 'billstatus_cardCtrl'
            })
             .state('billstatus_bitcoin', {
                url: "/billstatus_bitcoin",
                templateUrl: "/home/templates/billstatus_bitcoin.html",
                controller: 'billstatus_bitcoinCtrl'
            })
            .state('billing', {
                url: "/billing/*",
                templateUrl: "/home/templates/billing.html",
                controller: 'BillingCtrl'
            })
            .state('myorder', {
                url: "/myorder",
                templateUrl: "/home/templates/cart.html",
                controller: 'MyorderCtrl'
            })
            .state('contactus', {
                url: "/contactus",
                templateUrl: "/home/templates/contactus.html",
                controller: 'ContactusCtrl'
            })
             .state('cart', {
                url: "/cart",
                templateUrl: "/home/templates/cart.html",
                controller: 'MyorderCtrl'
            });

//  $locationProvider.html5Mode({
//  enabled: true,
//  requireBase: false
//}); 

    $urlRouterProvider.otherwise("/");
});

              