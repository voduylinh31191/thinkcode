(function() {
  'use strict';

  angular.module('app', [
      'ngResource',
      'ngSanitize',
      'ngAnimate',
      'ngAria',
      'ui.router',
      'ui.utils',
      'ui.bootstrap',
      'angularBootstrapNavTree',
      'ngFileUpload',
      'angularResizable',
      'ui.router.middleware',
      'ngToast',
      'utils',
      'thinkcodeControllers',
      'firebase',
      'slick',
      'ngMouseDrag',
      'iso.directives',
      'textAngular'
    ]).constant("$MD_THEME_CSS", "default")
    .constant('API_URL', 'https://www.thinkcode.ml/api/v1');


  angular.module('thinkcodeControllers', []);

  var app = angular.module('app')
    // .factory('httpRequestInterceptor', function() {
    //   return {
    //     request: function(config) {
    //       config.headers['Origin'] = '*';
    //       return config;
    //     }
    //   };
    // })
    // .run(['$http', function($http) {
    //   $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // }])
    .factory('authInterceptor', function($q, $injector) {
      return {
        'request': function(config) {
          // config.headers['Access-Control-Allow-Origin'] = '*';
          // config.headers['Origin'] = '*';
          return config;
        },
        'requestError': function(rejection) {
          return $q.reject(rejection);
        },
        'response': function(response) {
          return response;
        },
        'responseError': function(response) {
          if (response.status === 401) {
            var state = $injector.get('$state');
            state.go('main.courses', { type: 'published' }, { reload: true });
          }
          return $q.reject(response);
        }
      };
    })
    .config(
      ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$interpolateProvider',
        '$httpProvider', 'ngToastProvider',
        function($controllerProvider, $compileProvider, $filterProvider, $provide, $interpolateProvider,
          $httpProvider, ngToastProvider) {
          app.controller = $controllerProvider.register;
          app.directive = $compileProvider.directive;
          app.filter = $filterProvider.register;
          app.factory = $provide.factory;
          app.service = $provide.service;
          app.constant = $provide.constant;
          app.value = $provide.value;

          $interpolateProvider.startSymbol('::');
          $interpolateProvider.endSymbol('::');
          $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) {
            taOptions.forceTextAngularSanitize = false;
            taOptions.toolbar = [
              ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
              ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'clear'],
              ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
              ['insertImage', 'insertLink', 'insertVideo']
            ];
            return taOptions;
          }]);

          // $httpProvider.interceptors.push('authInterceptor');
          ngToastProvider.configure({
            animation: 'slide',
            combineDuplications: true,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            maxNumber: 3
          });
        }
      ]);

})();
