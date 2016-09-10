/**
 * The hotel view model to be used by AngularJS presentation logic
 */
function HotelViewModel(id, name, city, pricePerNight) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.pricePerNight = pricePerNight;
};

/**
 * Creates a {HotelViewModel} from a {HotelApiModel]
 * @param {HotelApiModel} apiModel
 * @returns {HotelViewModel}
 */
HotelViewModel.fromApiModel = function(apiModel) {
    var viewModel = new HotelViewModel(apiModel.Id, apiModel.Name, apiModel.City, apiModel.PricePerNight);
    return viewModel;
};

/**
 * The hotel api model to be returned to the API
 */
function HotelApiModel(id, name, city, pricePerNight) {
        this.Id = id;
        this.Name = name;
        this.City = city;
        this.PricePerNight = pricePerNight;
};

/**
 * Creates a {HotelApiModel} from a {HotelViewModel]
 * @param {HotelViewModel} viewModel
 * @returns {HotelApiModel}
 */
HotelApiModel.fromViewModel = function(viewModel) {
    var apiModel = new HotelApiModel(viewModel.id, viewModel.name, viewModel.city, viewModel.pricePerNight);
    return apiModel;
};

angular.module("hotelerific").service("hotelsService", ["$q", "$http", function ($q, $http) {
    var _this = this;

    /**
     * Gets all hotels from the API as {HotelViewModel} objects
     * @returns {Promise.<Array.<HotelViewModel>>}
     */
    this.getHotels = function () {
        var deferred = $q.defer();
        $http.get("http://localhost:12345/api/hotel")
            .then(function (hotels) {
                if (!hotels || !hotels.data) {
                    deferred.resolve([]);
                    return;
                }
                var hotelViewModels = [];
                for (var i = 0; i < hotels.data.length; i++) {
                    var hotelApiModel = hotels.data[i];
                    var hotelViewModel = HotelViewModel.fromApiModel(hotelApiModel);
                    hotelViewModels.push(hotelViewModel);
                }
                deferred.resolve(hotelViewModels);
            })
            .catch(function (error) {
                console.log(error);
                deferred.reject(error);
            });
        return deferred.promise;
    }
}]);