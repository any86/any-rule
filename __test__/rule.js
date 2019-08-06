const chalk = require('chalk');
const RULES = require('./RULES');
const { rule, example } = RULES[0];
RULES.forEach(RULE => {
    testOne(RULE);
});


function testOne(one) {
    const { rule, example, title, exampleFail } = one;
    example.forEach(item => {
        const isSuccess = rule.test(item);
        if (isSuccess) {
            console.log(chalk.green(`成功: ${title}`));
        } else {
            console.log(chalk.red(`失败: ${title}, 用例: ${item}`));
        }


    })

    if (exampleFail) {
        exampleFail.forEach(item => {
            const isFail = !rule.test(item);
            if (isFail) {
                console.log(chalk.green(`成功(exampleFail): ${title}`));
            } else {
                console.log(chalk.red(`失败(exampleFail): ${title}, 用例: ${item}`));
            }
        });
    }

}