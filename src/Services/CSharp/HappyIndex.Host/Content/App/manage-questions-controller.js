
function ManageQuestionsController($scope, questionsService) {

    $scope.model = {};
    questionsService.getQuestions('happy').then(function (data) { $scope.model.happyQuestions = data; });
    questionsService.getQuestions('unhappy').then(function (data) { $scope.model.unhappyQuestions = data; });

    $scope.addHappyQuestion = function (text) {
        $scope.model.happyQuestions.push({ text: text });
        questionsService.addQuestion(text, 'happy');
    };
    
    $scope.addUnhappyQuestion = function (text) {
        $scope.model.unhappyQuestions.push({ text: text });
        questionsService.addQuestion(text, 'unhappy');
    };
}

ManageQuestionsController.$inject = ['$scope', 'questionsService'];