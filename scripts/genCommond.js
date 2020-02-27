const RULES = require('../packages/www/src/RULES.js');
const pkg = require('../package.json');
const fs = require('fs');
const chalk = require('chalk');

pkg.activationEvents = ['*'];
pkg.contributes.commands = RULES.map((rule, index) => ({
    command: 'extension.rule' + index,
    title: `$(rocket) zz: ${rule.title}`
}));

pkg.contributes.commands.push({
    command: 'extension.rule.callByMenu',
    title: `🦕正则大全(${RULES.length}条)`
});

// console.log(JSON.stringify(pkg));
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4), 'utf8');
console.log(chalk.green('🚀 pkg文件修改完毕, 请等待生成vsc包...'));