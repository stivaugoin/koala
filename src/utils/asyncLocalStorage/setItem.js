// @flow
const asyncSetItem = (key: string, value: string) =>
  // $FlowFixMe
  new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, value);
      resolve();
    } catch (error) {
      reject(error);
    }
  });

export default asyncSetItem;
