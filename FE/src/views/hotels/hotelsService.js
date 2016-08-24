export class HotelsService {
    constructor($q, $http) {
        this.$q = $q;
        this.$http = $http;
    }

    /**
     * Gets all hotels from the API as {HotelViewModel} objects
     * @returns {Promise.<Array.<HotelViewModel>>}
     */
    getHotels() {
        var deferred = this.$q.defer();
        this.$http.get("http://localhost:12345/api/hotel")
            .then(hotels => {
                if (!hotels || !hotels.data) {
                    deferred.resolve([]);
                    return;
                }
                var hotelViewModels = hotels.data.map(HotelViewModel.fromApiModel);
                deferred.resolve(hotelViewModels);
            })
            .catch(error => {
                console.log(error);
                deferred.reject(error);
            });
        return deferred.promise;
    }
}

/**
 * The hotel view model to be used by AngularJS presentation logic
 */
export class HotelViewModel {
    constructor(id, name, city, pricePerNight) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.pricePerNight = pricePerNight;
    }

    /**
     * Creates a {HotelViewModel} from a {HotelApiModel]
     * @param {HotelApiModel} apiModel
     * @returns {HotelViewModel}
     */
    static fromApiModel(apiModel) {
        var viewModel = new HotelViewModel(apiModel.Id, apiModel.Name, apiModel.City, apiModel.PricePerNight);
        return viewModel;
    }
}

/**
 * The hotel api model to be returned to the API
 */
class HotelApiModel {
    constructor(id, name, city, pricePerNight) {
        this.Id = id;
        this.Name = name;
        this.City = city;
        this.PricePerNight = pricePerNight;
    }

    /**
     * Creates a {HotelApiModel} from a {HotelViewModel]
     * @param {HotelViewModel} viewModel
     * @returns {HotelApiModel}
     */
    static fromViewModel(viewModel) {
        var apiModel = new HotelApiModel(viewModel.id, viewModel.name, viewModel.city, viewModel.pricePerNight);
        return apiModel;
    }
}