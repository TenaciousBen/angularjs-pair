const angular = require("angular");
const angularUiRouter = require("angular-ui-router");
import {useXDomain} from "./config/http";
import {routes} from "./config/routing";
import {HotelsController} from "../views/hotels/hotelsController";
import {HotelsService} from "../views/hotels/hotelsService";
import {ComparisonFilter} from "./filters/ComparisonFilter";

//sets up the 'hotelerific' module and its dependency injection
//this file is the index for the browserify transpiler, so all js code must be referenced above in order for it to be
//transpiled into the combined.js file sent to the browser

angular.module("hotelerific", [
    "ui.router"
    ])
    //global configurations
    .config(useXDomain)
    .config(["$locationProvider", "$stateProvider", "$urlRouterProvider", routes])
    //filters
    .filter("comparisonFilter", ComparisonFilter)
    //hotels
    .controller("hotelsController", ["hotelsService", HotelsController])
    .service("hotelsService", ["$q", "$http", HotelsService]);