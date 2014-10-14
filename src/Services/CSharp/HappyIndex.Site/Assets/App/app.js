var happyApp = angular.module('happy', ['ngRoute', 'ngResource', 'dataServices', 'ui.bootstrap', 'googlechart', 'happyFilters', 'ngCookies']);
happyApp.config(function($routeProvider) {
    $routeProvider
        .when('/indicator', {
            templateUrl: 'assets/app/partials/indicator.html', controller : 'IndicatorController'
        })
        .when('/questions', {
            templateUrl: 'assets/app/partials/managequestions.html', controller: 'ManageQuestionsController'
        })
        .when('/pollingstation', {
            templateUrl: 'assets/app/partials/pollingstation.html', controller: 'PollingStationController'
        })
        .when('/report', {
            templateUrl: 'assets/app/partials/report.html', controller: 'ReportController'
        })
        .otherwise({ redirectTo: '/indicator' });
})
    .run(function ($rootScope, $templateCache) {
        $rootScope.$on('$viewContentLoaded', function () {
            $templateCache.removeAll();
        });
});