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

// foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
//test.js
import defaultExport, {bar, foo} from '../foo-bar-baz';

jest.mock('../foo-bar-baz', () => {
  const originalModule = jest.requireActual('../foo-bar-baz');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    foo: 'mocked foo',
  };
});

test('should do a partial mock', () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe('mocked baz');
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe('mocked foo');
  expect(bar()).toBe('bar');
});

//------------------------------------------------------------------

const myMockFn = jest.fn(cb => cb(null, true));

myMockFn((err, val) => console.log(val));
// > true

const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false

const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'

const myObj = {
  myMethod: jest.fn().mockReturnThis(),
};

// is the same as

const otherObj = {
  myMethod: jest.fn(function () {
    return this;
  }),
};

//------------------------------------------------------------------

const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');

//------------------------------------------------------------------

// The mock function was called at least once
expect(mockFunc).toHaveBeenCalled();

// The mock function was called at least once with the specified args
expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

// The last call to the mock function was called with the specified args
expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

// All calls and the name of the mock is written as a snapshot
expect(mockFunc).toMatchSnapshot();

// The mock function was called at least once
expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

// The mock function was called at least once with the specified args
expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

// The last call to the mock function was called with the specified args
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
  arg1,
  arg2,
]);

// The first arg of the last call to the mock function was `42`
// (note that there is no sugar helper for this specific of an assertion)
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

// A snapshot will check that a mock was invoked the same number of times,
// in the same order, with the same arguments. It will also assert on the name.
expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
expect(mockFunc.getMockName()).toBe('a mock name');
