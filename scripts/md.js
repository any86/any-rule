const fs = require('fs');
const chalk = require('chalk');
const json = require('../packages/www/src/RULES');
let content = `# 正则大全  ![](https://img.shields.io/badge/状态-积极更新-673ab7.svg) ![](https://img.shields.io/badge/已收录-${json.length}条-4caf50.svg) ![](https://badgen.net/vs-marketplace/v/russell.any-rule) ![](https://badgen.net/vs-marketplace/i/russell.any-rule)  ![](https://badgen.net/vs-marketplace/d/russell.any-rule) ![](https://img.shields.io/badge/license-MIT-F44336.svg) [![CircleCI](https://circleci.com/gh/any86/any-rule.svg?style=svg)](https://circleci.com/gh/any86/any-rule)

支持**图形界面** / **vscode插件**2种查询方式.

## :whale:图形界面
https://any86.github.io/any-rule/

## vscode插件
1. 安装vscode中插件搜索框输入**any-rule**
2. 安装完毕后按**F1**(或者ctrl+shift+p).
3. 输入"**zz**"可以看到正则列表.
4. 或者**输入关键词**, 比如"手机".

![预览动画加载中...](https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/be46d88ca7efd1494ac05cc8e9f0bc3bceada406a864adfd552b675ab1f6f05a6d0102841b9705bbc3ef0b2022bb40b5?pictype=scale&from=30113&version=3.3.3.3&uin=383514580&fname=68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f382f322f313663353136633434366430396633623f773d34323026683d32343326663d67696626733d32353537383036.gif&size=750)

## 正则
`;

json.forEach(({title, rule})=>{
    content+= `\r\n### ${title}\r\n`;
    content+= `\`\`\`javascript\r\n`;
    content+= `${rule}\r\n\`\`\`\r\n`;
});
fs.writeFileSync('./README.md',content,'utf-8');
console.log(chalk.green('生成完毕'));