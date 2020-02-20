import { ExtensionContext, CompletionItem, CompletionItemKind, languages, Disposable, workspace, window, commands, TextDocument, Position, Range, Selection, MarkdownString } from "vscode";
import { Rule } from './interface';
import { COMPLETION_TRIGGER_ID } from './constant';
// import { slugify } from 'transliteration';

export default function (context: ExtensionContext, RULES: Rule[]) {
    // commands.registerCommand('functions.insertRegex', insertRule);

    const disposable = languages.registerCompletionItemProvider('plaintext', {
        provideCompletionItems(document, position) {
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith(COMPLETION_TRIGGER_ID)) return;

            // showQuickPick
            let index = -1;
            window.showQuickPick(RULES.map(({ examples, title }, i) => {
                index = i;
                return { 
                    label: title,
                    // description:'例如: ' + examples[0],
                    detail:`例如: ${examples.join(' 或 ')}`
                };
            }), {
                placeHolder: '请输入关键词',
                // onDidSelectItem(item){
                //     console.log(item)
                // }
            }).then(text => {
                if (!text) return
                insertRule(document, position, '' + RULES[index].rule)
                window.showInformationMessage('' + RULES[index].rule);
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

        // 结束
        const endPostion = new Position(line.lineNumber, startPostion.character + ruleString.length + COMPLETION_TRIGGER_ID.length);
        window.showInformationMessage('asdad')

        // window.showInformationMessage(
        //     '' + startPostion.character
        //     , ''+endPostion.character
        //     );

        editBuilder.replace(new Range(startPostion, endPostion), ruleString);

        setTimeout(() => {
            editor.selection = new Selection(startPostion, endPostion);
        }, 0);
    });
}

