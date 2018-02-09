
app.controller('VideoCtrl', function($scope, $rootScope,Category) {
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
});
app.controller('ActorCtrl', function($scope, $rootScope,Actors, Category) {
     var cat =  window.localStorage.getItem("lastrandom");
//    alert(cat);
   // console.log(cat);
    if($rootScope.currentUser.random!==cat){
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href="/logout";
    }
    Actors.all().then(function(res) {
        $scope.actors = res.data;
    });
    
    $scope.actorsearch = function() {
        $scope.actorsearchdata = {};
        $scope.actorsearchdata.actorsearch = this.actor.actorsearch;
      //  console.log($scope.actorsearchdata);
        Actors.actorsearchdata($scope.actorsearchdata).then(function(res) {
            if (res) {
                $scope.data = res.data;
             //   console.log("$scope.data");
             //   console.log($scope.data);
             //   console.log($scope.data.actor);
            } else {
                // console.log("error");
            }

        });
    }
    
    Category.all().then(function(res) {
        $scope.movies = res.data;
        $scope.params = {};
        Actors.all($scope.params).then(function(res) {
            $scope.actors = res.data;
            $scope.loadmore = res.loadmore;
            $scope.loads = function() {
                $scope.params.s = "1";
                Actors.all($scope.params).then(function(res) {
                    $scope.actors = res.data;
                    $scope.loadmore = res.loadmore;
                });
            };
        });
    });
});
app.controller('OrderCtrl', function($scope,$rootScope,Serials, Videos,Episodes,Seasons, Category) {
     var cat =  window.localStorage.getItem("lastrandom");
//    alert(cat);
   // console.log(cat);
    if($rootScope.currentUser.random!==cat){
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href="/logout";
    }
    
    $scope.search = function() {
        $scope.searchdata = {};
        $scope.searchdata.search = this.video.search;
       // console.log($scope.searchdata);
        Videos.searchdata($scope.searchdata).then(function(res) {
            if (res) {
                $scope.data = res.data;
//                console.log("$scope.data");
//                console.log($scope.data);
//                console.log($scope.data.video);
//                console.log($scope.data.serials);
            } else {
             //    console.log("error");
            }

        });
    }
    
    
    Category.all().then(function(res) {
        $scope.movies = res.data;
        $scope.params = {};
        Videos.sort($scope.params).then(function(res) {
          //  console.log(res);
            $scope.movie = res.data;
            $scope.loadmore = res.loadmore;
            Serials.all().then(function(res) {
            $scope.serials = res.data;
              //  console.log(res);
        for(var i=0;i<res.data.length;i++){
          //  console.log($scope.serials[i]);
            $scope.paramss={};
            $scope.paramss.id = $scope.serials[i]._id;
            Seasons.allSeasons($scope.paramss).then(function(res) {
//          Episodes.sort($scope.params).then(function(res) {  
              $scope.season = res.allseason;
            //  console.log(res);
          });};
            $scope.loadmoree = res.loadmore;
        $scope.viewseason = function(score) {
//        alert("view");
      //  console.log(score);
        $scope.paramssss = {};
        $scope.paramssss.id = score._id;
    Seasons.sigledata($scope.paramssss).then(function(res) {
        $scope.price=res.data.price;
       // console.log(res);
    });
            };
            $scope.loads = function() {
                $scope.params.s = "1";
                Videos.sort($scope.params).then(function(res) {
                    $scope.movie = res.data;
                    $scope.loadmore = res.loadmore;
                    Serials.all().then(function(res) {
//            $scope.serials = res.data;
        for(var i=0;i<=res.data.length;i++){
            $scope.params.id = res.data[i]._id;
            Seasons.allSeasons($scope.params).then(function(res) {
//          Episodes.sort($scope.params).then(function(res) {  
              $scope.season = res.allseason;
            //  console.log(res);
          });};
            $scope.loadmoree = res.loadmore;
                });
            });
            };
            });
        });
        $scope.buy=function(id){
//            alert(id);
            window.location.href="/billing/"+id;
            
        };
    });
});
app.controller('BillingCtrl', function($scope,$rootScope, Videos,Seasons, Category) {
     var cat =  window.localStorage.getItem("lastrandom");
//    alert(cat);
 //   console.log(cat);
    if($rootScope.currentUser.random!==cat){
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href="/logout";
    }
    Category.all().then(function(res) {
        $scope.movies = res.data;
         });
          var url = window.location.pathname;
        var s_url = url.split('/')[2];
        $scope.params = {};
        $scope.params.id=s_url;
        Videos.sigledata($scope.params).then(function(res) {
           if(res.data){
           
            $scope.ordered = res.data;
        }else{
//            alert("episode");
             Seasons.sigledata($scope.params).then(function(res) {
              $scope.ordered = res.data;   
             // console.log(res.data);
                 
             });
        }
        
        
//            console.log(this.billing.quantity);
//            console.log("billllling");
//            $scope.total=function(){
//                
//                alert("quantity");
//                $scope.totalprice=quantity*$scope.ordered.price;
//                console.log($scope.totalprice);
           // };
//            $scope.totalprice=($scope.ordered.price)*(this.billing.quantity);
//            console.log($scope.totalprice);
           
        });

   
});
app.controller('BillingStatusCtrl', function($scope, $rootScope, Orders,Videos,Seasons, Category) {
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
            
            var itemname='';
    var search = window.location.search.split('&');
    var price = search[0].split('=')[1];
    var transactionid = search[5].split('=')[1];
    var itemnam = search[3].split('=')[1].split("%20");
   // console.log(itemnam.length);
    for(var i =0;i<itemnam.length;i++){
        itemname=itemname + ' ' +itemnam[i];
    }
  //  console.log(itemname);
//    var status = search[4].split('=')[1];
    var itemid = search[2].split('=')[1].split('%2C')[0];
    var paymentmethod=search[2].split('=')[1].split('%2C')[1];
    $scope.paramss = {};
        $scope.paramss.id=itemid;
        Videos.sigledata($scope.paramss).then(function(res) {
            if(res.data){
          //  console.log(res);
            var quantity=price/(res.data.price);
    $scope.params.userid = $rootScope.currentUser._id;
    $scope.params.transactionid = transactionid;
    $scope.params.movie_price = price;
    $scope.params.movie_name = itemname;
    $scope.params.movie_id = itemid;
    $scope.params.quantity = quantity;
    $scope.params.status = "Pending";
    $scope.params.paymentmethod = paymentmethod;
    Orders.add($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
          //  console.log(res);
            $scope.pay = res.data;
            $scope.ship=function(){
//            alert("shippppp");
         //   console.log(this.billing);
            $scope.params.id=res.data._id;
            $scope.params.b_name = this.billing.b_name;
    $scope.params.b_phone = this.billing.b_phone;
    $scope.params.b_address = this.billing.b_address;
    $scope.params.b_city = this.billing.b_city;
    $scope.params.b_state = this.billing.b_state;
    $scope.params.b_country = this.billing.b_country;
    $scope.params.b_zip = this.billing.b_zip;
            $scope.params.s_name = this.billing.s_name;
    $scope.params.s_phone = this.billing.s_phone;
    $scope.params.s_address = this.billing.s_address;
    $scope.params.s_city = this.billing.s_city;
    $scope.params.s_state = this.billing.s_state;
    $scope.params.s_country = this.billing.s_country;
    $scope.params.s_zip = this.billing.s_zip;
            Orders.ship($scope.params).then(function(res) {
            //  console.log(res.data);  
              window.location.href="/myorder";
            });
            
        };
   
        }
    });
        }else{
          Seasons.sigledata($scope.paramss).then(function(res) { 
               var quantity=price/(res.data.price);
    $scope.params.userid = $rootScope.currentUser._id;
    $scope.params.transactionid = transactionid;
    $scope.params.movie_price = price;
    $scope.params.movie_name = itemname;
    $scope.params.movie_id = itemid;
    $scope.params.quantity = quantity;
    $scope.params.status = "Pending";
    $scope.params.paymentmethod = paymentmethod; 
    Orders.add($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
           // console.log(res);
            $scope.pay = res.data;
            
        }
          
          
//    $scope.params.userid = $rootScope.currentUser._id;
//    $scope.params.transactionid = transactionid;
//    $scope.params.movie_price = price;
//    $scope.params.movie_name = itemname;
//    $scope.params.movie_id = itemid;
//    $scope.params.quantity = quantity;
////    $scope.params.status = "Pending";
//    $scope.params.paymentmethod = paymentmethod;
    
        $scope.ship=function(){
//            alert("shippppp");
           // console.log(this.billing);
            $scope.params.id=res.data._id;
            $scope.params.b_name = this.billing.b_name;
    $scope.params.b_phone = this.billing.b_phone;
    $scope.params.b_address = this.billing.b_address;
    $scope.params.b_city = this.billing.b_city;
    $scope.params.b_state = this.billing.b_state;
    $scope.params.b_country = this.billing.b_country;
    $scope.params.b_zip = this.billing.b_zip;
            $scope.params.s_name = this.billing.s_name;
    $scope.params.s_phone = this.billing.s_phone;
    $scope.params.s_address = this.billing.s_address;
    $scope.params.s_city = this.billing.s_city;
    $scope.params.s_state = this.billing.s_state;
    $scope.params.s_country = this.billing.s_country;
    $scope.params.s_zip = this.billing.s_zip;
            Orders.ship($scope.params).then(function(res) {
           //   console.log(res.data);  
               window.location.href="/myorder";
            });
            
        };
    });
        });
    };
});
        
        });
        
        ////////////////// billstatus card
        
        app.controller('billstatus_cardCtrl', function($scope, $rootScope, Orders,Videos,Seasons, Category) {
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
       $scope.params = {};         
            
            var itemname='';
    var search = window.location.search.split('&');
    var price = search[2].split('=')[1];
    var transactionid = search[0].split('=')[1];
    var itemnam = search[4].split('=')[1].split("%20");
 //   console.log(itemnam.length);
    for(var i =0;i<itemnam.length;i++){
        itemname=itemname + ' ' +itemnam[i];
    }
  //  console.log(itemname);
//    var status = search[4].split('=')[1];
    var itemid = window.location.search.split('&')[3].split(',')[0].split('=')[1];
    var paymentmethod=window.location.search.split('&')[3].split(',')[1];
    $scope.paramss = {};
        $scope.paramss.id=itemid;
        Videos.sigledata($scope.paramss).then(function(res) {
            if(res.data){
           // console.log(res);
            var quantity=price/(res.data.price);
    $scope.params.userid = $rootScope.currentUser._id;
    $scope.params.transactionid = transactionid;
    $scope.params.movie_price = price;
    $scope.params.movie_name = itemname;
    $scope.params.movie_id = itemid;
    $scope.params.quantity = quantity;
    $scope.params.status = "Pending";
    $scope.params.paymentmethod = paymentmethod;
    Orders.add($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
          //  console.log(res);
            $scope.pay = res.data;
            $scope.ship=function(){
//            alert("shippppp");
          //  console.log(this.billing);
            $scope.params.id=res.data._id;
            $scope.params.b_name = this.billing.b_name;
    $scope.params.b_phone = this.billing.b_phone;
    $scope.params.b_address = this.billing.b_address;
    $scope.params.b_city = this.billing.b_city;
    $scope.params.b_state = this.billing.b_state;
    $scope.params.b_country = this.billing.b_country;
    $scope.params.b_zip = this.billing.b_zip;
            $scope.params.s_name = this.billing.s_name;
    $scope.params.s_phone = this.billing.s_phone;
    $scope.params.s_address = this.billing.s_address;
    $scope.params.s_city = this.billing.s_city;
    $scope.params.s_state = this.billing.s_state;
    $scope.params.s_country = this.billing.s_country;
    $scope.params.s_zip = this.billing.s_zip;
            Orders.ship($scope.params).then(function(res) {
           //   console.log(res.data);  
              window.location.href="/myorder";
            });
            
        };
   
        }
    });
        }else{
          Seasons.sigledata($scope.paramss).then(function(res) { 
               var quantity=price/(res.data.price);
    $scope.params.userid = $rootScope.currentUser._id;
    $scope.params.transactionid = transactionid;
    $scope.params.movie_price = price;
    $scope.params.movie_name = itemname;
    $scope.params.movie_id = itemid;
    $scope.params.quantity = quantity;
    $scope.params.status = "Pending";
    $scope.params.paymentmethod = paymentmethod; 
    Orders.add($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
          //  console.log(res);
            $scope.pay = res.data;
            
        }
          
          
//    $scope.params.userid = $rootScope.currentUser._id;
//    $scope.params.transactionid = transactionid;
//    $scope.params.movie_price = price;
//    $scope.params.movie_name = itemname;
//    $scope.params.movie_id = itemid;
//    $scope.params.quantity = quantity;
////    $scope.params.status = "Pending";
//    $scope.params.paymentmethod = paymentmethod;
    
        $scope.ship=function(){
//            alert("shippppp");
         //   console.log(this.billing);
            $scope.params.id=res.data._id;
            $scope.params.b_name = this.billing.b_name;
    $scope.params.b_phone = this.billing.b_phone;
    $scope.params.b_address = this.billing.b_address;
    $scope.params.b_city = this.billing.b_city;
    $scope.params.b_state = this.billing.b_state;
    $scope.params.b_country = this.billing.b_country;
    $scope.params.b_zip = this.billing.b_zip;
            $scope.params.s_name = this.billing.s_name;
    $scope.params.s_phone = this.billing.s_phone;
    $scope.params.s_address = this.billing.s_address;
    $scope.params.s_city = this.billing.s_city;
    $scope.params.s_state = this.billing.s_state;
    $scope.params.s_country = this.billing.s_country;
    $scope.params.s_zip = this.billing.s_zip;
            Orders.ship($scope.params).then(function(res) {
           //   console.log(res.data);  
               window.location.href="/myorder";
            });
            
        };
    });
        });
    };
});
        
        });
        
        /////////////////// billstatus card
        
        ////////////////// billstatus bitcoin
        
        app.controller('billstatus_bitcoinCtrl', function($scope, $rootScope, Orders,Videos,Seasons, Category) {
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
            
            var itemname='';
    var search = window.location.search.split('&');
    var price = search[2].split('=')[1];
    var transactionid = search[0].split('=')[1];
    var itemnam = window.location.search.split('&')[3].split('=')[1].split('/')[1].split("%20");
  //  console.log(itemnam.length);
    for(var i =0;i<itemnam.length;i++){
        itemname=itemname + ' ' +itemnam[i];
    }
  //  console.log(itemname);
//    var status = search[4].split('=')[1];
    var itemid = window.location.search.split('&')[3].split(',')[0].split('=')[1];
    var paymentmethod=window.location.search.split('&')[3].split(',')[1].split('/')[0];
    $scope.paramss = {};
        $scope.paramss.id=itemid;
        Videos.sigledata($scope.paramss).then(function(res) {
            if(res.data){
        //    console.log(res);
            var quantity=price/(res.data.price);
    $scope.params.userid = $rootScope.currentUser._id;
    $scope.params.transactionid = transactionid;
    $scope.params.movie_price = price;
    $scope.params.movie_name = itemname;
    $scope.params.movie_id = itemid;
    $scope.params.quantity = quantity;
    $scope.params.status = "Pending";
    $scope.params.paymentmethod = paymentmethod;
    Orders.add($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
          //  console.log(res);
            $scope.pay = res.data;
            $scope.ship=function(){
//            alert("shippppp");
          //  console.log(this.billing);
            $scope.params.id=res.data._id;
            $scope.params.b_name = this.billing.b_name;
    $scope.params.b_phone = this.billing.b_phone;
    $scope.params.b_address = this.billing.b_address;
    $scope.params.b_city = this.billing.b_city;
    $scope.params.b_state = this.billing.b_state;
    $scope.params.b_country = this.billing.b_country;
    $scope.params.b_zip = this.billing.b_zip;
            $scope.params.s_name = this.billing.s_name;
    $scope.params.s_phone = this.billing.s_phone;
    $scope.params.s_address = this.billing.s_address;
    $scope.params.s_city = this.billing.s_city;
    $scope.params.s_state = this.billing.s_state;
    $scope.params.s_country = this.billing.s_country;
    $scope.params.s_zip = this.billing.s_zip;
            Orders.ship($scope.params).then(function(res) {
           //   console.log(res.data);  
              window.location.href="/myorder";
            });
            
        };
   
        }
    });
        }else{
          Seasons.sigledata($scope.paramss).then(function(res) { 
               var quantity=price/(res.data.price);
    $scope.params.userid = $rootScope.currentUser._id;
    $scope.params.transactionid = transactionid;
    $scope.params.movie_price = price;
    $scope.params.movie_name = itemname;
    $scope.params.movie_id = itemid;
    $scope.params.quantity = quantity;
    $scope.params.status = "Pending";
    $scope.params.paymentmethod = paymentmethod; 
    Orders.add($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
         //   console.log(res);
            $scope.pay = res.data;
            
        }
          
          
//    $scope.params.userid = $rootScope.currentUser._id;
//    $scope.params.transactionid = transactionid;
//    $scope.params.movie_price = price;
//    $scope.params.movie_name = itemname;
//    $scope.params.movie_id = itemid;
//    $scope.params.quantity = quantity;
////    $scope.params.status = "Pending";
//    $scope.params.paymentmethod = paymentmethod;
    
        $scope.ship=function(){
//            alert("shippppp");
        //    console.log(this.billing);
            $scope.params.id=res.data._id;
            $scope.params.b_name = this.billing.b_name;
    $scope.params.b_phone = this.billing.b_phone;
    $scope.params.b_address = this.billing.b_address;
    $scope.params.b_city = this.billing.b_city;
    $scope.params.b_state = this.billing.b_state;
    $scope.params.b_country = this.billing.b_country;
    $scope.params.b_zip = this.billing.b_zip;
            $scope.params.s_name = this.billing.s_name;
    $scope.params.s_phone = this.billing.s_phone;
    $scope.params.s_address = this.billing.s_address;
    $scope.params.s_city = this.billing.s_city;
    $scope.params.s_state = this.billing.s_state;
    $scope.params.s_country = this.billing.s_country;
    $scope.params.s_zip = this.billing.s_zip;
            Orders.ship($scope.params).then(function(res) {
            //  console.log(res.data);  
               window.location.href="/myorder";
            });
            
        };
    });
        });
    };
});
        
        });
        
        /////////////////// billstatus bitcoin
        
app.controller('MyorderCtrl', function($scope, Orders,$rootScope,Videos,Episodes, Category) {
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
        $scope.image=[];
        $scope.paramss= {};
        $scope.params= {}; 
        $scope.params.userid=$rootScope.currentUser._id;
        Orders.mine($scope.params).then(function(res) {
//            console.log(res);
            $scope.my_order = res.data;
            for(var i=0;i<res.data.length;i++){
             $scope.paramss.id=res.data[i].movie_id;
             Videos.sigledata($scope.paramss).then(function(res) {
                 if(res.data){
                     $scope.image.push(res.data.thumbnail);
                 }else{
                   Episodes.sigledata($scope.paramss).then(function(res) { 
                   $scope.image.push(res.data.thumbnail);
                   });  
                 }
             });
          //   console.log($scope.image);
            }
                
        });
    });

app.controller('VideoCatCtrl', function($scope, $rootScope, Rates, Category, Subcategory ,Videos) {
     var cat =  window.localStorage.getItem("lastrandom");
     var search= [];
//    alert(cat);
  //  console.log(cat);
    if($rootScope.currentUser.random!==cat){
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href="/logout";
    }
    var userid = $rootScope.currentUser._id;
    Category.all().then(function(res) {
        var url = window.location.pathname;
        var s_url = url.split('/')[2];
        $scope.movies = res.data;
        $scope.sssss = [];
        $scope.cate = {};
        $scope.cate.cat_id = s_url;
        Subcategory.alls($scope.cate).then(function(res) {
            if (res.data.length > 0) {
                $scope.subcat = res.data;
                $scope.subcatdata = 1;
            } else {
                $scope.subcatdata = 0;
            }
          //  console.log($scope.subcat);
            
            if ($scope.subcatdata === 1)
            {
                $scope.viewsubcat = function(_id) {
                    $scope.params = {};
                    $(".subcatclass").removeClass("active_lst");

                    $("#subcat" + _id).addClass("active_lst");

                    $scope.params.subcatid = _id;
                    $scope.params.catid = s_url;
                    Subcategory.sigledata($scope.params).then(function(res) {
                        if (res === null) {
                            window.location.href = '/404';
                        } else {
                            for (var j = 0; j < res.data.length; j++) {
                                $scope.rar = {};
                                $scope.rar.userid = $rootScope.currentUser._id;
                                $scope.rar.movieid = res.data[j]._id;
                                Rates.sigledata($scope.rar).then(function(res) {
                                    if (res.data.length > 0) {
                                        if (!res.data[0].star) {
                                            $scope.rat = {};
                                            $scope.rat.userid = res.data[0].userid;
                                            $scope.rat.movieid = res.data[0].movieid;
                                            $scope.rat.star = 0;
                                            Rates.all($scope.rat).then(function(res) {
                                                $scope.sssss.push(res.data.star);
                                            });
                                        } else
                                        {
                                            $scope.sssss.push(res.data[0].star);
                                        }
                                    } else
                                    {
                                        $scope.rati = {};
                                        $scope.rati.userid = $rootScope.currentUser._id;
                                        $scope.rati.movieid = res.req;
                                        $scope.rati.star = 0;
                                        Rates.all($scope.rati).then(function(res) {
                                            $scope.sssss.push(res.data.star);
                                        });
                                    }
                                });
                            }
                            $scope.movie = res.data;
                            search = $scope.movie;

                            $scope.loadmore = res.loadmore;
                        }
                    });
                    $scope.rate = function(movieid, star) {
                        alert("You rated this movie as" + star + " " +"star");
                        $scope.review = {};
                        $scope.review.userid = userid;
                        $scope.review.movieid = movieid;
                        $scope.review.star = star;
                        Subcategory.sigledata($scope.params).then(function(res) {
                            if (res === null) {
                                window.location.href = '/404';
                            } else {
                                for (var j = 0; j < res.data.length; j++) {
                                    if (res.data[j]._id === movieid)
                                    {
                                        var i = j;
                                    }
                                }
                                Rates.all($scope.review).then(function(res) {
                                    $scope.sssss[i] = res.data.star;
                                });
                            }
                        });
                    };
                };
                
                
                $scope.load = function() {
                    $scope.params.s = "1";
                    Subcategory.sigledata($scope.params).then(function(res) {

                        if (res.data === null) {
                            window.location.href = '/404';
                        } else {
                            for (var j = 0; j < res.data.length; j++) {
                                $scope.rar = {};
                                $scope.rar.userid = $rootScope.currentUser._id;
                                $scope.rar.movieid = res.data[j]._id;
                                Rates.sigledata($scope.rar).then(function(res) {
                                    if (res.data.length > 0) {
                                        if (!res.data[0].star) {
                                            $scope.rat = {};
                                            $scope.rat.userid = res.data[0].userid;
                                            $scope.rat.movieid = res.data[0].movieid;
                                            $scope.rat.star = 0;
                                            Rates.all($scope.rat).then(function(res) {
                                                $scope.sssss.push(res.data.star);
                                            });
                                        } else
                                        {
                                            $scope.sssss.push(res.data[0].star);
                                        }
                                    } else
                                    {
                                        $scope.rati = {};
                                        $scope.rati.userid = $rootScope.currentUser._id;
                                        $scope.rati.movieid = res.req;
                                        $scope.rati.star = 0;
                                        Rates.all($scope.rati).then(function(res) {
                                            $scope.sssss.push(res.data.star);
                                        });
                                    }
                                });
                                $scope.movie = res.data;
                                $scope.loadmore = res.loadmore;
                            }
                            ;
                        }
                        ;
                    });
                };

                $scope.go = function(id) {
//                    alert("herererererer");
                //    console.log(id);
                    window.location.href = "/movie_detail/" + id;
                };
            } else {
                $scope.params = {};
                $scope.params.cat_id = s_url;
                Category.sigledata($scope.params).then(function(res) {
                    if (res.data === null) {
                        window.location.href = '/404';
                    } else {
                        for (var j = 0; j < res.data.length; j++) {
                            $scope.rar = {};
                            $scope.rar.userid = $rootScope.currentUser._id;
                            $scope.rar.movieid = res.data[j]._id;
                            Rates.sigledata($scope.rar).then(function(res) {
                                if (res.data.length > 0) {
                                    if (!res.data[0].star) {
//                        alert("undefined star");
//                        console.log(res);
                                        $scope.rat = {};
                                        $scope.rat.userid = res.data[0].userid;
                                        $scope.rat.movieid = res.data[0].movieid;
                                        $scope.rat.star = 0;
                                        Rates.all($scope.rat).then(function(res) {
                                            $scope.sssss.push(res.data.star);
                                        });
                                    } else
                                    {
                                        $scope.sssss.push(res.data[0].star);
                                    }
                                } else
                                {
                                    $scope.rati = {};
                                    $scope.rati.userid = $rootScope.currentUser._id;
                                    $scope.rati.movieid = res.req;
                                    $scope.rati.star = 0;
                                    Rates.all($scope.rati).then(function(res) {
                                        $scope.sssss.push(res.data.star);
                                    });
                                }
                            });
                        }
                        $scope.movie = res.data;
                        $scope.actor = res.data.actor;
                        $scope.loadmore = res.loadmore;
                    }
                });
                
                //        rating
                $scope.rate = function(movieid, star) {
                    alert("You rated this movie as" + star +" "+ "star");
                    $scope.review = {};
                    $scope.review.userid = userid;
                    $scope.review.movieid = movieid;
                    $scope.review.star = star;
                    Category.sigledata($scope.params).then(function(res) {
                        if (res === null) {
                            window.location.href = '/404';
                        } else {
                            for (var j = 0; j < res.data.length; j++) {
                                if (res.data[j]._id === movieid)
                                {
                                    var i = j;
                                }
                            }
                            Rates.all($scope.review).then(function(res) {
                                $scope.sssss[i] = res.data.star;
                            });
                        }
                    });
                };
                //   end  rating

                
                
//                load more
                $scope.load = function() {
                    $scope.params.s = "1";
                    Category.sigledata($scope.params).then(function(res) {
                        if (res.data === null) {
                            window.location.href = '/404';
                        } else {
                            for (var j = 0; j < res.data.length; j++) {
                                $scope.rar = {};
                                $scope.rar.userid = $rootScope.currentUser._id;
                                $scope.rar.movieid = res.data[j]._id;
                                Rates.sigledata($scope.rar).then(function(res) {
                                    if (res.data.length > 0) {
                                        if (!res.data[0].star) {
//                        alert("undefined star");
//                        console.log(res);
                                            $scope.rat = {};
                                            $scope.rat.userid = res.data[0].userid;
                                            $scope.rat.movieid = res.data[0].movieid;
                                            $scope.rat.star = 0;
                                            Rates.all($scope.rat).then(function(res) {
                                                $scope.sssss.push(res.data.star);
                                            });
                                        } else
                                        {
                                            $scope.sssss.push(res.data[0].star);
                                        }
                                    } else
                                    {
                                        $scope.rati = {};
                                        $scope.rati.userid = $rootScope.currentUser._id;
                                        $scope.rati.movieid = res.req;
                                        $scope.rati.star = 0;
                                        Rates.all($scope.rati).then(function(res) {
                                            $scope.sssss.push(res.data.star);
                                        });
                                    }
                                });
                            }
                            $scope.movie = res.data;
                            $scope.actor = res.data.actor;
                            $scope.loadmore = res.loadmore;
                        }
                    });
                };
                
                //              end  load more
                
                $scope.go = function(id) {
                    window.location.href = "/movie_detail/" + id;
                };
            }
        });
    });
    
     $scope.moviesearch = function() {
        $scope.data = {};
        new_data= [];
      //  console.log(search)
       // console.log(search[0].title);
        for (var i = 0; i < search.length; i++){
            var abc = search[i].title;
            if (abc.match(this.movie.moviesearch)){
                 new_data.push(search[i]);
              //   console.log("its me")
            }
               
        }
              //  console.log("Hello")
    //    console.log(new_data);
        $scope.data = new_data;
         //   console.log($scope.data);
                 // or return arr[i]
//        Videos.moviesearchdata($scope.moviesearchdata).then(function(res) {
//            if (res) {
//                $scope.data = res.data;
//                console.log("$scope.data");
//                console.log($scope.data);
//                console.log($scope.data.movie);
//            } else {
//                 console.log("error");
//            }
//
//        });
    }
    
    
});

app.controller('LatestVideoCtrl', function($scope, $rootScope, Rates, Videos, Category) {
     var cat =  window.localStorage.getItem("lastrandom");
//    alert(cat);
  //  console.log(cat);
    if($rootScope.currentUser.random!==cat){
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href="/logout";
    }
    var userid = $rootScope.currentUser._id;
    Category.all().then(function(res) {
        var url = window.location.pathname;
        var s_url = url.split('/')[2];
        $scope.movies = res.data;
    });
    $scope.sssss = [];
    $scope.params = {};
    Videos.sort().then(function(res) {
        $scope.lmovies = res.data;
        for (var j = 0; j < res.data.length; j++) {
            $scope.rar = {};
            $scope.rar.userid = $rootScope.currentUser._id;
            $scope.rar.movieid = res.data[j]._id;
            Rates.sigledata($scope.rar).then(function(res) {
                if (res.data.length > 0) {
                    if (!res.data[0].star) {
//                        alert("undefined star");
//                        console.log(res);
                        $scope.rat = {};
                        $scope.rat.userid = res.data[0].userid;
                        $scope.rat.movieid = res.data[0].movieid;
                        $scope.rat.star = 0;
                        Rates.all($scope.rat).then(function(res) {
                            $scope.sssss.push(res.data.star);
                        });
                    } else
                    {
                        $scope.sssss.push(res.data[0].star);
                    }
                } else
                {
                    $scope.rati = {};
                    $scope.rati.userid = $rootScope.currentUser._id;
                    $scope.rati.movieid = res.req;
                    $scope.rati.star = 0;
                    Rates.all($scope.rati).then(function(res) {
                        $scope.sssss.push(res.data.star);
                    });
                }
            });
        }
        ;
        $scope.lmovies = res.data;
        $scope.loadmore = res.loadmore;
    });
    $scope.loadss = function() {
        $scope.params.s = "1";
        Videos.sort($scope.params).then(function(res) {
            for (var j = $scope.sssss.length; j < res.data.length; j++) {
                $scope.rar = {};
                $scope.rar.userid = $rootScope.currentUser._id;
                $scope.rar.movieid = res.data[j]._id;
                Rates.sigledata($scope.rar).then(function(res) {
                    if (res.data.length > 0) {
                        if (!res.data[0].star) {
                            $scope.rat = {};
                            $scope.rat.userid = res.data[0].userid;
                            $scope.rat.movieid = res.data[0].movieid;
                            $scope.rat.star = 0;
                            Rates.all($scope.rat).then(function(res) {
                                $scope.sssss.push(res.data.star);
                            });
                        } else
                        {
                            $scope.sssss.push(res.data[0].star);
                        }
                    } else {
                        $scope.rati = {};
                        $scope.rati.userid = $rootScope.currentUser._id;
                        $scope.rati.movieid = res.req;
                        $scope.rati.star = 0;
                        Rates.all($scope.rati).then(function(res) {
                            $scope.sssss.push(res.data.star);
                        });
                    }
                });
            }
            ;
            $scope.lmovies = res.data;
            $scope.loadmore = res.loadmore;
        });
    };
    $scope.go = function(id) {
        window.location.href = "/movie_detail/" + id;
    };
    $scope.rate = function(movieid, star) {
        alert("You rated this movie as" + star +" "+ "star");
        $scope.review = {};
        $scope.review.userid = userid;
        $scope.review.movieid = movieid;
        $scope.review.star = star;
        Videos.sort().then(function(res) {
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i]._id === movieid)
                {
                    var j = i;
                }
            }
            Rates.all($scope.review).then(function(res) {
                $scope.sssss[j] = res.data.star;
            });
        });
    };
    
    $scope.latestsearch = function() {
        $scope.latestsearchdata = {};
        $scope.latestsearchdata.latestsearch = this.latest.latestsearch;
     //   console.log($scope.latestsearchdata);
        Videos.latestsearchdata($scope.latestsearchdata).then(function(res) {
            if (res) {
                $scope.data = res.data;
           //     console.log("$scope.data");
            //    console.log($scope.data);
            //    console.log($scope.data.latest);
            } else {
              //   console.log("error");
            }

        });
    }
    
    
});




app.controller('VideodetailCtrl', function($scope, Videos, $rootScope, Paymentstatus, Category) {
     var cat =  window.localStorage.getItem("lastrandom");
//    alert(cat);
 //   console.log(cat);
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
    $scope.params.id = f_url;
    Videos.sigledata($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
            $scope.movie = res.data;
        }
    });
    $scope.status = function() {
        $scope.params = {};
        $scope.params.userid = $rootScope.currentUser._id;
        Paymentstatus.check($scope.params).then(function(res) {
            if (res.pay[0].status === 0) {
                window.location.href = '/selectplan';
            } else {
                //alert("You are already a subscriber");
                $scope.params = {};
                $scope.params.id = f_url;
                Videos.sigledata($scope.params).then(function(res) {
                    if (res === null) {
                        window.location.href = '/404';
                    } else {
                        $scope.movie = res.data;
                        window.location.href = "/fullmovie/" + res.data._id;
                    }
                });
            }
            ;
        });
    };
});

app.controller('ActordetailCtrl', function($scope, $rootScope,Actors, Category) {
     var cat =  window.localStorage.getItem("lastrandom");
//    alert(cat);
 //   console.log(cat);
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
    $scope.actor = {};
    $scope.params = {};
    $scope.params.name = f_url;
 //   console.log($scope.params.name);
   // return false;
     Actors.moviesbyactor($scope.params).then(function(res) {
         if(res){
         //    console.log("hello")
//             console.log(res)
             $scope.actor = res.data;
            // console.log($scope.actor);
         }else{
          //   console.log("Error here");
         }
     })
     
      $scope.go = function(id) {
//                    alert("herererererer");
                  //  console.log(id);
                    window.location.href = "/movie_detail/" + id;
        };
   
});