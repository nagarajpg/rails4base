angular.module('sessionService', [])
  .factory('Session', ['$location', '$http', '$q', function ($location, $http, $q) {

    var service = {

      login: function (email, password, successCallback, errorCallback) {
        $http.post('/users/sign_in', {user: {email: email, password: password} })
          .success(function (data, status) {
            if (status === 200) {
              service.currentUser = data.user;
              successCallback(data, status);
              $location.path('/profile')
            }
          }).error(function (data, status, headers, config) {
            errorCallback(data, status);
          });
        return;
      },

      logout: function (successCallback, redirectTo) {
        $http.get('/users/logout').success(function (data, status) {
          service.currentUser = null;
          successCallback(data, status);
          window.location.href = '/home';
        });
      },

      // I implemented this to registrate via email only really fast! passwd will be auto gen. and kept on server and send by mail
      speedReg: function (email, successCallback, errorCallback) {
        $http.post('/users/sign_up', {user: {email: email} })
          .success(function (data, status) {
            service.currentUser = data.user;
            successCallback(data, status);
            $location.path('/profile')
          })
          .error(function (data, status) {
            errorCallback(data, status);
          })
      },
//
//      register: function (email, password, confirm_password) {
//        return $http.post('/users', {user: {email: email, password: password, password_confirmation: confirm_password} })
//          .then(function (response) {
//            service.currentUser = response.data;
//            if (service.isAuthenticated()) {
//              $location.path('/record');
//            }
//          });
//      },

      requestCurrentUser: function (successCallback, errorCallback) {

        $http.get('/users/restore')
          .success(function (data, status) {
            // success
            service.currentUser = data.user;
            successCallback(data, status);
          }).error(function (data, status) {
            // error
            //errorCallback(data, status);
          }
        );
        return;
      },

      currentUser: null,

      isAuthenticated: function () {
        return !!service.currentUser;
      }
    };

    return service;
  }]);