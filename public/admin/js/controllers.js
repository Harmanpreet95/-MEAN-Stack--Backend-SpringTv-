/**
 * NavCtrl
 * @param {type} param1
 * @param {type} param2
 */
adminApp.controller('NavCtrl', function($scope, $state) {
    $scope.active = $state;
    $scope.isActive = function(viewLocation) {
        var active = (viewLocation === $state.current.name);
        return active;
    };
})
/*
* Dashboard controller
*/
adminApp.controller('dashboardCtrl', function($scope) {
    
});

/**
 * AllPostsCtrl
 */
adminApp.controller('AllMoviesCtrl', function($scope,Videos,$location,$timeout,PagerService,$sce) {
 
    Videos.all().then(function(data){
        $("#mydiv").hide();
    
        $scope.posts = data.data;
         $(document).ready(function() {
                $('#example1').DataTable();
            } );

    });

   

  
    $scope.activePost = false;
    $scope.setActive = function(post) {
      
        $scope.active = true;
     
        $scope.actors = JSON.parse(post.actors);
      
        $scope.activePost = post;
    
    }
    $scope.trailersrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
     $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.movie = {src:"https://springtv.s3.us-east-2.amazonaws.com/profilepic%2F1507706230703JUSTICE+LEAGUE+-+Official+Heroes+Trailer.mp4", title:"Egghead.io AngularJS Binding"};

    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
       
        Videos.remove($scope.data).then(function(res) {
          
            if (res) {
                alert(res.message);
                 Videos.all().then(function(data){
                    $("#mydiv").hide();

                    $scope.posts = data.data;

                });
            } else {
                $scope.update = "error";
            }
        });
    }
})
/**
 * EditPostsCtrl
 */

adminApp.controller('editMovieCtrl', function($scope, Videos,Category,Subcategory,$sce, $stateParams,Users ) { 
    $scope.params = {};
	$scope.act=[];
	$scope.data={};
    $scope.params.path = $stateParams.paraml;
  
    Category.all().then(function(res) {
          
            $scope.categorylist = res.data;
    });
	
    Videos.singledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
         
           $scope.post = res.data;
		   $scope.data=res.data;
           $scope.fields = res.data.actors;
       
           $scope.actors = JSON.parse($scope.fields);
         
		  $scope.act.push($scope.actors[0]);
		  $scope.act.push($scope.actors[1]);
		
		 
        }
    
  
	
    $scope.videoshow = $scope.data.video;
    $scope.trailer = $scope.data.trailer;
    $scope.thumb = $scope.data.thumbnail;
    
    $scope.imgshow = '';
    $scope.actor1 = '';
});
    $scope.newPost = {};
    Category.all().then(function(res) {
        
            $scope.categorylist = res.data;
        });

    $('#mydiv').hide();
 
    $scope.category_movie = '';
    $scope.thumbnail = function(inputthumb){
        $scope.loadingthumb = true;

         Users.uploadimage(inputthumb.files[0]).then(function(res) {

            $scope.loadingthumb = false;
            if(res){
         
             $scope.thumb = res[0].location;
         }
     })
             
    }
    
    
//    
    $scope.videoupload = function(inputvideo){
        $scope.loadingv = true;
      

         Users.uploadimage(inputvideo.files[0]).then(function(res) {

            $scope.loadingv = false;
            if(res){
          
             $scope.videoshow = res[0].location;
          
 
            }
//          
        });
    }
    

    
         $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
        $scope.trailerupload = function(inputvideo){
        $scope.loadingtrail = true;

         Users.uploadimage(inputvideo.files[0]).then(function(res) {

            $scope.loadingtrail = false;
            if(res){
             $scope.trailer = res[0].location;
         }        
        });
    }
//    
//
    $scope.imgshow = '';
    $scope.actorsarr = [];
    $scope.actors = function(ele){
        $scope.loadinga = true;
         Users.uploadimage(ele.files[0]).then(function(res) {
            $scope.loadinga = false;
            if(res){  
             $scope.imgshow = res[0].location;
             $scope.actorsarr.push($scope.imgshow);
            }
//          
        });
    }
    $scope.actor1 = '';
    $scope.actornamearr = [];
    $scope.actordescriptionarr = [];
    
    
    $scope.upload = function(actors,des){
        if(actors == undefined){
            alert("Please Fill the ActorName!")
        }else{
        $scope.actornamearr.push(actors);
        alert("actor name uploaded");
        }
        if(des == undefined){
            alert("Please Fill the ActorDescription!")
        }else{
        $scope.actordescriptionarr.push(des);
        alert("actor description uploaded");
        }
        
    }
    
    
       $scope.actorsec = function(element){
        $scope.loadingb = true;

         Users.uploadimage(element.files[0]).then(function(res) {
            $scope.loadingb = false;
            if(res){
             $scope.actor1 = res[0].location;
             
            $scope.actorsarr.push($scope.actor1);
             
            }
        });
    }
           
           
           
           
           
           
    $scope.add = function(){
        
        
        $scope.addmore = true;
        
    }
    $scope.postdata = {};
    $scope.category = function(){
        
        
        Category.all().then(function(res) {
            
            for(var i = 0;i<res.data.length;i++){
                
                if(res.data[i].category == $scope.post.categoryname){
                  
                    $scope.newPost.category = res.data[i].category;
                   
                    $scope.postdata.category_id = res.data[i]._id;
                   
                    Subcategory.findall($scope.postdata).then(function(response){
                     
                        $scope.catlength = response.subcatlist.length;
                        
                        $scope.subcategory = response.subcatlist;
                    })    
                }
            } 
        });
    }
//    $scope.newPost = {};
    $scope.subCategory = function(){
        $scope.newPost.subcatname = $scope.post.subcatname;
      
        Subcategory.findall($scope.postdata).then(function(response){
                       
                        for(var j=0;j<response.subcatlist.length;j++)
                        {
                               
                                if($scope.newPost.subcatname == response.subcatlist[j].subcategory){
                                    
                                    $scope.newPost.subcatId = response.subcatlist[j]._id;
                                    return false;
                                }else{
                                    
                                }
                                
                           
                        }
                     })  
        
    }
    
       // $scope.newPost.id = $scope.user.id;
       
        $scope.editPost = function() {
     //  alert("helllooo");
       $scope.newadd = {};
       
       $scope.arrayres = [];
       $scope.arrayres =$scope.act;
            for (var i = 0; i < $scope.actorsarr.length; i++) {
				//alert("forrrrrr");
                
                $scope.arrayres[i] = {name:$scope.actornamearr[i],description:$scope.actordescriptionarr[i],image:$scope.actorsarr[i]};
s            }
            
       
            $('#mydiv').show(); 
           
        $scope.newPost.title = $scope.post.title;
        $scope.newPost.description = $scope.post.description;
        $scope.newPost.duration = $scope.post.movie_duration;
        $scope.newPost.price = $scope.post.price;
        $scope.newPost.categoryId = $scope.postdata.category_id;
       
        $scope.newPost.image = $scope.thumb;
        $scope.newPost.trailer = $scope.trailer;
        $scope.newPost.video = $scope.videoshow;
        $scope.newPost.actors = $scope.arrayres;
        $scope.newPost.id = $scope.post._id;
      
        
            Videos.update($scope.newPost).then(function(res) {
               
               alert(res.message);
//               window.location.reload();
        
                $('#mydiv').hide();
            });
             //alert("Movie Updated");
                window.location.href = '/admin/dashboard#/allMovies';
            // Posts.add($scope.newPost);
            this.post = {};
            $scope.trailer ='';
            $scope.videoshow = '';
            $scope.arrayres = [];
            $scope.thumb = '';
            $scope.category_movie = '';
    };
       
    
    
})


adminApp.controller('EditPostsCtrl', function($scope, Posts, $stateParams) {
    $scope.post = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    Posts.sigledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            
            $scope.post.description = res.description;
            $scope.post.himage = res.himage;
            $scope.post.simage = res.simage;
            $scope.post.title = res.title;
            $scope.post.paramal = res.paramal;
            $scope.post.metadescription = res.metadescription;
            $scope.post.metakeywords = res.metakeywords;
            $scope.post.id = res._id;
        }
    });
    $scope.editPost = function() {

        $scope.newPost = {};
        $scope.newPost.simage = this.post.simage;
        $scope.newPost.himage = this.post.himage;
        $scope.newPost.title = this.post.title;
        $scope.newPost.description = this.post.description;
        $scope.newPost.metadescription = this.post.metadescription;
        $scope.newPost.metakeywords = this.post.metakeywords;
        $scope.newPost.paramal = this.post.paramal;
        $scope.newPost.author_name = $scope.author_name;
        $scope.newPost.author_image = $scope.author_image;
        $scope.newPost.id = this.post.id;
        Posts.update($scope.newPost).then(function(res) {
            
            if (res) {
                $scope.update = res.message;
            } else {
                $scope.update = "error";
            }
            
        });
    }
})
/**
 * AddPostCtrl
 */
adminApp.controller('addMovieCtrl', function($scope,Actors,Users,Category,$rootScope, Subcategory,$sce,Videos) {
     $scope.videoshow = '';
    $scope.trailer = '';
    $scope.thumb = '';
    $scope.imgshow = '';
    $scope.actor1 = '';

    $scope.newPost = {};
    Category.all().then(function(res) {
           
            $scope.categorylist = res.data;
        });

    $('#mydiv').hide();
    

    
    $scope.category_movie = '';
   
    $scope.thumbnail = function(inputthumb){
        $scope.loadingthumb = true;
       

         Users.uploadimage(inputthumb.files[0]).then(function(res) {

            $scope.loadingthumb = false;
            if(res){
            
             $scope.thumb = res[0].location;
         }
     })
             
    }
    
    
//    
    $scope.videoupload = function(inputvideo){
        $scope.loadingv = true;
       

         Users.uploadimage(inputvideo.files[0]).then(function(res) {

            $scope.loadingv = false;
            if(res){
            
             $scope.videoshow = res[0].location;
            
 
            }
//          
        });
    }
    

    
         $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
        $scope.trailerupload = function(inputvideo){
        $scope.loadingtrail = true;

         Users.uploadimage(inputvideo.files[0]).then(function(res) {

            $scope.loadingtrail = false;
            if(res){ 
             $scope.trailer = res[0].location;
         }        
        });
    }
//    
//
    $scope.imgshow = '';
    $scope.actorsarr = [];
    $scope.actors = function(ele){
        $scope.loadinga = true;
       
         Users.uploadimage(ele.files[0]).then(function(res) {

            $scope.loadinga = false;
            if(res){
            
             $scope.imgshow = res[0].location;
             $scope.actorsarr.push($scope.imgshow);
             
            }
//          
        });
    }
    $scope.actor1 = '';
    $scope.actornamearr = [];
    $scope.actordescriptionarr = [];
    
    
    $scope.upload = function(actors,des){
    
        if(actors == undefined){
            alert("Please Fill the ActorName!")
        }else{
        $scope.actornamearr.push(actors);
       
        alert("actor name uploaded");
        }
        if(des == undefined){
            alert("Please Fill the ActorDescription!")
        }else{
        $scope.actordescriptionarr.push(des);
        
        alert("actor description uploaded");
        }
        
    }
    
    
       $scope.actorsec = function(element){
        $scope.loadingb = true;
      

         Users.uploadimage(element.files[0]).then(function(res) {
            $scope.loadingb = false;
            if(res){
            
             $scope.actor1 = res[0].location;
             
            $scope.actorsarr.push($scope.actor1);
            }
        });
    }
           
           
           
           
           
           
    $scope.add = function(){
        
        
        $scope.addmore = true;

        
    }
    $scope.postdata = {};
    $scope.category = function(){
        
        
        Category.all().then(function(res) {
            
            for(var i = 0;i<res.data.length;i++){
                
                if(res.data[i].category == $scope.post.categoryname){
                    
                    $scope.newPost.category = res.data[i].category;
                    
                    $scope.postdata.category_id = res.data[i]._id;
                    
                    Subcategory.findall($scope.postdata).then(function(response){
                        
                        $scope.catlength = response.subcatlist.length;
                        
                        $scope.subcategory = response.subcatlist;
                    })    
                }
            } 
        });
    }
//    $scope.newPost = {};
    $scope.subCategory = function(){
//        alert("yes");
        $scope.newPost.subcatname = $scope.post.subcatname;
       
        Subcategory.findall($scope.postdata).then(function(response){
                        
                        for(var j=0;j<response.subcatlist.length;j++)
                        {
                               
                                if($scope.newPost.subcatname == response.subcatlist[j].subcategory){
                                    
                                    $scope.newPost.subcatId = response.subcatlist[j]._id;
                                    return false;
                                }else{
                                    
                                }
                                
                           
                        }
                     })  
        
    }

   $scope.addPost = function() {
     //  alert("helllooo");
       $scope.newadd = {};
       
       $scope.arrayres = [];
            for (var i = 0; i < $scope.actorsarr.length; i++) {
               
                $scope.arrayres[i] = {name:$scope.actornamearr[i],description:$scope.actordescriptionarr[i],image:$scope.actorsarr[i]};
               // $scope.arrayres[i].img= values[i]; 
            }
           
       
            $('#mydiv').show(); 
           
        $scope.newPost.title = this.post.title;
        $scope.newPost.description = this.post.description;
        $scope.newPost.duration = this.post.duration;
        $scope.newPost.price = this.post.price;
        $scope.newPost.categoryId = $scope.postdata.category_id;
       
        $scope.newPost.image = $scope.thumb;
        $scope.newPost.trailer = $scope.trailer;
        $scope.newPost.video = $scope.videoshow;
        $scope.newPost.actors = $scope.arrayres;
       
        
            Videos.add($scope.newPost).then(function(res) {
                
               alert(res.message);
//               window.location.reload();
        
                $('#mydiv').hide();
                
            });
            alert("Movie Added")
                window.location.href = '/admin/dashboard#/allMovies';
            // Posts.add($scope.newPost);
            this.post = {};
            $scope.trailer ='';
            $scope.videoshow = '';
            $scope.arrayres = [];
            $scope.thumb = '';
            $scope.category_movie = '';
    };
    
   
    
    
    
    
});
/**
 * AllUsersCtrl
 */


adminApp.controller('forgotpasswordCtrl', function($scope,Users,$location,$rootScope) {
     $scope.forgotpass = function() {
        
        
        if (Object.keys(this.user).length == 0) {
            $scope.message = "Please enter your email!";
            return false;
        }
        Users.adminForgot(this.user).then(function(res) {
            if (res) {
                $scope.message = res.message;
                
            } else {
                $scope.message = res.message;
             
            }
        });
    }
    
    $scope.resetpass = function(user) {

        if (!user) {
            $scope.message = "Please enter password && confirm password";
            return false;
        }else if(!user.password){
             $scope.message = "Please enter password!";
            return false;
        }else if(!user.confirmpassword){
             $scope.message = "Please enter confirm password!";
            return false;
        }
        else if(user.password!=user.confirmpassword) {
            $scope.message = "The password and confirm password are not same";
             return false;
        }
        user.salt=$rootScope.salt;
       
        
        Users.changepass(user).then(function(res) {
            
            if (res) {
                
                $rootScope.message = res.message;
//               window.location = '/admin';
            } else {
                $rootScope.errormsg = res.message;
//                window.location = '/admin';
            }
        });
    }
})
adminApp.controller('AllUsersCtrl', function($scope,Users,$location) {
    

    $scope.activePost = false;
    
    Users.all().then(function(data){
           $scope.users = data;
               $(document).ready(function() {
                $('#example1').DataTable();
            } );
    })
//						return data;
    
    
    
    
    $scope.setActive = function(user) {
        $scope.active = 1;
       
        $scope.activeUser = user;
        
    }
    $scope.deleteUser = function(id) {
        $scope.data={};
         $scope.data.id=id;
        Users.remove($scope.data).then(function(res) {
            if (res) {
//              alert(res.message);
                $scope.del = res.message;
                 Users.all().then(function(data){
                        $scope.users = data;
                        $scope.del = '';
                 })
//                      window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});
/*
* Add user
*/
adminApp.controller('addUserCtrl',function($scope,Users,$rootScope){
    $scope.user = {}


 $scope.fileNameChanged = function(input) {
   
          $scope.loading = true;
    
        Users.uploadimage(input.files[0]).then(function(res) {

            $scope.loading = false;
            if(res){
             
             $scope.imgshow = res[0].location;
             
            }
          
        });
    }


    $scope.addUser = function(){
     
        $scope.newUser = {};
        $scope.newUser.email = this.user.email;
        $scope.newUser.password = this.user.password;
        $scope.newUser.username = this.user.username;
        $scope.newUser.phone = this.user.phone;
        $scope.newUser.role = this.user.role;
        $scope.newUser.image = $scope.imgshow;
       
        Users.add($scope.newUser).then(function(res) {
           
            $scope.user = '';
            $scope.user = {};
            if(res){
                $scope.message = res;
                
                this.user = {};
                alert("User Added");
                window.location.href = '/admin/dashboard#/userList';
            }else{
                $scope.message = res;
                this.user = {};
            }
        });   
    }
});
/**
 * EditUsersCtrl
 */
adminApp.controller('editUserCtrl', function($scope, Users, $stateParams) {
    $scope.user = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    
    Users.singledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            $scope.user.username = res.data.username;
            $scope.user.image = res.data.image;
            $scope.user.email = res.data.email;
            $scope.user.phone = res.data.phone;
            $scope.user.role = res.data.role;
            $scope.user.id = res.data._id;
        }
    });
    
    
   $scope.fileNameChanged = function(input) {
          $scope.loading = true;
      
        Users.uploadimage(input.files[0]).then(function(res) {
            $scope.loading = false;
            if(res){ 
             $scope.user.image = res[0].location;
             
            }
          
        });
    }
        
        
    $scope.editPost = function() {
        
        $scope.newPost = {};
        $scope.newPost.username = $scope.user.username;
        $scope.newPost.email = $scope.user.email;
        $scope.newPost.phone = $scope.user.phone;
        $scope.newPost.role = $scope.user.role;
        $scope.newPost.id = $scope.user.id;
        $scope.newPost.image = $scope.user.image;
        Users.update($scope.newPost).then(function(res) {
            alert(res.message);
            
            if (res) {
                $scope.update = res.message;
                //alert("User Updated");
                window.location.href = '/admin/dashboard#/userList';
            } else {
                $scope.update = "error";
            }
        });
    };
});
adminApp.controller('AllTeamsCtrl', function($scope,Teams,$location) {
    

    $scope.activePost = false;
    
    Teams.all().then(function(data){
           $scope.teams = data.data;
               $(document).ready(function() {
                $('#example1').DataTable();
            } );
    })
//						return data;
    
    
    
    
    $scope.setActive = function(team) {
        $scope.active = 1;
       
        $scope.activeTeam = team;
        
    }
    $scope.deleteTeam = function(id) {
        $scope.data={};
         $scope.data.id=id;
         
        Teams.remove($scope.data).then(function(res) {
            
            if (res) {
//              alert(res.message);
                $scope.del = res.message;
                 Teams.all().then(function(data){
//                      return data;
                        
                        $scope.teams = data.data;
                        $scope.del = '';
                 })
//                      window.location.reload();
            } else {
                $scope.del = "error";
            }
        });
    }
});
/*
* Add user
*/
adminApp.controller('addTeamCtrl',function($scope,Teams,$rootScope){
    $scope.team = {};


 $scope.fileNameChanged = function(input) {
    
          $scope.loading = true;
     
        Teams.uploadimage(input.files[0]).then(function(res) {

            $scope.loading = false;
            if(res){
             
             $scope.imgshow = res[0].location;         
             res[0].location={};
            }
          
        });
    }


    $scope.addTeam = function(){
       
        $scope.newUser = {};
        $scope.newUser.name = this.team.name;
        $scope.newUser.role = this.team.role;
        $scope.newUser.image = $scope.imgshow;
       

        Teams.add($scope.newUser).then(function(res) {
            
            $scope.team = '';
            $scope.team = {};
             //$scope.imgshow="";
            if(res){
                $scope.message = res.message;
                
                this.team = {};
                 $scope.imgshow={};
                 //$scope.imgshow="";
            }else{
                $scope.message = res.message;
                this.team = {};
                $scope.imgshow={};
            }
             window.location.href = '/admin/dashboard#/teamList';
        });   
    }
});
adminApp.controller('editTeamCtrl', function($scope, Teams, $stateParams) {
    $scope.team = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    
    Teams.singledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
             
            $scope.team.name = res.data.name;
            $scope.team.image = res.data.image;
            $scope.team.role = res.data.role;
            $scope.team.id = res.data._id;
        }
    });
    
    
   $scope.fileNameChanged = function(input) {
    
          $scope.loading = true;
      
        Teams.uploadimage(input.files[0]).then(function(res) {
            $scope.loading = false;
            if(res){
             $scope.team.image = res[0].location;
             
            }
          
        });
    }
        
        
    $scope.editPost = function() {
        $scope.newPost = {};
        $scope.newPost.name = $scope.team.name;
        $scope.newPost.role = $scope.team.role;
        $scope.newPost.id = $scope.team.id;
        $scope.newPost.image = $scope.team.image;
        Teams.update($scope.newPost).then(function(res) {
            alert(res.message);
            
            if (res) {
                $scope.update = res.message;
            } else {
                $scope.update = "error";
            }
        });
        window.location.href = '/admin/dashboard#/teamList';
    };
});

adminApp.controller('AllOrdersCtrl', function($scope,Orders,$location) {
    

    $scope.activePost = false;
    
    Orders.all().then(function(data){
//           return data;
           
           $scope.orders = data.data;
               $(document).ready(function() {
                $('#example1').DataTable();
            } );
    })
//						return data;
    
    
    
    
    $scope.setActive = function(order) {
        $scope.active = 1;
      //  alert("setACtive");
       
        $scope.activeOrder = order;
        
        
    }
    $scope.deleteOrder = function(id) {
        $scope.data={};
         $scope.data.id=id;
        
        Orders.remove($scope.data).then(function(res) {
           
            if (res) {
//              alert(res.message);
                $scope.del = res.message;
                 Orders.all().then(function(data){
//                      return data;
                        
                        $scope.orders = data.data;
                        $scope.del = '';
                 })
//                      window.location.reload();
            } else {
                $scope.del = "error";
            }
        });
    }
});
adminApp.controller('editOrderCtrl', function($scope, Orders, $stateParams) {
    $scope.order = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    
    Orders.singledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
             
            $scope.order.movie_name = res.data.movie_name;
            $scope.order.movie_id = res.data.movie_id;
            $scope.order.quantity = res.data.quantity;
            $scope.order.movie_price = res.data.movie_price;
            $scope.order.transactionid = res.data.transactionid;
            $scope.order.userid = res.data.userid;
            $scope.order.status = res.data.status;
            if(res.data.d_status){
              $scope.order.d_status = res.data.d_status;  
            }
            $scope.order.id = res.data._id;
        }
    });
    
    
   
        
        
    $scope.editPost = function() {
       
//        return false;
       
        $scope.newPost = {};
        $scope.newPost.movie_name = $scope.order.movie_name;
        $scope.newPost.movie_id = $scope.order.movie_id;
        $scope.newPost.quantity = $scope.order.quantity;
        $scope.newPost.movie_price = $scope.order.movie_price;
        $scope.newPost.transactionid = $scope.order.transactionid;
        $scope.newPost.userid = $scope.order.userid;
        $scope.newPost.status = $scope.order.status;
         if($scope.order.d_status ){
              $scope.newPost.d_status = $scope.order.d_status;
            }
            else{
                if(this.order.d_status){
                  $scope.newPost.d_status= this.order.d_status; 
                }
            }
        $scope.newPost.id = $scope.order.id;
        Orders.update($scope.newPost).then(function(res) {
            alert(res.message);
           
            if (res) {
                $scope.update = res.message;
            } else {
                $scope.update = "error";
            }
            
        });
         window.location.href = '/admin/dashboard#/orderList';
    };
});
/**
 * AddPortfolioCtrl
 */
adminApp.controller('addPortfolioCtrl', function($scope, Portfolios) {
    $scope.post = {};
    function shuffle(array) {
        var m = array.length, t, i;
        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    $scope.addPost = function() {
        
        $scope.newPost = {};
        $scope.newPost.name = this.post.name;
        $scope.newPost.websiteurl = this.post.websiteurl;
        $scope.newPost.appleurl = this.post.appleurl;
        $scope.newPost.googlepurl = this.post.googlepurl;
        $scope.newPost.image = this.post.image;

        Portfolios.add($scope.newPost).then(function(res) {
           
        });
       
        // Users.add($scope.newPost);
        this.post = {};
    };
});
/**
 * AllUsersCtrl
 */
adminApp.controller('PortfolioListCtrl', function($scope, portfolioList,Users,$location) {
   
    $scope.posts = portfolioList;
    $scope.activePost = false;
    $scope.setActive = function(user) {
        $scope.activePost = user;
    }
    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
      
        Users.remove($scope.data).then(function(res) {
            
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});
adminApp.controller('addCategoryCtrl', function($scope,Category) {
    $scope.post={};
    $scope.addPost = function() {
       
        $scope.newPost = {};
        
        $scope.newPost.title = this.post.title;
      

        Category.add($scope.newPost).then(function(res) {
          
            alert(res.message);
            
        });
        this.post = {};
        window.location.href = '/admin/dashboard#/allCategories';
    };
});

adminApp.controller('editNewsCtrl', function($scope, News, $stateParams) {
    $scope.news = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    
    News.singledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
             
            $scope.news.title = res.data.title;
            $scope.news.image = res.data.image;
            $scope.news.description = res.data.description;
            $scope.news.id = res.data._id;
        }
    });
    
    
   $scope.fileNameChanged = function(input) {
   
          $scope.loading = true;
      
        News.uploadimage(input.files[0]).then(function(res) {
            $scope.loading = false;
            if(res){
             
             $scope.news.image = res[0].location;
             
            }
          
        });
    }
        
        
    $scope.editPost = function() {
        $scope.newPost = {};
        $scope.newPost.title = $scope.news.title;
        $scope.newPost.description = $scope.news.description;
        $scope.newPost.id = $scope.news.id;
        $scope.newPost.image = $scope.news.image;
        News.update($scope.newPost).then(function(res) {
            alert(res.message);
            
            if (res) {
                $scope.update = res.message;
            } else {
                $scope.update = "error";
            }
        });
        window.location.href = '/admin/dashboard#/newsList'; 
    };
});
adminApp.controller('AllNewsCtrl', function($scope,News,$location) {
    

    $scope.activeNews = false;
    
    News.all().then(function(data){
           $scope.news = data.data;
               $(document).ready(function() {
                $('#example1').DataTable();
            } );
    })
//						return data;
    
    
    
    
    $scope.setActive = function(news) {
        $scope.active = 1;
      
        $scope.activeNews = news;
        
        
    }
    $scope.deleteNews = function(id) {
        $scope.data={};
         $scope.data.id=id;
        
        News.remove($scope.data).then(function(res) {
            
            if (res) {
              
                $scope.del = res.message;
                
//                alert(res.message);
                 News.all().then(function(data){
//                      return data;
                       
                        $scope.news = data.data;
                        $scope.del = '';
                 })
//                      window.location.reload();
            } else {
                $scope.del = "error";
            }
        });
    }
});
adminApp.controller('addNewsCtrl', function($scope,News) {
    $scope.news={};
    $scope.fileNameChanged = function(input) {
    
          $scope.loading = true;
     
        News.uploadimage(input.files[0]).then(function(res) {
            $scope.loading = false;
            if(res){
             
             $scope.imgshow = res[0].location;
             
            }
          
        });
    }
    $scope.addNews = function() {
        
        $scope.newPost = {};
        
        $scope.newPost.title = this.news.title;
      $scope.newPost.description = this.news.description;
      $scope.newPost.image= $scope.imgshow;
        News.add($scope.newPost).then(function(res) {
           
            alert(res.message);
            $scope.message=res.message;
            
        });
        this.news = {};
        $scope.imgshow={};
         window.location.href = '/admin/dashboard#/newsList';
    };
});
adminApp.controller('addSubCategoryCtrl', function($scope,Subcategory,Category) {
    $scope.post={};
    $scope.subCategory = {};
    Category.all().then(function(res) {
       
        $scope.category = res.data;
        
        
    })
    $scope.categories = function(){
        Category.all().then(function(res) {
        
        for(var i= 0 ; i<res.data.length;i++){
            if(res.data[i].category == $scope.post.categoryname){
                
                $scope.subCategory.category_name = res.data[i].category;
                $scope.subCategory.category_id = res.data[i]._id;
                return false;
            }else{
                
            }
        }
        })
    }
    $scope.addPost = function() {
       
       
        
        $scope.subCategory.sub_category = this.post.subcat;
      
       
        Subcategory.add($scope.subCategory).then(function(res) {
            
            alert(res.message);
            
        });
        this.post = {};
         window.location.href = '/admin/dashboard#/allSubcategories';
    };
});

adminApp.controller('editSubCategoryCtrl', function($scope,$stateParams,Subcategory,Category) {
    $scope.post={};
    $scope.params = {};
    $scope.newPost = {};
    $scope.params.id = $stateParams.paraml;
    Category.all().then(function(res) {
        
        $scope.category = res.data;
    })
    Subcategory.singledata($scope.params).then(function(res) {
       
        if (res == null) {
            window.location.href = '/404';
        } else {
            
             $scope.post = res.subcatlist[0];
          
        }
    });
        $scope.editSubCategory = function() {

        $scope.newPost = {};
        $scope.newPost.cat = this.post.category;
        $scope.newPost.id = $scope.params.id;
        $scope.newPost.subcat = this.post.subcategory;
       
        Subcategory.update($scope.newPost).then(function(res) {
            
            alert(res.message);
            
            
        });
         window.location.href = '/admin/dashboard#/allSubcategories';
    }
})


adminApp.controller('allSubcategoriesCtrl', function($scope,Subcategory,$stateParams,Category) {
    
    Subcategory.all().then(function(res) {
        
        $(document).ready(function() {
                $('#example1').DataTable();
        } );
        $scope.subcategory = res.data;
    })
    
        $scope.setActive = function(user) {
                $scope.activePost = true;
                $scope.activePost = user;
                
        }
        
        $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
        
        Subcategory.remove($scope.data).then(function(res) {
            
            if (res) {
                alert(res.message);
                    Subcategory.all().then(function(res) {
                       
                        $(document).ready(function() {
                                $('#example1').DataTable();
                        } );
                        $scope.subcategory = res.data;
                    })
            } else {
                $scope.update = "error";
            }
        });
    }
    
})

adminApp.controller('CategoryListCtrl', function($scope,$stateParams,Category) {
    
    $scope.param_id = $stateParams.paraml;
    $scope.activePost = false;
    
    Category.all().then(function(res) {
       
        $(document).ready(function() {
                $('#example1').DataTable();
        } );
        $scope.category = res.data;
    })
    
    $scope.setActive = function(user) {
        $scope.activePost = true;
        $scope.activePost = user;
        
    }
    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
        
        Category.remove($scope.data).then(function(res) {
           
            if (res) {
                alert(res.message);
                Category.all().then(function(res) {
                    
                    $scope.category = res.data;
                })
            } else {
                $scope.update = "error";
            }
        });
    }
    
//    $scope.editCategory = function() {
//        
//    
//    }
});
/**
 * EditCategoryCtrl
 */
adminApp.controller('editCategoryCtrl', function($scope, Category, $stateParams) {
    $scope.post = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    Category.singledata($scope.params).then(function(res) {
        
        if (res == null) {
            window.location.href = '/404';
        } else {
             
             $scope.post = res.data;
          
        }
    });
    $scope.editCategory = function() {

        $scope.newPost = {};
        $scope.newPost.title = this.post.category;
        $scope.newPost.id = $scope.params.path;
        Category.update($scope.newPost).then(function(res) {
            
            alert(res.message);
            
            
        });
         window.location.href = '/admin/dashboard#/allCategories';
    }
})
/*
* Add Client
*/
adminApp.controller('addClientCtrl',function($scope,Clients){
    $scope.post = {}
    $scope.addPost = function(){
        $scope.newClient = {};
        $scope.newClient.image = this.post.image;

        Clients.add($scope.newClient).then(function(res) {
          
        });
        // Users.add($scope.newPost);
        this.post = {};
        
    }
});
adminApp.controller('ClientListCtrl', function($scope,ClientsList,Clients) {
    
    $scope.posts = ClientsList;
    $scope.activePost = false;
    $scope.setActive = function(user) {
        $scope.activePost = user;
        
    }
    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
        
        Category.remove($scope.data).then(function(res) {
          
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});
/*
* Add testimonials
*/
adminApp.controller('addTestimonialCtrl', function($scope,Testimonial) {
    $scope.post={};
    $scope.addPost = function() {
        
        $scope.newPost = {};
        $scope.newPost.name = this.post.name;
        $scope.newPost.image = this.post.image;
        $scope.newPost.description = this.post.description;

        Testimonial.add($scope.newPost).then(function(res) {
         
        });
        this.post = {};
    };
});
/*
* 
*/
adminApp.controller('TestimonialListCtrl', function($scope,testimonialList,Testimonial) {
    
    $scope.posts = testimonialList;
    $scope.activePost = false;
    $scope.setActive = function(user) {
        $scope.activePost = user;
       
    }
    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
        
        Testimonial.remove($scope.data).then(function(res) {
           
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});
/*
* ContactListCtrl
*/
adminApp.controller('ContactListCtrl', function($scope,ContactList,Contact) {
    
    $scope.posts = ContactList;
    $scope.activePost = false;
    $scope.setActive = function(user) {
        $scope.activePost = user;
       
    }
    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
       
        Contact.remove($scope.data).then(function(res) {
            
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});
/*
* RequestsListCtrl
*/
adminApp.controller('RequestsListCtrl', function($scope,RequestsList,Careers) {
    
    $scope.posts = RequestsList;
    $scope.activePost = false;
    $scope.setActive = function(user) {
        $scope.activePost = user;
        
    }
    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
        
        Careers.remove($scope.data).then(function(res) {
         
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});

adminApp.controller('addSerialCtrl', function($scope,Users,$rootScope,$sce, Serials) {
    
    $('#mydiv').hide();
    $scope.trailer = '';
    $scope.thumbnail = function(inputthumb){
        $scope.loadingthumb = true;
       

         Users.uploadimage(inputthumb.files[0]).then(function(res) {

            $scope.loadingthumb = false;
            if(res){
             
             $scope.thumbb = res[0].location;
         }
     })
             
    }
    
        $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
        $scope.trailerupload = function(inputvideo){
        $scope.loadingtrail = true;
       

         Serials.uploadimage(inputvideo.files[0]).then(function(res) {

            $scope.loadingtrail = false;
            if(res){
            
             $scope.trailer = res[0].location;
         }        
        });
    }

   $scope.addSerial = function() {
       $scope.newPost = {};
        $('#mydiv').show(); 
        
        $scope.newPost.title = this.serial.title;
        $scope.newPost.description = this.serial.description;
        $scope.newPost.image = $scope.thumbb;
        $scope.newPost.trailer = $scope.trailer;
      
        
            Serials.add($scope.newPost).then(function(res) {
                
                $('#mydiv').hide();
            });
            //allSerials
            window.location.href = '/admin/dashboard#/allSerials';
            // Posts.add($scope.newPost);
            this.serial = {};
        
    };
    

//    
    
   
})

adminApp.controller('allSerialsCtrl', function($scope,$sce,Users,$rootScope, Serials) {
        Serials.all().then(function(data){
        $("#mydiv").hide();
        $scope.posts = data.data;
        $(document).ready(function() {
                $('#example1').DataTable();
            } );
    });
    
     $scope.setActive = function(post){
        
         $scope.active = true;
         $scope.activePost = post;
     } 
    
    
    $scope.deletepost = function(id) {
        $scope.data={};
        $scope.data.id=id;
        
        Serials.remove($scope.data).then(function(res) {
           
            if (res) {
                alert(res.message);
                Serials.all().then(function(res) {
                    
                    $scope.posts = res.data;
                })
//                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
    
     $scope.trailersrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
    
}) 
    
     adminApp.controller('addSeasonCtrl', function($scope,Seasons,$rootScope,$sce, Serials,$stateParams) {
        $scope.newSeason = {};
       $scope.trailer = '';
       $scope.newSeason.id = $stateParams.id;
       
       $("#mydiv").hide();
        $scope.thumbnail = function(inputthumb){
        $scope.loadingthumb = true;
       

         Seasons.uploadimage(inputthumb.files[0]).then(function(res) {

            $scope.loadingthumb = false;
            if(res){
            
             $scope.thumbb = res[0].location;
         }
     })
             
    }
    
        $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
        $scope.trailerupload = function(inputvideo){
        $scope.loadingtrail = true;
      
         Seasons.uploadimage(inputvideo.files[0]).then(function(res) {

            $scope.loadingtrail = false;
            if(res){
             
             $scope.trailer = res[0].location;
         }        
        });
    }
    
    $scope.addSeason = function(){
        
        $scope.newSeason.title = this.post.title;
        $scope.newSeason.price = this.post.price;
        
        
        Seasons.addSeason($scope.newSeason).then(function(res) {

         
         alert(res.message);
                 
        });
        
         window.location.href = '/admin/dashboard#/allSerials';
       
    }
    
    
    });
 adminApp.controller('addEpisodeCtrl', function($scope,Seasons,Episodes,Users,$rootScope,$sce, Serials,$stateParams) {
     $scope.post = {};
       $("#mydiv").hide(); 
       $scope.newSeason = {};
       $scope.newEpisode = {};
       $scope.trailer = '';
       $scope.video = '';
       $scope.newSeason.id = $stateParams.ids;
      
       $scope.newEpisode.serialname = $stateParams.name;
     
     Seasons.allSeasons($scope.newSeason).then(function(data){
         
        $("#mydiv").hide();
        $scope.serial = data.allseason;
    });
    
        $scope.user={}
        $scope.fields=[];
        $scope.additionalservices = function(){
        $scope.fields.push(Math.random());
        }
        
        $scope.season = function(){
        Seasons.allSeasons($scope.newSeason).then(function(data){
         
        $("#mydiv").hide();
        for(var i=0;i<data.allseason.length;i++){
           
            if($scope.post.seasonname == data.allseason[i].season_name){
                
                $scope.newEpisode.seasonid = data.allseason[i]._id;
                $scope.newEpisode.seasonname = data.allseason[i].season_name;
                
                return false;
            }else{
                
            }
        }
        
             }); 
        }
        
        $scope.thumbnail = function(inputthumb){
        $scope.loadingthumb = true;
       

         Users.uploadimage(inputthumb.files[0]).then(function(res) {

            $scope.loadingthumb = false;
            if(res){
            
             $scope.thumbb = res[0].location;
         }
     })
             
    }
    
        $scope.trailerupload = function(inputthumb){
        $scope.loadingtrail = true;
        
         Seasons.uploadimage(inputthumb.files[0]).then(function(res) {

            $scope.loadingtrail = false;
            if(res){
             
             $scope.trailer = res[0].location;
         }
     })
             
    }
    
        $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  
  
          $scope.videoupload = function(inputthumb){
        $scope.loadingvideo = true;
       
         Seasons.uploadimage(inputthumb.files[0]).then(function(res) {

            $scope.loadingvideo = false;
            if(res){
            
             $scope.video = res[0].location;
         }
     })
             
    }
    
            $scope.videosrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
    
    $scope.addEpisode = function(){
        
        
       
        
        $scope.newEpisode.title = this.post.title;
        $scope.newEpisode.desc = this.post.description;
        $scope.newEpisode.duration = this.post.duration;
        $scope.newEpisode.thumb = $scope.thumbb;
        $scope.newEpisode.trailer = $scope.trailer;
        $scope.newEpisode.video = $scope.video;
        $scope.newEpisode.serialid = $scope.newSeason.id;
        
        Episodes.addEpisode($scope.newEpisode).then(function(res) {

           
            if(res){
             
             alert(res.message);
             window.location.href = '/admin/dashboard#/episodeList';
            
         }
     })
        
    }
    

 });
 
 
  adminApp.controller('editEpisodeCtrl', function($scope,Seasons,Episodes,Users,$rootScope,$sce, Serials,$stateParams) {
      $("#mydiv").hide();
    $scope.data = {};
    $scope.editepisode = {};
    $scope.newSeason = {};
    $scope.newEpisode = {};
    $scope.post = {};
    $scope.data.id = $stateParams.paraml;
   
    Episodes.sigledata($scope.data).then(function(data){
        
        $scope.post = data.data;
        $scope.newSeason.id = data.data.serial_id;
        $scope.newSeason.serialName = data.data.serial_name;
        
        Seasons.allSeasons($scope.newSeason).then(function(data){
            
            $("#mydiv").hide();
            $scope.serial = data.allseason;
        });
    });
    
        $scope.thumbnail = function(inputthumb){
        $scope.loadingthumb = true;
       

         Users.uploadimage(inputthumb.files[0]).then(function(res) {

            $scope.loadingthumb = false;
            if(res){
             
             $scope.post.thumbnail = res[0].location;
         }
     })
             
    }
    
        $scope.trailerupload = function(inputthumb){
        $scope.loadingtrail = true;
        

         Users.uploadimage(inputthumb.files[0]).then(function(res) {

            $scope.loadingtrail = false;
            if(res){
            
             $scope.post.trailer = res[0].location;
         }
     })
             
    }

  
          $scope.videoupload = function(inputthumb){
        $scope.loadingvideo = true;
       

         Users.uploadimage(inputthumb.files[0]).then(function(res) {

            $scope.loadingvideo = false;
            if(res){
              
             $scope.post.video = res[0].location;
         }
     })
             
    }
        $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }
        $scope.videosrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      } 

      $scope.editEpisode = function() {
          
        Seasons.allSeasons($scope.newSeason).then(function(data){
       
        $("#mydiv").hide();
        for(var i=0;i<data.allseason.length;i++){
           
            if($scope.post.season_name == data.allseason[i].season_name){
                
                $scope.newEpisode.seasonid = data.allseason[i]._id;
                $scope.newEpisode.seasonname = data.allseason[i].season_name;
                
                $scope.editepisode.id = $scope.data.id;
                $scope.editepisode.title = $scope.post.title;
                $scope.editepisode.season_name = $scope.post.season_name;
                $scope.editepisode.description = $scope.post.description;
                $scope.editepisode.thumb = $scope.post.thumbnail;
                $scope.editepisode.trailer = $scope.post.trailer;
                $scope.editepisode.video = $scope.post.video;
                $scope.editepisode.seasonid = $scope.newEpisode.seasonid;
                $scope.editepisode.serial_name = $scope.newSeason.serialName;
                
      //          $scope.editepisode.season_name = $scope.newEpisode.seasonname;
                $scope.editepisode.serial_id = $scope.newSeason.id;
                
                
                Episodes.update($scope.editepisode).then(function(data){
                    alert(data.message);
                })
                
                return false;
            }else{
                
            }
        }
        
             });
             
             
        window.location.href = '/admin/dashboard#/episodeList';     
             
          
      }
      
      

  })
  
  
 adminApp.controller('episodeListCtrl', function($scope,Seasons,Episodes,$rootScope,$sce, Serials,$stateParams) {
     $("#mydiv").hide();
     Episodes.allepisodes().then(function(res) {
         
         $scope.posts = res.data;
                 $(document).ready(function() {
                $('#example1').DataTable();
        } );
     })
     $scope.setActive = function(post){
         
         $scope.active = true;
         $scope.activePost = post;
     }
            $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  
  
              $scope.trailersrc = function(src) {
    return $sce.trustAsResourceUrl(src);
    
    
  }
  
      $scope.deletepost = function(id) {
        $scope.data={};
        $scope.data.id=id;
       
        Episodes.remove($scope.data).then(function(res) {
            
            if (res) {
                alert(res.message);
                    Episodes.allepisodes().then(function(res) {
                        
                        $scope.posts = res.data;
                                $(document).ready(function() {
                               $('#example1').DataTable();
                       } );
                        })
//                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
 });
 
 
 
  adminApp.controller('addPlanCtrl', function($scope,Users,Plans,$rootScope,$sce,$stateParams) {
      $("#mydiv").hide();
      $scope.planpost = {};
      
    $scope.fileNameChanged = function(input) {
   
          $scope.loading = true;
     
        Users.uploadimage(input.files[0]).then(function(res) {

            $scope.loading = false;
            if(res){
             
             $scope.imgshow = res[0].location;
             
            }
          
        });
    }
    
    
    
      $scope.addPlan = function(){
        
         $scope.planpost.subscription = this.post.subscription;
         $scope.planpost.days = this.post.days;
         $scope.planpost.price = this.post.price;
         $scope.planpost.image = $scope.imgshow;
        
         Plans.add($scope.planpost).then(function(res) {
         
         alert(res.msg);
     })
          window.location.href = '/admin/dashboard#/allPlans'; 
      }
  })
  
   adminApp.controller('allPlansCtrl', function($scope,Plans,Users,$rootScope,$sce,$stateParams) {
       Plans.all().then(function(res) {
         
         $scope.plans = res.data;
                 $(document).ready(function() {
                $('#example1').DataTable();
        } );
     })
     $scope.setActive = function(post){
         
         $scope.active = true;
         $scope.activePost = post;
     }
     
    $scope.deletepost = function(id) {
        $scope.data={};
        $scope.data.id=id;
        
        Plans.remove($scope.data).then(function(res) {
            
            if (res) {
                alert(res.message);
                Plans.all().then(function(res) {
                   
                    $scope.plans = res.data;
                })
//                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
   })
   
   adminApp.controller('editPlanCtrl', function($scope,Plans,Users,$rootScope,$sce,$stateParams) {
        $("#mydiv").hide();
        $scope.plan={};
        $scope.postplan = {};
         $scope.plan.id =  $stateParams.paraml;
         Plans.singledata($scope.plan).then(function(res) {
        
         $scope.post = res.data;
     })
     
     $scope.fileNameChanged = function(input) {
   
          $scope.loading = true;
    
        Users.uploadimage(input.files[0]).then(function(res) {
            $scope.loading = false;
            if(res){
              
             $scope.post.planimage = res[0].location;
             $scope.postplan.image = $scope.post.planimage;
             
            }
          
        });
    }
    
    $scope.editplan = function(){
        $scope.postplan.title = this.post.title;
        $scope.postplan.days = this.post.days;
        $scope.postplan.price = this.post.price;
        $scope.postplan.id = $scope.plan.id;
        
        Plans.update($scope.postplan).then(function(res) {
         
         alert(res.message);
        
     })
        window.location.href = '/admin/dashboard#/allPlans';  
    }

       
   })
   
   
   adminApp.controller('editSerialCtrl', function($scope,Serials,Users,$rootScope,$sce,$stateParams) {
     $scope.data = {};
     $scope.data.id = $stateParams.paraml;
     Serials.singledata($scope.data).then(function(data){
         
        $scope.posts = data.data;
    });
    $scope.posts ={};
//    $scope.posts = {};
         $scope.fileNameChanged = function(input) {
          
          $scope.loading = true;
         
          Users.uploadimage(input.files[0]).then(function(res) {
          
            $scope.loading = false;
            if(res){
              
             $scope.posts.thumbnail = res[0].location;
             
            }
          
        });
    }
    
    
        $scope.trailerupload = function(inputvideo){
             $scope.loadingtrail = true;
            
              Users.uploadimage(inputvideo.files[0]).then(function(res) {

                 $scope.loadingtrail = false;
                 if(res){
                  
                  $scope.posts.trailer = res[0].location;
              }        
             });
         }
        $scope.trailersrc = function(src) {
            return $sce.trustAsResourceUrl(src);
            }
        
        
        $scope.editSerial= function(){
           
            $scope.posts.title = this.posts.title;
            $scope.posts.description = this.posts.description;
            $scope.posts.id = $scope.data.id;
            
            Serials.update($scope.posts).then(function(res) {
                    
                    
                   
                    alert(res.message);
                
                  window.location.href = '/admin/dashboard#/allSerials';  
             });
        }
        
        $("#mydiv").hide(); 
        
   })
   
   
    adminApp.controller('actorsListCtrl', function($scope,Actors,$rootScope,$sce,$stateParams) {
        Actors.allList().then(function(res) {
                   $("#mydiv").hide(); 
                    
                   
                   $scope.posts = res.data;
                        $(document).ready(function() {
                       $('#example1').DataTable();
                   } );
                    
             });
    })
    
    adminApp.controller('staticPageCtrl', function($scope,Pages,$rootScope,$sce,$stateParams) {
        $("#mydiv").hide(); 
        $scope.addPost = {};
        $scope.addPage = function(){
        
        $scope.addPost.title = this.post.title;
        $scope.addPost.desc = this.post.description;
        $scope.addPost.typename = this.post.type;
        
        Pages.add($scope.addPost).then(function(res) {
                  
                    
                 
               
                    
             });
         }
        
    })
    
    
        adminApp.controller('paymentlistCtrl', function($scope,Payments,$rootScope,$sce,$stateParams) {
        $("#mydiv").hide(); 
        
        Payments.all().then(function(res) {
                  
                    
                   
               $scope.payments = res.data;
                $(document).ready(function() {
                       $('#example1').DataTable();
                   } );
                    
             });
        
    })

            adminApp.controller('pageslistCtrl', function($scope,Pages,$rootScope,$sce,$stateParams) {
        $("#mydiv").hide(); 
        
        Pages.alllist().then(function(res) {
                  
                    
                   
               $scope.pages = res.data;
              console.log($scope.pages);
               
               $(document).ready(function() {
                       $('#example1').DataTable();
                   } );
                    
             });
                 $scope.setActive = function(post) {
        $scope.active = true;
   
        $scope.activePost = post;
    
    }
        
    })
    
    
    
      adminApp.controller('editPageCtrl', function($scope,Pages,$rootScope,$sce,$stateParams) {
           $scope.data = {};
           $scope.newdata = {};
            $scope.data.id = $stateParams.paraml;
            Pages.singledata($scope.data).then(function(data){
            
           $scope.post = data.data;
       });
       $scope.editpage = function(){
           $scope.newdata.id = $scope.data.id;
           $scope.newdata.title = this.post.title;
           $scope.newdata.description = this.post.description;
           
           Pages.editdata($scope.newdata).then(function(data){
            
            alert(data.message);
       });
        window.location.href = '/admin/dashboard#/pageslist'; 
       }
      })
      
      
      
     adminApp.controller('addActorsCtrl', function($scope,Actors,Pages,Users,$rootScope,$sce,$stateParams) {
           $scope.data = {};
           $scope.newdata = {};
            $scope.data.id = $stateParams.id;

       
       $scope.thumbnail = function(inputthumb){
        
        $scope.loading = true;
       

         Users.uploadimage(inputthumb.files[0]).then(function(res) {

            $scope.loading = false;
            if(res){
             
             $scope.thumb = res[0].location;
         }
     })     
    }
    
    
       $scope.addactors = function(){
       
           $scope.newdata.name = this.post.actorname;
           $scope.newdata.description = this.post.description;
           $scope.newdata.image = $scope.thumb;
     
           
           Actors.addactor($scope.newdata).then(function(data){
            
            alert("Actor Added");
            window.location.href = '/admin/dashboard#/actorsList';
            
       });
       }
      });