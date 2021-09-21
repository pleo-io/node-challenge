export function mute(resolver: (args: any) => any, params: any[]): Promise<void> {
  const handle = Promise.resolve();
  process.nextTick(() => resolver(params).catch((): void => undefined));
  return handle;
}

export function deferred<T>() {
  let resolve: (value?: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

export function to<T = any>(promise: Promise<T>): Promise<[null, T] | [any, null?]> {
  return promise
    .then((data) => [null, data] as [null, T])
    .catch((err) => [err] as [any]);
}

export function sequence<T, K>(array: Array<K>, operation: (item: K, index: number) => Promise<T>): Promise<Array<T>> {
  return array.reduce((promiseChain: Promise<Array<T>>, item, index) => {
    return promiseChain.then((chainResults: Array<T>) => {
      return operation(item, index).then((currentResult) => [...chainResults, currentResult]);
    });
  }, Promise.resolve([]));
}
