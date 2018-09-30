// @flow
const asyncGetItem = (key: string) =>
  // $FlowFixMe
  new Promise((resolve, reject) => {
    try {
      const item = localStorage.getItem(key);
      resolve(item);
    } catch (error) {
      reject(error);
    }
  });

export default asyncGetItem;
