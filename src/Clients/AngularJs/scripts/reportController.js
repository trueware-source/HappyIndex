function ReportController($scope, $timeout, pollingStationService, utils) {
    $scope.model = {};
    $scope.countFilter = function (reason) {
        return reason.count > 12;
    };

    var getReports = function () {
        $timeout(function() {
            pollingStationService.getCompanyFeedbackReport().then(function(data) {
                $scope.model.companyFeedbackReport = data;
                $scope.model.chart = {
                    "type": "LineChart",
                    "displayed": true,
                    "cssStyle": "height:600px; width:100%",
                    "curveType": "function",
                    "options": {
                        "colors": ['#FFA500', '#00FF00'],
                        "backgroundColor": "#404040",
                        "displayExactValues": true,
                        "vAxis": {
                            "gridlines": { "count": 5 },
                            "textStyle": { "color": "#fff" }
                        },
                        "hAxis": {
                            "baselineColor": "#fff",
                            "textStyle": { "color": "#fff" }
                        },
                        "legend": {
                            "position": "none"
                        }
                    }
                };

                $scope.model.chart.data = {
                    cols: [{ id: 'day', label: 'Day', type: 'string' },
                        { id: 'index', label: 'Happiness Index', type: 'number' },
                        { id: 'count', label: 'Count', type: 'number' }],
                    rows: []
                };

                for (var i = 0; i < $scope.model.companyFeedbackReport.dailyIndexes.length; i = i + 1) {
                    var index = $scope.model.companyFeedbackReport.dailyIndexes[i];
                    $scope.model.chart.data.rows.push({
                        c: [{ v: utils.getDayOfTheWeek(index.reportDate) }, { v: index.index }, { v: index.count }]
                    });
                }
            }, new Date(), new Date());
            getReports();
        }, 1000);
    };
    getReports();
}

ReportController.$inject = ['$scope','$timeout', 'pollingStationService', 'utils'];