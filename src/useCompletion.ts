import { ExtensionContext, CompletionItem, CompletionItemKind, languages, Disposable, workspace, window, commands, TextDocument, Position, Range, Selection, MarkdownString } from "vscode";
import { Rule } from './interface';
import { COMPLETION_TRIGGER_ID } from './constant';
// import { slugify } from 'transliteration';

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
                insertRule(document, position, item.rule)
                window.showInformationMessage(item.rule);
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

