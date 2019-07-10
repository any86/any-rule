const fs = require('fs');
const chalk = require('chalk');
const json = require('../src/RULES.js');
let content = `# 正则大全 ![](https://img.shields.io/badge/已收录-${json.length}条-4caf50.svg) ![](https://img.shields.io/badge/license-MIT-F44336.svg)
:whale:图形界面: https://any86.github.io/any-rule/\r\n
`;

json.forEach(({title, rule})=>{
    content+= `\r\n## ${title}\r\n`;
    content+= `\`\`\`javascript\r\n`;
    content+= `${rule}\r\n\`\`\`\r\n`;
});
fs.writeFileSync('./README.md',content,'utf-8');
console.log(chalk.green('生成完毕'));