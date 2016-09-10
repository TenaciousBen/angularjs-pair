const angular = require("angular");
const angularMocks = require("angular-mocks");
const app = require("../../../src/js/app");
import {HotelApiModel} from "../../../src/views/hotels/hotelsService";

//In browserified tests we have to access the angular mock functions via the window scope
var module = window.angular.mock.module;
var inject = window.angular.mock.inject;

describe("Hotel service", function () {
    var hotelsService, $httpBackend;
    beforeEach(function () {
        module("hotelerific");
        module(($urlRouterProvider) => $urlRouterProvider.deferIntercept());
        inject((_hotelsService_, _$httpBackend_) => {
            hotelsService = _hotelsService_;
            $httpBackend = _$httpBackend_;
        });
    });

    it("should get data as view models", function (done) {
        var id = 1, name = "Foo Inn", city = "Fooington Square", pricePerNight = 1235.50;
        $httpBackend.whenGET("http://localhost:12345/api/hotel")
            .respond((method, url, data, headers, params) => [200, [new HotelApiModel(id, name, city, pricePerNight)]]);
        hotelsService.getHotels()
            .then((hotels) => {
                expect(hotels.length).toBe(1);
                var hotel = hotels[0];
                expect(hotel.id).toBe(id);
                expect(hotel.name).toBe(name);
                expect(hotel.city).toBe(city);
                expect(hotel.pricePerNight).toBe(pricePerNight);
                done();
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
        $httpBackend.flush();
    });
});