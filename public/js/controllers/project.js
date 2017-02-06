/**
 * Created by rdantzer on 18/06/16.
 */

(function () {
    'use strict';

    angular.module('ProjectCtrl', ['ngMaterial', 'ui.router', 'restangular', 'chart.js'])
        .controller('ProjectController', function ($state, $scope, $rootScope, API_EVENTS, Restangular, Session) {
            $scope.$state = $state;

            Restangular.all('profiles').getList().then(function (profiles) {
                $scope.profiles = profiles;
            });

            $scope.status = function (id) {
                Restangular.one('profiles', id).get().then(function (profile) {
                    $scope.profile = profile;
                    $state.go('project.detail', {"projectId": id});
                });
            };

        });
})();