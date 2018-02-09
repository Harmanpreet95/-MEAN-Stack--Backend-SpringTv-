
app.controller('SerialCtrl', function($scope,$rootScope, Serials, Category) {
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

    Serials.all().then(function(res) {
        $scope.serials = res.data;
    });
    
    $scope.serialsearch = function() {
        $scope.serialsearchdata = {};
        $scope.serialsearchdata.serialsearch = this.serial.serialsearch;
      //  console.log($scope.serialsearchdata);
        Serials.serialsearchdata($scope.serialsearchdata).then(function(res) {
            if (res) {
                $scope.data = res.data;
               // console.log("$scope.data");
               // console.log($scope.data);
               // console.log($scope.data.serial);
            } else {
                // console.log("error");
            }

        });
    }
    
    
});

app.controller('SerialdetailCtrl', function($scope,$rootScope, Serials, Category) {
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
    $scope.serial = {};
    $scope.params = {};
    $scope.params.id = f_url;
    Serials.sigledata($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
            $scope.serial = res.data;
            $scope.loadmore = res.loadmore;
        }

        $scope.load = function() {
            $scope.params.s = "1";
            Serials.sigledata($scope.params).then(function(res) {
                if (res === null) {
                    window.location.href = '/404';
                } else {
                    $scope.serial = res.data;
                    $scope.loadmore = res.loadmore;
                }
            });
        };
    });
});

app.controller('EpisodeCtrl', function($scope, $rootScope, Rates, Category, Episodes, Seasons) {
    var cat =  window.localStorage.getItem("lastrandom");
//    alert(cat);
   // console.log(cat);
    if($rootScope.currentUser.random!==cat){
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href="/logout";
    }
    var userid = $rootScope.currentUser._id;
    $scope.sssss = [];
    var url = window.location.pathname;
    var f_url = url.split('/')[2];
    $scope.serial = {};
    $scope.params = {};
    $scope.params.id = f_url;
   // console.log($scope.params);
    Seasons.allSeasons($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
           // console.log(res);
            $scope.season = res.allseason;
            $scope.season.season_name = res.allseason[0].season_name;
           // console.log($scope.season.season_name);
        }
        $scope.paramss = {};
        $scope.paramss.season_id = $scope.season[0]._id;
        $scope.paramss.serial_id = f_url;
        Episodes.epidata($scope.paramss).then(function(res) {
            if (res === null) {
                window.location.href = '/404';
            } else {
                for (var j = 0; j < res.allseason.length; j++) {
                    $scope.rar = {};
                    $scope.rar.userid = $rootScope.currentUser._id;
                    $scope.rar.movieid = res.allseason[j]._id;
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
                $scope.episodes = res.allseason;
                $scope.loadmore = res.loadmore;
            }
        });
    });
    Category.all().then(function(res) {
        $scope.movies = res.data;
    });

    var url = window.location.pathname;
    var f_url = url.split('/')[2];
    $scope.serial = {};
    $scope.params = {};
    $scope.params.id = f_url;
    Seasons.allSeasons($scope.params).then(function(res) {
        $scope.value = res[0];
        if (res === null) {
            window.location.href = '/404';
        } else {
            $scope.season = res.allseason;
//            $scope.season.season_name = res.allseason[0].season_name;
        }
    });
    $scope.viewseason = function(score) {
      //  alert("view");
        $scope.params = {};
        $scope.params.season_id = score._id;
        $scope.params.serial_id = f_url;
        Episodes.epidata($scope.params).then(function(res) {
            if (res === null) {
                window.location.href = '/404';
            } else {
                for (var j = 0; j < res.allseason.length; j++) {
                    $scope.rar = {};
                    $scope.rar.userid = $rootScope.currentUser._id;
                    $scope.rar.movieid = res.allseason[j]._id;
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
                $scope.episodes = res.allseason;
                $scope.loadmore = res.loadmore;
            }
        });
        $scope.rate = function(movieid, star) {
            alert("You rated this episode as" + star + " " + "star");
            $scope.review = {};
            $scope.review.userid = userid;
            $scope.review.movieid = movieid;
            $scope.review.star = star;
            Episodes.epidata($scope.params).then(function(res) {
                if (res === null) {
                    window.location.href = '/404';
                } else {
                    for (var j = 0; j < res.allseason.length; j++) {
                        if (res.allseason[j]._id === movieid)
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
        $scope.load = function() {
            $scope.params.s = "1";
            Episodes.epidata($scope.params).then(function(res) {
                if (res === null) {
                    window.location.href = '/404';
                } else {
                    for (var j = $scope.sssss.length; j < res.allseason.length; j++) {
                        $scope.rar = {};
                        $scope.rar.userid = $rootScope.currentUser._id;
                        $scope.rar.movieid = res.allseason[j]._id;
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
                    $scope.episodes = res.allseason;
                    $scope.loadmore = res.loadmore;
                }

            });
        };
    };
    $scope.go = function(id) {
        window.location.href = "/episode_detail/" + id;
    };
});

app.controller('EpisodedetailCtrl', function($scope, $rootScope, Episodes, Paymentstatus, Category) {
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
    var url = window.location.pathname;
    var f_url = url.split('/')[2];
    $scope.movie = {};
    $scope.params = {};
    $scope.params.id = f_url;
    Episodes.singledata($scope.params).then(function(res) {
        if (res === null) {
            window.location.href = '/404';
        } else {
            $scope.episode = res.data;
        }
    });
    $scope.status = function() {
        $scope.params = {};
        $scope.params.userid = $rootScope.currentUser._id;
        Paymentstatus.check($scope.params).then(function(res) {
            if (res.pay[0].status === 0) {
                window.location.href = '/selectplan';
            } else {
                $scope.params = {};
                $scope.params.id = f_url;
                Episodes.sigledata($scope.params).then(function(res) {
                    if (res === null) {
                        window.location.href = '/404';
                    } else {
                        $scope.episode = res.data;
                        window.location.href = "/fullepisode/" + res.data._id;
                    }
                });
            }
            ;
        });
    };
});