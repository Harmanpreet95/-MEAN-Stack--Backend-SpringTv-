/**
 * post controller
 * @param {type} param1
 * @param {type} param2
 */
app.controller('UserCtrl', function($scope, Category, Users, $rootScope) {
    var phone=0;
    var email = 0;
    var password = 0;
    Category.all().then(function(res) {
        $rootScope.movies = res.data;
    });


    $scope.registerUser = function() {
        $scope.user = {};
        $scope.user.username = this.user.username;
        $scope.user.email = this.user.email;
        $scope.user.password = this.user.password;
        $scope.user.phone = this.user.phone;
        $scope.user.role = 'user';
        //console.log($scope.user);
        Users.add($scope.user).then(function(res) {
            if (res) {
               // console.log(res);
                window.location = '/login';
            }

        });
    };
    $scope.loginUser = function() {
        $scope.userlogin = {};
        $scope.userlogin.email = this.user.email;
        $scope.userlogin.phone = this.user.phone;
        $scope.userlogin.password = this.user.password;
       // console.log($scope.userlogin);
        Users.login($scope.userlogin).then(function(res) {
            if (res.user != "Unauthorized") {
               // console.log(res);
                window.localStorage.setItem("lastrandom", res.data);
                window.location = '/myaccount';
               // console.log(res);
            } else {
                //window.location = '/login';
                $scope.errormsg = 'Invalid crediential';
            }

        });
    }
    $scope.loginphoneUser = function() {
        $scope.userlogin = {};
        $scope.userlogin.phone = this.user.phone;
        $scope.userlogin.password = this.user.password;
      //  console.log($scope.userlogin);
        Users.loginphone($scope.userlogin).then(function(res) {
            if (res.user != "Unauthorized") {
              //  console.log(res);
                window.localStorage.setItem("lastrandom", res.data);
                window.location = '/myaccount';
               // console.log(res);
            } else {
                //window.location = '/login';
                $scope.errormsg = 'Invalid crediential';
            }

        });
    }
    
     $scope.registerUserMobile = function() {
        $scope.user = {};
        $scope.user.password = this.user.password;
        $scope.user.phone = this.user.phone;
        $scope.user.role = 'user';
        //console.log($scope.user);
        Users.add($scope.user).then(function(res) {
            if (res) {
               // console.log(res);
                window.location = '/login';
            }

        });
    };
    $scope.mobileUser = function() {
        $scope.user = {};
        $scope.user.email = this.user.email;
        $scope.user.phone = this.user.phone;
        $scope.user.ccode = this.user.ccode;
        password=this.user.password;
        phone=this.user.phone;
        email=this.user.email;
        $scope.user.role = 'user';
        //console.log($scope.user);
        Users.mobileRegister($scope.user).then(function(res) {
            if (res) {
             //   console.log(res);
            }

        });
    };
    
     $scope.mobileLogin = function() {
        $scope.user = {};
        $scope.user.password = this.user.password;
        $scope.user.phone = this.user.phone;
//        phone=this.user.phone;
//        email=this.user.email;
        $scope.user.role = 'user';
        //console.log($scope.user);
        Users.mobilelogin($scope.user).then(function(res) {
            if (res) {
             //   console.log(res);
                $scope.user.email=res[0].email;
             Users.login($scope.user).then(function(res) {
            if (res.user != "Unauthorized") {
              //  alert("here");
              //  console.log(res);
                window.localStorage.setItem("lastrandom", res.data);
                window.location = '/myaccount';
              //  console.log(res);
            } else {
                //window.location = '/login';
                $scope.errormsg = 'Invalid crediential';
            }

        });
                
            }

        });
    };
    $scope.otp = function() {
        $scope.user = {};
        $scope.user.code = this.user.otp;           
        $scope.user.email = email;
        $scope.user.phone = phone;
        $scope.user.role = 'user';
        $scope.user.password = password;
        //console.log($scope.user);
        Users.verify($scope.user).then(function(res) {
          //  console.log("controller response")
            if (res) {
              //  console.log(res);
                window.location = '/login';
            }

        });
    }; 
    $scope.otplogin = function() {
        $scope.user = {};
        $scope.user.code = this.user.otp;           
        //$scope.user.email = email;
        $scope.user.phone = phone;
        $scope.user.role = 'user';
        //console.log($scope.user);
        Users.verifyotp($scope.user).then(function(res) {
          //  console.log("controller response")
            
            //   console.log(res);
                window.localStorage.setItem("lastrandom", res.data);
              
                if(res.user){
                   // alert("here");
                     window.location.href = '/myaccount';
                }
//                window.location.href = '/myaccount';
              //  console.log(res);
            

        });
    }; 

});
        app.controller('ForgotCtrl', function($scope, $timeout, Category, Users, $rootScope) {
            Category.all().then(function(res) {
                $rootScope.movies = res.data;
            });

            $scope.forgotpass = function() {
                //console.log(this.user);

                if (Object.keys(this.user).length == 0) {
                    $scope.message = "Please enter your email!";
                    return false;
                }
                Users.userForgot(this.user).then(function(res) {
                    if (res) {
                        $scope.message = res.message;
                        // console.log(res);
                    } else {
                        $scope.message = res.message;
                        //console.log(res);
                    }
                });
            }



            $scope.resetpass = function(user) {

//        console.log(user);
//        return false;
                if (!user) {
                    $scope.message = "Please enter password && confirm password";
                    return false;
                } else if (!user.password) {
                    $scope.message = "Please enter password!";
                    return false;
                } else if (!user.confirmpassword) {
                    $scope.message = "Please enter confirm password!";
                    return false;
                }
                else if (user.password != user.confirmpassword) {
                    $scope.message = "The password and confirm password are not same";
                    return false;
                }
                user.salt = $rootScope.salt;
               // console.log("harman");
               // console.log(user);

                Users.changepass(user).then(function(res) {

                    if (res) {
                        //console.log(res.message);
                        $rootScope.message = res.message;
                        window.location = '/login';
                    } else {
                        $rootScope.message = res.message;
                        window.location = '/login';
                    }
                });
            }
        });

app.controller('MyaccountCtrl', function($scope, Paymentstatus, Plans, Payments, Users, Category, $rootScope) {
     window.localStorage.setItem("lastrandom", $rootScope.currentUser.random);
     var cat =  window.localStorage.getItem("lastrandom");
//    alert(cat);
  //  console.log(cat);
    if($rootScope.currentUser.random!==cat){
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href="/logout";
    }
    Category.all().then(function(res) {
      //  console.log(res);
        $rootScope.movies = res.data;
    });
    $scope.params = {};
    $scope.params.userid = $rootScope.currentUser._id;
    Payments.plandata($scope.params).then(function(res) {
     //   console.log(res);
//      $scope.planname        
        if (res.length>0) {
          //  console.log(res[0].planid);
            $scope.params.id = res[0].planid;
            Plans.singledata($scope.params).then(function(res) {
           //     console.log(res);
                $scope.s_plan=res.data;
                
                
                $scope.planimage=res.data.planimage;
                $scope.plantitle=res.data.title;
//            return false;
                $scope.days = res.data.days;
                Paymentstatus.check($scope.params).then(function(res) {
              //      console.log(res);
                    var status = res.pay[0].status;
                    var d = res.pay[0].created_at;
//         var de=res.pay[0].created_at;
//         console.log(d);
//         console.log(de);
                    Date.prototype.addDays = function(days) {
                        var dat = new Date(d);
                       // console.log(dat);
                        dat.setDate(dat.getDate() + days);
                        return dat;
                    };
                
                    var dat = new Date(d);
                   // console.log(d);
                  //  console.log(dat);
                  //  console.log(dat.addDays(45));
                  //  console.log($scope.days);
                    var ldate = dat.addDays($scope.days);
                    
                 //   console.log(ldate);
                    $scope.lastday=ldate;
                    var today = new Date();
                  //  console.log(today);
                    if (ldate >= today) {
                     //   console.log("Subscription remaining");
                        $scope.plan=1;
                    } else {
                     //   console.log("Subscription ends");
                        $scope.plan=0;  
                        status = 0;
                        $scope.param={};
                        $scope.param.status=status;
                        $scope.param.userid=$rootScope.currentUser._id;
                        Payments.updatestatus($scope.params).then(function(res) {
                         //   console.log(res);
                            
                        });
                        
                    }
                });
               
            });
        }else{
          $scope.plan=0;  
        }
        
    });
});
app.controller('EditprofileCtrl', function($scope, Users, Category, $rootScope) {
     var cat =  window.localStorage.getItem("lastrandom");
//    alert(cat);
   // console.log(cat);
    if($rootScope.currentUser.random!==cat){
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href="/logout";
    }
    Category.all().then(function(res) {

        $rootScope.movies = res.data;
    });
    $scope.user = {};
    $scope.user.username = $rootScope.currentUser.username;
    $scope.user.phone = $rootScope.currentUser.phone;
    $scope.user.image = $rootScope.currentUser.image;
    // upload image
    $scope.uploadFile = function(input) {
        $scope.loading = true;
        $scope.updateprofile = '';
        //console.log(input.files[0]);
        Users.uploadimage(input.files[0]).then(function(res) {
           // console.log(res[0].location);
            $scope.loading = false;
            $scope.updateprofile = 1;
            if (res) {
                $scope.imgshow = res[0].location;
                $scope.user.image = $scope.imgshow;
            }
        });
    };
    $scope.updateprofile = 1;

    $scope.editUser = function(usr) {
        $scope.newUser = {};
        $scope.newUser.username = usr.username;
        $scope.newUser.id = $rootScope.currentUser._id;
        $scope.newUser.phone = usr.phone;
        $scope.updateprofile = 1;
        if ($scope.imgshow) {
            $scope.newUser.image = $scope.imgshow;
        }
       // console.log($scope.newUser);
        Users.profileupdate($scope.newUser).then(function(res) {
         //   console.log(res);
            $scope.update = res.message;
        });
    };
});

app.controller('changePasswordCtrl', function($scope, Users, Category, $rootScope) {
     var cat =  window.localStorage.getItem("lastrandom");
//    alert(cat);
  //  console.log(cat);
    if($rootScope.currentUser.random!==cat){
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href="/logout";
    }
    Category.all().then(function(res) {

        $rootScope.movies = res.data;
    });

    $scope.user = {};
    $scope.user.id = $rootScope.currentUser._id;
    $scope.changepass = function() {
        
        if(this.user.cpassword != this.user.newpassword)
        {
            alert("Password and confirm password do not match.");
        }
        else
        {
        $scope.psd = {};
        $scope.psd.email = $rootScope.currentUser.email;
        $scope.psd.password = this.user.password;
        $scope.psd.newpassword = this.user.newpassword;
        
//        $scope.psd.id = this.user.id;
      //  console.log($scope.psd);
        Users.changePassword($scope.psd).then(function(res) {
         //   console.log(res);
            if (res.data !== "Unauthorized") {

                if (res) {
                    $scope.message = res.message;

                } else {
                    $scope.message = "error";

                }
            } else {
                $scope.errormsg = 'Invalid crediential';

            }

        });
    }
    };
});
    