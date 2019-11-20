const fs = require('fs');
const chalk = require('chalk');
const json = require('../packages/www/src/RULES');
const VSC_URL = 'https://marketplace.visualstudio.com/items?itemName=russell.any-rule'
const badges = [
    // `![](https://img.shields.io/badge/状态-积极更新-673ab7.svg)`,

    `![](https://img.shields.io/badge/已收录-${json.length}条-673ab7.svg)`,

    
    `[![](https://badgen.net/vs-marketplace/v/russell.any-rule)](https://marketplace.visualstudio.com/items?itemName=russell.any-rule)`,

    `[![](https://badgen.net/vs-marketplace/i/russell.any-rule)](https://marketplace.visualstudio.com/items?itemName=russell.any-rule)`,

    `[![](https://badgen.net/vs-marketplace/d/russell.any-rule)](https://marketplace.visualstudio.com/items?itemName=russell.any-rule)`,

    `![](https://img.shields.io/badge/license-MIT-F44336.svg)`,

    `[![CircleCI](https://badgen.net/github/status/any86/any-rule/master/ci/circleci)](https://circleci.com/gh/any86/any-rule)`
];

let content = `# 正则大全  ${badges.join(' ')}

支持**图形界面** / **vscode插件**2种查询方式.

## :rocket:图形界面
https://any86.github.io/any-rule/

## 🍭vscode插件
1. 安装vscode中插件搜索框输入**any-rule**
2. 安装完毕后按**F1**(或者ctrl+shift+p).
3. 输入"**zz**"可以看到正则列表.
4. 或者**输入关键词**, 比如"手机".

![预览视频](https://user-images.githubusercontent.com/8264787/69204566-36b97800-0b82-11ea-8553-dfc06f709926.gif)

## :fire:关于PR
欢迎大家PR, 步骤如下:
1. **正则**请在**packages/www/src/RULES.js**中添加.
2. 运行\`npm run test:rules\`进行测试.
3. 运行\`npm run build:md\`更新**README.md**.
4. 请务必提交到**develop**分支.

在此感谢大家对**any-rule**做出的贡献! 

## 🍔正则
`;

json.forEach(({title, rule})=>{
    content+= `\r\n### ${title}\r\n`;
    content+= `\`\`\`javascript\r\n`;
    content+= `${rule}\r\n\`\`\`\r\n`;
});
fs.writeFileSync('./README.md',content,'utf-8');
console.log(chalk.green('生成完毕'));
