"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
const anyrule_1 = require("./anyrule");
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
    // 	// The code you place here will be executed every time your command is executed
    // 	// Display a message box to the user
    // 	vscode.window.showInformationMessage('Hello World!');
    // });
    const anyRule = new anyrule_1.AnyRule(context);
    vscode_1.workspace.onDidChangeConfiguration((event) => {
        anyRule.reload();
    });
    vscode_1.commands.registerCommand('extension.update', () => {
        anyRule.update();
    });
    vscode_1.commands.registerCommand('extension.reload', () => {
        anyRule.reload();
        vscode_1.window.showInformationMessage('重新加载插件成功');
    });
    vscode_1.commands.registerCommand('extension.support', () => {
        var _a;
        const currentLanguage = (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.languageId;
        if (currentLanguage) {
            try {
                const configuration = vscode_1.workspace.getConfiguration();
                const setting = configuration.get('anyRule.supportedLanguages') || 'javascript,typescirpt';
                const supportedLanguages = setting.split(',');
                const set = new Set(supportedLanguages);
                set.add(currentLanguage);
                console.log(Array.from(set).join(','));
                configuration.update('anyRule.supportedLanguages', Array.from(set).join(',')).then(() => {
                    anyRule.reload();
                });
                vscode_1.window.showInformationMessage('更新关联语言成功');
            }
            catch (e) {
                vscode_1.window.showInformationMessage('更新关联语言失败');
            }
        }
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map