const fetchData = require('./callback');

test('callback test', done => {
    fetchData(5, 5, result => {
        expect(result).toBe(25);
        done();
    })
})

