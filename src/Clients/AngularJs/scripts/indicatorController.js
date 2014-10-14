function IndicatorController($scope, $log, $timeout, $location, pollingStationService, questionsService, Feedback, $cookies, $rootScope, $window) {
    $scope.model = {};
    $scope.model.clickingSmiley = false;
    $scope.model.clickingNeutral = false;
    $scope.model.clickingSaddy = false;
    $scope.model.stations = [];
    $scope.model.allHappyQuestions = [];
    $scope.model.allUnhappyQuestions = [];
    
    //get the polling stations
    pollingStationService.getPollingStations().then(function(stations) {
        var i, happyStationId;

        $scope.model.stations = stations;

        happyStationId = '';
        if ($window.localStorage.getItem('happyStationId')) {
            happyStationId = $window.localStorage.getItem('happyStationId');
        }

        for (i = 0; i < $scope.model.stations.length; i = i + 1) {
            if ($scope.model.stations[i].id === happyStationId) {
                $scope.model.station = $scope.model.stations[i];
                $scope.setPollingStation(happyStationId);
            }
        }
    });
    
    //get happy questions
    questionsService.getRandomQuestions('happy', 4).then(function (questions) {
        $scope.model.allHappyQuestions = questions;
        $scope.populateStationQuestions();
    });

    //get the unhappy
    questionsService.getRandomQuestions('unhappy', 4).then(function(questions) {
        $scope.model.allUnhappyQuestions = questions;
        $scope.populateStationQuestions();
    });

    $scope.populateStationQuestions = function() {
        var i, k;
        
        if (!$scope.model.station) {
            return;
        }
        
        $scope.model.happyQuestions = [];
        $scope.model.unhappyQuestions = [];
        for (i = 0; i < $scope.model.station.questionIds.length; i = i + 1) {
            for (k = 0; k < $scope.model.allHappyQuestions.length; k = k + 1) {
                if ($scope.model.allHappyQuestions[k].id === $scope.model.station.questionIds[i]) {
                    $scope.model.happyQuestions.push($scope.model.allHappyQuestions[k]);
                }
            }
            for (k = 0; k < $scope.model.allUnhappyQuestions.length; k = k + 1) {
                if ($scope.model.allUnhappyQuestions[k].id === $scope.model.station.questionIds[i]) {
                    $scope.model.unhappyQuestions.push($scope.model.allUnhappyQuestions[k]);
                }
            }
        }
    };

    $scope.saveFeedback = function(indicator, questionId) {
        if (indicator === -1) {
            $scope.model.clickingSaddy = true;
        }
        if (indicator === 0) {
            $scope.model.clickingNeutral = true;
        }
        if (indicator === 1) {
            $scope.model.clickingHappy = true;
        }

        var feedback = new Feedback();
        feedback.pollingStation = $scope.model.station.name;
        feedback.indicator = indicator;
        feedback.questionId = questionId;
        feedback.$save(null, function() {
            $scope.alert = { type: 'success', message: 'Feedback added successfully.' };
        }, function() {
            $scope.alert = { type: 'error', message: 'Feedback was NOT created!' };
        });

        var stop = $timeout(function() {
            $scope.model.clickingSaddy = $scope.model.clickingNeutral = $scope.model.clickingHappy = false;
            $timeout.cancel(stop);
        }, 250);
    };

    $scope.$watch("model.station", function(newValue, oldValue) {
        if (newValue) {
            $window.localStorage.setItem('happyStationId', newValue.id);
        }
    });

    $scope.setPollingStation = function(id) {
        $scope.populateStationQuestions();
        $rootScope.currentPollingStation = $scope.model.station;
    };
}

IndicatorController.$inject = ['$scope', '$log', '$timeout', '$location', 'pollingStationService', 'questionsService', 'Feedback', '$cookies', '$rootScope', '$window'];