import * as vscode from "vscode";
import { Rule } from './interface';
export default function (context: vscode.ExtensionContext, RULES: Rule[]) {
    RULES.forEach(({ title, rule }, index) => {
        let disposable = vscode.commands.registerCommand(`extension.rule${index}`, () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const { selections } = editor;

                editor.edit(editBuilder => {
                    selections.forEach(selection => {
                        const { start, end } = selection;
                        const range = new vscode.Range(start, end);
                        editBuilder.replace(range, String(rule));
                    });
                });
                vscode.window.showInformationMessage(`已插入正则: ${title}`);
            } else {
                vscode.window.showWarningMessage('any-rule: 只有在编辑文本的时候才可以使用!');
            }
        });
        context.subscriptions.push(disposable);
    });
}