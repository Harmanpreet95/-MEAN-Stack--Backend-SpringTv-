
app.controller('AboutCtrl', function($scope,$rootScope, Pages,Category, $sce) {
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
    $scope.params={};
    $scope.params.type="About us";
    Pages.all($scope.params).then(function(res) {
        
       // console.log(res);
        $scope.aboutus = res.data;
//          console.log($scope.aboutus);
//          
//          console.log($scope.aboutus[0].description);
    $scope.myHtmlVar= $sce.trustAsHtml($scope.aboutus[0].description);
    });
    
    });
    
 app.controller('PrivacyCtrl', function($scope,$rootScope, Pages,Category, $sce) {
      var cat =  window.localStorage.getItem("lastrandom");
//    alert(cat);
  //  console.log(cat);
    if($rootScope.currentUser.random!==cat){
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href="/logout";
    }
    Category.all().then(function(res) {
        $scope.movies = res.data;
    });
    $scope.params={};
    $scope.params.type="Privacy Policy";
    Pages.all($scope.params).then(function(res) {
        
      //  console.log(res);
        $scope.aboutus = res.data;
        //  console.log($scope.aboutus);
        $scope.myHtmlVar= $sce.trustAsHtml($scope.aboutus[0].description);
    });
});
    app.controller('TermCtrl', function($scope,$rootScope, Pages,Category, $sce) {
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
    $scope.params={};
    $scope.params.type="Terms And Conditions";
    Pages.all($scope.params).then(function(res) {
        
      //  console.log(res);
        $scope.aboutus = res.data;
        //  console.log($scope.aboutus);
        $scope.myHtmlVar= $sce.trustAsHtml($scope.aboutus[0].description);
    });
});

