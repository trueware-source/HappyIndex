
function PollingStationController($scope, pollingStationService, questionsService, $rootScope) {

    $scope.model = {};
    $scope.model.pollingStation = { questionIds: [] };
    pollingStationService.getPollingStations().then(function (data) {
        $scope.model.pollingStations = data;
        $scope.model.pollingStation = $scope.model.pollingStations[0];
    });

    questionsService.getQuestions('happy').then(function (data) { $scope.model.happyQuestions = data; });
    questionsService.getQuestions('unhappy').then(function (data) { $scope.model.unhappyQuestions = data; });
  
    $scope.questionEnabled = function(id) {
        var i;
        for (i = 0; i <= $scope.model.pollingStation.questionIds.length; i = i + 1) {
            if (id === $scope.model.pollingStation.questionIds[i]) {
                return true;
            }
        }
        return false;
    };

    $scope.toggleQuestion = function(id) {
        if ($scope.questionEnabled(id)) {
            var index = $scope.model.pollingStation.questionIds.indexOf(id);
            if(index > -1) {
                $scope.model.pollingStation.questionIds.splice(index, 1);
            }
        } else {
            $scope.model.pollingStation.questionIds.push(id);
        }
        pollingStationService.updatePollingStation($scope.model.pollingStation).
            then(function () { });
    };
}

PollingStationController.$inject = ['$scope', 'pollingStationService', 'questionsService', '$rootScope'];