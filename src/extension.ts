// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
	window, workspace, commands,
	ExtensionContext, ConfigurationChangeEvent
} from 'vscode';
import { IRule } from './interface';
import { AnyRule } from './anyrule';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "any-rule" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed

	

	const anyRule = new AnyRule(context);

	workspace.onDidChangeConfiguration((event: ConfigurationChangeEvent) => {
		anyRule.reload();
	});

	commands.registerCommand('extension.update', () => {
		anyRule.update();
	});
	commands.registerCommand('extension.reload', () => {
		anyRule.reload();
		window.showInformationMessage('重新加载插件成功');
	});
	commands.registerCommand('extension.support', () => {
		const currentLanguage = window.activeTextEditor?.document.languageId;
		if (currentLanguage) {
			try {
				const configuration = workspace.getConfiguration();
				const setting: string = configuration.get('anyRule.supportedLanguages') || 'javascript,typescirpt' as string;
				const supportedLanguages = setting.split(',');
				const set = new Set(supportedLanguages);
				set.add(currentLanguage);
				console.log(Array.from(set).join(','));
				configuration.update('anyRule.supportedLanguages', Array.from(set).join(',')).then(() => {
					anyRule.reload();
				});
				window.showInformationMessage('更新关联语言成功');
			} catch(e) {
				window.showInformationMessage('更新关联语言失败');
			}
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() { }
