export function Hotels($resource) {
    return $resource('http://jsonplaceholder.typicode.com/posts/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
}