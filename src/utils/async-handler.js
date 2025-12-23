export function asyncHandler(fn) {
  return async function (...args) {
    try {
      const res = await fn(...args);
      return res;
    } catch (error) {
      console.log('// ======= || Error || ======== //\n', error);
      throw error;
    }
  };
}
