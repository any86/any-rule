import { window, commands, Range, ExtensionContext } from "vscode";
import { Rule } from './interface';
import insertLog from './insertLog';
import showResultMessage from './showResultMessage';

export default function (context: ExtensionContext, RULES: Rule[]) {

    const disposable = commands.registerCommand(`extension.rule.callByMenu`, () => {
        // showQuickPick
        window.showQuickPick(RULES.map(({ examples, title, rule }) => {
            // const match = title.match(/\((.+)\)/);
            return {
                label: title,
                // description: null !== match ? match[1] : '',
                rule: String(rule), // 非标准字段, 仅仅为了传值
                detail: `例如: ${examples.join(' 或 ')}`
            };
        }), {
            placeHolder: '请输入关键词',
            // onDidSelectItem(item){
            // console.log(item)
            // }
        }).then(item => {
            if (!item) return

            const editor = window.activeTextEditor;
            if (editor) {
                const ruleString = String(item.rule);
                const title = item.label;
                const { selections } = editor;

                editor.edit(editBuilder => {
                    selections.forEach(selection => {
                        const { start, end } = selection;
                        const range = new Range(start, end);
                        editBuilder.replace(range, ruleString);
                    });
                });

                // 日志
                insertLog({
                    rule: ruleString,
                    title,
                    method: 'Menu'
                });

                showResultMessage(title, ruleString);
            }

        });


    });
    context.subscriptions.push(disposable);
}