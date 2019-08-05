"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const RULES = require('../packages/www/src/RULES.js');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "any-rule" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    // let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    // vscode.window.showInformationMessage('Hello World123!');
    // });
    // context.subscriptions.push(disposable);
    RULES.forEach(({ title, rule }, index) => {
        let disposable = vscode.commands.registerCommand(`extension.rule${index}`, () => {
            // The code you place here will be executed every time your command is executed
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
                // Display a message box to the user
                vscode.window.showInformationMessage(`已插入正则: ${title}`);
            }
            else {
                vscode.window.showWarningMessage('any-rule: 只有在编辑文本的时候才可以使用!');
            }
        });
        context.subscriptions.push(disposable);
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    vscode.window.showWarningMessage('any-rule: 已关闭!');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map