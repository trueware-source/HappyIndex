var happyApp = angular.module('happy', ['ngRoute', 'ngResource', 'dataServices', 'ui.bootstrap', 'googlechart', 'happyFilters', 'ngCookies']);
happyApp.config(function($routeProvider) {
    $routeProvider
        .when('/indicator', {
            templateUrl: 'content/app/partials/indicator.html', controller : 'IndicatorController'
        })
        .when('/questions', {
          templateUrl: 'content/app/partials/managequestions.html', controller: 'ManageQuestionsController'
        })
        .when('/pollingstation', {
          templateUrl: 'content/app/partials/pollingstation.html', controller: 'PollingStationController'
        })
        .when('/report', {
          templateUrl: 'content/app/partials/report.html', controller: 'ReportController'
        })
        .otherwise({ redirectTo: '/indicator' });
})
    .run(function ($rootScope, $templateCache) {
        $rootScope.$on('$viewContentLoaded', function () {
            $templateCache.removeAll();
        });
});