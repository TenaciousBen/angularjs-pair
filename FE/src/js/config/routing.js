export function routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/hotel");
    $stateProvider
        .state("root", {
            url: "/root",
            templateUrl: "/public/root.html"
        })
        .state("hotel", {
            url: "/hotel",
            templateUrl: "/public/hotels/hotels.html",
            controller: "HotelsController"
        });
}