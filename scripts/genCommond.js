const RULES = require('../packages/www/src/RULES.js');
const pkg = require('../package.json');
const fs = require('fs');
const chalk = require('chalk');

pkg.contributes.commands = [];
pkg.activationEvents = [];
RULES.forEach((rule, index) => {
    pkg.contributes.commands.push({
        command: 'extension.rule' + index,
        title: `zz: ${rule.title}`
    });

    pkg.activationEvents.push('*');
})

// console.log(JSON.stringify(pkg));
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4), 'utf8');
console.log(chalk.green('🚀 pkg文件修改完毕, 请等待生成vsc包...'));
