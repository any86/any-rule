import { ExtensionContext, CompletionItem, CompletionItemKind, languages, Disposable, workspace, window, commands, TextDocument, Position, Range, Selection, MarkdownString } from "vscode";
import { Rule } from './interface';
import { COMPLETION_TRIGGER_ID } from './constant';
export default function (context: ExtensionContext, RULES: Rule[]) {
    registerCommand();
    const disposable = languages.registerCompletionItemProvider('plaintext', {
        provideCompletionItems(document, position) {
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith(COMPLETION_TRIGGER_ID)) return;

            return RULES.map(({ rule, title, examples }) => {
                const item = new CompletionItem(title, CompletionItemKind.Method);
                const ruleString = String(rule);

                item.insertText = ruleString;
                item.documentation = new MarkdownString(`### 示例\r\n${examples.join(',')}`);
                // item.filterText = '手';
                item.command = {
                    title: '插入正则',
                    command: 'functions.insertRegex',
                    arguments: [document, position, ruleString]
                };
                return item;
            })
        },

        resolveCompletionItem(item) {
            return item;
        }
    }, '.');
    context.subscriptions.push(disposable);
}

function registerCommand() {
    commands.registerCommand('functions.insertRegex', (document: TextDocument, position: Position, ruleString: string) => {
        const editor = window.activeTextEditor;
        if (void 0 === editor) return;
        editor.edit(editBuilder => {
            const line = document.lineAt(position);
            // 起始
            const startPostion = new Position(line.lineNumber, line.text.indexOf(COMPLETION_TRIGGER_ID));

            // 结束
            const endPostion = new Position(line.lineNumber, startPostion.character + ruleString.length + COMPLETION_TRIGGER_ID.length);

            // window.showInformationMessage(
            //     '' + startPostion.character
            //     , ''+endPostion.character
            //     );

            editBuilder.replace(new Range(startPostion, endPostion), ruleString);

            setTimeout(() => {
                editor.selection = new Selection(startPostion, endPostion);
            }, 0);
        });
    });
}
