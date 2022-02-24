export async function runWithSeeding<T>(config: {
  seed: () => Promise<void>
  teardown: () => Promise<void>
  act: () => Promise<T>

}): Promise<T> {
  try {
    await config?.seed();
    return await config?.act();
  } finally {
    await config?.teardown();
  }
}
