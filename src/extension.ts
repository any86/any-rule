// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const RULES = require('../packages/www/src/RULES.js');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
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

	RULES.forEach(({ title, rule }: { title: string, rule: RegExp, example: string }, index: string) => {
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
				vscode.window.showInformationMessage(`已插入${title}`);
			} else {
				vscode.window.showWarningMessage('any-rule: 只有在编辑文本的时候才可以使用!');
			}
		});
		context.subscriptions.push(disposable);
	});



}

// this method is called when your extension is deactivated
export function deactivate() {
	vscode.window.showWarningMessage('any-rule: 已关闭!');
}
