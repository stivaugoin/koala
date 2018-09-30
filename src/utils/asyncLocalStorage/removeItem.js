// @flow
const asyncRemoveItem = (key: string) =>
  // $FlowFixMe
  new Promise((resolve, reject) => {
    try {
      localStorage.removeItem(key);
      resolve();
    } catch (error) {
      reject(error);
    }
  });

export default asyncRemoveItem;
