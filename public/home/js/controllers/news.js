

app.controller('NewsCtrl', function($scope,$rootScope, News, Category) {
     
   var cat =  window.localStorage.getItem("lastrandom");
//    alert(cat);
   // console.log(cat);
    if($rootScope.currentUser.random!==cat){
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href="/logout";
    }else{
    Category.all().then(function(res) {
        $scope.movies = res.data;
        $scope.params = {};
        News.all().then(function(res) {
         //   console.log(res);
            $scope.news = res.data;
            $scope.loadmore = res.loadmore;
            $scope.loads = function() {
               // alert("hello");
                $scope.params.s = "1";
                News.alll($scope.params).then(function(res) {
                    $scope.news = res.data;
                    $scope.loadmore = res.loadmore;
                });
            };
        });
        $scope.detail=function(id){
//            alert("detail");
//            alert(id);
            window.location.href="/news_detail/"+id;
        };
    });
    }
});

app.controller('NewsdetailCtrl', function($scope, News, $rootScope, Paymentstatus, Category) {
//    alert("hello news detail");
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
    });
    var url = window.location.pathname;
    var f_url = url.split('/')[2];
    $scope.movie = {};
    $scope.params = {};
    $scope.params.path = f_url;
    News.sigledata($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
           // console.log(res);
            $scope.new = res.data;
        }
    });
    });

