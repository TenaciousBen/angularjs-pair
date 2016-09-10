function useXDomain($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
}

angular.module("hotelerific").config(useXDomain);