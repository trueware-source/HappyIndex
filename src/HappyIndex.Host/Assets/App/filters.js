angular.module('happyFilters', []).filter('happinessIndex', function () {
    return function (index) {
        if (!index) {
            return 0;
        }
        if (index > 0) {
            return "+" + index;
        } else {
            return index;
        }
    };
});