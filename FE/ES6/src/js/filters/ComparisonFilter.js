/**
 * AngularJS filter. Filters an array of items by a given {string} field name, with a given
 * {string} comparison operator (one of '>','>=','<','<=') and a given value
 * @returns {Function}
 * @constructor
 */
export function ComparisonFilter() {
    return function (items, fieldName, comparison, value) {
        if (!items) return items;
        var filteredItems = items.filter(item => {
            return doesItemMatchComparison(item, fieldName, comparison, value);
        });
        return filteredItems;
    }
}

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