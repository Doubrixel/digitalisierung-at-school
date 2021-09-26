const forEach = require('./forEach.js');
const axios = require('axios');
const Users = require('./users')

test('mockFunction test', () => {
    const mockCallback = jest.fn(x => 42 + x);
    forEach([0, 1], mockCallback);

    // Die mock-Funktion wurde zweimal aufgerufen
    expect(mockCallback.mock.calls.length).toBe(2);

    // Das erste Argument des ersten Funktionsaufrufs war 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // Das erste Argument des zweiten Funktionsaufrufs war 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);

    // Der Rückgabewert des ersten Funktionsaufrufs war 42
    expect(mockCallback.mock.results[0].value).toBe(42);
})

//------------------------------------------------------------------

test('mock property', () => {
    const myMock = jest.fn();

    const a = new myMock();
    a.name = "a"
    const b = {};
    b.name = "b"
    const bound = myMock.bind(b);
    bound();

    console.log(myMock.mock.instances);
})

test('someMockFunction test', () => {
    const someMockFunction = jest.fn(() => "return value")

    someMockFunction("first arg", "second arg")

    // Die Funktion wurde genau einmal aufgerufen
    expect(someMockFunction.mock.calls.length).toBe(1);

    // Das erste Argument des ersten Aufrufs der Funktion war 'first arg'
    expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

    // Das zweite Argument des ersten Aufrufs der Funktion war'second arg'
    expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

    // Der Rückgabewert des ersten Funktionsaufrufs war 'return value'
    expect(someMockFunction.mock.results[0].value).toBe('return value');

    const SomeMockConstructor = jest.fn();
    const a = new SomeMockConstructor();
    a.name = "test"
    const b = new SomeMockConstructor();
    b.name = "test2"

    // Diese Funktion wurde exakt zweimal instanziiert
    expect(SomeMockConstructor.mock.instances.length).toBe(2);

    // Das Objekt, das von der ersten Instanz dieser Funktion zurückgegeben wird
    // hatte eine 'name' Eigenschaft, deren Wert auf 'test' gesetzt war
    expect(SomeMockConstructor.mock.instances[0].name).toEqual('test');
})

//------------------------------------------------------------------

test('mockReturnValueOnce', () => {
    const myMock = jest.fn();
    console.log(myMock());

    myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

    console.log(myMock(), myMock(), myMock(), myMock());
})

test('filterTest', () => {
    const filterTestFn = jest.fn();

    // gibt beim ersten Aufruf 'true' zurück und beim zweiten Aufruf 'false'
    filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

    const result = [11, 12].filter(num => filterTestFn(num));

    console.log(result);
    console.log(filterTestFn.mock.calls[0][0]);
    console.log(filterTestFn.mock.calls[1][0]);
})

//------------------------------------------------------------------

jest.mock('axios');

test('should fetch users', () => {
    const users = [{name: 'Bob'}];
    const resp = {data: users};
    axios.get.mockResolvedValue(resp);

    return Users.all().then(data => expect(data).toEqual(users));
});

//------------------------------------------------------------------


