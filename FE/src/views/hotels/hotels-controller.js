export function hotelsController($scope, Hotels) {

    $scope.init = function() {
        Hotels.query().$promise.then(function (data) {
            $scope.hotels = data;
            if (data === undefined || data.length === 0) return;

            $scope.columns = Object.keys(data[0]);
        });
    }
};