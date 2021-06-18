const chalk = require('chalk');
const msgPath = process.env.HUSKY_GIT_PARAMS;
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim();
const packageJson = require('../package.json');

const commitRE = /^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?: .{1,50}/;

console.log(` ${chalk.bgRed.white(msg)} `);

if (!commitRE.test(msg) && packageJson.version !== msg) {
  console.log();
  console.error(`  ${chalk.bgRed.white(' ERROR ')} 无效的提交信息`);
  process.exit(1);
}
