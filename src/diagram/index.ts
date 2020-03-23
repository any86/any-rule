import { TextEditor, window, ViewColumn, Uri, ExtensionContext, Range, commands } from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

/**
 * 获取某个扩展文件相对于webview需要的一种特殊路径格式
 * from: https://www.cnblogs.com/liuxianan/p/vscode-plugin-webview.html
 * 形如：vscode-resource:/Users/toonces/projects/vscode-cat-coding/media/cat.gif
 * @param context 上下文
 * @param relativePath 扩展中某个文件相对于根目录的路径，如 images/test.jpg
 */
function getExtensionFileVscodeResource(context: ExtensionContext, relativePath: string) {
  const diskPath = Uri.file(path.join(context.extensionPath, relativePath));
  return diskPath.with({ scheme: 'vscode-resource' }).toString();
}

/**
 * 从某个HTML文件读取能被Webview加载的HTML内容
 * from: https://www.cnblogs.com/liuxianan/p/vscode-plugin-webview.html
 * @param {*} context 上下文
 * @param {*} templatePath 相对于插件根目录的html文件相对路径
 */
function getWebViewContent(context: ExtensionContext, templatePath: string) {
  const resourcePath = path.join(context.extensionPath, templatePath);
  const dirPath = path.dirname(resourcePath);
  let html = fs.readFileSync(resourcePath, 'utf-8');
  // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
  html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
    return $1 + Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
  });
  return html;
}

export default function useDiagram(context: ExtensionContext) {

  commands.registerTextEditorCommand('extension.showDiagram', (editor, edit) => {
    console.log('show diagram triggered');
    const position = editor?.selection.active;
    const line = editor?.document.lineAt(position?.line!);
    const text = editor?.document.getText(new Range(line?.range.start!, line?.range.end!));
    const regex = /(?<!\\)\/(.+?)(?<!\\)\/([gmiyus]{0,6})/g;
    const regexpList: string[] = []; // text?.match(/(?<!\\)\/(.+?)(?<!\\)\//g);
    let matches;
    while ((matches = regex.exec(text)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (matches.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      console.log(matches);
      regexpList.push(matches[1]);
    }
    if (regexpList.length) {
      const panel = window.createWebviewPanel(
        'Diagram',
        'Diagram',
        ViewColumn.Two,
        {
          enableScripts: true,
        }
      );
      panel.webview.html = getWebViewContent(context, 'out/diagram/index.html')
        .replace('{{ inject-script }}', `<script src="${getExtensionFileVscodeResource(context, 'out/diagram/diagram.js')}"></script>`);
      panel.webview.postMessage({
        regexpGroups: regexpList,
      });
    } else {
      window.showWarningMessage('未找到正则表达式');
    }
  });
}
