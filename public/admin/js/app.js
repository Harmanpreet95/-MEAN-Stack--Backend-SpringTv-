
var adminApp = angular.module('fwrk.admin', [
	'ui.router',
	'btford.markdown',
	'angular-page-loader',
	'fwrk.videos',
        'fwrk.serials',
        'fwrk.pages',
        'fwrk.teams',
        'fwrk.news',
        'fwrk.orders',
	//'fwrk.pages',
	'fwrk.users',
	'fwrk.categories',
        'fwrk.seasons',
        'fwrk.episodes',
        'fwrk.subcategories',
        'fwrk.plans',
        'fwrk.actors',
        'fwrk.payments',
        'angularTrix'

]);

//var Portfolio = require('./models/portfolio');

adminApp.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');
	
	$stateProvider
	.state('dashboard', {
		url: '/',
		templateUrl: '/admin/templates/admin_index.html',
		controller: 'dashboardCtrl'
	}) 
		.state('allMovies', {
			url: '/allMovies',
			templateUrl: '/admin/templates/allMovies.html',
			// resolve: {
			// 	postList: function(Posts){
			// 		return Posts.all().then(function(data){
			// 			return data;
			// 		});
			// 	}
			// },
			controller: 'AllMoviesCtrl'
		})
                .state('allSerials', {
			url: '/allSerials',
			templateUrl: '/admin/templates/allSerials.html',
			controller: 'allSerialsCtrl'
		})
		.state('addMovie', {
			url: '/addMovie',
			templateUrl: '/admin/templates/addMovie.html',
			controller: 'addMovieCtrl'
                        
		})
                
                .state('addPlan', {
			url: '/addPlan',
			templateUrl: '/admin/templates/addPlan.html',
			controller: 'addPlanCtrl'
                        
		})
                
                .state('addSeason', {
			url: '/addSeason/:id',
			templateUrl: '/admin/templates/addSeason.html',
			controller: 'addSeasonCtrl'
                        
		})
                .state('allPlans', {
			url: '/allPlans',
			templateUrl: '/admin/templates/allPlans.html',
			controller: 'allPlansCtrl'
                        
		})
                .state('addEpisode', {
			url: '/addEpisode/:ids/:name',
			templateUrl: '/admin/templates/addEpisode.html',
			controller: 'addEpisodeCtrl'
                        
		})
                .state('editEpisode', {
			url: '/editEpisode/:paraml',
			templateUrl: '/admin/templates/editEpisode.html',
			controller: 'editEpisodeCtrl'
                        
		})
                .state('addSerial', {
			url: '/addSerial',
			templateUrl: '/admin/templates/addSerial.html',
			controller: 'addSerialCtrl'
                        
		})
                .state('episodeList', {
			url: '/episodeList',
			templateUrl: '/admin/templates/episodeList.html',
			controller: 'episodeListCtrl'
                        
		})
        .state('editPost', {
			url: '/editPost/:paraml',
			templateUrl: '/admin/templates/editPost.html',
			controller: 'EditPostsCtrl'
		})
                .state('editSerial', {
			url: '/editSerial/:paraml',
			templateUrl: '/admin/templates/editSerial.html',
			controller: 'editSerialCtrl'
		})
                .state('editMovie', {
			url: '/editMovie/:paraml',
			templateUrl: '/admin/templates/editMovie.html',
			controller: 'editMovieCtrl'
		})
                
                .state('editPlan', {
			url: '/editPlan/:paraml',
			templateUrl: '/admin/templates/editPlan.html',
			controller: 'editPlanCtrl'
		})

		.state('userList', {
			url: '/userList',
			templateUrl: '/admin/templates/userList.html',
//			resolve: {
//				userList: function(Users){
//					return Users.all().then(function(data){
//						return data;
//					});
//				}
//			},
			controller: 'AllUsersCtrl'
		})

		.state('addUser', {
			url: '/addUser',
			templateUrl: '/admin/templates/addUser.html',
			controller: 'addUserCtrl'   
		})
		.state('editUser', {
			url: '/editUser/:paraml',
			templateUrl: '/admin/templates/editUser.html',
			controller: 'editUserCtrl'
		})

	
		.state('addCategory', {
			url: '/addCategory',
			templateUrl: '/admin/templates/addCategory.html',
			controller: 'addCategoryCtrl'   
		})
                .state('addSubCategory', {
			url: '/addSubCategory',
			templateUrl: '/admin/templates/addSubCategory.html',
			controller: 'addSubCategoryCtrl'   
		})
                .state('editSubCategory', {
			url: '/editSubCategory/:paraml',
			templateUrl: '/admin/templates/editSubCategory.html',
			controller: 'editSubCategoryCtrl'   
		})
		.state('allCategories', {
			url: '/allCategories',
			templateUrl: '/admin/templates/allCategories.html',
			controller: 'CategoryListCtrl'
		})
                .state('allSubcategories', {
			url: '/allSubcategories',
			templateUrl: '/admin/templates/allSubcategories.html',
			controller: 'allSubcategoriesCtrl'
		})
                .state('paymentlist', {
			url: '/paymentlist',
			templateUrl: '/admin/templates/paymentlist.html',
			controller: 'paymentlistCtrl'
		})
                .state('actorsList', {
			url: '/actorsList',
			templateUrl: '/admin/templates/actorsList.html',
			controller: 'actorsListCtrl'
		})
		.state('editCategory', {
			url: '/editCategory/:paraml',
			templateUrl: '/admin/templates/editCategory.html',
			controller: 'editCategoryCtrl'
		})
                .state('staticPage', {
			url: '/staticPage',
			templateUrl: '/admin/templates/staticPage.html',
			controller: 'staticPageCtrl'
		})
                .state('pageslist', {
			url: '/pageslist',
			templateUrl: '/admin/templates/pageslist.html',
			controller: 'pageslistCtrl'
		})
                .state('editPage', {
			url: '/editPage/:paraml',
			templateUrl: '/admin/templates/editPage.html',
			controller: 'editPageCtrl'
		})
                .state('forgotpassword', {
			url: '/forgotpassword',
			templateUrl: '/admin/templates/forgotpassword.html',
			controller: 'forgotpasswordCtrl'
		})
                .state('addActors', {
			url: '/addActors',
			templateUrl: '/admin/templates/addActors.html',
			controller: 'addActorsCtrl'
		})
                .state('addNews', {
			url: '/addNews',
			templateUrl: '/admin/templates/addNews.html',
			controller: 'addNewsCtrl'
                        
		})
                .state('newsList', {
			url: '/newsList',
			templateUrl: '/admin/templates/newsList.html',
			controller: 'AllNewsCtrl'
                        
		})
                .state('editNews', {
			url: '/editNews/:paraml',
			templateUrl: '/admin/templates/editNews.html',
			controller: 'editNewsCtrl'
		})
                .state('addTeam', {
			url: '/addTeam',
			templateUrl: '/admin/templates/addTeam.html',
			controller: 'addTeamCtrl'
                        
		})
                .state('teamList', {
			url: '/teamList',
			templateUrl: '/admin/templates/teamList.html',
			controller: 'AllTeamsCtrl'
                        
		})
                .state('editTeam', {
			url: '/editTeam/:paraml',
			templateUrl: '/admin/templates/editTeam.html',
			controller: 'editTeamCtrl'
		})
		.state('orderList', {
			url: '/orderList',
			templateUrl: '/admin/templates/orderList.html',
			controller: 'AllOrdersCtrl'
                        
		})
                .state('editOrder', {
			url: '/editOrder/:paraml',
			templateUrl: '/admin/templates/editOrder.html',
			controller: 'editOrderCtrl'
		})
	
	
	
});

adminApp.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
  ]);
});
