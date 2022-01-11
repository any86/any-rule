const fs = require('fs');
const chalk = require('chalk');
const json = require('../packages/www/src/RULES');
const VSC_URL = 'https://marketplace.visualstudio.com/items?itemName=russell.any-rule'
const badges = [
    // `![](https://img.shields.io/badge/状态-积极更新-673ab7.svg)`,

    `![已收录${json.length}条](https://img.shields.io/badge/已收录-${json.length}条-673ab7.svg)`,

    
    `[![版本](https://badgen.net/vs-marketplace/v/russell.any-rule)](https://marketplace.visualstudio.com/items?itemName=russell.any-rule)`,

    `[![安装量](https://badgen.net/vs-marketplace/i/russell.any-rule)](https://marketplace.visualstudio.com/items?itemName=russell.any-rule)`,

    `[![下载量](https://badgen.net/vs-marketplace/d/russell.any-rule)](https://marketplace.visualstudio.com/items?itemName=russell.any-rule)`,

    `![MIT](https://img.shields.io/badge/license-MIT-F44336.svg)`,

    `[![CircleCI](https://badgen.net/github/status/any86/any-rule/master/ci/circleci)](https://circleci.com/gh/any86/any-rule)`

    // vscode上传不让用svg
    // `[![Node CI](https://github.com/any86/any-rule/workflows/Node%20CI/badge.svg)](https://github.com/any86/any-rule/actions)`
];

let content = `# 正则大全  ${badges.join(' ')}

🦕支持**web** / **vscode** / **idea** / **Alfred Workflow**多平台

## :rocket:web版本
https://any86.github.io/any-rule/

## 🍭vscode插件

### 安装
vscode应用商店中搜索"**any-rule**".

### 使用
**方式1:**

1. 按**F1**(mac下fn+F1)打开正则列表.
2. **输入关键词搜索**, 比如"手机".

![GIF](https://user-images.githubusercontent.com/8264787/146724787-888a8666-5d2a-4e5e-b383-aec7c53bd312.gif)

**方式2:**

右键选择"🦕正则大全".

![GIF](https://user-images.githubusercontent.com/8264787/146725447-4d92caed-2dd0-4f11-91d1-8da9cd8ff08b.gif)

**方式3:**

在代码任意位置输入"**@zz**".

![GIF](https://user-images.githubusercontent.com/8264787/146725402-30b34119-b709-4d49-adb2-af8dbb786d3b.gif)

## 👩‍🏫图解正则
<details>
<summary>查看详情</summary>
每次在any-rule中选择正则后会弹出提示, 可点击"🤖图解正则".

![image](https://user-images.githubusercontent.com/8264787/146726200-d97e48c3-df76-4531-8210-b6935fffb997.png)

点击后可以看到正则解析, 方便大家学习.

![image](https://user-images.githubusercontent.com/8264787/146726350-58166bf9-7f7f-4685-86aa-f055d0c0b914.png)

**注意**: 图解直接使用了https://regexper.com, 在此对作者表示敬意和感谢.
</details>

## 社区版本
[idea版](https://github.com/zhoriya/idea-rule)

[Alfred Workflow版](https://github.com/cccyb/workflows)

[hyjs: 函数封装版](https://github.com/heiyehk/hyjs/tree/main/packages/utils)

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
