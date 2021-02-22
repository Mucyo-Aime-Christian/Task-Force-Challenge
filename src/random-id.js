import debug from 'debug';

const log = debug('mylib:randomid');

log('Library loaded');
/**
   * a function to debug
   * @return {object} outcome
   */
function getRandomId() {
  log('Computing random ID');
  const outcome = Math.random()
    .toString(36)
    .substr(2);
  log('Random ID is "%s"', outcome);
  return outcome;
}

module.exports = { getRandomId };
