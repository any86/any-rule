import { ExtensionContext, version, CompletionItemKind, languages, Disposable, Extension, window, commands, TextDocument, Position, Range, Selection, MarkdownString, extensions } from "vscode";
import { Rule } from './interface';
import { COMPLETION_TRIGGER_ID } from './constant';
// import { slugify } from 'transliteration';
import inserLog from './inserLog';

export default function (context: ExtensionContext, RULES: Rule[]) {
    // commands.registerCommand('functions.insertRegex', insertRule);

    const disposable = languages.registerCompletionItemProvider('*', {
        provideCompletionItems(document, position) {
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith(COMPLETION_TRIGGER_ID)) return;

            // showQuickPick
            window.showQuickPick(RULES.map(({ examples, title, rule }, i) => {
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
                insertRule(document, position, item.rule);

                const language = window.activeTextEditor ? window.activeTextEditor.document.languageId as string : '';

                // 日志
                const e = extensions.getExtension('russell.any-rule')
                inserLog({
                    vscodeVersion: version,
                    language,
                    rule: item.rule,
                    title: item.label,
                    extensionVersion: e && e.packageJSON.version,
                    method: 'QuickPick'
                });

                // https://github.com/any86/any-rule/issues/new?title=%E6%9D%A5%E8%87%AAvscode%E7%9A%84%E5%8F%8D%E9%A6%88(1.4.2%20-%20java)
                window.showInformationMessage(`已插入正则: "${item.label}"`, '🦕图解正则', '🚀反馈问题', version, language).then(value => {

                    // window.showInformationMessage();
                });
            });

            return void 0;
        },

        resolveCompletionItem(item) {
            return item;
        }
    }, '.');
    context.subscriptions.push(disposable);
}


function insertRule(document: TextDocument, position: Position, ruleString: string) {
    const editor = window.activeTextEditor;
    if (void 0 === editor) return;
    editor.edit(editBuilder => {
        const line = document.lineAt(position);
        // 起始
        const startPostion = new Position(line.lineNumber, line.text.indexOf(COMPLETION_TRIGGER_ID));

        // 结束(replace用)
        const endPostion = new Position(line.lineNumber, startPostion.character + COMPLETION_TRIGGER_ID.length);


        // window.showInformationMessage(
        //     '' + startPostion.character
        //     , '' + endPostion.character
        // );

        editBuilder.replace(new Range(startPostion, endPostion), ruleString);

        setTimeout(() => {
            // 结束(selection用)
            const endPostion = new Position(line.lineNumber, startPostion.character + ruleString.length);
            editor.selection = new Selection(startPostion, endPostion);
        }, 0);
    });
}

