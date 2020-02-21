import axios from 'axios';

const http = axios.create({
    baseURL: 'https://leancloud.cn:443/1.1/classes/',
    timeout: 1000,
    headers: {
        "X-LC-Id": "BKaqtaJScQuqKtkAyl5jeloo-gzGzoHsz",
        "X-LC-Key": "y41qiVPTwnzLIgbDcEzcwHit",
        "Content-Type": "application/json"
    }
});

export default function ({ vscodeVersion, extensionVersion, language, rule, title, method }: Record<string, string>) {
    http.post('https://leancloud.cn:443/1.1/classes/Log', {
        vscodeVersion,
        language,
        rule,
        title,
        extensionVersion,
        method
    });
};

