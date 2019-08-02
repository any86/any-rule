const fs = require('fs');
const chalk = require('chalk');
const json = require('../packages/www/src/RULES');
let content = `# 正则大全  ![](https://img.shields.io/badge/状态-积极更新-673ab7.svg) ![](https://img.shields.io/badge/已收录-${json.length}条-4caf50.svg) ![](https://img.shields.io/badge/license-MIT-F44336.svg)

支持**图形界面** / **vscode插件**2种查询方式.

## :whale:图形界面
https://any86.github.io/any-rule/

## vscode插件
1. 在vscode的插件搜索中输入"**any-rule**"安装.
1. 安装后进入vscode后按**F1**打开命令控制台.
2. 输入"**zz**"后可看到正则列表.
3. 或者**输入关键词**, 比如"手机".

![预览动画加载中...](https://camo.githubusercontent.com/1f8b23e9081ff2e3074fcaffddbfe98475ed9419/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f382f322f313663353136633434366430396633623f773d34323026683d32343326663d67696626733d32353537383036)

## 正则
`;

json.forEach(({title, rule})=>{
    content+= `\r\n### ${title}\r\n`;
    content+= `\`\`\`javascript\r\n`;
    content+= `${rule}\r\n\`\`\`\r\n`;
});
fs.writeFileSync('./README.md',content,'utf-8');
console.log(chalk.green('生成完毕'));