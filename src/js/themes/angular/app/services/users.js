(function() {
  'use strict';

  angular.module('app')
    .factory('UserService', ['API_URL', '$http', function(API_URL, $http) {
      var user = null;
      return {
        getUser: function() {
          return JSON.parse(localStorage.user);
        },
        setUser: function(value) {
          user = value;
        },
        isLoggedIn: function() {
          return (localStorage.token) ? true : false;
        },
        signin: function(auth, callback, errorCallback) {
          $http.post(API_URL + '/signin', auth)
            .then(function(res) {
              if (res.data && res.data.session) {
                localStorage.token = res.data.session.token;
                localStorage.user = JSON.stringify(res.data.session.user);
              }
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        signup: function(data, callback, errorCallback) {
          $http.post(API_URL + '/signup', data)
            .then(function(res) {
              if (res.data && res.data.session) {
                localStorage.token = res.data.session.token;
                localStorage.user = JSON.stringify(res.data.session.user);
              }
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        signout: function(callback, errorCallback) {
          $http.delete(API_URL + '/signout?token=' + localStorage.token)
            .then(function(res) {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        }
      };
    }]);
})();