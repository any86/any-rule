import { ExtensionContext, workspace, languages, window, TextDocument, Position, Range, Selection } from "vscode";
import { Rule } from './interface';
// import { slugify } from 'transliteration';
import insertLog from './insertLog';
import showResultMessage from './showResultMessage';

export default function (context: ExtensionContext, RULES: Rule[]) {
    // commands.registerCommand('functions.insertRegex', insertRule);
    // 不确定是不是都兼容"*", 保守    
    const { supportedLanguages, triggerStringEnd } = getConfig();
    const disposable = languages.registerCompletionItemProvider(supportedLanguages.split(','), {
        provideCompletionItems(document, position) {
            const { triggerString } = getConfig();
            // 如果为空表示关闭
            if (!triggerString) return [];

            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith(triggerString)) return [];

            // 滞后执行
            setTimeout(() => {
                // showQuickPick
                window.showQuickPick(RULES.map(({ examples, title, rule }) => {
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

                    // 日志
                    insertLog({
                        rule: item.rule,
                        title: item.label,
                        method: 'QuickPick'
                    });
                    showResultMessage(item.label);
                });
            }, 100)
            return [];
        },

        resolveCompletionItem(item) {
            return item;
        }
    }, triggerStringEnd);
    context.subscriptions.push(disposable);
}


function insertRule(document: TextDocument, position: Position, ruleString: string) {
    const { triggerString } = getConfig();

    const editor = window.activeTextEditor;
    if (void 0 === editor) return;
    editor.edit(editBuilder => {
        const line = document.lineAt(position);

        // 起始, "zz."前面的位置
        const startPostion = position.translate(0, -triggerString.length);

        editBuilder.replace(new Range(startPostion, position), ruleString);

        setTimeout(() => {
            // 全选正则字符串
            const endPostion = new Position(line.lineNumber, startPostion.character + ruleString.length);
            editor.selection = new Selection(startPostion, endPostion);
        }, 0);
    });
}

// 获取配置
function getConfig() {
    const configuration = workspace.getConfiguration();
    const { triggerString, supportedLanguages = '*' } = configuration.AnyRule;
    const { length } = triggerString;
    const triggerStringStart = triggerString.substr(0, length - 1);
    const triggerStringEnd = triggerString.substr(-1);

    return {
        triggerStringStart, triggerStringEnd, triggerString, supportedLanguages
    }
}
