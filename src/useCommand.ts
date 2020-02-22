import {window,version,commands,Range,ExtensionContext,extensions} from "vscode";
import { Rule } from './interface';
import insertLog from './insertLog';
import showResultMessage from './showResultMessage';

export default function (context: ExtensionContext, RULES: Rule[]) {
    RULES.forEach(({ title, rule }, index) => {
        let disposable = commands.registerCommand(`extension.rule${index}`, () => {
            const editor = window.activeTextEditor;
            if (editor) {
                const { selections } = editor;

                editor.edit(editBuilder => {
                    selections.forEach(selection => {
                        const { start, end } = selection;
                        const range = new Range(start, end);
                        editBuilder.replace(range, String(rule));
                    });
                });
                
                // 日志
                insertLog({
                    rule: String(rule),
                    title,
                    method: 'Command'
                });
                
                showResultMessage(title);
            } else {
                window.showWarningMessage('any-rule: 只有在编辑文本的时候才可以使用!');
            }
        });
        context.subscriptions.push(disposable);
    });
}