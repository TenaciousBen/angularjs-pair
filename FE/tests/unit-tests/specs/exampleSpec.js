const angular = require("angular");
const angularMocks = require("angular-mocks");
const app = require("../../../src/js/app");

//In browserified tests we have to access the angular mock functions via the window scope
var module = window.angular.mock.module;
var inject = window.angular.mock.inject;

describe("This example", function () {
    it("should always pass", function () {
        expect(true).not.toBe(false);
    })
});