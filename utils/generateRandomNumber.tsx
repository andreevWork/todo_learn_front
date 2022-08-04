export const getRandomNumber = () => {
  return (Math.random().toString() + Date.now().toString())
    .substring(0, 5)
    .replace(/\./g, '');
};
