const angular = require("angular");
const angularUiRouter = require("angular-ui-router");
import {useXDomain} from "./config/http";
import {routes} from "./config/routing";

angular.module("hotelerific", [
    "ui.router"
    ])
    .config(useXDomain)
    .config(["$stateProvider", "$urlRouterProvider", routes]);