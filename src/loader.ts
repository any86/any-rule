import { workspace, Uri } from 'vscode';

import axios from 'axios';
import { IRule } from './interface';

async function loadRulesFromFile(path: Uri): Promise<IRule[] | null> {
    try {
        const json = await workspace.fs.readFile(path);
        return JSON.parse(json.toString()) as IRule[];
    } catch(e) {
        return null;
    }
}

async function loadRulesFromWeb(): Promise<IRule[]> {
    const dataSources = [
        'https://raw.githubusercontent.com/any86/any-rule/feature/vscode-refactor/rules.json'
    ];
    let rules: IRule[] = [];
    for (const source of dataSources) {
        try {
            const response = await axios.get(source);
            const body = response.data;
            rules = body as IRule[];
        } catch(e) {
            console.log(e);
            continue;
        }
    }

    return rules;
}

export async function loadRules (extensionPath: string, force: boolean = false): Promise<IRule[]> {
    const fileUri = Uri.parse(`file://${extensionPath.length && extensionPath[0] === '/' ? '' :'/'}${extensionPath}/rules.json`);
    let rules: IRule[] | null = null;
    if (!force) {
        rules = await loadRulesFromFile(fileUri);
    }
    if (!rules) {
        rules = await loadRulesFromWeb();
        await workspace.fs.writeFile(fileUri, Buffer.from(JSON.stringify(rules)));
    }
    return rules;
}
