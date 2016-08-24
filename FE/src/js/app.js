const angular = require("angular");
const ngResource = require("angular-resource");
const angularUiRouter = require("angular-ui-router");
import {useXDomain} from "./config/http";
import {routes} from "./config/routing";
import {hotelsController} from "../views/hotels/hotels-controller";
import {Hotels} from "./resources/hotel-resource.js";
import {greaterThan} from "./components/greater-than-filter";

angular.module("hotelerific", [
    "ui.router",
    "ngResource"
    ])
    .config(useXDomain)
    .config(["$stateProvider", "$urlRouterProvider", routes])
    .controller('HotelsController', hotelsController)
    .factory('Hotels', Hotels)
    .filter('greaterThan', greaterThan);