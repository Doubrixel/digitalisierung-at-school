const promise = new Promise((resolve, reject) => {
    reject('reject msg: reject with an error')
    //reject('reject msg: reject')
    //resolve('peanut butter')
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

test('the fetch fails with an error', () => {
    return expect(fetchData()).rejects.toMatch('error');
});