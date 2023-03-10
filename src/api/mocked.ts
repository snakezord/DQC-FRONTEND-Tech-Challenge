export const Mocked_API_Call = async <T>(data: T, time = 1000): Promise<T> => {
  const promise = new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
  return promise;
};
