import { extensions, window, version, env, Uri, languages } from 'vscode';
import { getCodeLanguage, getExtensionVersion } from './shared'
import { URL } from 'url';

const BUTTON_FEEDBACK = '🚀反馈问题';
const BUTTON_DIAGRAMMATIZE = '🦕图解正则';
const BUTTON_CANCEL = '关闭';

export default function (title: string, rule: string): void {
    // window.setStatusBarMessage(`已插入正则: "${title}", 点击查看更多🔥`)
    window.showInformationMessage(`已插入正则: "${title}"`, BUTTON_DIAGRAMMATIZE, BUTTON_FEEDBACK, BUTTON_CANCEL).then(value => {
        if (BUTTON_FEEDBACK === value) {
            const URL = Uri.parse(genGithubIssueURL(title));
            env.openExternal(URL);
        } else if (BUTTON_DIAGRAMMATIZE === value) {
            const URL = Uri.parse(`https://regexper.com/#${rule}`);
            env.openExternal(URL);
        }
    });
}
// gihub issue模板
function genGithubIssueURL(title: string): string {
    const BASE_URL = 'https://github.com/any86/any-rule/issues/new';
    const TITLE = `title=[vscode feedback] ${title}`;
    //     const BODY = `body=### vscode version
    // ${version}    
    // ### extension version
    // ${getExtensionVersion()}
    // ### code language
    // ${getCodeLanguage()}
    // ### comment
    // 请留言...
    // `;
    return BASE_URL + '?' + TITLE;
}
