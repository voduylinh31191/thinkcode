(function() {
  'use strict';

  angular.module('app')
    // .constant('API_URL', 'http://ec2-35-165-39-222.us-west-2.compute.amazonaws.com/api/v1')
    .constant('API_URL', 'https://www.thinkcode.ml/api/v1')
    .factory('DemoService', ['API_URL', '$http', function(API_URL, $http) {
      return {
        getWorkspaceById: function(id, callback, errorCallback) {
          $http.get(API_URL + '/workspaces/' + id)
            .then(function(res) {
              if (callback) {
                callback(res);
              }
            }, function() {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        loadFile: function(wsId, rel_path, callback, errorCallback) {
        	$http.get(API_URL + '/workspaces/' + wsId + '/load?relative_path=' + rel_path)
            .then(function(res) {
              if (callback) {
                callback(res);
              }
            }, function() {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        execute: function(wsId, rel_path, engine, callback, errorCallback) {
        	$http.get(API_URL + '/workspaces/' + wsId + '/execute?engine=' + engine + '&relative_path=' + rel_path)
            .then(function(res) {
              if (callback) {
                callback(res);
              }
            }, function() {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        saveFile: function(wsId, rel_path, content, callback, errorCallback) {
        	$http.patch(API_URL + '/workspaces/' + wsId + '/save?relative_path=' + rel_path + '&content=' + content)
            .then(function(res) {
              if (callback) {
                callback(res);
              }
            }, function() {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        }
      };
    }]);
})();
