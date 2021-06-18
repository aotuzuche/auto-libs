const chalk = require('chalk');

console.log();
console.log(
  ` ${chalk.bgWhite.black(' 请使用')}${chalk.bgRed.black(' npm publish ')}${chalk.bgWhite.black(
    '发布代码，会自动检查代码、打包、修改版本号等... ',
  )} `,
);
