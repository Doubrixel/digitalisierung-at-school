const fetchData2 = require('./promises')

test("promise test", () => {
    return fetchData2().then((data) => {
        expect(data).toBe('peanut butter')
    })
})

