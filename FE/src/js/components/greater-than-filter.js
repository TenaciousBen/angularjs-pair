export function greaterThan () {
    return function(items, column, amount) {
        if (items === undefined || items === null) return false;

        return items.filter(i => {
            return i[column] > amount;
        });
    }
};