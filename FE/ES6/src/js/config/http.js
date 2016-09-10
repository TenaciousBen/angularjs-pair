export function useXDomain($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
}