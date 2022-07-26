export const getRandomNumber = () => {
  return (Math.random().toString() + Date.now().toString()).replace(/\./g, '');
};
