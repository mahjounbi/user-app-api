import chalk from 'chalk';
import morgan from 'morgan';

const morganMiddleware = morgan((tokens, req, res) => [
  chalk.hex('#ff4757').bold('🍄 -->'),
  chalk.hex('#34ace0').bold(tokens.method(req, res)),
  chalk.hex('#ffb142').bold(tokens.status(req, res)),
  chalk.hex('#ff5252').bold(tokens.url(req, res)),
  chalk.hex('#2ed573').bold(`${tokens['response-time'](req, res)} ms`),
  chalk.hex('#fffa65').bold(`from ${tokens.referrer(req, res)}`),
  chalk.hex('#f78fb3').bold(`@ ${tokens.date(req, res)}`),
].join(' '));

export default morganMiddleware;
