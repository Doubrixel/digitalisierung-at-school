const promise = new Promise((resolve, reject) => {
    resolve('peanut butter')
    //resolve('should fail because of wrong string')
    //reject('error')
})

promise.then((value) => {
    return value
}).catch(error => {
    return error
})

function fetchData()
{
    return promise
}

test('the data is peanut butter', () => {
    return expect(fetchData()).resolves.toBe('peanut butter');
});