
app.controller('PlanCtrl', function($scope, $rootScope, Plans, Paymentstatus, Category) {
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
    $scope.params = {};
    $scope.params.userid = $rootScope.currentUser._id;
    Paymentstatus.check($scope.params).then(function(res) {
        if (res.pay[0].status === 1) {
            alert("You are already a subscriber!! Enjoy the subscription");
            window.history.back();
        } else {
            Plans.all().then(function(res) {
            //    console.log(res);
                $scope.plans = res.data;
                $scope.d= new Date();
            });
        }
    });
    $scope.go=function(){
        window.location.href="/selectplan"
    }
    $scope.selected = function(id) {
        $scope.params = {};
        $scope.params.id = id;
        $(".valu_pln").removeClass("vlu_chn");
       $("#plan" + id).addClass("vlu_chn");
        Plans.singledata($scope.params).then(function(res) {
            if (res === null) {
                window.location.href = '/404';
            } else {
                $scope.selectedplan = res.data;
                $rootScope.days = res.data.days;
            }
        });
    };
});
app.controller('PaymentCtrl', function($scope,$rootScope, Plans, Category) {
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
    $scope.params = {};
    $scope.params.id = f_url;
    Plans.singledata($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
            $scope.splan = res.data;
        }
    });
});
app.controller('PayStatusCtrl', function($scope, $rootScope, Paymentstatus, Payments, Category) {
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
    var search = window.location.search.split('&');
    var price = search[0].split('=')[1];
    var transactionid = search[5].split('=')[1];
    var planname = search[3].split('=')[1];
    var status = search[4].split('=')[1];
    var planid = search[2].split('=')[1];
    $scope.params = {};
    $scope.params.userid = $rootScope.currentUser._id;
    $scope.params.transactionid = transactionid;
    $scope.params.price = price;
    $scope.params.planname = planname;
    $scope.params.planid = planid;
    $scope.params.status = status;
    $scope.params.paymentmethod = "PayPal";
    Payments.check($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
            $scope.pay = res.data;
            $scope.status = res.status.status;
        }
    });

});
 
 
app.controller('paystatus_cardCtrl', function($scope, $rootScope, Paymentstatus, Payments, Category) {
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
    var search = window.location.search.split('&');
    var price = search[2].split('=')[1];
    var transactionid = search[0].split('=')[1];
    var planname = search[4].split('=')[1];
    var status = search[1].split('=')[1];
    var planid = search[3].split('=')[1];
//    console.log(price);
//    console.log(transactionid);
//    console.log(planname);
//    console.log(status);
//    console.log(planid);
    
    $scope.params = {};
    $scope.params.userid = $rootScope.currentUser._id;
    $scope.params.transactionid = transactionid;
    $scope.params.price = price;
    $scope.params.planname = planname;
    $scope.params.planid = planid;
    $scope.params.status = status;
    $scope.params.paymentmethod = "Credit/Debit Card";
    
  //  console.log($scope.params);
    //return false;
    
    Payments.check($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
            $scope.pay = res.data;
            $scope.status = res.status.status;
        }
    });

});

app.controller('paystatus_bitcoinCtrl', function($scope, $rootScope, Paymentstatus, Payments, Category) {
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
    var search = window.location.search.split('&');
    var price = search[2].split('=')[1];
    var transactionid = search[0].split('=')[1];
    var planname = window.location.search.split('&')[3].split('=')[1].split('/')[1];
    var status = search[1].split('=')[1];
    var planid = window.location.search.split('&')[3].split('=')[1].split('/')[0];
//    console.log(price);
//    console.log(transactionid);
//    console.log(planname);
//    console.log(status);
//    console.log(planid);
    
    $scope.params = {};
    $scope.params.userid = $rootScope.currentUser._id;
    $scope.params.transactionid = transactionid;
    $scope.params.price = price;
    $scope.params.planname = planname;
    $scope.params.planid = planid;
    $scope.params.status = status;
    $scope.params.paymentmethod = "Bitcoin";
    
   // console.log($scope.params);
    //return false;
    
    Payments.check($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
            $scope.pay = res.data;
            $scope.status = res.status.status;
        }
    });

});