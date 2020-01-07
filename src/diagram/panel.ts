import { WebviewPanel, window, ViewColumn, Uri, workspace, ExtensionContext } from "vscode";
import { join } from 'path';
import { readFileSync } from "fs";

export class RegexDiagram {
    regex: string | null = null;
    panel: WebviewPanel | null = null;
    constructor(context: ExtensionContext) {
        this.panel = window.createWebviewPanel('regexDiagram', '图解正则表达式', ViewColumn.Two, {
            enableScripts: true,
            retainContextWhenHidden: false,
        });
        console.log(join(context.extensionPath, 'src/diagram', './index.html'));
        this.panel.webview.html = readFileSync(join(context.extensionPath, 'src/diagram', './index.html')).toString();
        this.panel.webview.postMessage({
            regex: this.regex || '/aaaaab{1,3}/',
        });
    }
}