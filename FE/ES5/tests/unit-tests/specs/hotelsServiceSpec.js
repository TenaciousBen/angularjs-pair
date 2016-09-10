describe("Hotels service", function () {
    var hotelsService, $httpBackend;
    beforeEach(function () {
        module("hotelerific");
        module(function ($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        });
        inject(function (_hotelsService_, _$httpBackend_){
            hotelsService = _hotelsService_;
            $httpBackend = _$httpBackend_;
        });
    });

    it("should get data as view models", function (done) {
        var id = 1, name = "Foo Inn", city = "Fooington Square", pricePerNight = 1235.50;
        $httpBackend.whenGET("http://localhost:12345/api/hotel")
            .respond(function (method, url, data, headers, params) {
                return [200, [new HotelApiModel(id, name, city, pricePerNight)]]
            });
        hotelsService.getHotels()
            .then(function (hotels) {
                expect(hotels.length).toBe(1);
                var hotel = hotels[0];
                expect(hotel.id).toBe(id);
                expect(hotel.name).toBe(name);
                expect(hotel.city).toBe(city);
                expect(hotel.pricePerNight).toBe(pricePerNight);
                done();
            })
            .catch(function (error) {
                console.log(error);
                throw error;
            });
        $httpBackend.flush();
    });
});