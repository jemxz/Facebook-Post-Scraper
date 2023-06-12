module.exports = function getRandomTime() {
  const min = 3000; // Minimum time in milliseconds
  const max = 7000; // Maximum time in milliseconds

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
