import { ExtensionContext, CompletionItem, CompletionItemKind, languages, Disposable, workspace, window, commands, TextDocument, Position, Range, Selection } from "vscode";
import { generateFilterString, getRulesByText } from "./utils";
import { IRule } from "./interface";
import { loadRules } from './loader';
import { RegexDiagram } from './diagram/panel';

export class AnyRule {
    context: ExtensionContext;
    disposable: Disposable | null = null;
    rules: IRule[] | null = null;
    regexDiagram: RegexDiagram | null = null;
    constructor(context: ExtensionContext) {
        this.context = context;
        this.regexDiagram = new RegexDiagram(context);
        loadRules(context.extensionPath).then(rules => {
            this.rules = rules;
            this.load();
            this.oldFunctionCompatible();
        });
    }
    public load() {
        let currentRules: IRule[] = [];
        const configuration = workspace.getConfiguration();
        let START_IDENTIFIER: string = configuration.get('anyRule.triggerString') || 'zz';
        const setting: string = configuration.get('anyRule.supportedLanguages') || 'javascript,typescirpt' as string;
        const supportedLanguages = setting.split(',');
        this.commandRegisters(START_IDENTIFIER);
        this.disposable = languages.registerCompletionItemProvider(supportedLanguages, {
            provideCompletionItems: (document, position, token, context) => {
                const line = document.lineAt(position);
                const lineText = line.text.substring(0, position.character);
                if (new RegExp(`${START_IDENTIFIER}\.`, 'g').test(lineText)) {
                    currentRules = getRulesByText(START_IDENTIFIER, this.rules || [],  lineText);
                    return currentRules.map(rule => {
                        const item = new CompletionItem(rule.title, rule.regex ? CompletionItemKind.Field : CompletionItemKind.Folder);
                        // @ts-ignore
                        item.rule = rule;
                        // item.commitCharacters = ['.'];
                        item.filterText = generateFilterString(rule);
                        item.documentation = rule.regex ? `${rule.title}\n${rule.examples ? '\n示例：\n' + rule.examples.join('\n') : ''}` : undefined;
                        item.command = {
                            title: '插入正则',
                            command: 'functions.insertRegex',
                            arguments: [document, position, rule]
                        };
                        return item;
                    });
                }
            },
            resolveCompletionItem: (item: CompletionItem) => {
                // @ts-ignore
                const rule: IRule = item.rule;
                if (rule.regex) {
                    return null;
                } else {
                    item.insertText = item.label + '.';
                    return item;
                }
            },
        }, '.');

        this.context.subscriptions.push(this.disposable);
        // window.showInformationMessage('AnyRule加载成功');
    }

    public reload() {
        if (this.disposable) {
            this.disposable.dispose();
        }
        
        this.load();
    }

    public update() {
        loadRules(this.context.extensionPath, true).then(rules => {
            this.rules = rules;
            this.reload();
            window.showInformationMessage('正则库已更新');
        });
    }

    private commandRegisters(START_IDENTIFIER: string) {
        commands.getCommands().then((commandList) => {
            if (commandList.indexOf('functions.insertRegex') !== -1) {
                return;
            }
            commands.registerCommand('functions.insertRegex', (document: TextDocument, position: Position, rule: IRule) => {
                if (rule.regex) {
                    const editor = window.activeTextEditor;
                    editor?.edit(editBuilder => {
                        const line = document.lineAt(position);
                        const start = line.text.indexOf(START_IDENTIFIER);
                        if (start === -1) {
                            return;
                        }
        
                        if (rule.regex) {
                            editBuilder.replace(
                                new Range(new Position(line.lineNumber, start),
                                    new Position(line.lineNumber, line.text.length)),
                                String(rule.regex)
                            );
                            // TODO 处理输入文本后选中字符串的问题
                            setTimeout(() => {
                                const end = new Position(line.lineNumber, line.text.length + String(rule.regex).length);
                                editor.selection = new Selection(end, end);
                            }, 0);
                        }
                    });
                } else {
                    commands.executeCommand('editor.action.triggerSuggest');
                }
            });
        });
    }

    /**
     * 兼容旧的功能，大概率会在未来废弃，仅过度使用
     */
    private oldFunctionCompatible() {
        this.rules?.forEach((rule, index) => {
            commands.registerCommand(`extension.rule${index}`, () => {
                const editor = window.activeTextEditor;
                if (editor) {
                    const { selections } = editor;
    
                    editor.edit(editBuilder => {
                        selections.forEach(selection => {
                            const { start, end } = selection;
                            const range = new Range(start, end);
                            editBuilder.replace(range, String(rule.regex));
                        });
                    });
                    // Display a message box to the user
                    window.showInformationMessage(`已插入正则: ${rule.title}`);
                } else {
                    window.showWarningMessage('any-rule: 只有在编辑文本的时候才可以使用!');
                }
            });
        });
    }
}