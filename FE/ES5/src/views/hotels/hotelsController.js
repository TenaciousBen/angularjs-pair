function SortField(name, isReversed) {
    this.name = name;
    this.isReversed = isReversed;
}


angular.module("hotelerific").controller("hotelsController", ["hotelsService", function (hotelsService) {
    var _this = this;
    this.hotels = [];
    this.hotelSortField = null;
    this.maxPriceFilterValue = Infinity;

    //gets all hotels from the API
    this.getHotels = function() {
        hotelsService.getHotels()
            .then(function (hotels) {
                _this.hotels = hotels;
            });
    };

    //sets the current filter field, reversing its order if it's already set
    this.setFilterField = function(fieldName) {
        if (_this.hotelSortField && _this.hotelSortField.name == fieldName) {
            _this.hotelSortField.isReversed = !_this.hotelSortField.isReversed;
            return;
        }
        _this.hotelSortField = new SortField(fieldName, false);
    };

    //validates the current maxPriceFilterValue, setting it back to Infinity if its value can't possibly
    //match any hotel price
    this.validateMaxPriceFilterValue = function() {
        if (!_this.maxPriceFilterValue || _this.maxPriceFilterValue <= 0) _this.maxPriceFilterValue = Infinity;
    };
}]);