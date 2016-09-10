/**
 * AngularJS filter. Filters an array of items by a given {string} field name, with a given
 * {string} comparison operator (one of '>','>=','<','<=') and a given value
 * @returns {Function}
 * @constructor
 */
angular.module("hotelerific").filter("comparisonFilter", function ComparisonFilter() {
    function doesItemMatchComparison(item, fieldName, comparison, value) {
        var itemValue = item[fieldName];
        switch(comparison) {
            case ">": return itemValue > value;
            case ">=": return itemValue >= value;
            case "<": return itemValue < value;
            case "<=": return itemValue <= value;
            default:
                throw new Error("No comparison received in ComparisonFilter");
        }
    }

    return function (items, fieldName, comparison, value) {
        if (!items) return items;
        var filteredItems = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (doesItemMatchComparison(item, fieldName, comparison, value)) {
                filteredItems.push(item);
            }
        }
        return filteredItems;
    }
});
