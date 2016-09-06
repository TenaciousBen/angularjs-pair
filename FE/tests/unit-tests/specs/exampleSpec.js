const angular = require("angular");
const angularMocks = require("angular-mocks");
const app = require("../../../src/js/app");

import {HotelsController} from "../../../src/views/hotels/hotelsController"
import {HotelViewModel} from "../../../src/views/hotels/hotelsService"

//In browserified tests we have to access the angular mock functions via the window scope
var module = window.angular.mock.module;
var inject = window.angular.mock.inject;

var hotelServiceMock = {
    postHotel: function (hotelViewModel) {
        return hotelViewModel;
    }
};

describe("This example", function () {
    it("should always pass", function () {
        expect(true).not.toBe(false);
    })
    it("Should set filter field", function () {
        var fieldName = "foo";
        var controller = new HotelsController();
        controller.setFilterField(fieldName);
        expect(controller.hotelSortField.name).toBe(fieldName);
        controller.setFilterField(fieldName);
        expect(controller.hotelSortField.isReversed).toBe(true);
    })
});