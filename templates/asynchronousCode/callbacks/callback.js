function fetchData(a, b, callback) {
    setTimeout(() => {
        const result = a * b;
        callback(result);
    }, 500)
}

module.exports = fetchData;