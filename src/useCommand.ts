import {window,version,commands,Range,ExtensionContext,extensions} from "vscode";
import { Rule } from './interface';
import inserLog from './inserLog';

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
                const language = window.activeTextEditor ? window.activeTextEditor.document.languageId as string : '';
                const e = extensions.getExtension('russell.any-rule')
                inserLog({
                    vscodeVersion: version,
                    language,
                    rule: String(rule),
                    title,
                    extensionVersion: e && e.packageJSON.version,
                    method: 'Command'
                });
                window.showInformationMessage(`已插入正则: ${title}`);
            } else {
                window.showWarningMessage('any-rule: 只有在编辑文本的时候才可以使用!');
            }
        });
        context.subscriptions.push(disposable);
    });
}