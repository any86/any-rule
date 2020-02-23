import { extensions, window} from 'vscode';

/**
 * 获取编程语言
 */
export function getCodeLanguage():string{
    return window.activeTextEditor ? window.activeTextEditor.document.languageId as string : '';
};

/**
 * 获取插件版本号
 */
export function getExtensionVersion():string|void {
    const e = extensions.getExtension('russell.any-rule');
    return e && e.packageJSON.version;
}