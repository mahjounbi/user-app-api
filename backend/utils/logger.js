import chalk from 'chalk';

const log = (...args) => console.log(chalk.blue('[LOG]'), ...args);
const error = (...args) => console.error(chalk.red('[ERROR]'), ...args);
const warn = (...args) => console.warn(chalk.yellow('[WARN]'), ...args);
const info = (...args) => console.info(chalk.green('[INFO]'), ...args);

export default {
  log,
  error,
  warn,
  info,
};
