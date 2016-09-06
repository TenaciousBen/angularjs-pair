import {HotelViewModel} from "./hotelsService"

export class HotelsController {
    constructor(hotelsService) {
        this.hotelsService = hotelsService;
        this.hotels = [];
        this.hotelSortField = null;
        this.maxPriceFilterValue = Infinity;
    }

    //gets all hotels from the API
    getHotels() {
        this.hotelsService.getHotels()
            .then(hotels => this.hotels = hotels);
    }

    addHotel(hotelName, city){
        this.hotelsService.postHotel(new HotelViewModel(null, hotelName, city, 0))
            .then(hotel => this.hotels.push(hotel));
    }

    //sets the current filter field, reversing its order if it's already set
    setFilterField(fieldName) {
        if (this.hotelSortField && this.hotelSortField.name == fieldName) {
            this.hotelSortField.isReversed = !this.hotelSortField.isReversed;
            return;
        }
        this.hotelSortField = new SortField(fieldName, false);
    }

    //validates the current maxPriceFilterValue, setting it back to Infinity if its value can't possibly
    //match any hotel price
    validateMaxPriceFilterValue() {
        if (!this.maxPriceFilterValue || this.maxPriceFilterValue <= 0) this.maxPriceFilterValue = Infinity;
    }
}

export class SortField {
    constructor(name, isReversed) {
        this.name = name;
        this.isReversed = isReversed;
    }
}