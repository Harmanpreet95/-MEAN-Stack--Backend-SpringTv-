
var teamsModule = angular.module('fwrk.teams', []);

teamsModule.service('Teams', function($http) {

    return {
        all: function() {
            console.log("all");
            return $http.get('/api/teams').then(function(teamList) {
                return teamList.data;
            });
        },
        add: function(newUser) {
            console.log(newUser);
            return $http({
                method: 'post',
                url: '/api/adminteams',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
         
        remove: function(usr) {
            console.log(usr);
            return $http({
                method: 'post',
                url: '/api/deleteteam',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        update: function(usr) {
            console.log(usr);
            return $http({
                method: 'post',
                url: '/api/editteamID',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        singledata: function(id) {
            console.log(id);
            return $http({
                method: 'post',
                url: '/api/adminfetchteamdata',
                data: id
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        changepass: function(newUser) {
                    console.log("module");
                    console.log(newUser);
                return $http({
                    method: 'post',
                    url: '/api/change_passw',
                    data: newUser
                }).then(function(res) {
                    // return the new post
                    return res.data;
                }).catch(function(err) {
                    console.error('Something went wrong adding the post!');
                    console.error(err);
                    return err;
                });
                },
        changePassword: function(salt) {
//            console.log("here")
//            console.log(salt);
//            return false;
            return $http({
                method: 'post',
                url: '/api/changePassword',
                data: salt
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong in changing the password!');
                console.error(err);
                return err;
            });

        },
       uploadimage: function(image) {
            
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", image);
            console.log(fd);
            return $http({
                method: 'post',
                url: '/api/uploadteamimage',
                data: fd,
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
                 userForgot: function(forUser) {
                    //console.log("module");
                    //console.log(forUser);
                return $http({
                    method: 'post',
                    url: '/api/forgetpass',
                    data: forUser
                }).then(function(res) {
                    // return the new post
                    return res.data;
                }).catch(function(err) {
                    console.error('Something went wrong adding the post!');
                    console.error(err);
                    return err;
                });
                },   
                adminForgot: function(forUser) {
                    //console.log("module");
                    //console.log(forUser);
                return $http({
                    method: 'post',
                    url: '/api/forgetpassword',
                    data: forUser
                }).then(function(res) {
                    // return the new post
                    return res.data;
                }).catch(function(err) {
                    console.error('Something went wrong adding the post!');
                    console.error(err);
                    return err;
                });
                },  
              
            profileupdate: function(usr) {
            console.log(usr);
            return $http({
                method: 'post',
                url: '/api/editusrdetailsweb',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
    }
});