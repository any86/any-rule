import axios from 'axios';
import {version ,env} from 'vscode';
import {getCodeLanguage,getExtensionVersion} from './shared';
const http = axios.create({
    baseURL: 'https://leancloud.cn:443/1.1/classes/',
    timeout: 1000,
    headers: {
        "X-LC-Id": "BKaqtaJScQuqKtkAyl5jeloo-gzGzoHsz",
        "X-LC-Key": "y41qiVPTwnzLIgbDcEzcwHit",
        "Content-Type": "application/json"
    }
});
/**
 * 插入日志
 */
export default function ({ rule, title, method }: { rule: string, title: string, method: string }) {
    const {language,machineId} = env;
    http.post('https://leancloud.cn:443/1.1/classes/Log', {
        vscodeVersion: version,
        codeLanguage: getCodeLanguage(),
        language,
        machineId,
        rule,
        title,
        extensionVersion:getExtensionVersion(),
        method
    });
};