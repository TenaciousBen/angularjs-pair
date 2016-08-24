export function routes($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/hotel");
    $stateProvider
        .state("root", {
            url: "/root",
            templateUrl: "/public/root.html"
        })
        .state("hotel", {
            url: "/hotel",
            templateUrl: "/public/hotels/hotels.html"
        });
}