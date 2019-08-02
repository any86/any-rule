const RULES = require('../packages/www/src/RULES.js');
const pkg = require('../package.json');
const fs = require('fs');

pkg.contributes.commands = [];
pkg.activationEvents = [];
RULES.forEach((rule, index) => {
    pkg.contributes.commands.push({
        command: 'extension.rule' + index,
        title: `zz: ${rule.title}`
    });

    pkg.activationEvents.push('onCommand:extension.rule'+index);
})




// console.log(JSON.stringify(pkg));
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4), 'utf-8');
console.log('完成!');