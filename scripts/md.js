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

支持**web** / **vscode插件**2种查询方式.

## :rocket:web版本
https://any86.github.io/any-rule/

## 🍭vscode插件
### 安装
vscode应用商店中搜索"**any-rule**".

### 使用
**方式1:**

1. 按**F1**(mac下fn+F1)打开正则列表.
2. **输入关键词搜索**, 比如"手机".

![预览图](https://user-gold-cdn.xitu.io/2020/1/10/16f8e01a684a0a18?w=420&h=243&f=gif&s=414162)

**方式2:**

右键选择"🦕正则大全".

![](https://user-gold-cdn.xitu.io/2020/2/28/17087735718cca3b?w=389&h=400&f=png&s=55934)

**方式3:**

在代码任意位置输入"**@zz**".


![预览图](https://user-gold-cdn.xitu.io/2020/2/28/17089999afc7a21c?w=722&h=408&f=gif&s=299355)

## 👩‍🏫图解正则
<details>
<summary>查看详情</summary>
每次在any-rule中选择正则后会弹出提示, 可点击"🤖图解正则".

![预览图](https://user-gold-cdn.xitu.io/2020/2/23/1706e32c3a6fb116?w=533&h=95&f=png&s=21563)

点击后可以看到正则解析, 方便大家学习.

![预览图](https://user-gold-cdn.xitu.io/2020/2/23/1706e349b600c28b?w=1151&h=500&f=png&s=45210)

**注意**: 图解直接使用了https://regexper.com, 在此对作者表示敬意和感谢.
</details>

## :fire:关于PR
欢迎大家PR, 步骤如下:
1. **正则**请在**packages/www/src/RULES.js**中添加.
2. 运行\`npm run test:rules\`进行测试.
3. 运行\`npm run build:md\`更新**README.md**.
4. 请务必提交到**develop**分支.

在此感谢大家对**any-rule**做出的贡献! 

## 👽主要开发者
按照加入时间排序
<table>
    <tr>
        <td>
            <a href="https://github.com/MrTenger"><img width="60" src="https://avatars3.githubusercontent.com/u/10781715?s=60&v=4"></a>
        </td>
        <td>
            <a href="https://github.com/giraffeComing"><img width="60" src="https://avatars2.githubusercontent.com/u/14800669?s=460&v=4"></a>
        </td>
        <td>
            <a href="https://github.com/microud"><img width="60" src="https://avatars1.githubusercontent.com/u/10163257?s=60&v=4"></a>
        </td>
        <td>
            <a href="https://github.com/52cik"><img width="60" src="https://avatars0.githubusercontent.com/u/5033310?s=60&v=4"></a>
        </td>
    </tr>
</table>

## 🍔正则
`;

json.forEach(({title, rule})=>{
    content+= `\r\n### ${title}\r\n`;
    content+= `\`\`\`javascript\r\n`;
    content+= `${rule}\r\n\`\`\`\r\n`;
});
fs.writeFileSync('./README.md',content,'utf-8');
console.log(chalk.green('生成完毕'));
