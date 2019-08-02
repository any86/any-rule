// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const RULES = require('../packages/www/src/RULES.js');
const pkg = require('../package.json');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "any-rule" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});
	fs.writeFileSync('./abc123.txt', '123908723190231i0231')
	console.log(321)
	// RULES.forEach((rule: { title: string, rule: RegExp, example: string }) => {
	// 	let disposable1 = vscode.commands.registerCommand('extension.helloWorld1', () => {
	// 		// The code you place here will be executed every time your command is executed
	// 		const editor = vscode.window.activeTextEditor;
	// 		if (editor) {
	// 			const { selections } = editor;

	// 			editor.edit(editBuilder => {
	// 				selections.forEach(selection => {
	// 					const { start, end } = selection;
	// 					const range = new vscode.Range(start, end);
	// 					editBuilder.replace(range, RULES[0].title);
	// 				});
	// 			});
	// 			// Display a message box to the user
	// 			vscode.window.showInformationMessage('开发中...');
	// 		} else {
	// 			vscode.window.showWarningMessage('只有在编辑文本的时候才可以使用any-rule!');
	// 		}
	// 	});
	// 	context.subscriptions.push(disposable1);
	// });


	context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() { }
