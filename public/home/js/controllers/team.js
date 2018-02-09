
app.controller('TeamCtrl', function($scope,$rootScope, Teams, Category) {
     var cat =  window.localStorage.getItem("lastrandom");
//    alert(cat);
   // console.log(cat);
    if($rootScope.currentUser.random!==cat){
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href="/logout";
    }
    Category.all().then(function(res) {
        $scope.movies = res.data;
        $scope.params = {};
        Teams.all().then(function(res) {
           // console.log(res);
            $scope.team = res.data;
            $scope.loadmore = res.loadmore;
            $scope.loads = function() {
                $scope.params.s = "1";
                Teams.all($scope.params).then(function(res) {
                    $scope.team = res.data;
                    $scope.loadmore = res.loadmore;
                });
            };
        });
    });
});

//ContactusCtrl
app.controller('ContactusCtrl', function($scope,$rootScope, Teams, Category) {
    Category.all().then(function(res) {
        $scope.movies = res.data;
    });
});