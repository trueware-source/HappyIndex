function PollingStationStatusCtrl($scope, $timeout, pollingStationService, $rootScope) {
    $scope.model = {};
    
    var getReports = function () {
        var pollingStationName = '';
        if ($rootScope.currentPollingStation) {
            pollingStationName = $rootScope.currentPollingStation.name;
        }
        pollingStationService.getPollingStationReport(pollingStationName).then(function (data) {
            $scope.model.stationReport = data;
        });
        pollingStationService.getCompanyFeedbackReport().then(function (data) {
            $scope.model.companyReport = data;
        });
    };
    getReports();
    
    var pollReports = function () {
        $timeout(function () {
            getReports();
            pollReports();
        }, 20000);
    };
    pollReports();
}

PollingStationStatusCtrl.$inject = ['$scope', '$timeout', 'pollingStationService', '$rootScope'];