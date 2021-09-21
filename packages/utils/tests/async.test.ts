import { deferred, sequence, to } from '../async';

describe('[Packages | Core-util | Async] to', () => {
  test('to should handle resolving promises', () => {
    return expect(to(Promise.resolve())).toBeInstanceOf(Promise);
  });

  test('to should handle resolving promises with a response array', () => {
    expect.assertions(1);
    return expect(to(Promise.resolve('1'))).resolves.toEqual([null, '1']);
  });

  test('to should handle rejecting promises with a response array', () => {
    expect.assertions(1);
    const err = new Error('2');
    return expect(to(Promise.reject(err))).resolves.toEqual([err]);
  });

  test('to should handle exceptions with a response array', () => {
    expect.assertions(1);
    const foo = () => {
      return (new Promise(() => {
        throw new Error('abc');
      }));
    };
    return expect(to(foo())).resolves.toEqual([new Error('abc')]);
  });
});

describe('[Packages | Core-util | Async] deferred', () => {
  test('deferred should return and object with references to promise, resolve and reject', () => {
    const foo = deferred();
    expect(foo).toBeInstanceOf(Object);
    expect(foo.promise).toBeInstanceOf(Promise);
    expect(foo.resolve).toBeInstanceOf(Function);
    expect(foo.reject).toBeInstanceOf(Function);
  });

  test('deferred promise should resolve once internal resolve is called', () => {
    expect.assertions(1);
    const foo = deferred();
    foo.resolve('a');
    return expect(foo.promise).resolves.toEqual('a');
  });

  test('deferred promise should reject once internal reject is called', () => {
    expect.assertions(1);
    const foo = deferred();
    foo.reject('b');
    return expect(foo.promise).rejects.toEqual('b');
  });
});

describe('[Packages | Core-util | Async] sequence', () => {
  test('sequence should return an array of resolved promises', () => {
    const list = Array.from(new Array(5)).map((_, index) => index);
    const asyncFunction = jest.fn((item) => Promise.resolve(item));

    expect(sequence(list, (item) => asyncFunction(item)))
      .resolves.toStrictEqual([0, 1, 2, 3, 4]);
  });
});
