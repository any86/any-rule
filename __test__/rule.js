const chalk = require('chalk');
const RULES = require('../packages/www/src/RULES');
let failGroup = [];


RULES.forEach(RULE => {
    testOne(RULE);
});


function testOne(one) {
    const {
        rule,
        examples,
        title,
        counterExamples
    } = one;
    examples.forEach(example => {
        const isSuccess = rule.test(example);
        if (isSuccess) {
            console.log(chalk.green(`成功: ${title}, 用例: ${example}`));
        } else {
            failGroup.push({title, example, is:'正例'});
            
            console.log(chalk.red(`失败: ${title}, 用例: ${example}`));
        }
    })

    if (counterExamples) {
        counterExamples.forEach(example => {
            const isFail = !rule.test(example);
            if (isFail) {
                console.log(chalk.green(`反例成功(counterExamples): ${title}`));
            } else {
                failGroup.push({title, example, is: '反例'});
                console.log(chalk.red(`反例失败(counterExamples): ${title}, 用例: ${example}`));
            }
        });
    }
}

if(0 === failGroup.length) {
    console.log(chalk.green('\r\n全部测试通过!'))
} else {
    console.log(chalk.red('='.repeat(30) + '未通过测试' + '='.repeat(30)));

    // 失败列表
    failGroup.forEach(item=>{
        const str = `${item.title}[${item.is}]: ${item.example}`;
        console.log(chalk.red(str));
    });
}
