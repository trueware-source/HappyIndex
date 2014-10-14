var happyApp = angular.module('happy', ['ngRoute', 'ngResource', 'dataServices', 'ui.bootstrap', 'googlechart', 'happyFilters', 'ngCookies']);
happyApp.config(function($routeProvider) {
    $routeProvider
        .when('/indicator', {
            templateUrl: 'partials/indicator.html', controller : 'IndicatorController'
        })
        .when('/questions', {
          templateUrl: 'partials/managequestions.html', controller: 'ManageQuestionsController'
        })
        .when('/pollingstation', {
          templateUrl: 'partials/pollingstation.html', controller: 'PollingStationController'
        })
        .when('/report', {
          templateUrl: 'partials/report.html', controller: 'ReportController'
        })
        .otherwise({ redirectTo: '/indicator' });
})
    .run(function ($rootScope, $templateCache) {
        $rootScope.$on('$viewContentLoaded', function () {
            $templateCache.removeAll();
        });
});